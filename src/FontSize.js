(function () {
    var deviceWidth = document.documentElement.clientWidth
    if (deviceWidth > 640) deviceWidth = 640
    document.documentElement.style.fontSize = deviceWidth / (750 / 100) + 'px'   // 750 设计图大小  100 换算rem
})()