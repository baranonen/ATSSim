"use strict"

class Map {
    trackCircuits = []
    points = []
    signals = []
    shuntingPanels = []
    platforms = []
    constructor(data) {
        data.trackCircuits.forEach(trackCircuit => {
            if (trackCircuit.crossTrackCircuit) {
                this.trackCircuits.push(new CrossTrackCircuit(trackCircuit.name, trackCircuit.length))
            } else {
                this.trackCircuits.push(new TrackCircuit(trackCircuit.name, trackCircuit.length))
            }
        })
        data.trackCircuits.forEach(trackCircuit => {
            var instantiatedTrackCircuit = this.getTrackCircuitFromName(trackCircuit.name)
            if (instantiatedTrackCircuit instanceof CrossTrackCircuit) {
                instantiatedTrackCircuit.southboundLineSouthboundDirection = this.getTrackCircuitFromName(trackCircuit.southboundLineSouthboundDirection)
                instantiatedTrackCircuit.southboundLineNorthboundDirection = this.getTrackCircuitFromName(trackCircuit.southboundLineNorthboundDirection)
                instantiatedTrackCircuit.northboundLineSouthboundDirection = this.getTrackCircuitFromName(trackCircuit.northboundLineSouthboundDirection)
                instantiatedTrackCircuit.northboundLineNorthboundDirection = this.getTrackCircuitFromName(trackCircuit.northboundLineNorthboundDirection)
            } else {
                if (trackCircuit.southbound != "endOfTrack" && trackCircuit.southbound != "dependsOnPoint") {
                    instantiatedTrackCircuit.southbound = this.getTrackCircuitFromName(trackCircuit.southbound)
                } else {
                    instantiatedTrackCircuit.southbound = trackCircuit.southbound
                }
                if (trackCircuit.northbound != "endOfTrack" && trackCircuit.northbound != "dependsOnPoint") {
                    instantiatedTrackCircuit.northbound = this.getTrackCircuitFromName(trackCircuit.northbound)
                } else {
                    instantiatedTrackCircuit.northbound = trackCircuit.northbound
                }
            }
        })
        data.points.forEach(point => {
            this.points.push(new Point(point.name, this.getTrackCircuitFromName(point.trackCircuit)))
        })
        data.trackCircuits.forEach(trackCircuit => {
            var instantiatedTrackCircuit = this.getTrackCircuitFromName(trackCircuit.name)
            if (trackCircuit.dependsOnPoint != null) {
                instantiatedTrackCircuit.dependsOnPoint = this.getPointFromName(trackCircuit.dependsOnPoint.point)
                if (trackCircuit.dependsOnPoint.normal != "endOfTrack") {
                    instantiatedTrackCircuit.normal = this.getTrackCircuitFromName(trackCircuit.dependsOnPoint.normal)
                } else {
                    instantiatedTrackCircuit.normal = "endOfTrack"
                }
                if (trackCircuit.dependsOnPoint.reverse != "endOfTrack") {
                    instantiatedTrackCircuit.reverse = this.getTrackCircuitFromName(trackCircuit.dependsOnPoint.reverse)
                } else {
                    instantiatedTrackCircuit.reverse = "endOfTrack"
                }
            }
        })
        data.signals.forEach(signal => {
            this.signals.push(new Signal(signal.name, signal.direction))
        })
        data.shuntingPanels.forEach(shuntingPanel => {
            this.shuntingPanels.push(new ShuntingPanel(shuntingPanel.name, shuntingPanel.direction))
        })
        data.trackCircuits.forEach(trackCircuit => {
            if (trackCircuit.signals != null) {
                if (trackCircuit.signals.southbound != null) {
                    this.getTrackCircuitFromName(trackCircuit.name).southboundSignal = this.getSignalFromName(trackCircuit.signals.southbound)
                }
                if (trackCircuit.signals.northbound != null) {
                    this.getTrackCircuitFromName(trackCircuit.name).northboundSignal = this.getSignalFromName(trackCircuit.signals.northbound)
                }
            }
            if (trackCircuit.shuntingPanels != null) {
                if (trackCircuit.shuntingPanels.southbound != null) {
                    this.getTrackCircuitFromName(trackCircuit.name).southboundShuntingPanel = this.getShuntingPanelFromName(trackCircuit.shuntingPanels.southbound)
                }
                if (trackCircuit.shuntingPanels.northbound != null) {
                    this.getTrackCircuitFromName(trackCircuit.name).northboundShuntingPanel = this.getShuntingPanelFromName(trackCircuit.shuntingPanels.northbound)
                }
            }
        })
        this.makeGraph()
        data.platforms.forEach(platform => {
            var platformToBeAdded = new Platform(platform.name, platform.direction, platform.northbound.position, platform.southbound.position, platform.terminus != null)
            this.platforms.push(platformToBeAdded)
            var northboundTrackCircuit = this.getTrackCircuitFromName(platform.northbound.trackCircuit)
            var southboundTrackCircuit = this.getTrackCircuitFromName(platform.southbound.trackCircuit)
            northboundTrackCircuit.northboundPlatform = platformToBeAdded
            southboundTrackCircuit.southboundPlatform = platformToBeAdded
        })
    }

