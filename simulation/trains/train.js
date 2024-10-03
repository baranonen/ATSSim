"use strict"

class Train {
    name
    carPositions
    previousCarPositions
    map
    track
    direction
    atc
    driver
    interlocking
    ats
    continueUntilNextSignal
    stopped

    constructor(name, carCount, map, track, position, direction, interlocking, ats) {
        this.name = name
        this.carPositions = []
        this.carPositions.length = carCount
        Object.defineProperty(this.carPositions, "length", { writable: false })
        this.map = map
        this.track = track
        this.direction = direction
        this.interlocking = interlocking
        this.ats = ats
        this.setInitialPosition(position, direction)
        this.updateOccupancy()
        this.atc = new ATCOnboard(this, this.map, this.interlocking, this.ats)
        this.driver = new Driver(this, this.interlocking)
        this.stopped = false
        setTimeout(this.updatePosition.bind(this), 2000)
    }

    setInitialPosition(mapTrackCircuit, direction) {
        if (direction == "northbound") {
            var currentPosition = new CarPosition(mapTrackCircuit, mapTrackCircuit.length)
            for (var i = 0; i < this.carPositions.length; i++) {
                this.carPositions[i] = currentPosition
                currentPosition = this.getSouthboundOfPosition(currentPosition)
            }
        } else if (direction == "southbound") {
            var currentPosition = new CarPosition(mapTrackCircuit, 1)
            for (let i = 1; i < this.carPositions.length; i++) {
                currentPosition = this.getNorthboundOfPosition(currentPosition)
            }
            for (var i = 0; i < this.carPositions.length; i++) {
                this.carPositions[i] = currentPosition
                currentPosition = this.getSouthboundOfPosition(currentPosition)
            }
        }
        this.previousCarPositions = this.carPositions
    }

    getNorthboundOfPosition(carPosition) {
        var currentTrackCircuit = carPosition.mapTrackCircuit
        if (currentTrackCircuit.length == carPosition.position) {
            return new CarPosition(currentTrackCircuit.interlockingTrackCircuit.getCurrentNext("northbound"), 1)
        } else {
            return new CarPosition(currentTrackCircuit, carPosition.position + 1)
        }
    }

    getSouthboundOfPosition(carPosition) {
        var currentTrackCircuit = carPosition.mapTrackCircuit
        if (carPosition.position == 1) {
            return new CarPosition(currentTrackCircuit.interlockingTrackCircuit.getCurrentNext("southbound"), currentTrackCircuit.interlockingTrackCircuit.getCurrentNext("southbound").length)
        } else {
            return new CarPosition(currentTrackCircuit, carPosition.position - 1)
        }
    }

    move() {
        this.previousCarPositions = Array.from(this.carPositions)
        for (let i = this.carPositions.length - 1; i >= 0; i--) { 
            if (this.direction == "northbound") {
                this.carPositions[i] = this.getNorthboundOfPosition(this.carPositions[i])
            } else if (this.direction == "southbound") {
                this.carPositions[i] = this.getSouthboundOfPosition(this.carPositions[i])
            }
        }
        this.atc.departing = false
    }

    updatePosition() {
        var hasMovementAuthority = this.atc.canMove()
        this.driver.update()
        var nextUpdate = 1382
        if (hasMovementAuthority || this.continueUntilNextSignal) {
            if (this.stopped) {
                this.stopped = false
                nextUpdate = 15000
            } else {
                this.move()
            }
        } else {
            this.stopped = true
        }
        if (this.continueUntilNextSignal && (
            (this.direction == "northbound" && this.carPositions[0].mapTrackCircuit.northboundSignal != null) ||
            (this.direction == "southbound" && this.carPositions[this.carPositions.length - 1].mapTrackCircuit.southboundSignal != null)
        )) {
            this.continueUntilNextSignal = false
        }
        setTimeout(this.updatePosition.bind(this), Math.random() * (400) + nextUpdate)
    }

    updateOccupancy() {
        this.previousCarPositions.forEach(carPosition => {
            this.track.getTrackCircuitFromName(carPosition.mapTrackCircuit.name).occupied = false
        })
        this.carPositions.forEach(carPosition => {
            this.track.getTrackCircuitFromName(carPosition.mapTrackCircuit.name).occupied = true
        })
        setTimeout(this.updateOccupancy.bind(this), 200)
    }
}