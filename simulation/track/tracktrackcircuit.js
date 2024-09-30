"use strict"

class TrackTrackCircuit {
    name
    connectedInterlockingTrackCircuit
    occupied

    constructor(connectedInterlockingTrackCircuit) {
        this.name = connectedInterlockingTrackCircuit.name
        this.connectedInterlockingTrackCircuit = connectedInterlockingTrackCircuit
        this.occupied = false
    }
}