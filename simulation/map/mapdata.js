"use strict"

var mapData = {
    trackCircuits: [
        {
            name: "TAK_02T",
            southbound: "dependsOnPoint",
            northbound: "TAK_04T",
            dependsOnPoint: {
                point: "TAK_M3",
                normal: "endOfTrack",
                reverse: "TAK_15T"
            },
            length: 1
        },
        {
            name: "TAK_04T",
            southbound: "TAK_02T",
            northbound: "TAK_06T",
            length: 4,
            signals: {
                southbound: "TAK08"
            }
        },
        {
            name: "TAK_06T",
            southbound: "TAK_04T",
            northbound: "TAK_08T",
            length: 4,
            signals: {
                northbound: "TAK03"
            }
        },
        {
            name: "TAK_08T",
            southbound: "TAK_06T",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "TAK_M8",
                normal: "TAK_10T",
                reverse: "TAK_17T"
            },
            length: 1,
        },
        {
            name: "TAK_10T",
            southbound: "TAK_08T",
            northbound: "TAK_12T",
            length: 16,
        },
        {
            name: "TAK_12T",
            southbound: "dependsOnPoint",
            northbound: "TAK_14T",
            dependsOnPoint: {
                point: "TAK_M9",
                normal: "TAK_10T",
                reverse: "TAK_27T"
            },
            length: 1
        },
        {
            name: "TAK_14T",
            southbound: "TAK_12T",
            northbound: "OSM_02T",
            length: 10,
            signals: {
                southbound: "TAK06"
            },
            shuntingPanels: {
                northbound: "SP2"
            }
        },
        {
            name: "OSM_02T",
            southbound: "TAK_14T",
            northbound: "OSM_04T",
            length: 10,
            signals: {
                northbound: "TAK05"
            }
        },
        {
            name: "OSM_04T",
            southbound: "OSM_02T",
            northbound: "OSM_06T",
            length: 17
        },
        {
            name: "OSM_06T",
            southbound: "OSM_04T",
            northbound: "OSM_08T",
            length: 4,
            signals: {
                southbound: "TAK02"
            }
        },
        {
            name: "OSM_08T",
            southbound: "OSM_06T",
            northbound: "OSM_10T",
            length: 4
        },
        {
            name: "OSM_10T",
            southbound: "OSM_08T",
            northbound: "OSM_12T",
            length: 17
        },
        {
            name: "OSM_12T",
            southbound: "OSM_10T",
            northbound: "SIS_02T",
            length: 17
        },
        {
            name: "SIS_02T",
            southbound: "OSM_12T",
            northbound: "SIS_04T",
            length: 17,
            signals: {
                northbound: "SIS03"
            },
            shuntingPanels: {
                southbound: "SP4"
            }
        },
        {
            name: "SIS_04T",
            southbound: "SIS_02T",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "SIS_M12",
                normal: "SIS_06T",
                reverse: "SIS_17T"
            },
            length: 1
        },
        {
            name: "SIS_06T",
            southbound: "SIS_04T",
            northbound: "SIS_08T",
            length: 1
        },
        {
            name: "SIS_08T",
            southbound: "dependsOnPoint",
            northbound: "SIS_10T",
            dependsOnPoint: {
                point: "SIS_M13",
                normal: "SIS_06T",
                reverse: "SIS_17T"
            },
            length: 1
        },
        {
            name: "SIS_10T",
            southbound: "SIS_08T",
            northbound: "SIS_12T",
            length: 8,
            signals: {
                southbound: "SIS06",
                northbound: "SIS07"
            },
            shuntingPanels: {
                northbound: "SP6"
            }
        },
        {
            name: "SIS_12T",
            southbound: "SIS_10T",
            northbound: "SIS_14T",
            length: 18
        },
        {
            name: "SIS_14T",
            southbound: "SIS_12T",
            northbound: "GAY_02T",
            length: 18,
            signals: {
                southbound: "SIS02"
            }
        },
        {
            name: "GAY_02T",
            southbound: "SIS_14T",
            northbound: "GAY_04T",
            length: 18
        },
        {
            name: "GAY_04T",
            southbound: "GAY_02T",
            northbound: "GAY_06T",
            length: 18
        },
        {
            name: "GAY_06T",
            southbound: "GAY_04T",
            northbound: "GAY_08T",
            length: 4
        },
        {
            name: "GAY_08T",
            southbound: "GAY_06T",
            northbound: "GAY_10T",
            length: 4
        },
        {
            name: "GAY_10T",
            southbound: "GAY_08T",
            northbound: "LEV_02T",
            length: 15
        },
        {
            name: "LEV_02T",
            southbound: "GAY_10T",
            northbound: "LEV_04T",
            length: 16
        },
        {
            name: "LEV_04T",
            southbound: "LEV_02T",
            northbound: "LEV_06T",
            length: 15
        },
        {
            name: "LEV_06T",
            southbound: "LEV_04T",
            northbound: "LEV_08T",
            length: 3
        },
        {
            name: "LEV_08T",
            southbound: "LEV_06T",
            northbound: "LEV_10T",
            length: 2
        },
        {
            name: "LEV_10T",
            southbound: "LEV_08T",
            northbound: "LEV_12T",
            length: 3,
            shuntingPanels: {
                southbound: "SP8"
            }
        },
        {
            name: "LEV_12T",
            southbound: "LEV_10T",
            northbound: "LEV_14T",
            length: 8,
            signals: {
                northbound: "LEV03"
            }
        },
        {
            name: "LEV_14T",
            southbound: "LEV_12T",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "LEV_M16",
                normal: "4LV_02T",
                reverse: "LEV_07T"
            },
            length: 1
        },
        {
            name: "4LV_02T",
            southbound: "LEV_14T",
            northbound: "4LV_04T",
            length: 8,
            signals: {
                southbound: "LEV02"
            }
        },
        {
            name: "4LV_04T",
            southbound: "4LV_02T",
            northbound: "4LV_06T",
            length: 16
        },
        {
            name: "4LV_06T",
            southbound: "4LV_04T",
            northbound: "4LV_08T",
            length: 16,
            signals: {
                southbound: "4LV06"
            }
        },
        {
            name: "4LV_08T",
            southbound: "4LV_06T",
            northbound: "4LV_10T",
            length: 8,
            signals: {
                northbound: "4LV03"
            }
        },
        {
            name: "4LV_10T",
            southbound: "4LV_08T",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "4LV_M21",
                normal: "4LV_12T",
                reverse: "4LV_15T"
            },
            length: 2
        },
        {
            name: "4LV_12T",
            southbound: "dependsOnPoint",
            northbound: "4LV_14T",
            dependsOnPoint: {
                point: "4LV_M22",
                normal: "4LV_10T",
                reverse: "4LV_15T"
            },
            length: 1
        },
        {
            name: "4LV_14T",
            southbound: "4LV_12T",
            northbound: "endOfTrack",
            length: 8,
            signals: {
                southbound: "4LV02",
                northbound: "B52"
            }
        },
        {
            name: "4LV_15T",
            crossTrackCircuit: true,
            southboundLineSouthboundDirection: "4LV_10T",
            southboundLineNorthboundDirection: "4LV_12T",
            northboundLineSouthboundDirection: "4LV_13T",
            northboundLineNorthboundDirection: "4LV_17T",
            length: 1
        },
        {
            name: "TAK_29T",
            southbound: "endOfTrack",
            northbound: "TAK_15T",
            length: 8,
            signals: {
                southbound: "B30",
                northbound: "TAK07"
            }
        },
        {
            name: "TAK_15T",
            southbound: "TAK_29T",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "TAK_M1",
                normal: "TAK_02T",
                reverse: "TAK_01T"
            },
            length: 1
        },
        {
            name: "TAK_17T",
            southbound: "dependsOnPoint",
            northbound: "TAK_19T",
            dependsOnPoint: {
                point: "TAK_M5",
                normal: "TAK_08T",
                reverse: "TAK_05T"
            },
            length: 1
        },
        {
            name: "TAK_19T",
            southbound: "TAK_17T",
            northbound: "TAK_21T",
            length: 4,
            signals: {
                southbound: "TAK12"
            }
        },
        {
            name: "TAK_21T",
            southbound: "TAK_19T",
            northbound: "TAK_23T",
            length: 4
        },
        {
            name: "TAK_23T",
            southbound: "TAK_21T",
            northbound: "TAK_25T",
            length: 4
        },
        {
            name: "TAK_25T",
            southbound: "TAK_23T",
            northbound: "TAK_27T",
            length: 4,
            signals: {
                northbound: "TAK09"
            }
        },
        {
            name: "TAK_27T",
            southbound: "TAK_25T",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "TAK_M6",
                normal: "TAK_12T",
                reverse: "TAK_11T"
            },
            length: 1
        },
        {
            name: "SIS_17T",
            crossTrackCircuit: true,
            southboundLineSouthboundDirection: "SIS_04T",
            southboundLineNorthboundDirection: "SIS_08T",
            northboundLineSouthboundDirection: "SIS_03T",
            northboundLineNorthboundDirection: "SIS_07T",
            length: 2
        },
        {
            name: "TAK_01T",
            southbound: "dependsOnPoint",
            northbound: "TAK_03T",
            dependsOnPoint: {
                point: "TAK_M2",
                normal: "endOfTrack",
                reverse: "TAK_15T"
            },
            length: 1
        },
        {
            name: "TAK_03T",
            southbound: "TAK_01T",
            northbound: "TAK_05T",
            length: 8,
            signals: {
                southbound: "TAK10",
                northbound: "TAK01"
            }
        },
        {
            name: "TAK_05T",
            southbound: "TAK_03T",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "TAK_M4",
                normal: "TAK_07T",
                reverse: "TAK_17T"
            },
            length: 1
        },
        {
            name: "TAK_07T",
            southbound: "TAK_05T",
            northbound: "TAK_09T",
            length: 4
        },
        {
            name: "TAK_09T",
            southbound: "TAK_07T",
            northbound: "TAK_11T",
            length: 12
        },
        {
            name: "TAK_11T",
            southbound: "dependsOnPoint",
            northbound: "TAK_13T",
            dependsOnPoint: {
                point: "TAK_M7",
                normal: "TAK_09T",
                reverse: "TAK_27T"
            },
            length: 1
        },
        {
            name: "TAK_13T",
            southbound: "TAK_11T",
            northbound: "OSM_01T",
            length: 10,
            signals: {
                southbound: "TAK04"
            },
            shuntingPanels: {
                northbound: "SP1"
            }
        },
        {
            name: "OSM_01T",
            southbound: "TAK_13T",
            northbound: "OSM_03T",
            length: 27
        },
        {
            name: "OSM_03T",
            southbound: "OSM_01T",
            northbound: "OSM_05T",
            length: 8
        },
        {
            name: "OSM_05T",
            southbound: "OSM_03T",
            northbound: "OSM_07T",
            length: 17,
            signals: {
                northbound: "SIS01"
            }
        },
        {
            name: "OSM_07T",
            southbound: "OSM_05T",
            northbound: "SIS_01T",
            length: 17
        },
        {
            name: "SIS_01T",
            southbound: "OSM_07T",
            northbound: "SIS_03T",
            length: 17,
            signals: {
                southbound: "SIS08",
                northbound: "SIS05"
            },
            shuntingPanels: {
                southbound: "SP3"
            }
        },
        {
            name: "SIS_03T",
            southbound: "SIS_01T",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "SIS_M10",
                normal: "SIS_05T",
                reverse: "SIS_17T"
            },
            length: 1
        },
        {
            name: "SIS_05T",
            southbound: "SIS_03T",
            northbound: "SIS_07T",
            length: 1
        },
        {
            name: "SIS_07T",
            southbound: "dependsOnPoint",
            northbound: "SIS_09T",
            dependsOnPoint: {
                point: "SIS_M11",
                normal: "SIS_05T",
                reverse: "SIS_17T"
            },
            length: 1
        },
        {
            name: "SIS_09T",
            southbound: "SIS_07T",
            northbound: "SIS_11T",
            length: 8,
            signals: {
                southbound: "SIS04"
            },
            shuntingPanels: {
                northbound: "SP5"
            }
        },
        {
            name: "SIS_11T",
            southbound: "SIS_09T",
            northbound: "SIS_13T",
            length: 18
        },
        {
            name: "SIS_13T",
            southbound: "SIS_11T",
            northbound: "SIS_15T",
            length: 18
        },
        {
            name: "SIS_15T",
            southbound: "SIS_13T",
            northbound: "GAY_01T",
            length: 18
        },
        {
            name: "GAY_01T",
            southbound: "SIS_15T",
            northbound: "GAY_03T",
            length: 18
        },
        {
            name: "GAY_03T",
            southbound: "GAY_01T",
            northbound: "GAY_05T",
            length: 8
        },
        {
            name: "GAY_05T",
            southbound: "GAY_03T",
            northbound: "GAY_07T",
            length: 15
        },
        {
            name: "GAY_07T",
            southbound: "GAY_05T",
            northbound: "LEV_01T",
            length: 16
        },
        {
            name: "LEV_01T",
            southbound: "GAY_07T",
            northbound: "LEV_03T",
            length: 15
        },
        {
            name: "LEV_03T",
            southbound: "LEV_01T",
            northbound: "LEV_05T",
            length: 8,
            signals: {
                northbound: "LEV01"
            }
        },
        {
            name: "LEV_05T",
            southbound: "LEV_03T",
            northbound: "LEV_07T",
            length: 16
        },
        {
            name: "LEV_07T",
            southbound: "dependsOnPoint",
            northbound: "4LV_01T",
            dependsOnPoint: {
                point: "LEV_M15",
                normal: "LEV_05T",
                reverse: "LEV_14T"
            },
            length: 1
        },
        {
            name: "4LV_01T",
            southbound: "LEV_07T",
            northbound: "4LV_03T",
            length: 16,
            signals: {
                southbound: "LEV04"
            },
            shuntingPanels: {
                northbound: "SP7"
            }
        },
        {
            name: "4LV_03T",
            southbound: "4LV_01T",
            northbound: "4LV_05T",
            length: 16
        },
        {
            name: "4LV_05T",
            southbound: "4LV_03T",
            northbound: "4LV_07T",
            length: 3,
            signals: {
                southbound: "4LV08"
            }
        },
        {
            name: "4LV_07T",
            southbound: "4LV_05T",
            northbound: "4LV_09T",
            length: 2
        },
        {
            name: "4LV_09T",
            southbound: "4LV_07T",
            northbound: "4LV_11T",
            length: 3,
            signals: {
                northbound: "4LV05"
            }
        },
        {
            name: "4LV_11T",
            southbound: "4LV_09T",
            northbound: "4LV_13T",
            length: 1
        },
        {
            name: "4LV_13T",
            southbound: "4LV_11T",
            northbound: "dependsOnPoint",
            dependsOnPoint: {
                point: "4LV_M19",
                normal: "4LV_17T",
                reverse: "4LV_15T"
            },
            length: 1
        },
        {
            name: "4LV_17T",
            southbound: "dependsOnPoint",
            northbound: "4LV_19T",
            dependsOnPoint: {
                point: "4LV_M20",
                normal: "4LV_13T",
                reverse: "4LV_15T"
            },
            length: 1
        },
        {
            name: "4LV_19T",
            southbound: "4LV_17T",
            northbound: "endOfTrack",
            length: 8,
            signals: {
                southbound: "4LV04",
                northbound: "B51",
            }
        }
    ],
    points: [
        {
            name: "TAK_M1",
            trackCircuit: "TAK_15T"
        },
        {
            name: "TAK_M2",
            trackCircuit: "TAK_01T"
        },
        {
            name: "TAK_M3",
            trackCircuit: "TAK_02T"
        },
        {
            name: "TAK_M4",
            trackCircuit: "TAK_05T"
        },
        {
            name: "TAK_M8",
            trackCircuit: "TAK_08T"
        },
        {
            name: "TAK_M9",
            trackCircuit: "TAK_12T"
        },
        {
            name: "TAK_M5",
            trackCircuit: "TAK_17T"
        },
        {
            name: "TAK_M6",
            trackCircuit: "TAK_27T"
        },
        {
            name: "TAK_M7",
            trackCircuit: "TAK_11T"
        },
        {
            name: "SIS_M12",
            trackCircuit: "SIS_04T"
        },
        {
            name: "SIS_M13",
            trackCircuit: "SIS_08T"
        },
        {
            name: "SIS_M10",
            trackCircuit: "SIS_03T"
        },
        {
            name: "SIS_M11",
            trackCircuit: "SIS_07T"
        },
        {
            name: "LEV_M16",
            trackCircuit: "LEV_14T"
        },
        {
            name: "LEV_M15",
            trackCircuit: "LEV_07T"
        },
        {
            name: "4LV_M21",
            trackCircuit: "4LV_10T"
        },
        {
            name: "4LV_M22",
            trackCircuit: "4LV_12T"
        },
        {
            name: "4LV_M19",
            trackCircuit: "4LV_13T"
        },
        {
            name: "4LV_M20",
            trackCircuit: "4LV_17T"
        }
    ],
    signals: [
        {
            name: "TAK03",
            direction: "northbound"
        },
        {
            name: "TAK08",
            direction: "southbound"
        },
        {
            name: "TAK06",
            direction: "southbound"
        },
        {
            name: "TAK05",
            direction: "northbound"
        },
        {
            name: "TAK02",
            direction: "southbound"
        },
        {
            name: "SIS03",
            direction: "northbound"
        },
        {
            name: "TAK07",
            direction: "northbound"
        },
        {
            name: "TAK12",
            direction: "southbound"
        },
        {
            name: "TAK09",
            direction: "northbound"
        },
        {
            name: "TAK10",
            direction: "southbound"
        },
        {
            name: "TAK01",
            direction: "northbound"
        },
        {
            name: "TAK04",
            direction: "southbound"
        },
        {
            name: "SIS01",
            direction: "northbound"
        },
        {
            name: "SIS08",
            direction: "southbound"
        },
        {
            name: "SIS05",
            direction: "northbound"
        },
        {
            name: "SIS06",
            direction: "southbound"
        },
        {
            name: "SIS07",
            direction: "northbound"
        },
        {
            name: "SIS02",
            direction: "southbound"
        },
        {
            name: "SIS06",
            direction: "southbound"
        },
        {
            name: "SIS07",
            direction: "northbound"
        },
        {
            name: "SIS02",
            direction: "southbound"
        },
        {
            name: "SIS04",
            direction: "southbound"
        },
        {
            name: "LEV01",
            direction: "northbound"
        },
        {
            name: "LEV03",
            direction: "northbound"
        },
        {
            name: "LEV02",
            direction: "southbound"
        },
        {
            name: "4LV06",
            direction: "southbound"
        },
        {
            name: "4LV03",
            direction: "northbound"
        },
        {
            name: "4LV02",
            direction: "southbound"
        },
        {
            name: "LEV04",
            direction: "southbound"
        },
        {
            name: "4LV08",
            direction: "southbound"
        },
        {
            name: "4LV05",
            direction: "northbound"
        },
        {
            name: "4LV04",
            direction: "southbound"
        },
        {
            name: "B30",
            direction: "southbound"
        },
        {
            name: "B51",
            direction: "northbound"
        },
        {
            name: "B52",
            direction: "northbound"
        }
    ],
    shuntingPanels: [
        {
            name: "SP1",
            direction: "northbound"
        },
        {
            name: "SP2",
            direction: "northbound"
        },
        {
            name: "SP3",
            direction: "southbound"
        },
        {
            name: "SP4",
            direction: "southbound"
        },
        {
            name: "SP5",
            direction: "northbound"
        },
        {
            name: "SP6",
            direction: "northbound"
        },
        {
            name: "SP7",
            direction: "northbound"
        },
        {
            name: "SP8",
            direction: "southbound"
        },
    ],
    platforms: [
        {
            name: "TAKSIM_P1",
            direction: "northbound",
            northbound: {
                trackCircuit: "TAK_03T",
                position: 6
            },
            southbound: {
                trackCircuit: "TAK_03T",
                position: 3
            }
        },
        {
            name: "TAKSIM_P2",
            direction: "southbound",
            northbound: {
                trackCircuit: "TAK_06T",
                position: 2
            },
            southbound: {
                trackCircuit: "TAK_04T",
                position: 3
            }
        },
        {
            name: "OSMANBEY_P1",
            direction: "northbound",
            northbound: {
                trackCircuit: "OSM_03T",
                position: 6
            },
            southbound: {
                trackCircuit: "OSM_03T",
                position: 3
            }
        },
        {
            name: "OSMANBEY_P2",
            direction: "southbound",
            northbound: {
                trackCircuit: "OSM_08T",
                position: 2
            },
            southbound: {
                trackCircuit: "OSM_06T",
                position: 3
            }
        },
        {
            name: "SISLI_P1",
            direction: "northbound",
            northbound: {
                trackCircuit: "SIS_09T",
                position: 6
            },
            southbound: {
                trackCircuit: "SIS_09T",
                position: 3
            }
        },
        {
            name: "SISLI_P2",
            direction: "southbound",
            northbound: {
                trackCircuit: "SIS_10T",
                position: 6
            },
            southbound: {
                trackCircuit: "SIS_10T",
                position: 3
            }
        },
        {
            name: "GAYRETTEPE_P1",
            direction: "northbound",
            northbound: {
                trackCircuit: "GAY_03T",
                position: 6
            },
            southbound: {
                trackCircuit: "GAY_03T",
                position: 3
            }
        },
        {
            name: "GAYRETTEPE_P2",
            direction: "southbound",
            northbound: {
                trackCircuit: "GAY_08T",
                position: 2
            },
            southbound: {
                trackCircuit: "GAY_06T",
                position: 3
            }
        },
        {
            name: "LEVENT_P1",
            direction: "northbound",
            northbound: {
                trackCircuit: "LEV_03T",
                position: 6
            },
            southbound: {
                trackCircuit: "LEV_03T",
                position: 3
            }
        },
        {
            name: "LEVENT_P2",
            direction: "southbound",
            northbound: {
                trackCircuit: "LEV_10T",
                position: 1
            },
            southbound: {
                trackCircuit: "LEV_06T",
                position: 3
            }
        },
        {
            name: "4-LEVENT_P1",
            direction: "northbound",
            northbound: {
                trackCircuit: "4LV_09T",
                position: 1
            },
            southbound: {
                trackCircuit: "4LV_05T",
                position: 3
            },
            terminus: true
        }
    ]
}