class SceneEdit extends Scene {
    constructor (game) {
        super(game)
        this.colume = 7
        this.row = 10
        this.blocks = []
        this.level = -1
        this.init()
    }
    init() {
        super.init()
        this.displayInfo()

        // 初始化 this.blocks
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
            if (_this.level === -1){
                alert('请先选择关卡！')
                return
            }
            var x = event.offsetX
            var y = event.offsetY
            log(x, y)
            for (var i = 0; i < _this.blocks.length; i++) {
                var b = _this.blocks[i]
                if (b.hasPoint(x, y)) {
                    b.alive = !b.alive
                }
            }
        })

        var saveButton = document.querySelector('#id-level-save')
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
            alert('保存成功')
        })

        var addButton = document.querySelector('#id-level-add')
        addButton.addEventListener('click', function(){
            levels.push([])
            _this.clearLevelDiv()
            _this.displayLevel()
        })

        var deleteButton = document.querySelector('#id-level-delete')
        deleteButton.addEventListener('click', function(){
            var l = _this.level
            if (l === -1) {
                alert('请先选中关卡！')
                return
            }
            levels.splice(l-1, 1)
            _this.clearLevelDiv()
            _this.clearBlock()
            _this.displayLevel()
            _this.level = -1
        })

        this.registerAction(['y', 'Y'], function() {
            _this.hiddenInfo()
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

        this.game.content.moveTo(0, 200)
        this.game.content.lineTo(400, 200)
        this.game.content.stroke()

        this.game.content.fillText('在此区域编辑关卡', 160, 120)
        this.game.content.fillText('摁 Y 开始游戏', 170, 260)
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
    displayInfo() {
        this.displayLevel()
        var es = this.achieveElements()
        var types = Object.keys(es)
        for (var i = 0; i < types.length; i++) {
            var t = types[i]
            var _es = es[t]
            for (var i = 0; i < _es.length; i++) {
                var e = _es[i]
                e.style.display = t
            }
        }
    }
    hiddenInfo() {
        var es = this.achieveElements()
        var types = Object.keys(es)
        for (var i = 0; i < types.length; i++) {
            var t = types[i]
            var _es = es[t]
            for (var v = 0; v < _es.length; v++) {
                var e = _es[v]
                e.style.display = 'none'
            }
        }
    }
    levelTemplate(level) {
        var t = `
        <input type="button" id="id-level-${level}" value="${level}" class="level"></input>
        `
        return t
    }
    displayLevel() {
        var _this = this
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
                            b.alive = true
                        }
                    }
                }
            })
        }
    }
    achieveElements() {
        var es = {
            'block': [],
            'inline-block': [],
        }
        var h3 = document.querySelector('#id-level-choice')
        var saveButton = document.querySelector('#id-level-save')
        var addButton = document.querySelector('#id-level-add')
        var deleteButton = document.querySelector('#id-level-delete')
        es['block'].push(h3)
        es['block'].push(saveButton)
        es['block'].push(addButton)
        es['block'].push(deleteButton)
        for (var i = 0; i < levels.length; i++) {
            var l = document.querySelector(`#id-level-${i+1}`)
            es['inline-block'].push(l)
        }
        return es
    }
    clearLevelDiv() {
        var levelDiv = document.querySelector('#id-level-div')
        levelDiv.innerHTML = ''
    }
}
