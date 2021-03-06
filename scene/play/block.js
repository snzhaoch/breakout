var Block = function(position, game){

    var p = position
    var img = game.imageFromName('block')
    var o = {
        img: img,
        x: p[0],
        y: p[1],
        // w: 50,
        // h: 20,
        alive: true,
        hp: p[2],
      }
      o.hit = function(){
          o.hp -= 1
          if (o.hp < 1){
              o.alive = false
          }
      }
      o.hasPoint = function(x, y){
          var xIn = x >= o.x && x <= o.x + o.img.width
          var yIn = y >= o.y && y <= o.y + o.img.height
          return xIn && yIn
      }
      o.collide = function(ball){
          return  o.alive && (rectIntersects(o, ball) || rectIntersects(ball, o))
      }
    return o
}
