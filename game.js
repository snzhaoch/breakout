var Game = function(){
    var g = {
        actions: {},
        keydowns: {},
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
        // 火球移动等动作
        g.update()
        // clear
        g.content.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        loop()
    }
    var loop = function(){
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }
    loop()
    return g
}
