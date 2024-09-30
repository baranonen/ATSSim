"use strict"

class ATSShuntingPanel {
    HTMLElement
    interlockingShuntingPanel
    mimicScreenPage

    constructor(HTMLElement, interlockingShuntingPanel, mimicScreenPage) {
        this.HTMLElement = HTMLElement
        this.interlockingShuntingPanel = interlockingShuntingPanel
        this.mimicScreenPage = mimicScreenPage
        this.HTMLElement.addEventListener("click", this.buttonClicked.bind(this))
    }

    buttonClicked() {
        if (this.mimicScreenPage.currentClickedButton instanceof ATSSignalButton) {
            var request = this.mimicScreenPage.interlocking.requestRouteToShuntingPanel(this.mimicScreenPage.currentClickedButton.interlockingSignal, this.interlockingShuntingPanel)
            if (request.status == false) {
                this.mimicScreenPage.updateCurrentClickedButton(this)
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
}