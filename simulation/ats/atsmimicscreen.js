"use strict"

class ATSMimicScreen {
    pages = []
    interlocking
    ats
    HTMLElement
    activePage
    title

    constructor(interlocking, ats) {
        this.ats = ats
        mimicscreendata.forEach(pageData => {
            var page = new ATSMimicScreenPage(pageData.name, pageData.svg, interlocking, this.ats)
            page.HTMLElement.style.display = "none"
            this.pages.push(page)
        })
        this.HTMLElement = document.createElement("div")
        this.HTMLElement.classList = "mimicscreen"
        this.setActivePage(this.pages[0])
        this.pages.forEach(page => {
            this.HTMLElement.appendChild(page.HTMLElement)
        })
    }

    getPage(name) {
        var foundPage = null
        this.pages.forEach(page => {
            if (page.name == name) {
                foundPage = page
            }
        })
        return foundPage
    }

    setActivePage(requestedPage) {
        this.activePage = requestedPage
        this.pages.forEach(page => {
            if (page === requestedPage) {
                page.HTMLElement.style.display = "unset"
            } else {
                page.HTMLElement.style.display = "none"
            }
        })
        this.title = this.activePage.name
        this.ats.currentScreenTitle.innerText = this.title
    }
}