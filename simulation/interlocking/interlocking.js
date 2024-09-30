"use strict"

class Interlocking {
    trackCircuits = []
    points = []
    signals = []
    cycles = []
    shuntingPanels = []
    shuntingRoutes = []
    map

    constructor(map) {
        this.map = map
        this.map.trackCircuits.forEach(trackCircuit => {
            var tmpTrackCircuit = new InterlockingTrackCircuit(trackCircuit.name, trackCircuit)
            trackCircuit.interlockingTrackCircuit = tmpTrackCircuit
            this.trackCircuits.push(tmpTrackCircuit)
        })
        this.map.trackCircuits.forEach(trackCircuit => {
            if (trackCircuit.southboundSignal) {
                var tmpSignal = new InterlockingSignal(this, trackCircuit.southboundSignal.name)
                tmpSignal.direction = "southbound"
                tmpSignal.name = trackCircuit.southboundSignal.name
                tmpSignal.previousTrackCircuit = this.getTrackCircuitFromName(trackCircuit.name)
                var tmpNextTrackCircuit = map.getTrackCircuitFromName(trackCircuit.name).southbound
                if (tmpNextTrackCircuit != "endOfTrack") {
                    tmpSignal.nextTrackCircuit = this.getTrackCircuitFromName(tmpNextTrackCircuit.name)
                } else {
                    tmpSignal.nextTrackCircuit = "endOfTrack"
                }
                var mapSignal = map.getSignalFromName(tmpSignal.name)
                mapSignal.interlockingSignal = tmpSignal
                this.signals.push(tmpSignal)
            } else {
                trackCircuit.southboundSignal = null
            }

            if (trackCircuit.southboundShuntingPanel) {
                this.shuntingPanels.push(new InterlockingShuntingPanel(
                    trackCircuit.southboundShuntingPanel.name,
                    trackCircuit.southboundShuntingPanel.direction,
                    trackCircuit,
                    this
                ))
            }

            if (trackCircuit.northboundShuntingPanel) {
                this.shuntingPanels.push(new InterlockingShuntingPanel(
                    trackCircuit.northboundShuntingPanel.name,
                    trackCircuit.northboundShuntingPanel.direction,
                    trackCircuit,
                    this
                ))
            }

            if (trackCircuit.northboundSignal) {
                var tmpSignal = new InterlockingSignal(this, trackCircuit.northboundSignal.name)
                tmpSignal.direction = "northbound"
                tmpSignal.previousTrackCircuit = this.getTrackCircuitFromName(trackCircuit.name)
                var tmpNextTrackCircuit = map.getTrackCircuitFromName(trackCircuit.name).northbound
                if (tmpNextTrackCircuit != "endOfTrack") {
                    tmpSignal.nextTrackCircuit = this.getTrackCircuitFromName(tmpNextTrackCircuit.name)
                } else {
                    tmpSignal.nextTrackCircuit = "endOfTrack"
                }
                var mapSignal = map.getSignalFromName(tmpSignal.name)
                mapSignal.interlockingSignal = tmpSignal
                this.signals.push(tmpSignal)
            } else {
                trackCircuit.northboundSignal = null
            }
            if (trackCircuit.dependsOnPoint != null) {
                var tmpPoint = new InterlockingPoint(trackCircuit.dependsOnPoint.name, this.getTrackCircuitFromName(trackCircuit.name))
                trackCircuit.dependsOnPoint.interlockingPoint = tmpPoint
                this.points.push(tmpPoint)
            }
        })
        interlockingData.cycles.forEach(cycle => {
            this.cycles.push(new Cycle(cycle.name,
                this, 
                this.getSignalFromName(cycle.routes.entry.start), 
                this.getSignalOrShuntingPanelFromName(cycle.routes.entry.end), 
                this.getSignalFromName(cycle.routes.exit.start), 
                this.getSignalFromName(cycle.routes.exit.end)))
        })
        interlockingData.shuntingRoutes.forEach(shuntingRoute => {
            this.shuntingRoutes.push(new ShuntingRoute(
                this,
                this.getSignalFromName(shuntingRoute.entry.start),
                this.getShuntingPanelFromName(shuntingRoute.entry.end),
                this.getSignalFromName(shuntingRoute.exit.start),
                this.getSignalFromName(shuntingRoute.exit.end)
            ))
        })
    }

    getSignalOrShuntingPanelFromName(name) {
        try {
            return this.getSignalFromName(name)
        } catch (error) {
            return this.getShuntingPanelFromName(name)
        }
    }

