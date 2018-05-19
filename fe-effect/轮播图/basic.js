/*工具函数*/
var e = function (selector) {
    return document.querySelector(selector)
}

var bindEvent = function (element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var removeClassAll = function (className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var bindAll = function (selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}


/*轮播图实现代码*/
var bindEventSlide = function () {
    var selector = '.slide-button'
    bindAll(selector, 'click', function (event) {
        var btn = event.target
        var index = nextIndex(btn)
        showImage(index)
        showIndicator(index)
    })
}

var playOnTime = function () {
    var btn = e('#id-right')
    setInterval(function () {
        btn.click()
    }, 2000)
}

var nextIndex = function (btn) {
    var btn = event.target
    var slide = btn.parentElement
    var numberOfImgs = parseInt(slide.dataset.imgs)
    var activeIndex = parseInt(slide.dataset.active)
    var offset = parseInt(btn.dataset.next)
    var index = (numberOfImgs + activeIndex + offset) % numberOfImgs
    slide.dataset.active = index
    return index
}

var showImage = function (index) {
    var nextSelector = '#id-img-' + String(index)
    var className = 'active'
    removeClassAll(className)
    var img = e(nextSelector)
    img.classList.add(className)
}

var showIndicator = function (index) {
    var nextSelector = '#id-indi-' + String(index)
    var className = 'white'
    removeClassAll(className)
    var indi = e(nextSelector)
    indi.classList.add(className)
}

bindEventSlide()

playOnTime()
