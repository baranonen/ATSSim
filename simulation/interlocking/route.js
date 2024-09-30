"use strict"

class Route {
    path
    crossTrackCircuits
    pointPositions
    direction
    constructor(path, crossTrackCircuits, pointPositions, direction) {
        this.path = path
        this.crossTrackCircuits = crossTrackCircuits
        this.pointPositions = pointPositions
        this.direction = direction
    }
}