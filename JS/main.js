// color local storage setting
let mainColor = localStorage.getItem("color-option")
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main--color", mainColor)
    document.querySelectorAll(".colors-list li").forEach(e => {
        e.classList.remove("active")
        if (e.dataset.color === mainColor) {
            e.classList.add("active")
        }
    })
}
// random background local Storage setting
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background_option")
if (backgroundLocalItem !== null) {
    document.querySelectorAll(".random-background span").forEach(span => {
        span.classList.remove("active")
    })
    if (backgroundLocalItem === "true") {
        backgroundOption = true
        document.querySelectorAll(".random-background span")[0].classList.add("active")
    } else {
        backgroundOption = false
        document.querySelectorAll(".random-background span")[1].classList.add("active")
    }
}
// setting
let settingToggle = document.querySelector(".setting-icon")
let settingBox = document.querySelector(".setting-box")
let settingIcon = document.querySelector(".fa-gear")
settingToggle.onclick = function () {
    if (!settingBox.classList.contains("open")) {
        settingBox.classList.add("open")
        settingIcon.classList.add("fa-spin")
    } else {
        settingBox.classList.remove("open")
        settingIcon.classList.remove("fa-spin")
    }
}
// Switch color
let liColorList = document.querySelectorAll(".colors-list li")
liColorList.forEach(li =>{
    li.addEventListener("click", e =>{
        document.documentElement.style.setProperty("--main--color", e.target.dataset.color)
        localStorage.setItem("color-option", e.target.dataset.color)
        handleActive(e)
    })
})
// Switch background
let randomBackEl = document.querySelectorAll(".random-background span")
randomBackEl.forEach(span =>{
    span.addEventListener("click", e =>{
        handleActive(e)
        if (e.target.dataset.background === "yes") {
            backgroundOption = true
            randomizeImgs()
            localStorage.setItem("background_option", true)
        }else {
            backgroundOption = false
            clearInterval(backgroundInterval)
            localStorage.setItem("background_option", false)
        }
    })
})
// landing
let landingPage = document.querySelector(".landing-page")
let imagesArray = ["landing-1.jpg", "landing-2.jpg", "landing-3.jpg", "landing-4.jpg", "landing-5.jpg"]
function randomizeImgs () {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(randomImage,10000)
    }
}
function randomImage () {
    let randomNum = Math.ceil(Math.random() * imagesArray.length)
    landingPage.style.backgroundImage = `url(imgs/landing-${randomNum}.jpg)` ;
}
randomizeImgs()
// skills
let skills = document.querySelector(".skills")