    getTrackCircuitFromName(name) {
        var foundTrackCircuit = null
        this.trackCircuits.forEach(trackCircuit => {
            if (trackCircuit.name == name) {
                foundTrackCircuit = trackCircuit
            }
        })
        if (foundTrackCircuit == null) {
            throw `Track circuit ${name} does not exist on the interlocking`
        }
        return foundTrackCircuit
    }

    getCycleFromName(name) {
        var foundCycle = null
        this.cycles.forEach(cycle => {
            if (cycle.name == name) {
                foundCycle = cycle
            }
        })
        if (foundCycle == null) {
            throw `Cycle ${name} does not exist on the interlocking`
        }
        return foundCycle
    }

    getPointFromName(name) {
        var foundPoint = null
        this.points.forEach(point => {
            if (point.name == name) {
                foundPoint = point
            }
        })
        if (foundPoint == null) {
            throw `Point ${name} does not exist on the interlocking`
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
            throw `Signal ${name} does not exist on the interlocking`
        }
        return foundSignal
    }

    getShuntingPanelFromName(name) {
        var foundShuntingPanel = null
        this.shuntingPanels.forEach(shuntingPanel => {
            if (shuntingPanel.name == name) {
                foundShuntingPanel = shuntingPanel
            }
        })
        if (foundShuntingPanel == null) {
            throw `Shunting panel ${name} does not exist on the interlocking`
        }
        return foundShuntingPanel
    }

    /**
     * Find the route including points between specified signals
     * @param {string} startSignal Signal
     * @param {string} endSignal Signal
     */
    findRouteBetweenSignals(startSignal, endSignal) {
        if (startSignal.direction != endSignal.direction) {
            throw `Signals ${startSignal.name} and ${endSignal.name} have different directions. Therefore, no route in between can exist`
        }

        var startTrackCircuit = startSignal.previousTrackCircuit
        var endTrackCircuit = endSignal.previousTrackCircuit
        var direction = startSignal.direction
        var route = this.findRouteBetweenTrackCircuits(startTrackCircuit, endTrackCircuit, direction)

        if (route.length != Infinity) {
            route.path.splice(0, 1)
        }

        return route
    }

    /**
     * Find the route including points from a signal to a shunting panel
     * @param {string} startSignal Signal
     * @param {string} endShuntingPanel Shunting Panel
     */
    findRouteToShuntingPanel(startSignal, endShuntingPanel) {
        if (startSignal.direction != endShuntingPanel.direction) {
            throw `Signal ${startSignal.name} and shunting panel ${endShuntingPanel.name} have different directions. Therefore, no route in between can exist`
        }

        var startTrackCircuit = startSignal.previousTrackCircuit
        var endTrackCircuit = endShuntingPanel.previousTrackCircuit
        var direction = startSignal.direction
        var route = this.findRouteBetweenTrackCircuits(startTrackCircuit, endTrackCircuit, direction)

        if (route.length != Infinity) {
            route.path.splice(0, 1)
        }

        return route 
    }

