var Ball = function(game) {
    var o = game.imageByName('ball')
    // var image = imageFromPath('ball.png')
    o.x = 100
    o.y = 200
    o.speedX = 15
    o.speedY = 15
    o.fired = false
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            // log('move')
            if (o.x < 0 || o.x + o.image.width> 800) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y + o.image.height> 600) {
                o.speedY = -o.speedY
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.bounce = function() {
        o.speedY *= -1
    }
    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}
