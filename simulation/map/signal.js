"use strict"

class Signal {
    name
    direction
    interlockingSignal
    constructor(name, direction) {
        this.name = name
        this.direction = direction
        this.interlockingSignal = null
    }
}