    findRouteBetweenTrackCircuits(startTrackCircuit, endTrackCircuit, direction) {
        try {
            var foundPath = map.findShortestPath(direction, startTrackCircuit.name, endTrackCircuit.name)
        } catch (error) {
            throw `While searching for route between track circuits ${startTrackCircuit.name} and ${endTrackCircuit.name}:
            ${error}`
        }

        var foundRoute = new Route(foundPath.path, {}, [], direction)

        for (let index = 0; index < foundRoute.path.length - 1; index++) {
            const trackCircuit = this.map.getTrackCircuitFromName(foundRoute.path[index])
            var prevTrackCircuitName = foundRoute.path[index - 1]
            var nextTrackCircuitName = foundRoute.path[index + 1]
            if ((direction == "southbound" && trackCircuit.southbound == "dependsOnPoint") || (direction == "northbound" && trackCircuit.northbound == "dependsOnPoint")) {
                if (direction == "northbound") {
                    var normalNext = trackCircuit.getNorthbound("normal")
                    var reverseNext = trackCircuit.getNorthbound("reverse")
                } else {
                    var normalNext = trackCircuit.getSouthbound("normal")
                    var reverseNext = trackCircuit.getSouthbound("reverse")
                }
                if (nextTrackCircuitName == normalNext.name) {
                    var pointPosition = {
                        "name": trackCircuit.dependsOnPoint.name,
                        "position": "normal"
                    }
                    foundRoute.pointPositions.push(pointPosition)
                } else if (nextTrackCircuitName == reverseNext.name) {
                    var pointPosition = {
                        "name": trackCircuit.dependsOnPoint.name,
                        "position": "reverse"
                    }
                    foundRoute.pointPositions.push(pointPosition)
                }
            }
            if ((direction == "southbound" && trackCircuit.northbound == "dependsOnPoint") || (direction == "northbound" && trackCircuit.southbound == "dependsOnPoint")) {
                if (direction == "northbound") {
                    var normalPrev = trackCircuit.getSouthbound("normal")
                    var reversePrev = trackCircuit.getSouthbound("reverse")
                } else {
                    var normalPrev = trackCircuit.getNorthbound("normal")
                    var reversePrev = trackCircuit.getNorthbound("reverse")
                }
                if (prevTrackCircuitName == normalPrev.name) {
                    var pointPosition = {
                        "name": trackCircuit.dependsOnPoint.name,
                        "position": "normal"
                    }
                    foundRoute.pointPositions.push(pointPosition)
                } else if (prevTrackCircuitName == reversePrev.name) {
                    var pointPosition = {
                        "name": trackCircuit.dependsOnPoint.name,
                        "position": "reverse"
                    }
                    foundRoute.pointPositions.push(pointPosition)
                }
            }
            if (direction == "northbound" && trackCircuit instanceof CrossTrackCircuit) {
                if (nextTrackCircuitName == trackCircuit.getNorthboundLineNorthboundDirection().name) {
                    foundRoute.crossTrackCircuits[`${trackCircuit.name}`] = "northboundLineNorthboundDirection"
                } else if (nextTrackCircuitName == trackCircuit.getSouthboundLineNorthboundDirection().name) {
                    foundRoute.crossTrackCircuits[`${trackCircuit.name}`] = "southboundLineNorthboundDirection"
                }
            }
            if (direction == "southbound" && trackCircuit instanceof CrossTrackCircuit) {
                if (nextTrackCircuitName == trackCircuit.getNorthboundLineSouthboundDirection().name) {
                    foundRoute.crossTrackCircuits[`${trackCircuit.name}`] = "northboundLineSouthboundDirection"
                } else if (nextTrackCircuitName == trackCircuit.getSouthboundLineSouthboundDirection().name) {
                    foundRoute.crossTrackCircuits[`${trackCircuit.name}`] = "southboundLineSouthboundDirection"
                }
            }
        }

        foundRoute.direction = direction

        return foundRoute
    }

    /**
     * WARNING: ONLY TO BE USED AFTER THE ROUTE IS SAFE TO BE OPENED
     * Activates a route
     * @param {Route} route Route to be activated
     * @param {boolean} shuntingRoute True if the route is a shunting route
     */
    activateRoute(route, shuntingRoute = false) {
        route.pointPositions.forEach(pointPosition => {
            var point = this.getPointFromName(pointPosition.name)
            point.desiredPosition = pointPosition.position
        })
        route.path.forEach(trackCircuitName => {
            var trackCircuit = this.getTrackCircuitFromName(trackCircuitName)
            if (trackCircuit.mapTrackCircuit instanceof CrossTrackCircuit) {
                trackCircuit.direction = route.crossTrackCircuits[trackCircuitName]
            } else {
                trackCircuit.direction = route.direction
            }
            if (!shuntingRoute) {
                trackCircuit.reservedForRoute = true
                AlarmHandler.addEvent(trackCircuit.name, "ALT GÜZERGAH KİLİTLİ", "SUBROUTE LOCKED")
            } else {
                trackCircuit.reservedForShuntingRoute = true
            }
        })
    }

    /**
     * Request to activate a route to a signal
     * @param {string} startSignal Signal
     * @param {string} endSignal Signal
     * @returns InterlockingAnswer
     */
    requestRouteBetweenSignals(startSignal, endSignal) {
        try {
            var route = this.findRouteBetweenSignals(startSignal, endSignal)
        } catch {
            return new InterlockingAnswer(false, "routeDoesntExist")
        }
        if (route.length == Infinity) {
            return new InterlockingAnswer(false)
        }
        var answer = this.checkRoutePossibility(route)
        if (answer.status == false) {
            return answer
        }
        this.activateRoute(route)
        return new InterlockingAnswer(true)
    }

    /**
     * Internally request to activate a route to a shunting panel
     * @param {string} startSignal Signal
     * @param {string} endShuntingPanel Shunting Panel
     * @returns InterlockingAnswer
     */
    requestRouteToShuntingPanelInternal(startSignal, endShuntingPanel) {
        try {
            var route = this.findRouteToShuntingPanel(startSignal, endShuntingPanel)
        } catch {
            return new InterlockingAnswer(false, "routeDoesntExist")
        }
        if (route.length == Infinity) {
            return new InterlockingAnswer(false)
        }
        var answer = this.checkRoutePossibility(route)
        if (answer.status == false) {
            return answer
        }
        this.activateRoute(route, true)
        return answer
    }

