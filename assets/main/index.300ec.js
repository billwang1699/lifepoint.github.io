window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  cell: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e1708x3B4ZBmallOr8A9pGV", "cell");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        colorNode: cc.Node
      },
      setState: function setState(state) {
        void 0 === state && (state = 0);
        this.state = state;
        0 == this.state ? this.colorNode.color = new cc.color(255, 255, 255) : this.colorNode.color = new cc.color(0, 0, 0);
      },
      switchState: function switchState() {
        var state = 0 == this.state ? 1 : 0;
        this.setState(state);
      }
    });
    cc._RF.pop();
  }, {} ],
  game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "55856iajYdOZLndhNtbga07", "game");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        cellPrefab: cc.Prefab,
        cellAreaNode: cc.Node
      },
      onLoad: function onLoad() {
        this.maxSize = 10;
        this.maxWCnt = this.cellAreaNode.width / this.maxSize;
        this.maxHCnt = this.cellAreaNode.height / this.maxSize;
        this.tt = 0;
        this.pause = true;
        this.cellNodeArr = [];
        for (var i = 0; i < this.maxHCnt; i++) {
          this.cellNodeArr[i] = [];
          for (var j = 0; j < this.maxWCnt; j++) {
            var cellNode = cc.instantiate(this.cellPrefab);
            cellNode.setPosition(cc.v2(j * this.maxSize, i * this.maxSize));
            cellNode.getComponent("cell").setState(0);
            this.cellAreaNode.addChild(cellNode);
            this.cellNodeArr[i][j] = cellNode;
          }
        }
        this.cellAreaNode.on("touchstart", this.onTouchStart, this);
      },
      onTouchStart: function onTouchStart(e) {
        var pos = e.getLocation();
        var n_pos = this.cellAreaNode.convertToNodeSpaceAR(pos);
        var i = parseInt(n_pos.y / this.maxSize);
        var j = parseInt(n_pos.x / this.maxSize);
        var cellNode = this.cellNodeArr[i][j];
        cellNode.getComponent("cell").switchState();
      },
      update: function update(dt) {
        if (this.pause) return;
        this.tt += dt;
        if (this.tt >= .1) {
          this.tt = 0;
          this.lifeChange();
        }
      },
      pauseGame: function pauseGame() {
        this.pause = !this.pause;
        cc.find("Canvas/bg/pauseBtn/Background/Label").getComponent(cc.Label).string = this.pause ? "\u958b\u59cb" : "\u66ab\u505c";
      },
      lifeChange: function lifeChange() {
        var nowStateMap = [];
        var nextStateMap = [];
        for (var i = 0; i < this.maxHCnt; i++) {
          nowStateMap[i] = [];
          nextStateMap[i] = [];
          for (var j = 0; j < this.maxWCnt; j++) {
            var cellState = this.cellNodeArr[i][j].getComponent("cell").state;
            nowStateMap[i][j] = cellState;
            nextStateMap[i][j] = cellState;
          }
        }
        for (var _i = 0; _i < this.maxHCnt; _i++) for (var _j = 0; _j < this.maxWCnt; _j++) {
          var state = this.cellLifeCheck(nowStateMap, {
            i: _i,
            j: _j
          });
          1 != state && 0 != state || (nextStateMap[_i][_j] = state);
        }
        for (var _i2 = 0; _i2 < this.maxHCnt; _i2++) for (var _j2 = 0; _j2 < this.maxWCnt; _j2++) {
          var _cellState = nextStateMap[_i2][_j2];
          this.cellNodeArr[_i2][_j2].getComponent("cell").setState(_cellState);
        }
      },
      cellLifeCheck: function cellLifeCheck(stateMap, index) {
        var grid = [ {
          i: 1,
          j: -1
        }, {
          i: 1,
          j: 0
        }, {
          i: 1,
          j: 1
        }, {
          i: 0,
          j: -1
        }, {
          i: 0,
          j: 1
        }, {
          i: -1,
          j: -1
        }, {
          i: -1,
          j: 0
        }, {
          i: -1,
          j: 1
        } ];
        var totalLife = 0;
        for (var _i3 = 0, _grid = grid; _i3 < _grid.length; _i3++) {
          var g = _grid[_i3];
          var i = g.i + index.i;
          var j = g.j + index.j;
          i >= this.maxHCnt && (i = 0);
          j >= this.maxWCnt && (j = 0);
          i < 0 && (i = this.maxHCnt - 1);
          j < 0 && (j = this.maxWCnt - 1);
          var cellState = stateMap[i][j];
          0 != cellState && totalLife++;
        }
        return 3 == totalLife ? 1 : 2 == totalLife ? -1 : 0;
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "cell", "game" ]);