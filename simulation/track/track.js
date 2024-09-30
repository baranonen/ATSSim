"use strict"

class Track {
    trackCircuits = []
    points = []

    constructor(interlocking) {
        interlocking.trackCircuits.forEach(trackCircuit => {
            var tmp = new TrackTrackCircuit(trackCircuit)
            this.trackCircuits.push(tmp)
        })
        interlocking.points.forEach(point => {
            var tmp = new TrackPoint(point)
            this.points.push(tmp)
        })
        this.sendDataToInterlocking = this.sendDataToInterlocking.bind(this)
        setTimeout(this.sendDataToInterlocking.bind(this), 200)
    }

    sendDataToInterlocking() {
        this.trackCircuits.forEach(trackCircuit => {
            trackCircuit.connectedInterlockingTrackCircuit.setOccupation(trackCircuit.occupied)
        })
        this.points.forEach(point => {
            if (point.position == 0) {
                point.connectedInterlockingPoint.currentPosition = "normal"
            } else if (point.position == 10) {
                point.connectedInterlockingPoint.currentPosition = "reverse"
            } else {
                point.connectedInterlockingPoint.currentPosition = null
            }
        })
        setTimeout(this.sendDataToInterlocking.bind(this), 200)
    }

    getTrackCircuitFromName(name) {
        var foundTrackCircuit = null
        this.trackCircuits.forEach(trackCircuit => {
            if (trackCircuit.name == name) {
                foundTrackCircuit = trackCircuit
            }
        })
        if (foundTrackCircuit == null) {
            throw `Track circuit ${name} does not exist on the track`
        }
        return foundTrackCircuit
    }

    getPointFromName(name) {
        var foundPoint = null
        this.points.forEach(point => {
            if (point.name == name) {
                foundPoint = point
            }
        })
        if (foundPoint == null) {
            throw `Point ${name} does not exist on the track`
        }
        return foundPoint
    }

    getSignalFromName(name) {
        var foundSignal = null
        this.signals.forEach(signal => {
            if (signal.name == name) {
                foundSignal = signal
            }
        })
        if (foundSignal == null) {
            throw `Signal ${name} does not exist on the track`
        }
        return foundSignal
    }
}