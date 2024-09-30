"use strict"

class InterlockingSignal {
    name
    direction
    nextTrackCircuit
    previousTrackCircuit
    aspect
    interlocking
    fleeting

    constructor(interlocking, name) {
        this.name = name
        this.interlocking = interlocking
        this.fleeting = false
        this.updateAspect()
    }

    updateAspect() {
        var newAspect = "red"
        if (this.nextTrackCircuit == null || this.nextTrackCircuit.occupied) {
            newAspect = "red"
        } else if (this.nextTrackCircuit == "endOfTrack") {
            newAspect = "endOfTrack"
        } else if (this.nextTrackCircuit.reservedForRoute && this.nextTrackCircuit.direction == this.direction) {
            if (this.nextTrackCircuit.mapTrackCircuit.dependsOnPoint == null || this.interlocking.getPointFromName(this.nextTrackCircuit.mapTrackCircuit.dependsOnPoint.name).currentPosition == this.interlocking.getPointFromName(this.nextTrackCircuit.mapTrackCircuit.dependsOnPoint.name).desiredPosition &&
                this.nextTrackCircuit.getCurrentNext(this.direction == "northbound" ? "southbound" : "northbound") == this.previousTrackCircuit.mapTrackCircuit) {
                newAspect = "green"
            } else {
                newAspect = "red"
            }
        } else if (this.nextTrackCircuit.reservedForShuntingRoute && this.nextTrackCircuit.direction == this.direction) {
            if (this.nextTrackCircuit.mapTrackCircuit.dependsOnPoint == null || this.interlocking.getPointFromName(this.nextTrackCircuit.mapTrackCircuit.dependsOnPoint.name).currentPosition == this.interlocking.getPointFromName(this.nextTrackCircuit.mapTrackCircuit.dependsOnPoint.name).desiredPosition &&
                this.nextTrackCircuit.getCurrentNext(this.direction == "northbound" ? "southbound" : "northbound") == this.previousTrackCircuit.mapTrackCircuit) {
                newAspect = "flashingGreen"
            } else {
                newAspect = "red"
            }
        } else {
            newAspect = "red"
        }
        if (this.aspect != newAspect) {
            if (newAspect == "red") {
                AlarmHandler.addEvent(this.name, "SİNYAL KIRMIZI RENKTE", "SIGNAL ASPECT IS RED")
            } else if (newAspect == "green") {
                AlarmHandler.addEvent(this.name, "SİNYAL YEŞİL RENKTE", "SIGNAL ASPECT IS GREEN")
            } else if (newAspect == "flashingGreen") {
                AlarmHandler.addEvent(this.name, "SİNYAL YANIP SÖNEN YEŞİL RENKTE", "SIGNAL ASPECT IS FLASHING GREEN")
            }
        }
        this.aspect = newAspect
        setTimeout(this.updateAspect.bind(this), 200)
    }

    findFleetingRoute() {
        var route = new Route([], {}, [], this.direction)
        var currentTrackCircuit = this.nextTrackCircuit.mapTrackCircuit
        if (this.direction == "northbound") {
            while (currentTrackCircuit.northboundSignal == null) {
                route.path.push(currentTrackCircuit.name)
                if (currentTrackCircuit.dependsOnPoint != null) {
                    route.pointPositions.push({
                        "name": currentTrackCircuit.dependsOnPoint.name,
                        "position": "normal"
                    })
                }
                currentTrackCircuit = currentTrackCircuit.getNorthbound("normal")
            }
            route.path.push(currentTrackCircuit.name)
            if (currentTrackCircuit.dependsOnPoint != null) {
                route.pointPositions.push({
                    "name": currentTrackCircuit.dependsOnPoint.name,
                    "position": "normal"
                })
            }
        }
        if (this.direction == "southbound") {
            while (currentTrackCircuit.southboundSignal == null) {
                route.path.push(currentTrackCircuit.name)
                if (currentTrackCircuit.dependsOnPoint != null) {
                    route.pointPositions.push({
                        "name": currentTrackCircuit.dependsOnPoint.name,
                        "position": "normal"
                    })
                }
                currentTrackCircuit = currentTrackCircuit.getSouthbound("normal")
            }
            route.path.push(currentTrackCircuit.name)
            if (currentTrackCircuit.dependsOnPoint != null) {
                route.pointPositions.push({
                    "name": currentTrackCircuit.dependsOnPoint.name,
                    "position": "normal"
                })
            }
        }
        return route
    }

    requestFleeting() {
        var route = this.findFleetingRoute()
        var fleetingPossibility = this.interlocking.checkFleetingPossibility(route)
        if (fleetingPossibility.status) {
            route.pointPositions.forEach(pointPosition => {
                var point = this.interlocking.getPointFromName(pointPosition.name)
                point.desiredPosition = pointPosition.position
            })
            route.path.forEach(trackCircuitName => {
                var trackCircuit = this.interlocking.getTrackCircuitFromName(trackCircuitName)
                trackCircuit.direction = route.direction
                trackCircuit.fleeting = true
                trackCircuit.reservedForRoute = true
                AlarmHandler.addEvent(trackCircuit.name, "ALT GÜZERGAH KİLİTLİ", "SUBROUTE LOCKED")
            })
            this.fleeting = true
        }
        AlarmHandler.addEvent(this.name, "FİLO MODU DEVREDE", "FLEETING SET")
        return fleetingPossibility
    }

    disableFleeting() {
        if (!this.fleeting) {
            return new InterlockingAnswer(false, "fleetingAlreadyOff")
        }
        var route = this.findFleetingRoute()
        route.path.forEach(trackCircuitName => {
            var trackCircuit = this.interlocking.getTrackCircuitFromName(trackCircuitName)
            trackCircuit.fleeting = false
        })
        this.fleeting = false
        AlarmHandler.addEvent(this.name, "FİLO MODU İPTAL EDİLDİ", "FLEETING CANCELLED")
        return new InterlockingAnswer(true)
    }
}