window.onscroll = function () {
    let skillsOffSetTop = skills.offsetTop;
    let skillsOuterHeight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.scrollY;
    let skillsProgresses = document.querySelectorAll(".skills .skill-box .skill-progress span")

    if (windowScrollTop >= skillsOffSetTop + (skillsOuterHeight / 2) - windowHeight) {
        skillsProgresses.forEach(span => {
            span.style.width = span.dataset.progress
        })
    }
}
// gallary
let gallaryImgs = document.querySelectorAll(".gallary img")
gallaryImgs.forEach(img => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div")
        overlay.className = "popup-overlay"
        document.body.appendChild(overlay)

        let popupBox = document.createElement("div")
        popupBox.className = "popup-box"

        if (img.alt !== null) {
            let popupHead = document.createElement("h3")
            let popupHeadTxt = document.createTextNode(img.alt)
            popupHead.appendChild(popupHeadTxt)
            popupBox.appendChild(popupHead)
        }

        let closeIcon = document.createElement("i")
        closeIcon.className = "fa-regular fa-circle-xmark"
        popupBox.appendChild(closeIcon)

        let popupImage = document.createElement("img")
        popupImage.src = img.src
        popupBox.appendChild(popupImage)

        document.body.appendChild(popupBox)
    })
})
document.addEventListener("click", function (e) {
    if (e.target.className === "fa-regular fa-circle-xmark") {
        e.target.parentNode.remove()
        document.querySelector(".popup-overlay").remove()
    }
})
// Bullets 
let allBullets = document.querySelectorAll(".nav-bullets .bullet")
allBullets.forEach (bullet => {
    bullet.addEventListener("click", (e) => {
        handleActive(e)
    })
})
// Bullets setting
let bulletsOption = document.querySelectorAll(".bullets-options span")
let bulletsLocalItem = localStorage.getItem("bullets-option")
if (bulletsLocalItem !== null) {
    bulletsOption.forEach(e => {
        e.classList.remove("active")
    })
    if (bulletsLocalItem === "none") {
        allBullets.forEach (bullet => {
            bullet.style.display = "none"
        })
        bulletsOption[1].classList.add("active")
    } else {
        allBullets.forEach (bullet => {
            bullet.style.display = "block"
        })
        bulletsOption[0].classList.add("active")
    }
}
bulletsOption.forEach(option => {
    option.addEventListener("click", (e) => {
        handleActive(e)
        if (e.target.classList.contains("no")) {
            allBullets.forEach (bullet => {
                bullet.style.display = "none"
                localStorage.setItem("bullets-option", "none")
            })
        } else {
            allBullets.forEach (bullet => {
                bullet.style.display = "block"
                localStorage.setItem("bullets-option", "block")
            })
        }
    })
})
// function active
function handleActive (ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((e) => {
        e.classList.remove("active")
    })
    ev.target.classList.add("active")
}
// reset buuton
let resetButton = document.querySelector(".reset-box")
resetButton.onclick = function () {
    let overlay = document.createElement("div")
        overlay.className = "sure-popup-overlay"
        document.body.appendChild(overlay)

        let popupBox = document.createElement("div")
        popupBox.className = "sure-popup-box"

        let sureQuestion = document.createElement("p")
        sureQuestion.classList = "sure-question"
        let sureQuestionTxt = document.createTextNode("Are you sure about that?")
        sureQuestion.appendChild(sureQuestionTxt)
        popupBox.appendChild(sureQuestion)

        let yesButton = document.createElement("span")
        let noButton = document.createElement("span")
        yesButton.className = "sure-yes"
        noButton.className = "sure-no"
        yesButton.appendChild(document.createTextNode("Yes"))
        noButton.appendChild(document.createTextNode("NO"))
        popupBox.appendChild(yesButton)
        popupBox.appendChild(noButton)

        let closeIcon = document.createElement("i")
        closeIcon.className = "fa-regular fa-circle-xmark sure"
        popupBox.appendChild(closeIcon)

        document.body.appendChild(popupBox)
}
document.addEventListener("click", function (e) {
    if (e.target.className === "sure-no") {
        e.target.parentNode.remove()
        document.querySelector(".sure-popup-overlay").remove()
    }
    if (e.target.className === "sure-yes") {
        localStorage.removeItem("background_option")
        localStorage.removeItem("color-option")
        localStorage.removeItem("bullets-option")
        window.location.reload()
    }
    if (e.target.className === "sure-popup-overlay") {
        document.querySelector(".sure-popup-box").remove()
        document.querySelector(".sure-popup-overlay").remove()
    }
    if (e.target.className === "popup-overlay") {
        document.querySelector(".popup-box").remove()
        document.querySelector(".popup-overlay").remove()
    }
    if (e.target.className === "fa-regular fa-circle-xmark sure") {
        e.target.parentNode.remove()
        document.querySelector(".sure-popup-overlay").remove()
    }
})
// toggle menu
let menuBtn = document.querySelector(".toggel-menu")
let theLinks = document.querySelector(".links")
menuBtn.onclick = function (e) {
    e.stopPropagation()
    this.classList.toggle("menu-active")
    theLinks.classList.toggle("open")
}
theLinks.onclick = function (e) {
    e.stopPropagation()
}
document.addEventListener("click", (e) => {
    if (e.target !== menuBtn && e.target !== theLinks) {
        if (theLinks.classList.contains("open")) {
            theLinks.classList.remove("open")
        }
        if (menuBtn.classList.contains("menu-active")) {
            menuBtn.classList.remove("menu-active")
        }
    }
})