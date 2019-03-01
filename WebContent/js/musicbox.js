var musicList = [{
        src: '蔡依林 - 怪美的.mp3',
        title: '怪美的',
        auther: '蔡依林'
    }, {
        src: '蔡依林 - 玫瑰少年.mp3',
        title: '玫瑰少年',
        auther: '蔡依林'
    }
]

var left = document.querySelector('.music-box .left')
var centent = document.querySelector('.music-box .centent')
var right = document.querySelector('.music-box .right')
var h1 = document.querySelector('.music-box h1')
var p = document.querySelector('.music-box p')
var time = document.querySelector('.music-box .time')
var bar = document.querySelector('.music-box .progress .bar')
var progressTow = document.querySelector('.music-box .progress-tow')

var timer

var music = new Audio()
music.autoplay = true //设置为自动播放，false不自动播放
music.volume=0.1
var musicIndex = 0

loadMusic(musicList[musicIndex])

centent.onclick = function() {
    var icon = this.querySelector('.fa')
    if (icon.classList.contains('fa-play')) {
        music.play()
    } else {
        music.pause()
    }
    icon.classList.toggle('fa-play')
    icon.classList.toggle('fa-pause')
}

right.onclick = loadNextMusic
left.onclick = loadLastMusic
music.onended = loadNextMusic
music.shouldUpdate = true

music.onplaying = function() {
    timer = setInterval(function() {
        updateProgress()
    }, 1000)
    console.log('play')
}
music.onpause = function() {
    console.log('pause')
    clearInterval(timer)
}
bar.onclick = function(e) {
    var percent = e.offsetX / parseInt(getComputedStyle(this).width)
    music.currentTime = percent * music.duration
    progressTow.style.width = percent * 100 + "% "
}


function loadMusic(songObj) {
    music.src = songObj.src
    h1.innerText = songObj.title
    p.innerText = songObj.auther
}

function loadNextMusic() {
    musicIndex++
    musicIndex = musicIndex % musicList.length
    loadMusic(musicList[musicIndex])
}

function loadLastMusic() {
    musicIndex--
    musicIndex = (musicIndex + musicList.length) % musicList.length
    loadMusic(musicList[musicIndex])
}

function updateProgress() {
    var percent = (music.currentTime / music.duration) * 100 + '%'
    progressTow.style.width = percent

    var minutes = parseInt(music.currentTime / 60)
    var seconds = parseInt(music.currentTime % 60) + ''
    seconds = seconds.length == 2 ? seconds : '0' + seconds
    time.innerText = minutes + ':' + seconds
}
