"use strict"

class InterlockingTrackCircuit {
    name
    occupied
    reservedForRoute
    reservedForShuntingRoute
    approachLocked
    TSREnabled
    direction
    deactivated
    mapTrackCircuit
    fleeting

    constructor(name, mapTrackCircuit) {
        this.name = name
        this.reservedForRoute = false
        this.reservedForShuntingRoute = false
        this.approachLocked = false
        this.TSREnabled = false
        this.direction = null
        this.deactivated = false
        this.occupied = false
        this.mapTrackCircuit = mapTrackCircuit
        this.fleeting = false
        this.approachLockingTimeout = null
    }

    releaseRouteInstantly() {
        this.fleeting = false
        this.approachLocked = false
        this.reservedForRoute = false
        this.reservedForShuntingRoute = false
    }

    releaseRouteWithApproachLocking() {
        this.fleeting = false
        this.approachLocked = true
        this.reservedForRoute = false
        this.reservedForShuntingRoute = false
        setTimeout(() => { this.approachLocked = false }, 60000)
    }

    getCurrentNext(direction) {
        if (direction == "northbound") {
            if (this.mapTrackCircuit.dependsOnPoint != null) {
                var pointPosition = this.mapTrackCircuit.dependsOnPoint.interlockingPoint.desiredPosition
                return this.mapTrackCircuit.getNorthbound(pointPosition)
            } else if (this.mapTrackCircuit instanceof CrossTrackCircuit) {
                if (this.direction == "northboundLineNorthboundDirection") {
                    return this.mapTrackCircuit.getNorthboundLineNorthboundDirection()
                } else {
                    return this.mapTrackCircuit.getSouthboundLineNorthboundDirection()
                }
            } else {
                return this.mapTrackCircuit.getNorthbound()
            }
        } else {
            if (this.mapTrackCircuit.dependsOnPoint != null) {
                var pointPosition = this.mapTrackCircuit.dependsOnPoint.interlockingPoint.desiredPosition
                return this.mapTrackCircuit.getSouthbound(pointPosition)
            } else if (this.mapTrackCircuit instanceof CrossTrackCircuit) {
                if (this.direction == "southboundLineSouthboundDirection") {
                    return this.mapTrackCircuit.getSouthboundLineSouthboundDirection()
                } else {
                    return this.mapTrackCircuit.getNorthboundLineSouthboundDirection()
                }
            } else {
                return this.mapTrackCircuit.getSouthbound()
            }
        }
    }

    setOccupation(occupation) {
        if (this.occupied != occupation) {
            if (occupation) {
                if (this.reservedForRoute || this.reservedForShuntingRoute || this.approachLocked) {
                    AlarmHandler.addEvent(this.name, "RAY DEVRESİ MEŞGUL", "TRACK CIRCUIT OCCUPIED")
                } else {
                    AlarmHandler.addAlarm(this.name, "YERSİZ RAY DEVRESİ MEŞGULİYETİ", "UNEXPECTED TRACK CIRCUIT OCCUPANCY", 1)
                }
            } else {
                if (!this.fleeting && this.occupied && (this.reservedForRoute || this.reservedForShuntingRoute)) {
                    this.reservedForRoute = false
                    this.reservedForShuntingRoute = false
                    AlarmHandler.addEvent(this.name, "ALT ROTA SERBEST", "SUBROUTE FREE")
                }
            }
        }
        this.occupied = occupation
    }
}