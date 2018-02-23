class Scene {
    constructor(game) {
        this.game = game
        this.actions = {}
        this.keydowns = {}
    }
    init() {
        this.registerAction = function(keys, func, sleeptime) {
            for (var i = 0; i < keys.length; i++) {
              var k = keys[i]
              if (sleeptime) {
                  this.actions[k] = {
                    func: func,
                    sleeptime: sleeptime,
                    sleeping: 0,
                  }
              } else {
                  this.actions[k] = {
                      func: func,
                      sleeptime: null,
                      sleeping: false,
                  }
              }
            }
        }
        var _this = this
        window.addEventListener('keydown', function(event) {
          var k = event.key
          _this.keydowns[k] = true
        }),
        window.addEventListener('keyup', function(event) {
          var k = event.key
          // this.bind(this)
          _this.keydowns[k] = false
        })
    }

    update() {

    }
    draw() {

    }
}
