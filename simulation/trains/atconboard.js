"use strict"

class ATCOnboard {
    train
    map
    interlocking
    ats
    atsTrain
    stoppedAtStation
    stopAtStationTimestamp
    departing
    currentlyStoppedPlatform
    alreadyChangedEnds

    constructor(train, map, interlocking, ats) {
        this.train = train
        this.map = map
        this.interlocking = interlocking
        this.ats = ats
        this.atsTrain = null
        this.stoppedAtStation = false
        this.stopAtStationTimestamp = null
        this.departing = false
        this.currentlyStoppedPlatform = null
        this.alreadyChangedEnds = false
        setInterval(() => { this.sendPositionReport() }, 500)
    }

    sendPositionReport() {
        if (this.train.carPositions != []) {
            if (this.atsTrain == null) {
                this.atsTrain = this.ats.addTrain(this.train)
            }
            if (this.train.direction == "northbound") {
                this.atsTrain.updatePosition(this.train.carPositions[0].mapTrackCircuit.interlockingTrackCircuit)
            } else {
                this.atsTrain.updatePosition(this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.interlockingTrackCircuit)
            }
        }
    }

    isMALongEnoughToDepart() {
        if (this.train.direction == "northbound") {
            if (this.train.carPositions[0].mapTrackCircuit.northboundSignal != null) {
                if (interlocking.getSignalFromName(this.train.carPositions[0].mapTrackCircuit.northboundSignal.name).aspect != "green" && interlocking.getSignalFromName(this.train.carPositions[0].mapTrackCircuit.northboundSignal.name).aspect != "flashingGreen") {
                    return false
                }
            }
            var nextTrackCircuit = this.train.carPositions[0].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("northbound").interlockingTrackCircuit
            if (nextTrackCircuit == "endOfTrack" || nextTrackCircuit.occupied || (!nextTrackCircuit.reservedForRoute && !nextTrackCircuit.reservedForShuntingRoute) || (nextTrackCircuit.direction != "northbound" && nextTrackCircuit.direction != "northboundLineNorthboundDirection" && nextTrackCircuit.direction != "southboundLineNorthboundDirection")) {
                return false
            }
            if (this.train.carPositions[0].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("northbound").dependsOnPoint != null) {
                var point = this.interlocking.getPointFromName(this.train.carPositions[0].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("northbound").dependsOnPoint.name)
                if (point.desiredPosition != point.currentPosition) {
                    return false
                }
            }
            return true
        } else if (this.train.direction == "southbound") {
            if (this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundSignal != null) {
                if (interlocking.getSignalFromName(this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundSignal.name).aspect != "green" && interlocking.getSignalFromName(this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundSignal.name).aspect != "flashingGreen") {
                    return false
                }
            }
            var nextTrackCircuit = this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("southbound").interlockingTrackCircuit
            if (nextTrackCircuit == "endOfTrack" || nextTrackCircuit.occupied || (!nextTrackCircuit.reservedForRoute && !nextTrackCircuit.reservedForShuntingRoute) || (nextTrackCircuit.direction != "southbound" && nextTrackCircuit.direction != "northboundLineSouthboundDirection" && nextTrackCircuit.direction != "southboundLineSouthboundDirection")) {
                return false
            }
            if (this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("southbound").dependsOnPoint != null) {
                var point = this.interlocking.getPointFromName(this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("southbound").dependsOnPoint.name)
                if (point.desiredPosition != point.currentPosition) {
                    return false
                }
            }
            return true
        }
        return false
    }

