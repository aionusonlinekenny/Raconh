var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var JieNumView = (function (_super) {
    __extends(JieNumView, _super);
    function JieNumView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("uiCommon", "JieNumViewSkin");
        return _this;
    }
    JieNumView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._num) {
            this._num = Manager.pool.create(NumImgView2);
            this._num.x = this._left.x + 16;
            this._num.y = this._left.y;
            this.addChild(this._num);
        }
    };
    JieNumView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    JieNumView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    JieNumView.prototype.drawData = function () {
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
    Object.defineProperty(JieNumView.prototype, "jie", {
        set: function (value) {
            if (this._curNum == value)
                return;
            this._curNum = value;
            this.invalidate(InvalidationType.DATA);
        },
        enumerable: true,
        configurable: true
    });
    JieNumView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._left, this._right, this._jie, this._num);
        this._left.bitmapData = null;
        this._left = null;
        this._right.bitmapData = null;
        this._right = null;
        this._jie.bitmapData = null;
        this._jie = null;
        Manager.pool.push(this._num);
        this._num = null;
    };
    return JieNumView;
}(UIComponent));
__reflect(JieNumView.prototype, "JieNumView");
//# sourceMappingURL=JieNumView.js.map