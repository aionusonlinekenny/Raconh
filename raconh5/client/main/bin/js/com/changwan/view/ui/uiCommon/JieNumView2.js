var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 阶数视图
 * liangyan
 * create 2018-02-27
*/
var JieNumView2 = /** @class */ (function (_super) {
    __extends(JieNumView2, _super);
    function JieNumView2() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        _this.start();
        _this.addEvent();
        return _this;
    }
    JieNumView2.prototype.start = function () {
        _super.prototype.start.call(this);
        this._left = BitmapRes.create("common_bracket_png", -8, 4);
        this.addChild(this._left);
        this._right = BitmapRes.create("common_bracket_png", 82, 4);
        this._right.scaleX = -1;
        this.addChild(this._right);
        this._jie = BitmapRes.create("common_label_jie_png", 32, 3);
        this.addChild(this._jie);
        this._num = Manager.pool.create(NumImgView2);
        this._num.x = this._left.x + 16;
        this._num.y = this._left.y;
        this.addChild(this._num);
    };
    JieNumView2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    JieNumView2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    JieNumView2.prototype.drawData = function () {
        if (!this._curNum)
            return;
        this._num.setValue(this._curNum, "nums_jie_", 12);
        if (this._curNum >= 10) {
            this._jie.x = 44;
            this._right.x = 94;
        }
        else {
            this._jie.x = 32;
            this._right.x = 82;
        }
    };
    Object.defineProperty(JieNumView2.prototype, "jie", {
        set: function (value) {
            if (this._curNum == value)
                return;
            this._curNum = value;
            this.invalidate(InvalidationType.DATA);
        },
        enumerable: true,
        configurable: true
    });
    JieNumView2.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        if (this._left) {
            Manager.pool.push(this._left);
            this._left = null;
        }
        if (this._right) {
            Manager.pool.push(this._right);
            this._right = null;
        }
        if (this._jie) {
            Manager.pool.push(this._jie);
            this._jie = null;
        }
        if (this._num) {
            Manager.pool.push(this._num);
            this._num = null;
        }
    };
    return JieNumView2;
}(RenderSprite));
//# sourceMappingURL=JieNumView2.js.map