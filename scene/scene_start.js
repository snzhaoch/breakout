var SceneStart = function(game) {
    var s = {
        game: game,
        events: {},
    }
    var keydownFunc = function(event) {
          var keys = ['y', 'Y']
          log('keykeykey', event.key)
          if (keys.includes(event.key)) {
              removeEvent(s)
              var _s = ScenePlay(game)
              game.changeScene(_s)
          }
      }
    window.addEventListener('keydown', function(event) {
          var keys = ['y', 'Y']
          log('keykeykey', event.key)
          if (keys.includes(event.key)) {
              removeEvent(s)
              var _s = ScenePlay(game)
              game.changeScene(_s)
          }
      })
    // sceneRegisterEvent(s, 'keydown', keydownFunc(event))
    // sceneRegisterEvent()
    s.update = function() {

    }
    s.draw = function() {
      s.game.content.fillText('摁 Y 游戏开始', 170, 150)
    }


    return s
}
