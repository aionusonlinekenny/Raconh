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
 * 魔神降临骰子
 * liangyan
 * create 2018-04-17
*/
var DevilDiceItem = (function (_super) {
    __extends(DevilDiceItem, _super);
    function DevilDiceItem(value) {
        var _this = _super.call(this) || this;
        /**顶部限制偏移量 */
        _this.top = -180;
        /**底部限制偏移量 */
        _this.bottom = 180;
        /**左边限制偏移量 */
        _this.left = -180;
        /**右边限制偏移量 */
        _this.right = 180;
        _this._value = value;
        _this.start();
        _this.addEvent();
        return _this;
    }
    DevilDiceItem.prototype.start = function () {
        _super.prototype.start.call(this);
        this._back = BitmapRes.create("devil_ball_png");
        this.addChild(this._back);
        this._num = Manager.pool.create(NumImgView2);
        this._num.setValue(this._value, "nums_devil_", 16);
        if (this._value >= 100)
            this._num.x = 18;
        else if (this._value >= 10)
            this._num.x = 28;
        else
            this._num.x = 38;
        this._num.y = 34;
        this.addChild(this._num);
        this._radius = 49;
        this._offsetX = this._offsetY = 0;
        this._initX = 280;
        this._initY = 230;
        this._ratioX = Math.random() * 10 + 8;
        this._ratioY = Math.random() * 10 + 8;
    };
    DevilDiceItem.prototype.moving = function () {
        var radius = this._radius;
        this._offsetX += this._ratioX;
        this._offsetY += this._ratioY;
        if (this._offsetX + radius > this.right) {
            this._offsetX = this.right - radius;
            this._ratioX *= -1;
        }
        else if (this._offsetX - radius < this.left) {
            this._offsetX = this.left + radius;
            this._ratioX *= -1;
        }
        if (this._offsetY - radius < this.top) {
            this._offsetY = this.top + radius;
            this._ratioY *= -1;
        }
        else if (this._offsetY + radius > this.bottom) {
            this._offsetY = this.bottom - radius;
            this._ratioY *= -1;
        }
        this.x = this._initX + this._offsetX;
        this.y = this._initY + this._offsetY;
    };
    DevilDiceItem.prototype.setMoving = function () {
        Manager.render.add(this.moving, this);
    };
    DevilDiceItem.prototype.stop = function (x, y) {
        Manager.render.remove(this.moving, this);
        egret.Tween.removeTweens(this);
        egret.Tween.get(this, { loop: false }).to({ x: x, y: y }, 300);
    };
    DevilDiceItem.prototype.disposeSelf = function () {
        egret.Tween.removeTweens(this);
        Manager.render.remove(this.moving, this);
        _super.prototype.disposeSelf.call(this);
        if (this._back)
            Manager.pool.push(this._back);
        this._back = null;
        if (this._num)
            Manager.pool.push(this._num);
        this._num = null;
    };
    return DevilDiceItem;
}(RenderSprite));
__reflect(DevilDiceItem.prototype, "DevilDiceItem");
//# sourceMappingURL=DevilDiceItem.js.map