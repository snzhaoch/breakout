var Scene = function(game) {
    var s = {
        game: game,
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

    //  注册按键及响应事件
    game.registerAction(['a', 'ArrowLeft'], function(){
        paddle.moveLeft()
    })
    game.registerAction(['d', 'ArrowRight'], function(){
        paddle.moveRight()
    })
    game.registerAction(['f'], function(){
        ball.fire()
    })
    window.addEventListener('keydown', function(event){
        // 暂停和恢复功能
        console.log(event);
        if (event.key === 'p'){
            pause = !pause
        }
        // 载入新关卡
        var l = Number(event.key)
        var l_max = levels.length
        if (0 < l && l < l_max + 1){
            level = l
            blocks = loadLevel(level, game)
        } else if (l > l_max) {
            alert(`没有第${l}关卡！(关卡最大为${l_max})`)
        }
    })

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
