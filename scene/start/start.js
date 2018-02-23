class SceneStart extends Scene {
    constructor(game) {
        super(game)
        this.init()
    }
    init() {
        super.init()
        var _this = this
        this.registerAction(['y', 'Y'], function() {
            var s = new ScenePlay(_this.game)
            _this.game.changeScene(s)
        })
        this.registerAction(['e', 'E'], function() {
            var s = new SceneEdit(_this.game)
            _this.game.changeScene(s)
        })
    }
    draw() {
        this.game.content.fillText('摁 Y 游戏开始', 170, 140)
        this.game.content.fillText('摁 E 编辑游戏关卡', 160, 160)
    }
}
