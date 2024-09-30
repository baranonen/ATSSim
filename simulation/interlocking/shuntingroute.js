"use strict"

class ShuntingRoute {
    entryRouteStartSignal
    entryRouteEndShuntingPanel
    exitRouteStartSignal
    exitRouteEndSignal
    interlocking
    currentPhase

    constructor(interlocking, entryRouteStartSignal, entryRouteEndShuntingPanel, exitRouteStartSignal, exitRouteEndSignal) {
        this.name = null
        this.interlocking = interlocking
        this.entryRouteStartSignal = entryRouteStartSignal
        this.entryRouteEndShuntingPanel = entryRouteEndShuntingPanel
        this.exitRouteStartSignal = exitRouteStartSignal
        this.exitRouteEndSignal = exitRouteEndSignal
        this.currentPhase = "entry"
    }

    request() {
        if (this.currentPhase == "entry") {
            var request = this.interlocking.requestRouteToShuntingPanelInternal(this.entryRouteStartSignal, this.entryRouteEndShuntingPanel)
            if (request.status) {
                this.currentPhase = "exit"
                this.update()
            }
        }
    }

    update() {
        var request = this.interlocking.requestRouteBetweenSignals(this.exitRouteStartSignal, this.exitRouteEndSignal)
        if (request.status) {
            this.currentPhase = "entry"
        } else {
            setTimeout(this.update.bind(this), 1000)
        }
    }
}