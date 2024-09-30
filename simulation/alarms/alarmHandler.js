"use strict"

class AlarmHandler {
    static alarms = []

    static addAlarm(name, turkishLabel, englishLabel, severity) {
        this.alarms.splice(0, 0, new Alarm(name, turkishLabel, englishLabel, severity))
    }

    static addEvent(name, turkishLabel, englishLabel) {
        this.alarms.splice(0, 0, new Alarm(name, turkishLabel, englishLabel, 2))
    }
}