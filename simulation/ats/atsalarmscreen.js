"use strict"

class ATSAlarmScreen {
    HTMLElement
    title
    alarmList

    constructor() {
        this.title = "Alarm Display"
        this.HTMLElement = document.createElement("svg")
        this.HTMLElement.classList = "accessscreen"
        var svg = new DOMParser().parseFromString(atsuielements["alarmscreen"], "text/html").body.firstChild
        this.HTMLElement.append(svg)
        this.alarmList = document.createElement("div")
        this.alarmList.classList = "alarmlist"
        this.HTMLElement.append(this.alarmList)
        this.HTMLElement.classList = "alarmscreen"
        this.updateAlarms()
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
      
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const year = date.getFullYear().toString().slice(-2);
      
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
      
        const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
        
        return formattedDate;
    }

    updateAlarms() {
        var list = document.createElement("span")
        AlarmHandler.alarms.forEach(alarm => {
            var eventRow = document.createElement("button")
            eventRow.classList = "event"
            var firstColumn = document.createElement("span")
            firstColumn.classList.add("eventfirstcolumn")
            firstColumn.innerText = `${this.formatTimestamp(alarm.timestamp)} ${alarm.name}`
            var turkishLabel = document.createElement("span")
            turkishLabel.classList = "turkish"
            turkishLabel.innerText = alarm.turkishLabel
            var englishLabel = document.createElement("span")
            englishLabel.classList = "english"
            englishLabel.innerText = alarm.englishLabel
            eventRow.appendChild(firstColumn)
            eventRow.appendChild(turkishLabel)
            eventRow.appendChild(englishLabel)
            list.appendChild(eventRow)
        });
        this.alarmList.innerHTML = ""
        this.alarmList.appendChild(list)
        setTimeout(this.updateAlarms.bind(this), 1000)
    }
}