"use strict"

var interlockingData = {
    cycles: [
        {
            name: "TAK_1",
            routes: {
                entry: {
                    start: "TAK08",
                    end: "B30"
                },
                exit: {
                    start: "TAK07",
                    end: "TAK01"
                }
            }
        },
        {
            name: "SIS_22",
            routes: {
                entry: {
                    start: "SIS05",
                    end: "SP6"
                },
                exit: {
                    start: "SIS06",
                    end: "TAK02"
                }
            }
        },
        {
            name: "SIS_1",
            routes: {
                entry: {
                    start: "SIS06",
                    end: "SIS08"
                },
                exit: {
                    start: "SIS05",
                    end: "LEV01"
                }
            }
        },
        {
            name: "SIS_2",
            routes: {
                entry: {
                    start: "SIS05",
                    end: "SP5"
                },
                exit: {
                    start: "SIS04",
                    end: "TAK02"
                }
            }
        },
        {
            name: "SIS_12",
            routes: {
                entry: {
                    start: "SIS06",
                    end: "SP4"
                },
                exit: {
                    start: "SIS03",
                    end: "LEV01"
                }
            }
        },
        {
            name: "4LV_2",
            routes: {
                entry: {
                    start: "LEV01",
                    end: "SP7"
                },
                exit: {
                    start: "LEV04",
                    end: "SIS02"
                }
            }
        },
        {
            name: "4LV_22",
            routes: {
                entry: {
                    start: "LEV01",
                    end: "4LV05"
                },
                exit: {
                    start: "4LV08",
                    end: "SIS02"
                }
            }
        },
        {
            name: "4LV_23",
            routes: {
                entry: {
                    start: "4LV05",
                    end: "B51"
                },
                exit: {
                    start: "4LV04",
                    end: "4LV06"
                }
            }
        },
        {
            name: "4LV_24",
            routes: {
                entry: {
                    start: "4LV05",
                    end: "B52"
                },
                exit: {
                    start: "4LV02",
                    end: "4LV06"
                }
            }
        }
    ],
    shuntingRoutes: [
        {
            entry: {
                start: "TAK01",
                end: "SP1"
            },
            exit: {
                start: "TAK04",
                end: "TAK12"
            }
        },
        {
            entry: {
                start: "TAK09",
                end: "SP1"
            },
            exit: {
                start: "TAK04",
                end: "TAK10"
            }
        },
        {
            entry: {
                start: "TAK03",
                end: "SP2"
            },
            exit: {
                start: "TAK06",
                end: "TAK12"
            }
        },
        {
            entry: {
                start: "TAK09",
                end: "SP2"
            },
            exit: {
                start: "TAK06",
                end: "TAK08"
            }
        },
        {
            entry: {
                start: "SIS04",
                end: "SP3"
            },
            exit: {
                start: "SIS05",
                end: "SIS07"
            }
        },
        {
            entry: {
                start: "SIS06",
                end: "SP3"
            },
            exit: {
                start: "SIS05",
                end: "LEV01"
            }
        },
        {
            entry: {
                start: "SIS06",
                end: "SP4"
            },
            exit: {
                start: "SIS03",
                end: "LEV01"
            }
        },
        {
            entry: {
                start: "SIS04",
                end: "SP4"
            },
            exit: {
                start: "SIS03",
                end: "SIS07"
            }
        },
        {
            entry: {
                start: "SIS05",
                end: "SP5"
            },
            exit: {
                start: "SIS04",
                end: "TAK02"
            }
        },
        {
            entry: {
                start: "SIS03",
                end: "SP5"
            },
            exit: {
                start: "SIS04",
                end: "SIS08"
            }
        },
        {
            entry: {
                start: "SIS05",
                end: "SP6"
            },
            exit: {
                start: "SIS06",
                end: "TAK02"
            }
        },
        {
            entry: {
                start: "SIS03",
                end: "SP6"
            },
            exit: {
                start: "SIS06",
                end: "SIS08"
            }
        },
        {
            entry: {
                start: "LEV01",
                end: "SP7"
            },
            exit: {
                start: "LEV04",
                end: "SIS02"
            }
        },
        {
            entry: {
                start: "LEV03",
                end: "SP7"
            },
            exit: {
                start: "LEV04",
                end: "SIS04"
            }
        },
        {
            entry: {
                start: "LEV02",
                end: "SP8"
            },
            exit: {
                start: "LEV03",
                end: "4LV05"
            }
        },
        {
            entry: {
                start: "LEV04",
                end: "SP8"
            },
            exit: {
                start: "LEV03",
                end: "4LV03"
            }
        }
    ]
}