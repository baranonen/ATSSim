"use strict"

class TrackPoint {
    name
    connectedInterlockingPoint
    position // 0 = normal, 10 = reverse

    constructor(connectedInterlockingPoint) {
        this.name = connectedInterlockingPoint.name
        this.connectedInterlockingPoint = connectedInterlockingPoint
        this.position = 0
        setTimeout(this.updatePointPosition.bind(this), 1000)
    }

    updatePointPosition() {
        var desiredPosition = this.connectedInterlockingPoint.desiredPosition
        if (desiredPosition == "normal") {
            if (this.position != 0) {
                this.position -= 2
            }
        } else if (desiredPosition == "reverse") {
            if (this.position != 10) {
                this.position += 2
            }
        }
        setTimeout(this.updatePointPosition.bind(this), Math.random() * (1200 - 800) + 800)
    }
}