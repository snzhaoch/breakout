var SceneStart = function(game) {
    var s = {
        game: game,
        actions: {},
        keydowns: {},
    }
    // window.addEventListener('keydown', function(event) {
    //     var keys = ['y', 'Y']
    //     if (keys.includes(event.key)) {
    //         var s = ScenePlay(game)
    //         game.changeScene(s)
    //     }
    // })

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
    s.registerAction(['y', 'Y'], function() {
        var s = ScenePlay(game)
        game.changeScene(s)
    })
    s.update = function() {

    }
    s.draw = function() {
      s.game.content.fillText('摁 Y 游戏开始', 170, 150)
    }
    return s
}
