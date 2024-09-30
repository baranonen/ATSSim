"use strict"

class ATSGlobalHoldButton {
    ats
    direction
    onButton
    offButton

    constructor(ats, direction, onButton, offButton) {
        this.ats = ats
        this.direction = direction
        this.onButton = onButton
        this.offButton = offButton
        if (direction == "southbound") {
            onButton.addEventListener("click", () => {this.ats.regulation.globalSouthboundHold = true})
            offButton.addEventListener("click", () => {this.ats.regulation.globalSouthboundHold = false})
        } else if (direction == "northbound") {
            onButton.addEventListener("click", () => {this.ats.regulation.globalNorthboundHold = true})
            offButton.addEventListener("click", () => {this.ats.regulation.globalNorthboundHold = false})
        }
        this.updateColors()
    }

    updateColors() {
        if (this.direction == "northbound" && this.ats.regulation.globalNorthboundHold
            || this.direction == "southbound" && this.ats.regulation.globalSouthboundHold
        ) {
            this.onButton.querySelector("#active").setAttribute("opacity", "1")
            this.onButton.querySelector("#inactive").setAttribute("opacity", "0")
        } else {
            this.onButton.querySelector("#active").setAttribute("opacity", "0")
            this.onButton.querySelector("#inactive").setAttribute("opacity", "1")
        }
        setTimeout(() => this.updateColors(), 500)
    }
}