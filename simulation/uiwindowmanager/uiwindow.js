"use strict"

class UIWindow {
    content
    windowManager
    DOMElement
    title

    constructor(titleText, content, x, y, width, height, windowManager, mainWindow = false) {
        this.content = content
        this.windowManager = windowManager

        this.DOMElement = document.createElement("div")
        this.DOMElement.classList.add("window")

        var windowbar = document.createElement("div")
        windowbar.classList.add("windowbar")

        var leftButton = document.createElement("button")
        leftButton.classList.add("leftbutton")
        var leftButtonImg = document.createElement("img")
        leftButtonImg.src = "/simulation/uiwindowmanager/lefticon.svg"
        leftButton.appendChild(leftButtonImg)
        windowbar.appendChild(leftButton)

        if (mainWindow) {
            leftButton.style.opacity = 0
        } else {
            leftButton.addEventListener("click", this.closeWindow.bind(this))
            windowbar.addEventListener('mousedown', this.initDrag.bind(this))
        }

        this.title = document.createElement("p")
        windowbar.appendChild(this.title)

        var rightButton = document.createElement("button")
        var rightButtonImg = document.createElement("img")
        rightButtonImg.src = "/simulation/uiwindowmanager/righticon.svg"
        rightButton.appendChild(rightButtonImg)
        windowbar.appendChild(rightButton)

        this.updateSize(width, height)
        this.updatePosition(x, y)
        this.updateTitle(titleText)

        this.DOMElement.appendChild(windowbar)
        this.DOMElement.appendChild(content)
    }

    updateSize(width, height) {
        this.DOMElement.style.width = width + "px"
        this.DOMElement.style.height = height + "px"
        this.DOMElement.style.minWidth = width + "px"
        this.DOMElement.style.minHeight = height + "px"
    }

    updatePosition(x, y) {
        this.DOMElement.style.left = x + "px"
        this.DOMElement.style.top = y + "px"
    }

    updateTitle(titleText) {
        this.title.innerText = titleText
    }

    closeWindow() {
        this.DOMElement.remove()
        this.windowManager.windows.splice(this.windowManager.windows.indexOf(this), 1)
    }

    initDrag(e) {
        this.dragging = true;
        this.dragOffsetX = e.clientX - this.DOMElement.offsetLeft
        this.dragOffsetY = e.clientY - this.DOMElement.offsetTop

        document.addEventListener('mousemove', this.doDrag)
        document.addEventListener('mouseup', this.stopDrag)
    }

    doDrag = (e) => {
        if (this.dragging) {
            var newX = e.clientX - this.dragOffsetX
            if (newX + this.DOMElement.offsetWidth > 1280) {
                newX = 1280 - this.DOMElement.offsetWidth
            } else if (newX < 0) {
                newX = 0
            }
            var newY = e.clientY - this.dragOffsetY
            if (newY + this.DOMElement.offsetHeight + 20 > 1024) {
                newY = 1024 - this.DOMElement.offsetWidth - 20
            } else if (newY < 0) {
                newY = 0
            }
            this.updatePosition(newX, newY)
        }
    }

    stopDrag = () => {
        this.dragging = false;
        document.removeEventListener('mousemove', this.doDrag);
        document.removeEventListener('mouseup', this.stopDrag);
    }
}