var SceneEnd = function(game) {
    var s = {
        game: game,
    }
    s.update = function() {

    }
    s.draw = function() {
      s.game.content.fillText('游戏结束，摁 Y 重新开始', 150, 150)
    }
    return s
}
