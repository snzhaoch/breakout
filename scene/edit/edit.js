class SceneEdit extends Scene {
    constructor (game) {
        super(game)
        this.colume = 7
        this.row = 10
        this.blocks = []
        this.level = 0
        this.init()
    }
    init() {
        super.init()
        for (var i = 0; i < this.row; i++) {
            for (var v = 0; v < this.colume; v++) {
                var img = this.game.imageFromName('block')
                var w = img.width
                var h = img.height
                var position = [w * v, h * i]
                var b = Block(position, this.game)
                b.alive = false
                this.blocks.push(b)
            }
        }

        var _this = this
        this.game.canvas.addEventListener('mousedown', function(event){
            var x = event.offsetX
            var y = event.offsetY
            for (var i = 0; i < _this.blocks.length; i++) {
                var b = _this.blocks[i]
                if (b.hasPoint(x, y)) {
                    b.alive = !b.alive
                    // b.alive = true
                }
            }
        })

        var saveButton = document.querySelector('#id-save-button')
        saveButton.attributes.visibility = 'visible'
        saveButton.addEventListener('click', function(){
            var level = _this.level
            var blocks = _this.blocks
            var position = []
            for (var i = 0; i < blocks.length; i++) {
                var p = blocks[i]
                if (p.alive){
                    var b = [p.x, p.y, 1]
                    position.push(b)
                }
            }
            _this.save(level, position)
        })

        var levelDiv = document.querySelector('#id-level-div')
        for (var i = 0; i < levels.length; i++) {
            var t = this.levelTemplate(i+1)
            levelDiv.insertAdjacentHTML('beforeend', t)
            let l = document.querySelector(`#id-level-${i+1}`)
            l.addEventListener('click', function(){
                _this.clearBlock()
                _this.level = l.value
                var blockPosition = levels[l.value-1]
                for (var v = 0; v < blockPosition.length; v++){
                    var b = blockPosition[v]
                    var x = b[0]
                    var y = b[1]
                    for (var s = 0; s < _this.blocks.length; s++) {
                        var b = _this.blocks[s]
                        if (b.hasPoint(x, y)) {
                            log(true)
                            log(b)
                            b.alive = true
                        }
                    }
                }
            })
        }



        this.registerAction(['y', 'Y'], function() {
            var s = new ScenePlay(_this.game)
            _this.game.changeScene(s)
        })
    }
    update() {

    }
    draw() {
        // draw blocks
        for (var i = 0; i < this.blocks.length; i++){
            var b = this.blocks[i]
            if (b.alive){
                this.game.drawImg(b)
            }
        }
    }
    save(level, blocks) {
        levels[level-1] = blocks
    }
    clearBlock() {
        for (var i = 0; i < this.blocks.length; i++) {
            var b = this.blocks[i]
            b.alive = false
        }
    }
    levelTemplate(level) {
        var t = `
        <input type="button" id="id-level-${level}" value="${level}"></input>
        `
        return t
    }
}
