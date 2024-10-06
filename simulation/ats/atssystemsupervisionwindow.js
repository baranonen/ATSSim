"use strict"

class ATSSystemSupervisionWindow {
    HTMLElement
    timeText
    dateText
    constructor() {
        this.HTMLElement = document.createElement("div")
        this.content = document.createElement("img")
        this.content.src = "./ats/resources/systemsupervisionactivity.svg"
        this.HTMLElement.appendChild(this.content)
        this.dateText = document.createElement("p")
        this.dateText.style.position = "absolute"
        this.dateText.style.top = "117px"
        this.dateText.style.left = "652px"
        this.dateText.style.width = "65px"
        this.dateText.style.height = "23px"
        this.dateText.style.textAlign = "center"
        this.dateText.style.fontSize = "12px"
        this.timeText = document.createElement("p")
        this.timeText.style.position = "absolute"
        this.timeText.style.top = "170px"
        this.timeText.style.left = "652px"
        this.timeText.style.width = "65px"
        this.timeText.style.height = "23px"
        this.timeText.style.textAlign = "center"
        this.timeText.style.fontSize = "12px"
        this.HTMLElement.appendChild(this.dateText)
        this.HTMLElement.appendChild(this.timeText)
        this.startTime()
    }

    startTime() {
        var today = new Date()
        var h = today.getHours()
        var m = today.getMinutes()
        var s = today.getSeconds()
        var y = today.getFullYear()
        var d = today.getDate()
        var mo = today.getMonth() + 1
        h = this.checkTime(h)
        m = this.checkTime(m)
        s = this.checkTime(s)
        y = y.toString().slice(-2)
        d = this.checkTime(d)
        mo = this.checkTime(mo)
        var dateText = d + "/" + mo + "/" + y
        var timeText = h + ":" + m + ":" + s
        this.dateText.innerText = dateText
        this.timeText.innerText = timeText
        var t = setTimeout(this.startTime.bind(this), 1000)
    }
    
    checkTime(i) {
        if (i < 10) { i = "0" + i }
        return i
    }
}