    /**
     * Request to activate a route to a shunting panel
     * @param {string} startSignal Signal
     * @param {string} endShuntingPanel Shunting Panel
     * @returns InterlockingAnswer
     */
    requestRouteToShuntingPanel(startSignal, endShuntingPanel) {
        var foundRoute = null
        this.shuntingRoutes.forEach(shuntingRoute => {
            if (shuntingRoute.entryRouteStartSignal == startSignal && shuntingRoute.entryRouteEndShuntingPanel == endShuntingPanel) {
                foundRoute = shuntingRoute
            }
        })
        if (foundRoute == null) {
            return new InterlockingAnswer(false)
        } else {
            foundRoute.request()
        }
        return new InterlockingAnswer(true)
    }

    checkRoutePossibility(route) {
        var routeAlreadyActive = true
        for (const trackCircuitName of route.path) {
            var trackCircuit = this.getTrackCircuitFromName(trackCircuitName)
            if (!trackCircuit.reservedForRoute || trackCircuit.direction != route.direction) {
                routeAlreadyActive = false
            }
        }
        if (routeAlreadyActive) {
            route.pointPositions.forEach(pointPosition => {
                var point = this.getPointFromName(pointPosition.name)
                if (point.desiredPosition != pointPosition.position) {
                    routeAlreadyActive = false
                }
            })
        }
        if (routeAlreadyActive) {
            return new InterlockingAnswer(false, "routeAlreadySet")
        }
        for (const trackCircuitName of route.path) {
            var trackCircuit = this.getTrackCircuitFromName(trackCircuitName)
            if (trackCircuit.occupied) {
                return new InterlockingAnswer(false, "trackOccupied")
            }
            if (trackCircuit.approachLocked || trackCircuit.reservedForRoute || trackCircuit.reservedForShuntingRoute) {
                return new InterlockingAnswer(false, "conflictingRouteAlreadySet")
            }
            if (trackCircuit.deactivated) {
                return new InterlockingAnswer(false, "trackOccupied")
            }
        }
        for (const pointPosition of route.pointPositions) {
            var point = this.getPointFromName(pointPosition.name)
            if (point.desiredPosition != pointPosition.position && point.locked) {
                return new InterlockingAnswer(false, "pointUnableToMove")
            }
        }
        return new InterlockingAnswer(true)
    }

    checkFleetingPossibility(route) {
        var routePossibility = this.checkRoutePossibility(route)
        if (routePossibility.message == "routeAlreadySet") {
            for (const trackCircuitName of route.path) {
                var trackCircuit = this.getTrackCircuitFromName(trackCircuitName)
                if (trackCircuit.direction == route.direction && trackCircuit.fleeting) {
                    return new InterlockingAnswer(false, "fleetingAlreadyOn")
                }
            }
        }
        return routePossibility
    }

    cancelRoute(mapTrackCircuit, direction, signal) {
        if (signal.fleeting) {
            signal.disableFleeting()
        }
        var firstTrackCircuit = mapTrackCircuit.interlockingTrackCircuit
        if ((!firstTrackCircuit.reservedForRoute && !firstTrackCircuit.reservedForShuntingRoute) || firstTrackCircuit.direction != direction || signal.nextTrackCircuit.getCurrentNext(signal.direction == "northbound" ? "southbound" : "northbound") != signal.previousTrackCircuit.mapTrackCircuit) {
            return new InterlockingAnswer(false, "routeNotSet")
        }
        if (direction == "southbound") {
            var previousTrackCircuit = mapTrackCircuit.getNorthbound("normal").interlockingTrackCircuit
        } else {
            var previousTrackCircuit = mapTrackCircuit.getSouthbound("normal").interlockingTrackCircuit
        }
        if (previousTrackCircuit.occupied) {
            this.cancelRouteHelper(mapTrackCircuit, direction, false)
        } else {
            this.cancelRouteHelper(mapTrackCircuit, direction, true)
        }
        return new InterlockingAnswer(true)
    }

    cancelRouteHelper(mapTrackCircuit, direction, instant) {
        var trackCircuit = mapTrackCircuit.interlockingTrackCircuit;
    
        if (!trackCircuit.occupied && (trackCircuit.reservedForRoute || trackCircuit.reservedForShuntingRoute) && !trackCircuit.approachLocked) {
            if (instant) {
                trackCircuit.releaseRouteInstantly()
            } else {
                trackCircuit.releaseRouteWithApproachLocking()
            }
    
            if ((mapTrackCircuit.northboundSignal != null && direction == "northbound") || 
                (mapTrackCircuit.southboundSignal != null && direction == "southbound")) {
                return;
            }
    
            var nextCircuit = mapTrackCircuit.interlockingTrackCircuit.getCurrentNext(direction)
            this.cancelRouteHelper(nextCircuit, direction, instant);
        }
    }
}