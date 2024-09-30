"use strict"

class ATSTrainDescriber {
    trainManager
    name
    HTMLElement
    constructor(trainManager, name, HTMLElement) {
        this.trainManager = trainManager
        this.name = name
        this.HTMLElement = HTMLElement
        this.trainManager.trainDescribers.push(this)
    }

    update() {
        if (this.trainManager.trainNumberMap[this.name] == null || this.trainManager.trainNumberMap[this.name] == undefined) {
            this.HTMLElement.setAttribute("opacity", "0")
        } else {
            this.HTMLElement.getElementsByTagName("tspan")[0].innerHTML = this.trainManager.trainNumberMap[this.name].trainIndex
            this.HTMLElement.setAttribute("opacity", "1")
        }
    }
}