// 旋转木马
$(function () {
    // 以五张图为例，设定初始值nowIndex为0，点击值“下一张”图标时，nowIndex+1，
    // 当nowIndex值大于图片数-1时，将其重置为0，否则输出该值
    // 点击值“上一张”图标时，同理，以此实现循环，
    // 遍历图片，如果nowIndex值为该图片索引，给其添加now样式，使其居中显示

    // 初始化轮播图
    $(".inner > img").eq(1).attr("class", "now");
    $(".inner > img").eq(0).attr("class", "left1");
    $(".inner > img").eq(2).attr("class", "right1");

    var nowIndex = 0;
    var arrImg = $(".inner > img")
    console.log(arrImg)
    $(".right").click(function () {
        nowIndex = ++nowIndex > arrImg.length - 1 ? 0 : nowIndex;
        move()
    });
    $(".left").click(function () {
        nowIndex = --nowIndex < 0 ? arrImg.length - 1 : nowIndex;
        move()
    });
    function move() {
        $(".inner > img").attr("class","");

        var left1 = nowIndex - 1 < 0 ? arrImg.length - 1 : nowIndex - 1;
        var right1 = nowIndex + 1 > arrImg.length - 1 ? 0 : nowIndex + 1;
        $(".inner > img").eq(nowIndex).attr("class", "now");
        $(".inner > img").eq(left1).attr("class", "left1");
        $(".inner > img").eq(right1).attr("class", "right1");
    }
})

var cal = setInterval(function () {
    $(".right").click()
}, 1000)
