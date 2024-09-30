"use strict"

class ATSRegulation {
    globalNorthboundHold
    globalSouthboundHold
    platforms = []

    constructor() {
        this.globalNorthboundHold = false
        this.globalSouthboundHold = false
    }
}