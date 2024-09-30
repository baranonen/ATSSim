"use strict"

class ATSHoldButton {
    atsPlatform
    onButton
    offButton

    constructor(atsPlatform, onButton, offButton) {
        this.atsPlatform = atsPlatform
        this.onButton = onButton
        this.offButton = offButton
        onButton.addEventListener("click", () => {this.atsPlatform.hold = true})
        offButton.addEventListener("click", () => {this.atsPlatform.hold = false})
        this.updateColors()
    }

    updateColors() {
        if (this.atsPlatform.hold) {
            this.offButton.querySelector("#active").setAttribute("opacity", "0")
            this.offButton.querySelector("#inactive").setAttribute("opacity", "1")
            this.onButton.querySelector("#active").setAttribute("opacity", "1")
            this.onButton.querySelector("#inactive").setAttribute("opacity", "0")
        } else {
            this.offButton.querySelector("#active").setAttribute("opacity", "1")
            this.offButton.querySelector("#inactive").setAttribute("opacity", "0")
            this.onButton.querySelector("#active").setAttribute("opacity", "0")
            this.onButton.querySelector("#inactive").setAttribute("opacity", "1")
        }
        setTimeout(() => this.updateColors(), 500)
    }
}