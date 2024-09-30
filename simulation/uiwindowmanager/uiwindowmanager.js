"use strict"

class UIWindowManager {
    windows = []
    body
    window
    screen

    constructor(body, window) {
        this.body = body
        this.window = window
        this.screen = document.createElement("div")
        this.screen.id = "screen"
        this.body.appendChild(this.screen)
        this.window.onresize = this.resizeScreen.bind(this);
        this.resizeScreen()
    }

    resizeScreen() {
        var forHeight = this.window.innerHeight / 1024
        var forWidth = this.window.innerWidth / 1280
        if (forHeight < forWidth) {
            this.screen.style.scale = forHeight
        } else {
            this.screen.style.scale = forWidth
        }
    }

    addWindow(title, content, x, y, width, height, mainWindow = false) {
        var tmpWindow = new UIWindow(title, content, x, y, width, height, this, mainWindow)
        this.screen.appendChild(tmpWindow.DOMElement)
        this.windows.push(tmpWindow)
    }
}