"use strict"

class InterlockingShuntingPanel {
    name
    direction
    previousTrackCircuit
    interlocking
    constructor(name, direction, previousTrackCircuit, interlocking) {
        this.name = name
        this.direction = direction
        this.previousTrackCircuit = previousTrackCircuit
        this.interlocking = interlocking
    }

    requestReturnRoute() {
        //var targetTrackCircuit = this.findReturnTrackCircuit(this.previousTrackCircuit, false)
        var startSignal = this.findReturnStartSignal(this.previousTrackCircuit)
        var endSignal = this.findReturnEndSignal(this.previousTrackCircuit, false, false)
        var route = this.interlocking.findRouteBetweenSignals(startSignal, endSignal)
        this.checkReturnRoutePossibility(route)
    }

    checkReturnRoutePossibility(route) {
        var answer = this.interlocking.checkRoutePossibility(route)
        if (answer.status == false) {
            setTimeout(() => { this.checkReturnRoutePossibility(route) }, 500)
        } else {
            this.interlocking.activateRoute(route)
        }
    }

    /*
    findReturnTrackCircuit(trackCircuit, didPassFirstPoint, didPassFirstSignal) {
        if (this.direction == "northbound") {
            if (!didPassFirstPoint && trackCircuit.dependsOnPoint) {
                if (trackCircuit.dependsOnPoint.interlockingPoint.desiredPosition == "normal") {
                    return this.findReturnTrackCircuit(trackCircuit.getSouthbound("reverse"), true, didPassFirstSignal)
                } else {
                    return this.findReturnTrackCircuit(trackCircuit.getSouthbound("normal"), true, didPassFirstSignal)
                }
            }
            if (trackCircuit.southboundSignal != null) {
                if (!didPassFirstSignal) {
                    return this.findReturnTrackCircuit(trackCircuit.getSouthbound("normal"), didPassFirstPoint, true)
                }
                return trackCircuit
            }
            return this.findReturnTrackCircuit(trackCircuit.getSouthbound("normal"), didPassFirstPoint, didPassFirstSignal)
        } else {
            if (!didPassFirstPoint && trackCircuit.dependsOnPoint) {
                if (trackCircuit.dependsOnPoint.interlockingPoint.desiredPosition == "normal") {
                    return this.findReturnTrackCircuit(trackCircuit.getNorthbound("reverse"), true, didPassFirstSignal)
                } else {
                    return this.findReturnTrackCircuit(trackCircuit.getNorthbound("normal"), true, didPassFirstSignal)
                }
            }
            if (trackCircuit.northboundSignal != null) {
                if (!didPassFirstSignal) {
                    return this.findReturnTrackCircuit(trackCircuit.getNorthbound("normal"), didPassFirstPoint, true)
                }
                return trackCircuit
            }
            return this.findReturnTrackCircuit(trackCircuit.getNorthbound("normal"), didPassFirstPoint, didPassFirstSignal)
        }
    }
    */

    findReturnStartSignal(trackCircuit) {
        if (this.direction == "northbound") {
            if (trackCircuit.southboundSignal != null) {
                return trackCircuit.southboundSignal.interlockingSignal
            }
            return this.findReturnStartSignal(trackCircuit.getSouthbound("normal"))
        } else {
            if (trackCircuit.northboundSignal != null) {
                return trackCircuit.northboundSignal.interlockingSignal
            }
            return this.findReturnStartSignal(trackCircuit.getNorthbound("normal"))
        }
    }

    findReturnEndSignal(trackCircuit, didPassFirstPoint, didPassFirstSignal) {
        if (this.direction == "northbound") {
            if (trackCircuit instanceof CrossTrackCircuit) {
                return this.findReturnEndSignal(trackCircuit.getSouthbound("reverse"), true, didPassFirstSignal)
            }
            if (!didPassFirstPoint && trackCircuit.dependsOnPoint) {
                if (trackCircuit.dependsOnPoint.interlockingPoint.desiredPosition == "normal") {
                    return this.findReturnEndSignal(trackCircuit.getSouthbound("reverse"), true, didPassFirstSignal)
                } else {
                    return this.findReturnEndSignal(trackCircuit.getSouthbound("normal"), true, didPassFirstSignal)
                }
            }
            if (trackCircuit.southboundSignal != null) {
                if (!didPassFirstSignal) {
                    return this.findReturnEndSignal(trackCircuit.getSouthbound("normal"), didPassFirstPoint, true)
                }
                return trackCircuit.southboundSignal.interlockingSignal
            }
            return this.findReturnEndSignal(trackCircuit.getSouthbound("normal"), didPassFirstPoint, didPassFirstSignal)
        } else {
            if (!didPassFirstPoint && trackCircuit.dependsOnPoint) {
                if (trackCircuit.dependsOnPoint.interlockingPoint.desiredPosition == "normal") {
                    return this.findReturnEndSignal(trackCircuit.getNorthbound("reverse"), true, didPassFirstSignal)
                } else {
                    return this.findReturnEndSignal(trackCircuit.getNorthbound("normal"), true, didPassFirstSignal)
                }
            }
            if (trackCircuit.northboundSignal != null) {
                if (!didPassFirstSignal) {
                    return this.findReturnEndSignal(trackCircuit.getNorthbound("normal"), didPassFirstPoint, true)
                }
                return trackCircuit.northboundSignal.interlockingSignal
            }
            return this.findReturnEndSignal(trackCircuit.getNorthbound("normal"), didPassFirstPoint, didPassFirstSignal)
        }
    }
}