(function () {
    let deviceWidth = document.documentElement.clientWidth || document.body.clientWidth
    let htmlDom = document.getElementsByTagName('html')[0]
    htmlDom.style.fontSize = deviceWidth / (750 / 100) + 'px'   // 750 设计图大小  100 换算rem
})()