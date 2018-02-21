var Game = function(imgs){
    // imgs 是一个对象，里面是图片的名称和引用路径
    var g = {
        imgs: {},
    }

    var canvas = document.querySelector('#id-canvas')
    var content = canvas.getContext('2d')
    g.canvas = canvas
    g.content = content
    g.drawImg = function(img){
        g.content.drawImage(img.img, img.x, img.y)
    }
    g.imageFromName = function(name) {
        return g.imgs[name]
    }
    g.changeScene = function(scene) {
        g.scene = scene
    }
    g.clearScene = function() {
        g.content.clearRect(0, 0, canvas.width, canvas.height)
    }
    // 预先载入所有图片，完成后执行程序
    var onload_num = []
    var names = Object.keys(imgs)
    for (var i = 0; i < names.length; i++){
        var name = names[i]
        var path = imgs[name]
        var img = new Image()
        img.src = path
        // 将 img 保存
        g.imgs[name] = img
        img.onload = function(){
            // js 图片载入是异步事件，需要判断是否所有图片加载成功
            onload_num.push(1)
            if  (onload_num.length === names.length){
                runWithScene(g.scene)
            }
        }
    }
    // loop
    var runloop = function(){
        var scene = g.scene
        var actions = Object.keys(scene.actions)
        // log(actions)
        for (var i = 0; i < actions.length; i++){
            var key = actions[i]
            var action = scene.actions[key]
            var func = action.func
            var sleeptime = action.sleeptime
            var sleeping = action.sleeping
            if (scene.keydowns[key]){
                if (sleeping === false || sleeping >= sleeptime){
                    func()
                }
                if (sleeping >= sleeptime){
                    action.sleeping = 0
                }
            }
            // func cd
            if (sleeping !== false && sleeping < sleeptime) {
                action.sleeping += 1/window.fps
            }

        }
        // clear
        g.clearScene()
        // 火球移动等动作
        g.scene.update()
        // draw
        g.scene.draw()
        runWithScene(g.scene)
    }
    // run()
    var runWithScene = function(scene){
        g.scene = scene
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }

    return g
}
