"use strict"

class Driver {
    train
    interlocking
    changeEndsAtShuntingPanel

    constructor(train, interlocking) {
        this.train = train
        this.interlocking = interlocking
        this.changeEndsAtShuntingPanel = false
    }

    update() {
        if (this.train.direction == "northbound") {
            if (this.train.carPositions[0].mapTrackCircuit.length == this.train.carPositions[0].position) {
                var nextTrackCircuit = this.train.carPositions[0].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("northbound")
                if (nextTrackCircuit == "endOfTrack") {
                    this.changeEnds()
                }
                if (this.train.carPositions[0].mapTrackCircuit.northboundSignal && this.train.carPositions[0].mapTrackCircuit.northboundSignal.interlockingSignal.aspect == "flashingGreen") {
                    this.changeEndsAtShuntingPanel = true
                }
                if (this.changeEndsAtShuntingPanel && this.train.carPositions[0].mapTrackCircuit.northboundShuntingPanel != null) {
                    this.changeEndsAtShuntingPanel = false
                    this.changeEnds()
                }
            } else if (this.changeEndsAtShuntingPanel && this.train.atc.stoppedAtStation && this.train.carPositions[0].mapTrackCircuit.northboundShuntingPanel != null) {
                this.changeEndsAtShuntingPanel = false
                this.changeEnds()
            }
        } else if (this.train.direction == "southbound") {
            if (this.train.carPositions[this.train.carPositions.length - 1].position == 1) {
                var nextTrackCircuit = this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("southbound")
                if (nextTrackCircuit == "endOfTrack") {
                    this.changeEnds()
                }
                if (this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundSignal && this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundSignal.interlockingSignal.aspect == "flashingGreen") {
                    this.changeEndsAtShuntingPanel = true
                }
                if (this.changeEndsAtShuntingPanel && this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundShuntingPanel != null) {
                    this.changeEndsAtShuntingPanel = false
                    this.changeEnds()
                }
            } else if (this.changeEndsAtShuntingPanel && this.train.atc.stoppedAtStation && this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundShuntingPanel != null) {
                this.changeEndsAtShuntingPanel = false
                this.changeEnds()
            }
        }
    }

    changeEnds() {
        if (this.train.direction == "southbound") {
            this.train.direction = "northbound"
        } else {
            this.train.direction = "southbound"
        }
    }
}