    checkDwellTime() {
        if (this.train.direction == "northbound") {
            if (!this.stoppedAtStation) {
                if (this.train.name == "01") {
                    console.log("current not stopped")
                }
                if (this.train.carPositions[0].mapTrackCircuit.northboundPlatform != null) {
                    if (this.train.name == "01") {
                        console.log("in platform area")
                    }
                    if (this.train.carPositions[0].position == this.train.carPositions[0].mapTrackCircuit.northboundPlatform.northboundPosition && !this.departing) {
                        if (this.train.name == "01") {
                            console.log("start stopping at station")
                        }
                        this.stoppedAtStation = true
                        this.currentlyStoppedPlatform = this.train.carPositions[0].mapTrackCircuit.northboundPlatform
                        this.stopAtStationTimestamp = Date.now()
                        return false
                    }
                }
            } else {
                if (this.train.name == "01") {
                    console.log("current stopped")
                }
                if (this.currentlyStoppedPlatform.terminus && !this.alreadyChangedEnds) {
                    this.alreadyChangedEnds = true
                    this.train.driver.changeEnds()
                }
                if (Date.now() - this.stopAtStationTimestamp >= 30000 && !this.currentlyStoppedPlatform.atsPlatform.hold
                && (
                    this.currentlyStoppedPlatform.direction == "northbound" && !this.ats.regulation.globalNorthboundHold
                    || this.currentlyStoppedPlatform.direction == "southbound" && !this.ats.regulation.globalSouthboundHold
                ) && this.isMALongEnoughToDepart()) {
                    if (this.train.name == "01") {
                        console.log("can depart")
                    }
                    this.departing = true
                    this.stoppedAtStation = false
                    this.alreadyChangedEnds = false
                } else {
                    if (this.train.name == "01") {
                        console.log("can not depart")
                        console.log("current waited time " + (Date.now() - this.stopAtStationTimestamp) / 1000)
                    }
                    return false
                }
            }
        } else if (this.train.direction == "southbound") {
            if (!this.stoppedAtStation) {
                if (this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundPlatform != null) {
                    if (this.train.carPositions[this.train.carPositions.length - 1].position == this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundPlatform.southboundPosition && !this.departing) {
                        this.stoppedAtStation = true
                        this.currentlyStoppedPlatform = this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundPlatform
                        this.stopAtStationTimestamp = Date.now()
                        return false
                    }
                }
            } else {
                if (this.currentlyStoppedPlatform.terminus && !this.alreadyChangedEnds) {
                    this.alreadyChangedEnds = true
                    this.train.driver.changeEnds()
                }
                if (Date.now() - this.stopAtStationTimestamp >= 30000 && !this.currentlyStoppedPlatform.atsPlatform.hold
                && (
                    this.currentlyStoppedPlatform.direction == "northbound" && !this.ats.regulation.globalNorthboundHold
                    || this.currentlyStoppedPlatform.direction == "southbound" && !this.ats.regulation.globalSouthboundHold
                ) && this.isMALongEnoughToDepart()) {
                    this.departing = true
                    this.stoppedAtStation = false
                    this.alreadyChangedEnds = false
                } else {
                    return false
                }
            }
        }
        return true
    }

    canMove() {
        if (this.train.direction == "northbound") {
            if (!this.checkDwellTime()) {
                return false
            }
            if (this.train.carPositions[0].mapTrackCircuit.length == this.train.carPositions[0].position) {
                if (this.train.carPositions[0].mapTrackCircuit.northboundSignal != null) {
                    if (interlocking.getSignalFromName(this.train.carPositions[0].mapTrackCircuit.northboundSignal.name).aspect != "green" && interlocking.getSignalFromName(this.train.carPositions[0].mapTrackCircuit.northboundSignal.name).aspect != "flashingGreen") {
                        return false
                    }
                }
                var nextTrackCircuit = this.train.carPositions[0].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("northbound").interlockingTrackCircuit
                if (nextTrackCircuit == "endOfTrack" || nextTrackCircuit.occupied || (!nextTrackCircuit.reservedForRoute && !nextTrackCircuit.reservedForShuntingRoute) || (nextTrackCircuit.direction != "northbound" && nextTrackCircuit.direction != "northboundLineNorthboundDirection" && nextTrackCircuit.direction != "southboundLineNorthboundDirection")) {
                    return false
                }
                if (this.train.carPositions[0].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("northbound").dependsOnPoint != null) {
                    var point = this.interlocking.getPointFromName(this.train.carPositions[0].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("northbound").dependsOnPoint.name)
                    if (point.desiredPosition != point.currentPosition) {
                        return false
                    }
                }
            }
        } else if (this.train.direction == "southbound") {
            if (!this.checkDwellTime()) {
                return false
            }
            if (this.train.carPositions[this.train.carPositions.length - 1].position == 1) {
                if (this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundSignal != null) {
                    if (interlocking.getSignalFromName(this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundSignal.name).aspect != "green" && interlocking.getSignalFromName(this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.southboundSignal.name).aspect != "flashingGreen") {
                        return false
                    }
                }
                var nextTrackCircuit = this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("southbound").interlockingTrackCircuit
                if (nextTrackCircuit == "endOfTrack" || nextTrackCircuit.occupied || (!nextTrackCircuit.reservedForRoute && !nextTrackCircuit.reservedForShuntingRoute) || (nextTrackCircuit.direction != "southbound" && nextTrackCircuit.direction != "northboundLineSouthboundDirection" && nextTrackCircuit.direction != "southboundLineSouthboundDirection")) {
                    return false
                }
                if (this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("southbound").dependsOnPoint != null) {
                    var point = this.interlocking.getPointFromName(this.train.carPositions[this.train.carPositions.length - 1].mapTrackCircuit.interlockingTrackCircuit.getCurrentNext("southbound").dependsOnPoint.name)
                    if (point.desiredPosition != point.currentPosition) {
                        return false
                    }
                }
            }
        }
        return true
    }
}