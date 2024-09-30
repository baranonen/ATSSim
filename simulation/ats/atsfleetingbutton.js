"use strict"

class ATSFleetingButton {
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
        this.mimicScreenPage.updateCurrentClickedButton(this)
    }

    updateColors() {
        if ((this.interlockingSignal.fleeting && !(this.mimicScreenPage.currentClickedButton instanceof ATSFleetingButton && this.mimicScreenPage.currentClickedButton.interlockingSignal.name == this.interlockingSignal.name)) ||
        this.mimicScreenPage.currentClickedButton instanceof ATSFleetingButton &&
        this.HTMLElement.querySelector("#rectangle").getAttribute("fill") == "#9496A2" && 
        this.mimicScreenPage.currentClickedButton != null &&
        this.mimicScreenPage.currentClickedButton.interlockingSignal.name == this.interlockingSignal.name) {
            this.HTMLElement.querySelector("#rectangle").setAttribute("fill", "white")
            this.HTMLElement.querySelector("#F").setAttribute("fill", "black")
        } else {
            this.HTMLElement.querySelector("#rectangle").setAttribute("fill", "#9496A2")
            this.HTMLElement.querySelector("#F").setAttribute("fill", "#FFFF06")
        }
        setTimeout(this.updateColors.bind(this), 500)
    }
}