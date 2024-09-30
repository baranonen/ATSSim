"use strict"

class ATSSignalButton {
    HTMLElement
    interlockingSignal
    mimicScreenPage

    constructor(HTMLElement, interlockingSignal, mimicScreenPage) {
        this.HTMLElement = HTMLElement
        this.interlockingSignal = interlockingSignal
        this.mimicScreenPage = mimicScreenPage
        this.HTMLElement.addEventListener("click", this.buttonClicked.bind(this))
        this.updateColors()
    }

    buttonClicked() {
        if (this.mimicScreenPage.currentClickedButton instanceof ATSSignalButton) {
            var request = this.mimicScreenPage.interlocking.requestRouteBetweenSignals(this.mimicScreenPage.currentClickedButton.interlockingSignal, this.interlockingSignal)
            if (request.status == false) {
                this.mimicScreenPage.updateCurrentClickedButton(null)
                if (request.message == "trackOccupied" || request.message == "conflictingRouteAlreadySet") {
                    this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Conflicting route setting"), null)
                } else if (request.message == "routeAlreadySet") {
                    this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Route already set"), null)
                } else if (request.message == "pointUnableToMove") {
                    this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Point unable to move"), null)
                }
            } else {
                this.mimicScreenPage.updateCurrentClickedButton(null)
                this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("ATS OK"))
            }
        } else {
            this.mimicScreenPage.updateCurrentClickedButton(this)
        }
    }

    updateColors() {
        if (this.interlockingSignal.aspect == "green" ||
        this.interlockingSignal.aspect == "flashingGreen" ||
        this.mimicScreenPage.currentClickedButton instanceof ATSSignalButton &&
        this.HTMLElement.querySelector("#rectangle").getAttribute("fill") == "#9496A2" && 
        this.mimicScreenPage.currentClickedButton != null &&
        this.mimicScreenPage.currentClickedButton.interlockingSignal.name == this.interlockingSignal.name) {
            this.HTMLElement.querySelector("#rectangle").setAttribute("fill", "white")
            this.HTMLElement.querySelector("#arrow").setAttribute("fill", "black")
        } else {
            this.HTMLElement.querySelector("#rectangle").setAttribute("fill", "#9496A2")
            this.HTMLElement.querySelector("#arrow").setAttribute("fill", "#FFFF06")
        }
        setTimeout(this.updateColors.bind(this), 500)
    }
}