"use strict"

class ATSTrainManager {
    trainNumberMap = {}
    trains
    trainDescribers = []

    constructor(trackCircuits) {
        trackCircuits.forEach(trackCircuit => {
            this.trainNumberMap[trackCircuit.name] = null
        })
        this.trains = []
        this.ats = ats
        setInterval(this.updateTrainDescribers.bind(this), 500)
    }

    updateTrainDescribers() {
        this.trainDescribers.forEach(describer => {
            describer.update()
        })
    }

    addTrain(train) {
        var atsTrain = new ATSTrain(train.name, `${parseInt(train.name)}${parseInt(train.name)}${parseInt(train.name)}${parseInt(train.name)}`, train, this)
        this.trains.push(atsTrain)
        AlarmHandler.addEvent(train.carPositions[0].mapTrackCircuit.name, "TREN BELİRDİ", "TRAIN APPEARED")
        return atsTrain
    }
}