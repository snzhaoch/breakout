var __main = function(){
    // 设置 fps 默认值
    window.fps = 100

    var imgs = {
        'paddle': 'img/paddle.png',
        'ball': 'img/ball.png',
        'block': 'img/block.png',
    }

    var game = new Game(imgs)
    var scene = new SceneStart(game)
    game.scene = scene
}

__main()
