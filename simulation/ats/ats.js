"use strict"

class ATS {
    map
    interlocking
    windowManager
    mainWindow
    timeDate
    currentScreen
    alarmScreen
    mimicScreen
    accessScreen
    interlockingAnswerFirstLine
    interlockingAnswerSecondLine
    languageStylesheet
    currentScreenTitle
    supervisionWindow
    screens
    trainManager
    regulation

    constructor(map, interlocking, windowManager) {
        this.map = map
        this.interlocking = interlocking
        this.windowManager = windowManager
        this.interlockingAnswerFirstLine = null
        this.interlockingAnswerSecondLine = null
        this.currentScreenTitle = null
        this.screens = []
        this.currentScreen = null
        this.alarmScreen = null
        this.mimicScreen = null
        this.supervisionWindow = null
        this.trainManager = new ATSTrainManager(interlocking.trackCircuits)
        this.startATS()
        this.languageStylesheet = document.createElement("link")
        this.languageStylesheet.setAttribute("rel", "stylesheet")
        this.setLanguage("english")
        document.head.appendChild(this.languageStylesheet)
    }

    addTrain(train) {
        return this.trainManager.addTrain(train)
    }

    setLanguage(language) {
        this.languageStylesheet.setAttribute("href", `ats/${language}.css`)
    }

    startATS() {
        this.mainWindow = document.createElement("div")
        this.startRegulation()
        this.startHeader()
        this.startMimicScreen()
        this.startAlarmScreen()
        this.startAccessScreen()
        this.startSupervisionWindow()
        this.startNavigationBar()
    }

    startRegulation() {
        this.regulation = new ATSRegulation()
        this.map.platforms.forEach(platform => {
            var atsPlatform = new ATSPlatform(platform.name)
            this.regulation.platforms.push(atsPlatform)
            platform.atsPlatform = atsPlatform
        })
    }

    startHeader() {
        this.mainWindow.classList.add("atsmainwindow")
        this.windowManager.addWindow("ATSSim", this.mainWindow, 0, 0, 1280, 1024, true)
        var header = document.createElement("div")
        header.classList.add("atsheader")
        var logo = document.createElement("img")
        logo.src = "/simulation/ats/customerlogo.jpeg"
        logo.classList.add("customerlogo")
        var alarmrectangle = document.createElement("div")
        alarmrectangle.classList.add("alarmrectangle")
        alarmrectangle.classList.add("positive3d")
        var lastalarm = document.createElement("button")
        lastalarm.classList.add("lastalarm")
        lastalarm.classList.add("positive3d")
        this.currentScreenTitle = document.createElement("p")
        this.currentScreenTitle.classList.add("currentscreentitle")
        this.timeDate = document.createElement("p")
        this.timeDate.classList = "timedate negative3d"
        this.timeDate.addEventListener("click", this.toggleFullScreen.bind(this))
        this.startTime()
        var user = document.createElement("p")
        user.classList = "user negative3d bold"
        user.innerText = "ISTSIG"
        var simlogo = document.createElement("img")
        simlogo.src = "/simulation/ats/logo.jpeg"
        simlogo.classList.add("logo")
        var sessionName = document.createElement("p")
        sessionName.classList = "sessionname negative3d bold"
        sessionName.appendChild(TranslationProvider.get("TRAFFIC"))
        header.appendChild(logo)
        header.appendChild(alarmrectangle)
        header.appendChild(lastalarm)
        header.appendChild(this.currentScreenTitle)
        header.appendChild(this.timeDate)
        header.appendChild(user)
        header.appendChild(simlogo)
        header.appendChild(sessionName)
        this.mainWindow.appendChild(header)
    }

    startTime() {
        var today = new Date()
        var h = today.getHours()
        var m = today.getMinutes()
        var s = today.getSeconds()
        var y = today.getFullYear()
        var d = today.getDate()
        var mo = today.getMonth() + 1
        h = this.checkTime(h)
        m = this.checkTime(m)
        s = this.checkTime(s)
        y = y.toString().slice(-2)
        d = this.checkTime(d)
        mo = this.checkTime(mo)
        var text = d + "/" + mo + "/" + y + " " + h + ":" + m + ":" + s
        this.timeDate.innerText = text
        var t = setTimeout(this.startTime.bind(this), 500);
    }
    
    checkTime(i) {
        if (i < 10) { i = "0" + i };
        return i;
    }

    startMimicScreen() {
        this.mimicScreen = new ATSMimicScreen(this.interlocking, this)
        this.addScreen(this.mimicScreen)
        this.switchToScreen(this.mimicScreen)
    }

    startAlarmScreen() {
        this.alarmScreen = new ATSAlarmScreen()
        this.addScreen(this.alarmScreen)
    }

