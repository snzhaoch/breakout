var Block = function(position){

    var p = position
    var img = imageFromPath('block.png')
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
      o.collide = function(ball){
          return  o.alive && (rectIntersects(o, ball) || rectIntersects(ball, o))
      }
    return o
}
