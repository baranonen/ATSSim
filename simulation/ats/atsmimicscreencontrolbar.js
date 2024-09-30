"use strict"

class ATSMimicScreenControlBar {
    HTMLElement
    mimicScreenPage
    pointLockButton
    pointUnlockButton
    pointNormalButton
    pointReverseButton

    constructor(HTMLElement, mimicScreenPage) {
        this.HTMLElement = HTMLElement
        this.mimicScreenPage = mimicScreenPage
        this.pointUnlockButton = this.HTMLElement.querySelector("#PointUnlockButton")
        this.pointUnlockButton.addEventListener("click", this.clickPointUnlock.bind(this))
        this.pointLockButton = this.HTMLElement.querySelector("#PointLockButton")
        this.pointLockButton.addEventListener("click", this.clickPointLock.bind(this))
        this.pointNormalButton = this.HTMLElement.querySelector("#PointNormalButton")
        this.pointNormalButton.addEventListener("click", this.clickPointNormal.bind(this))
        this.pointReverseButton = this.HTMLElement.querySelector("#PointReverseButton")
        this.pointReverseButton.addEventListener("click", this.clickPointReverse.bind(this))
        this.fleetingOnButton = this.HTMLElement.querySelector("#FleetingOnButton")
        this.fleetingOnButton.addEventListener("click", this.clickFleetingOn.bind(this))
        this.fleetingOffButton = this.HTMLElement.querySelector("#FleetingOffButton")
        this.fleetingOffButton.addEventListener("click", this.clickFleetingOff.bind(this))
    }

    clickPointUnlock() {
        if (this.mimicScreenPage.currentClickedButton instanceof ATSPointButton) {
            var request = this.mimicScreenPage.currentClickedButton.interlockingPoint.unlockPoint()
            if (request.status == true) {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("ATS OK"))
            } else if (request.message == "pointAlreadyUnlocked") {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Point already in requested position"))
            }
            this.mimicScreenPage.currentClickedButton = null
        }
    }

    clickPointLock() {
        if (this.mimicScreenPage.currentClickedButton instanceof ATSPointButton) {
            var request = this.mimicScreenPage.currentClickedButton.interlockingPoint.lockPoint()
            if (request.status == true) {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("ATS OK"))
            } else if (request.message == "pointAlreadyLocked") {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Point already in requested position"))
            } else if (request.message == "pointOutOfControl") {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Point out of control"))
            }
            this.mimicScreenPage.currentClickedButton = null
        }
    }

    clickPointNormal() {
        if (this.mimicScreenPage.currentClickedButton instanceof ATSPointButton) {
            var request = this.mimicScreenPage.currentClickedButton.interlockingPoint.requestPosition("normal")
            if (request.status == true) {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("ATS OK"))
            } else if (request.message == "pointLocked") {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Point locked"))
            } else if (request.message == "subrouteNotFree") {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Subroute not free"))
            } else if (request.message == "pointAlreadyInRequestedPosition") {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Point already in requested position"))
            } else if (request.message == "trackCircuitDeactivated") {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Point track circuit deactivated"))
            }
            this.mimicScreenPage.currentClickedButton = null
        }
    }

    clickPointReverse() {
        if (this.mimicScreenPage.currentClickedButton instanceof ATSPointButton) {
            var request = this.mimicScreenPage.currentClickedButton.interlockingPoint.requestPosition("reverse")
            if (request.status == true) {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("ATS OK"))
            } else if (request.message == "pointLocked") {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Point locked"))
            } else if (request.message == "subrouteNotFree") {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Subroute not free"))
            } else if (request.message == "pointAlreadyInRequestedPosition") {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Point already in requested position"))
            } else if (request.message == "trackCircuitDeactivated") {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Point track circuit deactivated"))
            }
            this.mimicScreenPage.currentClickedButton = null
        }
    }

    clickFleetingOn() {
        if (this.mimicScreenPage.currentClickedButton instanceof ATSFleetingButton) {
            var request = this.mimicScreenPage.currentClickedButton.interlockingSignal.requestFleeting()
            if (!request.status) {
                if (request.message == "trackOccupied" || request.message == "conflictingRouteAlreadySet") {
                    this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Conflicting route setting"), null)
                } else if (request.message == "routeAlreadySet") {
                    this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Route already set"), null)
                } else if (request.message == "pointUnableToMove") {
                    this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Point unable to move"), null)
                } else if (request.message == "fleetingAlreadyOn") {
                    this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Fleeting mode on"), null)
                }
            } else {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("ATS OK"))
            }
            this.mimicScreenPage.currentClickedButton = null
        }
    }

    clickFleetingOff() {
        if (this.mimicScreenPage.currentClickedButton instanceof ATSFleetingButton) {
            var request = this.mimicScreenPage.currentClickedButton.interlockingSignal.disableFleeting()
            if (!request.status) {
                if (request.message == "fleetingAlreadyOff") {
                    this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Fleeting mode off"), null)
                }
            } else {
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("ATS OK"))
            }
            this.mimicScreenPage.currentClickedButton = null
        }
    }
}