    shortestDistanceNode(distances, visited) {
        let shortest = null;
    
        for (let node in distances) {
            let currentIsShortest =
                shortest === null || distances[node] < distances[shortest];
            if (currentIsShortest && !visited.includes(node)) {
                shortest = node;
            }
        }
        return shortest;
    }
    
    findShortestPath(direction, startNode, endNode) {
        var graph
        if (direction == "southbound") {
            graph = this.southboundGraph
        } else if (direction == "northbound") {
            graph = this.northboundGraph
        } else {
            throw `Illegal direction value while searching for shortest path: ${direction}`
        }
        let distances = {};
        distances[endNode] = "Infinity";
        distances = Object.assign(distances, graph[startNode]);
    
        let parents = { endNode: null };
        for (let child in graph[startNode]) {
            parents[child] = startNode;
        }
    
        let visited = [];
    
        let node = this.shortestDistanceNode(distances, visited);
    
        while (node) {
            let distance = distances[node];
            let children = graph[node];
            for (let child in children) {
                if (String(child) === String(startNode)) {
                    continue;
                } else {
                    let newdistance = distance + children[child];
                    if (!distances[child] || distances[child] > newdistance) {
                        distances[child] = newdistance;
                        parents[child] = node;
                    }
                }
            }
            visited.push(node);
            node = this.shortestDistanceNode(distances, visited);
        }
    
        let shortestPath = [endNode]
        let parent = parents[endNode]
        while (parent) {
            shortestPath.push(parent)
            parent = parents[parent]
        }
        shortestPath.reverse()
    
        let results = {
            distance: distances[endNode],
            path: shortestPath,
        }

        if (results.distance == "Infinity") {
            throw `No path between track circuits ${startNode} and ${endNode} in ${direction} direction exist`
        }
    
        return results;
    }

    northboundGraph = {}
    southboundGraph = {}

    makeGraph() {
        this.trackCircuits.forEach(trackCircuit => {
            if (trackCircuit instanceof CrossTrackCircuit) {
                this.northboundGraph[trackCircuit.name] = {[trackCircuit.getSouthboundLineNorthboundDirection().name]: 1, [trackCircuit.getNorthboundLineNorthboundDirection().name]: 1}
                this.southboundGraph[trackCircuit.name] = {[trackCircuit.getSouthboundLineSouthboundDirection().name]: 1, [trackCircuit.getNorthboundLineSouthboundDirection().name]: 1}
            } else {
                if (trackCircuit.northbound != "endOfTrack" && trackCircuit.northbound != "dependsOnPoint") {
                    this.northboundGraph[trackCircuit.name] = {[trackCircuit.getNorthbound().name]: 1}
                } else if (trackCircuit.northbound != "endOfTrack") {
                    if (trackCircuit.getNorthbound("normal") == "endOfTrack") {
                        this.northboundGraph[trackCircuit.name] = {[trackCircuit.getNorthbound("reverse").name]: 5}
                    } else if (trackCircuit.getNorthbound("reverse") == "endOfTrack") {
                        this.northboundGraph[trackCircuit.name] = {[trackCircuit.getNorthbound("normal").name]: 1}
                    } else {
                        this.northboundGraph[trackCircuit.name] = {[trackCircuit.getNorthbound("normal").name]: 1, [trackCircuit.getNorthbound("reverse").name]: 5}
                    }
                }
                if (trackCircuit.southbound != "endOfTrack" && trackCircuit.southbound != "dependsOnPoint") {
                    this.southboundGraph[trackCircuit.name] = {[trackCircuit.getSouthbound().name]: 1}
                } else if (trackCircuit.southbound != "endOfTrack") {
                    if (trackCircuit.getSouthbound("normal") == "endOfTrack") {
                        this.southboundGraph[trackCircuit.name] = {[trackCircuit.getSouthbound("reverse").name]: 5}
                    } else if (trackCircuit.getSouthbound("reverse") == "endOfTrack") {
                        this.southboundGraph[trackCircuit.name] = {[trackCircuit.getSouthbound("normal").name]: 1}
                    } else {
                        this.southboundGraph[trackCircuit.name] = {[trackCircuit.getSouthbound("normal").name]: 1, [trackCircuit.getSouthbound("reverse").name]: 5}
                    }
                }
            }
        })
    }

    getTrackCircuitFromName(name) {
        var foundTrackCircuit = null
        this.trackCircuits.forEach(trackCircuit => {
            if (trackCircuit.name == name) {
                foundTrackCircuit = trackCircuit
            }
        })
        if (foundTrackCircuit == null) {
            throw `Track circuit ${name} does not exist on the map`
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
            throw `Point ${name} does not exist on the map`
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
            throw `Signal ${name} does not exist on the map`
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
            throw `Shunting panel ${name} does not exist on the map`
        }
        return foundShuntingPanel
    }
}