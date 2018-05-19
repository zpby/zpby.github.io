var musicList = []



// 一些封装好的工具函数,可以随意在其他项目中使用
var e = function (selector) {
    return document.querySelector(selector)
}

var es = function (selector) {
    return document.querySelectorAll(selector)
}

var log = function () {
    console.log.apply(console, arguments)
}

var bindEvent = function (element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var bindAll = function (selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

//计算时间，将秒数转换成minute:second形式
var time = function (t) {
    var sec = Math.floor(t % 60)
    var min = Math.floor(t / 60)
    if (sec < 10) {
        sec = '0' + sec
    }
    if (min < 10) {
        min = '0' + min
    }
    return `${min}:${sec}`
}
// 辅助函数，只能在本项目使用，但不涉及数据交互
var playMusic = function () {
    var music = e('#id-audio')
    music.play()
}

var stopMusic = function () {
    var music = e('#id-audio')
    music.pause()
}







var delMusicFromModal = function (dom) {
    var ul = e('#id-modal ul')
    ul.removeChild(dom)
}

var modalControl = function () {
    var selectImg = '#id-modal ul li img'
    var selectP = '#id-modal ul li p'

    bindAll(selectImg, 'click', function (event) {
        event.stopPropagation()
        var self = event.target
        var musicName = self.previousSibling.innerText
        delMusicFromList(musicName)
        var li = self.parentNode
        delMusicFromModal(li)
    })
    bindAll(selectP, 'click', function (event) {
        event.stopPropagation()
        var self = event.target
        var musicName = self.innerText
        stopMusic()
        changeMusic('', musicName)
        showTitle()
    })
}

// header
// 歌单切换显示
var toggleModal = function () {
    var showListBtn = e('#id-show-list')
    var hideList = e('#id-layer')
    var template = `<div class="layer" id="id-layer">
                        <div class="modal actAnimation active" id="id-modal">
                            <ul>
                            </ul>
                        </div>
                    </div>
                    `

    bindEvent(showListBtn, 'click', function () {
        var wrap = e('.wrap')


        wrap.insertAdjacentHTML('beforeend', template)
        var ul = e('#id-modal ul')


        for (var i = 0; i < musicList.length; i++) {
            var music = musicList[i]
            var name = music.name
            var templateLi = `<li><p>${name}</p><img src="../img/del.png" /></li>`
            ul.insertAdjacentHTML('beforeend', templateLi)
        }

        modalControl()

        var hideList = e('#id-layer')
        bindEvent(hideList, 'click', function () {
            var wrap = e('.wrap')
            var modal = e('#id-modal')
            var modalIndex = (wrap.childNodes.length) - 2
            wrap.removeChild(wrap.childNodes[modalIndex])
        })
    })
}

// 显示歌名
var showTitle = function () {
    var audio = e('audio')
    var dmusic = e('#id-music-name')
    var dplayer = e('#id-player-name')
    // var name = audio.dataset.name
    // 通过歌名获取该歌在list中的索引值
    // var index = getMusicIndex(name)
    if (audio.dataset.music != '') {
        var music = JSON.parse(audio.dataset.music)
        var name = music.name
        var player = music.player
        if (player != '' || name != '') {
            dmusic.innerText = name
            dplayer.innerText = player
        }
    }
}

toggleModal()




// section
//旋转CD
var rotateCD = function () {
    var cd = e('#id-cd-turntable')

    if (cd.interval == undefined) {
        cd.interval = null
    }
    if (cd.dregree == undefined) {
        cd.dregree = 0
    }
    clearInterval(cd.interval)
    cd.interval = setInterval(function () {
        cd.dregree = (cd.dregree + 0.25) % 360
        // var style = `translateX(-50%) translateY(-50%) rotateZ(${cd.dregree}deg)`
        var style = `rotateZ(${cd.dregree}deg)`
        cd.style.transform = style
    }, 20)
}

//reset CD
var resetCD = function () {
    var cd = e('#id-cd-turntable')
    var style = `rotateZ(0deg)`
    cd.dregree = 0
    cd.style.transform = style

    var pole = e('#id-cd-pole img')
    pole.style.transform = `rotate(-16deg)`
}



// footer
var getMusicFromList = function (index) {
    var music = {
        name: '',
        player: '',
        src: '',
        pic: '',
    }
    var item = musicList[index]
    music.name = item.name
    music.player = item.player
    music.src = item.src
    music.pic = item.pic
    return music
}

var getMusicIndex = function (name) {
    for (var i = 0; i < musicList.length; i++) {
        var item = musicList[i]
        if (item.name === name) {
            return i
        }
    }
}

var getNextMusicIndex = function (oldIndex) {
    log('oldIndex4'+oldIndex)
    var len = musicList.length
    var r = (oldIndex + 1) % len
    log('r5'+r)
    return r
}

var getPrevMusicIndex = function (oldIndex) {
    var len = musicList.length
    var r = (oldIndex + len - 1) % len
    return r
}

var changeMusic = function (order, musicName) {
    var oldIndex = getMusicIndex(musicName)

    var newIndex = 0
    if (order === 'prev') {
        newIndex = getPrevMusicIndex(oldIndex)
    } else if (order === 'next') {
        newIndex = getNextMusicIndex(oldIndex)
        log('newIndex6'+newIndex)
    } else if (order === 'random') {
        newIndex = Math.floor(Math.random() * 3)
    } else {
        newIndex = getMusicIndex(musicName)
    }
    var music = getMusicFromList(newIndex)
    resetCD()
    var audio = e('audio')
    audio.src = music.src
    audio.dataset.name = music.name
    audio.dataset.music = JSON.stringify(music)
    playMusic()

    var player = e('#id-player-name')
    var musicName = e('#id-music-name')
    player.innerText = music.player
    musicName.innerText = music.name

    var bgImg = e('#id-lightbox img')
    var cdImg = e('#id-cd-pic img')
    log(music)
    bgImg.src = music.pic
    cdImg.src = music.pic
}

var toggleOrder = function (event) {
    var orderImg = ["loop.png", "rand.png", "self.png"]
    var len = orderImg.length
    var temp = 0
    var img = e('#id-play-order img')
    // var img = span.childNodes[0]
    var s = event.src
    var index = s.indexOf('img')
    var oldSrc = s.slice(index)

    for (var i = 0; i < len; i++) {
        var src = "img/" + orderImg[i]
        if (src === oldSrc) {
            temp = i
        }
    }
    var newIndex = (temp + 1) % len
    var newSrc = "img/" + orderImg[newIndex]
    img.src = newSrc
    img.dataset.index = newIndex
    log(img.dataset.index)
}

var togglePlay = function (element) {
    var img = element.childNodes[0]
    var id = img.id
    if (id === 'play') {
        playMusic()
        rotateCD()
        img.src = 'img/stop.png'
        img.id = 'stop'
        setTimeout(rotateCD, 500)

        var pole = e('#id-cd-pole img')
        pole.style.transition = `transform 0.2s ease`
        pole.style.transform = `rotate(15deg)`
    } else {
        stopMusic()
        img.src = 'img/play.png'
        img.id = 'play'

        var cd = e('#id-cd-turntable')
        clearInterval(cd.interval)

        var pole = e('#id-cd-pole img')
        pole.style.transform = `rotate(-16deg)`
    }
}

var addMusicToList = function () {
    var audio = e('#id-audio')
    var obj = JSON.parse(audio.dataset.music)
    musicList.push(obj)
}

var delMusicFromList = function (musicName) {
    for (var i = 0; i < musicList.length; i++) {
        var music = musicList[i]
        var name = music.name
        if (name === musicName) {
            musicList.splice(i, 1)
        }
    }
}

var toggleAdd = function () {
    var img = e('#id-add-to-list img')
    var id = img.id
    if (id === 'add') {
        addMusicToList()
        img.src = "img/added.png"
        img.id = 'hasAdd'
    } else {
        delMusicFromList()
        img.src = "img/add.png"
        img.id = 'add'
    }
}

var musicControl = function () {
    var order = e('#id-play-order')
    var prev = e('#id-play-prev')
    var toggle = e('#id-play-toggle')
    var next = e('#id-play-next')
    var add = e('#id-add-to-list')
    var audio = e('audio')

    bindEvent(order, 'click', function (event) {
        var event = event.target
        toggleOrder(event)
    })
    bindEvent(prev, 'click', function () {
        stopMusic()
        var musicName = audio.dataset.name
        changeMusic('prev', musicName)
        showTitle()
    })
    bindEvent(next, 'click', function () {
        stopMusic()
        var musicName = audio.dataset.name
        changeMusic('next', musicName)
        showTitle()
    })
    bindEvent(toggle, 'click', function () {
        togglePlay(toggle)
    })
    showTitle()
    bindEvent(add, 'click', function () {
        toggleAdd()
    })
}

musicControl()



//播放 时间显示
var showTime = function () {
    var music = e('#id-audio')
    var currentTimeSpan = e('#id-current-time')
    var durationSpan = e('#id-duration-time')
    music.show = null
    clearInterval(music.show)
    music.show = setInterval(function () {
        var duration = music.duration
        var currentTime = music.currentTime
        if (duration != '' && currentTime != '') {
            currentTimeSpan.innerHTML = time(currentTime)
            durationSpan.innerHTML = time(duration)
        }
        showProgrss()
    }, 1000)
}

var showProgrss = function () {
    var music = e('#id-audio')
    var duration = music.duration
    var currentTime = music.currentTime
    var len = currentTime / duration
    if (music.changeProgress == undefined) {
        music.changeProgress = false
    }
    if (music.changeProgress == false) {
        setProgress(len)
    }
    setProgress(len)
}

var setProgress = function (floatNum) {
    // 线的总长度为16rem
    var progress = e('#id-progress-width')
    var point = e('#id-progress-point')

    progress.style.width = floatNum * 16 + 'rem'
    point.style.left = floatNum * 16 + 'rem'
}

var changeProgress = function () {
    var point = e('#id-progress-point');
    var line = e('#id-line-width')
    var maxW = line.offsetWidth;
    var tempf = 0

    bindEvent(point, 'touchstart', function (e) {
        var ev = e || window.event;
        var touch = ev.targetTouches[0];
        oL = touch.clientX - point.offsetLeft;
        document.addEventListener("touchmove", defaultEvent, false);
    })
    bindEvent(point, 'touchmove', function (e) {
        var ev = e || window.event;
        var touch = ev.targetTouches[0];
        var oLeft = touch.clientX - oL;
        if (oLeft < 0) {
            oLeft = 0;
        } else if (oLeft >= maxW) {
            oLeft = maxW;
        }
        tempf = oLeft / maxW
        point.style.left = oLeft + 'px';
    })
    bindEvent(point, 'touchend', function () {
        var music = e('#id-audio')
        var d = music.duration
        var t = tempf * d
        music.currentTime = t
        document.removeEventListener("touchmove", defaultEvent);
    })

    function defaultEvent(e) {
        e.preventDefault();
    }
}

showTime()

changeProgress()



// 播放结束后
var autoPlayNext = function() {
    resetCD()
    log('resetCD2')
    var audio = e('#id-audio')
    var obj = JSON.parse(audio.dataset.music)
    var musicName = obj.name
    var musicOrder = e('#id-play-order img')
    var order = musicOrder.dataset.index
    log('indexFromOrderDataset3'+order)
    if(order == '0') {
        changeMusic('next', musicName)
    }
    if(order == '1') {
        changeMusic('random', musicName)
    }
    if(order == '2') {
        changeMusic('', musicName)
    }
}

var endMusic = function () {
    var audio = e('#id-audio')
    bindEvent(audio, 'ended', function () {
        log('end1')
        autoPlayNext()
    })
}

endMusic()
