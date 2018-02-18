var Ball = function(game){
    var img = game.imageFromName('ball')
    log(game)
    console.log(img);
    var o = {
        img: img,
        x: 150,
        y: 240,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.fire = function(){
        o.fired = true
    }
    o.move = function(){
        if (o.fired) {
            if (o.x < 0 || o.x + o.img.width> 400){
                o.speedX *= -1
            }
            if (o.y < 0 || o.y + o.img.height> 300){
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.rebound = function(){
        o.speedY *= -1
    }
    return o
}
