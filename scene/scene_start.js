var SceneStart = function(game) {
    var s = {
        game: game,
    }
    window.addEventListener('keydown', function(event) {
        var keys = ['y', 'Y']
        if (keys.includes(event.key)) {
            var s = ScenePlay(game)
            game.changeScene(s)
        }
    })
    s.update = function() {

    }
    s.draw = function() {
      s.game.content.fillText('摁 Y 游戏开始', 170, 150)
    }
    return s
}
