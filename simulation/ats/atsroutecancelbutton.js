"use strict"

class ATSRouteCancelButton {
    HTMLElement
    interlockingSignal
    mimicScreenPage

    constructor(HTMLElement, interlockingSignal, mimicScreenPage) {
        this.HTMLElement = HTMLElement
        this.interlockingSignal = interlockingSignal
        this.mimicScreenPage = mimicScreenPage
        this.HTMLElement.addEventListener("click", this.buttonClicked.bind(this))
    }

    buttonClicked() {
        var request = this.mimicScreenPage.interlocking.cancelRoute(this.interlockingSignal.nextTrackCircuit.mapTrackCircuit, this.interlockingSignal.direction, this.interlockingSignal)
        this.interlockingSignal.fleeting = false
        if (request.status == true) {
            this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("ATS OK"), null)
        } else if (request.message == "routeNotSet") {
            this.mimicScreenPage.ats.updateInterlockingAnswer(TranslationProvider.get("Route already unset"), null)
        }
    }
}