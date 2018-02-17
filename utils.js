var log = console.log.bind(console)

var imageFromPath = function(path){
    var img = new Image()
    img.src = path
    return img
}

var loadLevel = function(level){
  // 载入关卡
    var positions = levels[level-1]
    var blocks = []
    var block_num = positions.length
    for (var i = 0; i < block_num; i++){
      var b = Block(positions[i])
      blocks.push(b)
    }
    return blocks
}

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.img.height) {
        if (b.x > o.x && b.x < o.x + o.img.width) {
            return true
        }
    }
    return false
}
