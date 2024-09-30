"use strict"

class Point {
    name
    onTrackCircuit
    interlockingPoint = null
    constructor(name, onTrackCircuit) {
        this.name = name
        this.onTrackCircuit = onTrackCircuit
    }
}