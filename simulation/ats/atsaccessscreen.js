"use strict"

class ATSAccessScreen {
    HTMLElement
    title
    ats

    constructor(ats) {
        this.ats = ats
        this.title = ""
        this.HTMLElement = document.createElement("svg")
        this.HTMLElement.classList = "accessscreen"
        var svg = new DOMParser().parseFromString(atsuielements["accessscreen"], "text/html").body.firstChild
        this.HTMLElement.append(svg)
        mimicscreendata.forEach(mimicScreen => {
            var mimicScreenAccessButton = this.HTMLElement.querySelector(`#Access_${mimicScreen["name"]}`)
            if (mimicScreenAccessButton != null) {
                mimicScreenAccessButton.addEventListener("click", () => { 
                    this.ats.mimicScreen.setActivePage(this.ats.mimicScreen.getPage(mimicScreen.name)) 
                    this.ats.switchToScreen(this.ats.mimicScreen)
                })
            }
        })
    }
}