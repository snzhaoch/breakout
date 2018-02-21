var ScenePlay = function(game) {
    var s = {
        game: game,
        actions: {},
        keydowns: {},
    }

    // 初始化场景对象
    var paddle = Paddle(game)
    var ball = Ball(game)

    // 分数初始值
    var score = 0

    // 载入默认关卡
    var level = 1
    var blocks = loadLevel(level, game)

    // 设置暂停初始值
    var pause = false

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
    //  注册按键及响应事件
    s.registerAction(['a', 'ArrowLeft'], function(){
        paddle.moveLeft()
    })
    s.registerAction(['d', 'ArrowRight'], function(){
        paddle.moveRight()
    })
    s.registerAction(['f'], function(){
        ball.fire()
    })
    // 暂停和恢复功能
    s.registerAction(['p'], function(){
        pause = !pause
    })
    // 载入新关卡
    var level_array = Array.from({length: levels.length}, (v, i) => i)
    for (var i = 0; i < level_array.length; i++) {
        let level = level_array[i] + 1
        s.registerAction([level], function(){
            loadLevel(level, game)
            blocks = loadLevel(level, game)

        })
    }

    //  fps 绑定滑动条
    var f = document.querySelector('input')
    f.addEventListener('change', function(event){
        window.fps = Number(document.querySelector('input').value)
    })

    // 点击拖动 ball
    enableDrag = false
    game.canvas.addEventListener('mousedown', function(event){
        var x = event.offsetX
        var y = event.offsetY
        if (ball.hasPoint(x, y)){
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event){
        if (enableDrag){
            var x = event.offsetX
            var y = event.offsetY
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event){
        enableDrag = false
    })


    s.update = function() {
        if (pause === true){
              return
        }
        ball.move()
        // 判断相撞
        if (paddle.collide(ball) === true){
            ball.rebound()
        }
        // ball 和 block 相撞时获取分数
        for (var i = 0; i < blocks.length; i++){
            var b = blocks[i]
            if (b.collide(ball) === true){
                ball.rebound()
                b.hit()
                score += 10
            }
        }
        // 判断游戏结束
        if (ball.y > paddle.y) {
            var s = SceneEnd(game)
            game.changeScene(s)
        }
    }
    s.draw = function() {
      game.drawImg(paddle)
      game.drawImg(ball)

      // draw blocks
      for (var i = 0; i < blocks.length; i++){
          var b = blocks[i]
          if (b.alive){
              game.drawImg(b)
          }
      // draw score
      game.content.fillText(`score: ${score}`, 10, 290)
      }
    }
    return s
}