    startAccessScreen() {
        this.accessScreen = new ATSAccessScreen(this)
        this.addScreen(this.accessScreen)
    }

    startSupervisionWindow() {
        this.supervisionWindow = new ATSSystemSupervisionWindow()
    }

    addScreen(screen) {
        this.mainWindow.appendChild(screen.HTMLElement)
    }

    switchToScreen(screen) {
        if (this.currentScreen != null) {
            this.currentScreen.HTMLElement.style.display = "none"
        }
        this.currentScreen = screen
        this.currentScreen.HTMLElement.style.display = "unset"
        this.currentScreenTitle.innerText = this.currentScreen.title
    }

    startNavigationBar() {
        var navigationBar = document.createElement("div")
        navigationBar.classList = "navigationbar"

        var accessButton = document.createElement("button")
        accessButton.style.backgroundImage = "url(./ats/resources/access.svg)"
        accessButton.classList = "buttonwithmargin"
        accessButton.addEventListener("click", () => { this.switchToScreen(this.accessScreen) })
        navigationBar.appendChild(accessButton)

        var homeButton = document.createElement("button")
        homeButton.style.backgroundImage = "url(./ats/resources/home.svg)"
        homeButton.addEventListener("click", () => { this.switchToScreen(this.mimicScreen) })
        navigationBar.appendChild(homeButton)

        var emptyButton = document.createElement("button")
        navigationBar.appendChild(emptyButton)

        var onlineTimetableButton = document.createElement("button")
        onlineTimetableButton.style.backgroundImage = "url(./ats/resources/onlinetimetable.svg)"
        navigationBar.appendChild(onlineTimetableButton)

        var operationModeButton = document.createElement("button")
        operationModeButton.style.backgroundImage = "url(./ats/resources/operationmode.svg)"
        operationModeButton.classList = "buttonwithmargin"
        navigationBar.appendChild(operationModeButton)

        var regulationButton = document.createElement("button")
        regulationButton.style.backgroundImage = "url(./ats/resources/regulation.svg)"
        navigationBar.appendChild(regulationButton)

        var supervisionButton = document.createElement("button")
        supervisionButton.style.backgroundImage = "url(./ats/resources/supervision.svg)"
        supervisionButton.addEventListener("click", () => { this.windowManager.addWindow("", this.supervisionWindow.HTMLElement, 264, 385, 752, 254) })
        navigationBar.appendChild(supervisionButton)

        var sessionButton = document.createElement("button")
        sessionButton.style.backgroundImage = "url(./ats/resources/session.svg)"
        navigationBar.appendChild(sessionButton)

        var emptyButton2 = document.createElement("button")
        emptyButton2.classList = "buttonwithmargin"
        navigationBar.appendChild(emptyButton2)

        var ackAlarmButton = document.createElement("button")
        ackAlarmButton.style.backgroundImage = "url(./ats/resources/ackalarm.svg)"
        navigationBar.appendChild(ackAlarmButton)

        var alarmsButton = document.createElement("button")
        alarmsButton.style.backgroundImage = "url(./ats/resources/alarms.svg)"
        alarmsButton.addEventListener("click", () => { this.switchToScreen(this.alarmScreen) })
        navigationBar.appendChild(alarmsButton)

        var activeAlarmButton = document.createElement("button")
        activeAlarmButton.style.backgroundImage = "url(./ats/resources/activeAlarm.svg)"
        navigationBar.appendChild(activeAlarmButton)

        this.interlockingAnswerFirstLine = document.createElement("p")
        this.interlockingAnswerFirstLine.classList = "interlockinganswer negative3d"
        this.interlockingAnswerFirstLine.addEventListener("click", () => { this.updateInterlockingAnswer(null, null) })
        navigationBar.appendChild(this.interlockingAnswerFirstLine)

        this.interlockingAnswerSecondLine = document.createElement("p")
        this.interlockingAnswerSecondLine.classList = "interlockinganswer negative3d secondline"
        this.interlockingAnswerSecondLine.addEventListener("click", () => { this.updateInterlockingAnswer(null, null) })
        navigationBar.appendChild(this.interlockingAnswerSecondLine)

        this.mainWindow.appendChild(navigationBar)
    }

    toggleFullScreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    updateInterlockingAnswer(firstLine, secondline) {
        this.interlockingAnswerFirstLine.innerHTML = null
        this.interlockingAnswerSecondLine.innerHTML = null
        if (firstLine != null) {
            this.interlockingAnswerFirstLine.appendChild(firstLine)
        }
        if (secondline != null) {
            this.interlockingAnswerSecondLine.appendChild(secondline)
        }
    }
}