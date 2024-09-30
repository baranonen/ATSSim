"use strict"

class TrackCircuit {
    name
    southbound
    northbound
    dependsOnPoint = null
    normal
    reverse
    southboundSignal
    northboundSignal
    southboundShuntingPanel
    northboundShuntingPanel
    length
    interlockingTrackCircuit = null
    northboundPlatform = null
    southboundPlatform = null

    constructor(name, length) {
        this.name = name
        this.length = length
    }

    getNorthbound(pointPosition) {
        if (this.northbound == "dependsOnPoint") {
            if (pointPosition == undefined) {
                throw `Point position for track circuit ${this.name} in northbound direction is not specified`
            }
            switch (pointPosition) {
                case "normal": 
                    return this.normal
                case "reverse":
                    return this.reverse
                default:
                    throw `Point position for track circuit ${this.name} in northbound direction is invalid. Given position: ${pointPosition}`
            }
        }
        return this.northbound
    }

    getSouthbound(pointPosition) {
        if (this.southbound == "dependsOnPoint") {
            if (pointPosition == undefined) {
                throw `Point position for track circuit ${this.name} in southbound direction is not specified`
            }
            switch (pointPosition) {
                case "normal": 
                    return this.normal
                case "reverse":
                    return this.reverse
                default:
                    throw `Point position for track circuit ${this.name} in southbound direction is invalid. Given position: ${pointPosition}`
            }
        }
        return this.southbound
    }
}