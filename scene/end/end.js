class SceneEnd extends Scene {
    constructor(game) {
        super(game)
        this.init()
    }
    init() {
        super.init()
        var _this = this
        this.registerAction(['r', 'R'], function() {
            var s = new ScenePlay(_this.game)
            _this.game.changeScene(s)
        })
    }
    draw() {
      this.game.content.fillText('游戏结束，摁 R 重新开始', 150, 150)
    }
}
