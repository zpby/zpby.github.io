// 通过音乐名判断其在列表中是否存在
var isContainMusic = function (musicName) {
    var add = e('#id-add-to-list img')

    for (var i = 0; i < musicList.length; i++) {
        var music = musicList[i]
        if (music.name === name) {
            add.src = 'img/added.png'
        } else {
            add.src = 'img/add.png'
        }
    }
}

// 切换显示cd封面和歌词
var toggleIynic = function () {
    var cs = es('.toggle-cd-iy')

    for (var i = 0; i < cs.length; i++) {
        var c = cs[i]
        if (c.classList.contains('hide')) {
            c.classList.remove('hide')
        } else {
            c.classList.add('hide')
        }
    }
}

var cdControl = function () {
    var toggleSect = e('#toggle-cd-lynic')
    bindEvent(toggleSect, 'click', function () {
        toggleIynic()
    })
}