"use strict"

class ATSPointButton {
    HTMLElement
    interlockingPoint
    mimicScreenPage

    constructor(HTMLElement, interlockingPoint, mimicScreenPage) {
        this.HTMLElement = HTMLElement
        this.interlockingPoint = interlockingPoint
        this.mimicScreenPage = mimicScreenPage
        this.HTMLElement.addEventListener("click", this.buttonClicked.bind(this))
        this.updateColors()
    }

    buttonClicked() {
        this.mimicScreenPage.updateCurrentClickedButton(this)
    }

    updateColors() {
        if (this.mimicScreenPage.currentClickedButton instanceof ATSPointButton && this.mimicScreenPage.currentClickedButton.interlockingPoint.name == this.interlockingPoint.name) {
            this.HTMLElement.setAttribute("fill", "green")
        } else {
            if (this.interlockingPoint.locked) {
                this.HTMLElement.setAttribute("fill", "white")
            } else if (!this.interlockingPoint.locked) {
                this.HTMLElement.setAttribute("fill", "#FFFF06")
            } else {
                this.HTMLElement.setAttribute("fill", "blue")
            }
        }
        setTimeout(this.updateColors.bind(this), 500)
    }
}