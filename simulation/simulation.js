"use strict"

var map = new Map(mapData)
var interlocking = new Interlocking(map)
var track = new Track(interlocking)
var windowManager = new UIWindowManager(document.body, window)
var ats = new ATS(map, interlocking, windowManager)

interlocking.getSignalFromName("TAK01").requestFleeting()
interlocking.getSignalFromName("TAK02").requestFleeting()
interlocking.getSignalFromName("TAK06").requestFleeting()
interlocking.getSignalFromName("SIS01").requestFleeting()
interlocking.getSignalFromName("SIS05").requestFleeting()
interlocking.getSignalFromName("SIS06").requestFleeting()
interlocking.getSignalFromName("SIS02").requestFleeting()
var remainingRouteTrain2 = interlocking.findRouteBetweenTrackCircuits(interlocking.getTrackCircuitFromName("GAY_10T"), interlocking.getTrackCircuitFromName("SIS_14T"), "southbound")
interlocking.activateRoute(remainingRouteTrain2)
var remainingRouteTrain5 = interlocking.findRouteBetweenTrackCircuits(interlocking.getTrackCircuitFromName("4LV_03T"), interlocking.getTrackCircuitFromName("4LV_09T"), "northbound")
interlocking.activateRoute(remainingRouteTrain5)

interlocking.getCycleFromName("TAK_1").enable()
interlocking.getCycleFromName("4LV_22").enable()
interlocking.getCycleFromName("4LV_22").currentPhase = "exit"

console.log("a")
var trains = []
trains.push(new Train("01", 4, map, track, map.getTrackCircuitFromName("OSM_01T"), "northbound", interlocking, ats))
trains.push(new Train("02", 4, map, track, map.getTrackCircuitFromName("GAY_10T"), "southbound", interlocking, ats))
trains.push(new Train("03", 4, map, track, map.getTrackCircuitFromName("OSM_12T"), "southbound", interlocking, ats))
trains.push(new Train("05", 4, map, track, map.getTrackCircuitFromName("4LV_03T"), "northbound", interlocking, ats))
trains.push(new Train("06", 4, map, track, map.getTrackCircuitFromName("SIS_13T"), "northbound", interlocking, ats))
trains.push(new Train("07", 4, map, track, map.getTrackCircuitFromName("TAK_08T"), "southbound", interlocking, ats))
trains.push(new Train("08", 4, map, track, map.getTrackCircuitFromName("TAK_25T"), "northbound", interlocking, ats))