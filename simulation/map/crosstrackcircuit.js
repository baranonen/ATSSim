"use strict"

class CrossTrackCircuit extends TrackCircuit {
    southboundLineSouthboundDirection
    southboundLineNorthboundDirection
    northboundLineSouthboundDirection
    northboundLineNorthboundDirection

    getNorthbound() {
        throw `Northbound of track circuit ${this.name} cannot exist. This is a cross track circuit`
    }

    getSouthbound() {
        throw `Southbound of track circuit ${this.name} cannot exist. This is a cross track circuit`
    }

    getSouthboundLineSouthboundDirection() {
        return this.southboundLineSouthboundDirection
    }

    getSouthboundLineNorthboundDirection() {
        return this.southboundLineNorthboundDirection
    }

    getNorthboundLineSouthboundDirection() {
        return this.northboundLineSouthboundDirection
    }

    getNorthboundLineNorthboundDirection() {
        return this.northboundLineNorthboundDirection
    }
}