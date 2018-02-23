class ScenePlay extends Scene {
    constructor(game) {
        super(game)
        this.paddle =  Paddle(this.game)
        this.ball = Ball(this.game)
        this.level = 1
        this.blocks = loadLevel(this.level, this.game)
        this.score = 0
        this.init()
    }
    init() {
        super.init()

        // 设置暂停初始值
        this.pause = false

        //  注册按键及响应事件
        var _this = this
        this.registerAction(['a', 'ArrowLeft'], function(){
            _this.paddle.moveLeft()
        })
        this.registerAction(['d', 'ArrowRight'], function(){
            _this.paddle.moveRight()
        })
        this.registerAction(['f'], function(){
            _this.ball.fire()
        })
        // 暂停和恢复功能
        this.registerAction(['p'], function(){
            _this.pause = ! _this.pause
        }, 0.1)
        // 载入新关卡
        var level_array = Array.from({length: levels.length}, (v, i) => i)
        for (var i = 0; i < level_array.length; i++) {
            let level = level_array[i] + 1
            this.registerAction([level], function(){
                _this.level = level
                _this.blocks = loadLevel(level, _this.game)
            }, 0.1)
        }

        //  fps 绑定滑动条
        var f = document.querySelector('input')
        f.addEventListener('change', function(event){
            window.fps = Number(document.querySelector('input').value)
        })

        // 点击拖动 ball
        var enableDrag = false
        this.game.canvas.addEventListener('mousedown', function(event){
            var x = event.offsetX
            var y = event.offsetY
            if (this.ball.hasPoint(x, y)){
                enableDrag = true
            }
        })
        this.game.canvas.addEventListener('mousemove', function(event){
            if (enableDrag){
                var x = event.offsetX
                var y = event.offsetY
                this.ball.x = x
                this.ball.y = y
            }
        })
        this.game.canvas.addEventListener('mouseup', function(event){
            enableDrag = false
        })
    }

    update() {
        if (this.pause === true){
              return
        }
        this.ball.move()
        // 判断相撞
        if (this.paddle.collide(this.ball) === true){
            this.ball.rebound()
        }
        // ball 和 block 相撞时获取分数
        for (var i = 0; i < this.blocks.length; i++){
            var b = this.blocks[i]
            if (b.collide(this.ball) === true){
                this.ball.rebound()
                b.hit()
                this.score += 10
            }
        }
        // 判断游戏结束
        if (this.ball.y > this.paddle.y) {
            var s = new SceneEnd(this.game)
            this.game.changeScene(s)
        }
        // 判断是否进入下一关
        var blocksAlive = false
        for (var i = 0; i < this.blocks.length; i++) {
            var b = this.blocks[i]
            // log(b.alive)
            if (b.alive) {
                blocksAlive = true
            }
        }
        if (!blocksAlive) {
            if (this.level < levels.length) {
                this.level += 1
                this.blocks = loadLevel(this.level, this.game)
                alert(`恭喜进入第${this.level}关`)
            } else {
                var s = new SceneEnd(this.game)
                this.game.changeScene(s)
                alert('恭喜通关')
            }
        }
    }
    draw() {
        this.game.drawImg(this.paddle)
        this.game.drawImg(this.ball)

        // draw blocks
        for (var i = 0; i < this.blocks.length; i++){
            var b = this.blocks[i]
            if (b.alive){
                this.game.drawImg(b)
            }
        // draw score
        this.game.content.fillText(`score: ${this.score}`, 10, 290)
        }
    }
}
