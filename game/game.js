class Game {
    // imgs 是一个对象，里面是图片的名称和引用路径
    constructor(imgs) {
        this.imgs = imgs
        this.canvas = document.querySelector('#id-canvas')
        this.content = this.canvas.getContext('2d')
        this.init()
    }
    // 预先载入所有图片，完成后执行程序
    init() {
        var onload_num = []
        var names = Object.keys(this.imgs)
        for (var i = 0; i < names.length; i++){
            var name = names[i]
            var path = this.imgs[name]
            var img = new Image()
            img.src = path
            // 将 img 保存
            this.imgs[name] = img
            var _this = this
            img.onload = function(){
                // js 图片载入是异步事件，需要判断是否所有图片加载成功
                onload_num.push(1)
                if  (onload_num.length === names.length){
                    _this.runWithScene(_this.scene)
                }
            }
        }
    }
    drawImg(img) {
        this.content.drawImage(img.img, img.x, img.y)
    }
    imageFromName(name) {
        return this.imgs[name]
    }
    changeScene(scene) {
        this.scene = scene
    }
    clearScene() {
        this.content.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    // loop
    runloop() {
        var scene = this.scene
        var actions = Object.keys(scene.actions)
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
        this.clearScene()
        // 火球移动等动作
        this.scene.update()
        // draw
        this.scene.draw()
        this.runWithScene(this.scene)
    }
    // run()
    runWithScene(scene) {
        this.scene = scene
        var _this = this
        setTimeout(function(){
            _this.runloop()
        }, 1000/window.fps)
    }
    // return g
}
