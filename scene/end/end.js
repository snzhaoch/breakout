var SceneEnd = function(game) {
    var s = {
        game: game,
        actions: {},
        keydowns: {},
    }
    s.registerAction = function(keys, func) {
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i]
          s.actions[k] = func
        }
    }
    window.addEventListener('keydown', function(event) {
        var k = event.key
        s.keydowns[k] = true
    })
    window.addEventListener('keyup', function(event) {
        var k = event.key
        s.keydowns[k] = false
    })
    s.registerAction(['r', 'R'], function() {
        var s = ScenePlay(game)
        game.changeScene(s)
    })
    s.update = function() {

    }
    s.draw = function() {
      s.game.content.fillText('游戏结束，摁 R 重新开始', 150, 150)
    }
    return s
}
