"use strict"

class ATSCycleButton {
    cycle
    onButton
    offButton

    constructor(cycle, onButton, offButton) {
        this.cycle = cycle
        this.onButton = onButton
        this.offButton = offButton
        onButton.addEventListener("click", () => {this.cycle.enable()})
        offButton.addEventListener("click", () => {this.cycle.disable()})
        this.updateColors()
    }

    updateColors() {
        if (this.cycle.enabled) {
            this.onButton.querySelector("#active").setAttribute("opacity", "1")
            this.onButton.querySelector("#inactive").setAttribute("opacity", "0")
        } else {
            this.onButton.querySelector("#active").setAttribute("opacity", "0")
            this.onButton.querySelector("#inactive").setAttribute("opacity", "1")
        }
        setTimeout(() => this.updateColors(), 500)
    }
}