var log = console.log.bind(console)

var imageFromPath = function(path){
    var img = new Image()
    img.src = path
    return img
}

var loadLevel = function(level, game){
  // 载入关卡
    var positions = levels[level-1]
    var blocks = []
    var block_num = positions.length
    for (var i = 0; i < block_num; i++){
      var b = Block(positions[i], game)
      blocks.push(b)
    }
    return blocks
}

// var removeEvent = function(scene) {
//     var events = scene.events
//     var keys = Object.keys(e)
//     for (var i = 0; i < keys.length; i++) {
//         var k = keys[i]
//         var es = events[k]
//         for (var v = 0; v < es.length; v++) {
//             var f = es[v]
//             window.removeEventListener(k, f)
//         }
//     }
// }

var removeEvent = function(scene) {
    window.outerHTML = window.outerHTML;
}

// var sceneRegisterEvent = function(scene, key, func) {
//     var e = scene.events
//     if (key in e){
//         var f = e[key]
//         f.push(func)
//     } else {
//       e.key = [func]
//     }
// }

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.img.height) {
        if (b.x > o.x && b.x < o.x + o.img.width) {
            return true
        }
    }
    return false
}
