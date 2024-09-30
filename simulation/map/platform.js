"use strict"

class Platform {
    name
    direction
    northboundPosition
    southboundPosition
    atsPlatform
    terminus

    constructor(name, direction, northboundPosition, southboundPosition, terminus) {
        this.name = name
        this.direction = direction
        this.northboundPosition = northboundPosition
        this.southboundPosition = southboundPosition
        this.terminus = terminus
    }
}