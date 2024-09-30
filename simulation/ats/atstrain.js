"use strict"

class ATSTrain {
    rollingStockNumber
    trainIndex
    position
    train

    constructor(rollingStockNumber, trainIndex, train, trainManager) {
        this.rollingStockNumber = rollingStockNumber
        this.trainIndex = trainIndex
        this.train = train
        this.trainManager = trainManager
    }

    updatePosition(trackCircuit) {
        this.trainManager.trainNumberMap[this.position] = null
        this.position = trackCircuit.name
        this.trainManager.trainNumberMap[this.position] = this
    }
}