var Paddle = function(game){
    var img = game.imageFromName('paddle')
    var o = {
        img: img,
        x: 100,
        y: 270,
        speed: 5,
    }
    o.moveLeft = function(){
        o.x -= o.speed
    }
    o.moveRight = function(){
        o.x += o.speed
    }
    o.collide = function(ball){
        if (ball.y + ball.img.height > o.y){
            if (ball.x + ball.img.width > o.x && ball.x < o.x + o.img.width) {
                return true
            }
        }
        return false
    }
    return o
}
