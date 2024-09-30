"use strict"

class Cycle {
    name
    entryRouteStartSignal
    entryRouteEndSignal
    exitRouteStartSignal
    exitRouteEndSignal
    interlocking
    enabled
    currentPhase
    constructor(name, interlocking, entryRouteStartSignal, entryRouteEndSignal, exitRouteStartSignal, exitRouteEndSignal) {
        this.name = name
        this.interlocking = interlocking
        this.entryRouteStartSignal = entryRouteStartSignal
        this.entryRouteEndSignal = entryRouteEndSignal
        this.exitRouteStartSignal = exitRouteStartSignal
        this.exitRouteEndSignal = exitRouteEndSignal
        this.enabled = false
        this.currentPhase = "entry"
        this.update()
    }

    update() {
        if (this.enabled) {
            if (this.currentPhase == "entry") {
                if (this.entryRouteEndSignal instanceof InterlockingShuntingPanel) {
                    var request = interlocking.requestRouteToShuntingPanelInternal(this.entryRouteStartSignal, this.entryRouteEndSignal)
                } else {
                    var request = this.interlocking.requestRouteBetweenSignals(this.entryRouteStartSignal, this.entryRouteEndSignal)
                }
                if (request.status) {
                    this.currentPhase = "exit"
                }
            }
            if (this.currentPhase == "exit") {
                var request = this.interlocking.requestRouteBetweenSignals(this.exitRouteStartSignal, this.exitRouteEndSignal)
                if (request.status) {
                    this.currentPhase = "entry"
                }
            }
        }
        setTimeout(this.update.bind(this), 1000)
    }

    enable() {
        if (!this.enabled) {
            this.currentPhase = "entry"
            this.enabled = true
            AlarmHandler.addEvent(this.name, "SAYKIL AYARLI", "CYCLE SET")
        }
    }

    disable() {
        if (this.enabled) {
            this.enabled = false
            AlarmHandler.addEvent(this.name, "SAYKIL İPTAL EDİLDİ", "CYCLE CANCELLED")
        }
    }
}