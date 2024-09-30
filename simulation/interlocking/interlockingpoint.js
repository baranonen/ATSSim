"use strict"

class InterlockingPoint {
    name
    desiredPosition
    currentPosition
    connectedTrackCircuit
    locked

    constructor(name, connectedTrackCircuit) {
        this.name = name
        this.connectedTrackCircuit = connectedTrackCircuit
        this.desiredPosition = "normal"
        this.currentPosition = null
        this.locked = false
    }

    positionIsPossible(position) {
        if (position != this.desiredPosition) {
            if (this.locked) {
                return new InterlockingAnswer(false, "pointLocked")
            } else if (this.connectedTrackCircuit.reservedForRoute || this.connectedTrackCircuit.reservedForShuntingRoute || this.connectedTrackCircuit.occupied || this.connectedTrackCircuit.approachLocked) {
                return new InterlockingAnswer(false, "subrouteNotFree")
            } else if (this.connectedTrackCircuit.deactivated) {
                return new InterlockingAnswer(false, "trackCircuitDeactivated")
            } else {
                return new InterlockingAnswer(true)
            }
        } else {
            return new InterlockingAnswer(false, "pointAlreadyInRequestedPosition")
        }
    }

    requestPosition(position) {
        let possibility = this.positionIsPossible(position)
        if (possibility.status == true) {
            this.desiredPosition = position
            if (position == "normal") {
                AlarmHandler.addEvent(this.name, "MAKAS KONTROLÜ NORMAL OK", "POINT CONTROL NORMAL OK")
            } else {
                AlarmHandler.addEvent(this.name, "MAKAS KONTROLÜ TERS OK", "POINT CONTROL REVERSE OK")
            }
            return new InterlockingAnswer(true)
        } else {
            return possibility
        }
    }

    lockPoint() {
        if (this.locked) {
            return new InterlockingAnswer(false, "pointAlreadyLocked")
        } else if (this.currentPosition != null) {
            this.locked = true
            AlarmHandler.addEvent(this.name, "MAKASIN KİLİTLİ KONUMA GETİRİLMESİ OK", "POINT LOCKING OK")
            return new InterlockingAnswer(true)
        } else {
            return new InterlockingAnswer(false, "pointOutOfControl")
        }
    }

    unlockPoint() {
        if (!this.locked) {
            return new InterlockingAnswer(false, "pointAlreadyUnlocked")
        } else {
            this.locked = false
            AlarmHandler.addEvent(this.name, "MAKASIN SERBEST KONUMA GETİRİLMESİ OK", "POINT UNLOCKING OK")
            return new InterlockingAnswer(true)
        }
    }
}