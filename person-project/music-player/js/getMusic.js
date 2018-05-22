function myAjax(options){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', options.url + options.data.dataType + options.data.index, true);
    xhr.onload = function(){
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            var ret = JSON.parse(xhr.responseText);
            options.onSuccess(ret);
        }else{
            options.onError.onError1();
        }
    };
    xhr.onerror = function(){
        options.onError.onError2();
    };
    xhr.send();
}

// 用封装好的ajax从api接口获取随机音乐
var getRadomMusic = function () {
    myAjax({
        url:'http://api.jirengu.com/',
        data:{
            dataType: 'fm/getSong.php',
            index: ''
        },
        onSuccess: function(ret){
            var musicObj = {}
            musicObj.name = ret.song[0].title
            musicObj.player = ret.song[0].artist
            musicObj.pic = ret.song[0].picture
            musicObj.src = ret.song[0].url
            musicObj.sid = ret.song[0].sid

            var s = JSON.stringify(musicObj)
            storeToAudioDatasetMusic(s)
            loadMusic()
        },
        onError: {
            onError1: function(){
                alert('服务器异常！信息获取失败')
            },
            onError2: function(){
                alert('网络异常！信息获取失败')
            }
        }
    })
}

// ajax获取到的音乐信息，把它以字符串的形式存入audio的data里
var storeToAudioDatasetMusic = function(string) {
    var audio = e('#id-audio')
    audio.dataset.music = string
}

// 载入前先初始化页面
var initMusic = function () {
    var audio = e('#id-audio')
    // log(audio.dataset.music)
    // var name = JSON.parse(audio.dataset.music).name
    // if(name != null) {
    //     isContainMusic(name)
    // }
    var img = e('#id-play-toggle img')
    img.src = 'img/play.png'
    img.id = 'play'
    var cd = e('#id-cd-turntable')
    clearInterval(cd.interval)
    resetCD()
    var img = e('#id-add-to-list img')
    img.id = 'add'
    img.src= "img/add.png"
}

// 从audio节点读取信息，加载音乐
var loadMusic = function () {
    var audio = e('#id-audio')
    var obj = JSON.parse(audio.dataset.music)

    audio.src = obj.src

    var playername = e('#id-player-name')
    playername.innerText = obj.player

    var musicname = e('#id-music-name')
    musicname.innerText = obj.name

    var cdPic = e('#id-cd-pic img')
    cdPic.src = obj.pic

    var bgPic = e('#id-lightbox img')
    bgPic.src = obj.pic

    return 'loadMusic success'
}





var getNewMusic = e('#id-get-newmusic')

bindEvent(getNewMusic, 'touch' , function () {
    initMusic()
    getRadomMusic()

    // 解决异步的函数,可以让函数依次执行
    // var async = function (func) {
    //     setTimeout(function(){
    //         func()
    //     }, 0)
    // }
    // async(function () {
    //     var flag = getRadomMusic()
    //     log('getRadomMusic', flag)
    //
    //     // var result = loadMusic(flag)
    //     // log(result)
    // })
})




var getIyric = function (sid) {
    myAjax({
        url: 'https://jirenguapi.applinzi.com/fm/getLyric.php?&sid=',
        data:{
            dataType: '',
            index: sid
        },
        onSuccess: function(ret){
            // loadLyric(ret.lyric)

            log(ret.lyric)
        },
        onError: {
            onError1: function(){
                alert('服务器异常！封面获取失败')
            },
            onError2: function(){
                alert('网络异常！封面获取失败')
            }
        }
    })
}
