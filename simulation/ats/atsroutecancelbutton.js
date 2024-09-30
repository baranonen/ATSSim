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
        this.updateColors()
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

    updateColors() {
        if (this.interlockingSignal.nextTrackCircuit.approachLocked && this.interlockingSignal.nextTrackCircuit.direction == this.interlockingSignal.direction) {
            this.HTMLElement.querySelector("#cross").setAttribute("stroke", "black")
            if (this.HTMLElement.querySelector("#circle").getAttribute("fill") == "#9496A2") {
                this.HTMLElement.querySelector("#circle").setAttribute("fill", "white")
            } else {
                this.HTMLElement.querySelector("#circle").setAttribute("fill", "#9496A2")
            }            
        } else {
            this.HTMLElement.querySelector("#cross").setAttribute("stroke", "#FFFF06")
            this.HTMLElement.querySelector("#circle").setAttribute("fill", "#9496A2")
        }
        setTimeout(this.updateColors.bind(this), 500)
    }
}