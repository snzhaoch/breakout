var Game = function(imgs){
    // imgs 是一个对象，里面是图片的名称和引用路径
    var g = {
        actions: {},
        keydowns: {},
        imgs: {},
    }

    var canvas = document.querySelector('#id-canvas')
    var content = canvas.getContext('2d')
    g.canvas = canvas
    g.content = content
    // drawImage
    g.drawImg = function(img){
        g.content.drawImage(img.img, img.x, img.y)
    }
    // events
    window.addEventListener('keydown', function(event){
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event){
        g.keydowns[event.key] = false
    })
    // register function
    g.registerAction = function(keys, func){
        for (var i = 0; i < keys.length; i++){
            var key = keys[i]
            g.actions[key] = func
        }
    }
    g.imageFromName = function(name){
        return g.imgs[name]
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
                run()
            }
        }
    }
    // loop
    var runloop = function(){
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++){
            var key = actions[i]
            var func = g.actions[key]
            if (g.keydowns[key] != undefined && g.keydowns[key]!= false){
                console.log(key, func);
                func()
            }
        }
        // clear
        g.content.clearRect(0, 0, canvas.width, canvas.height)
        // 火球移动等动作
        g.update()
        // draw
        g.draw()
        run()
    }
    // run()
    var run = function(){
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }
    return g
}
