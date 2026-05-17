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
 * boss单层血条
 * liangyan
 * create 2017-12-13
 * @update devil 2018-04-20
*/
var BaseBossBloodStrip2 = (function (_super) {
    __extends(BaseBossBloodStrip2, _super);
    function BaseBossBloodStrip2(uiImageLayer, uiLayer) {
        var _this = _super.call(this, uiImageLayer, uiLayer) || this;
        _this._curIndex = -1;
        _this._sourceArr = ["strip_red_png", "strip_orange_png", "strip_purple_png", "strip_blue_png", "strip_green_png"];
        return _this;
    }
    BaseBossBloodStrip2.prototype.start = function () {
        _super.prototype.start.call(this);
        this._bloodTween = BitmapRes.create("strip_alpha50_png", 0, 1, BaseBossBloodStrip2.WIDTH, 24);
        this._imageLayer.addChild(this._bloodTween);
        this._blood = BitmapRes.create("", 0, 0, BaseBossBloodStrip2.WIDTH, 26);
        this._imageLayer.addChild(this._blood);
    };
    Object.defineProperty(BaseBossBloodStrip2.prototype, "index", {
        set: function (value) {
            if (this._curIndex == value)
                return;
            this._curIndex = value;
            this._isInit = true;
            this._blood.source = this._sourceArr[this._curIndex % 5];
            this.updatePercent(1);
            this._bloodTween.scaleX = 1;
        },
        enumerable: true,
        configurable: true
    });
    BaseBossBloodStrip2.prototype.setPer = function (per) {
        _super.prototype.setPer.call(this, per);
        this._blood.width = BaseBossBloodStrip2.WIDTH * per;
    };
    BaseBossBloodStrip2.prototype.updatePercent = function (value) {
        if (this._bloodTween.scaleX < value)
            this._bloodTween.scaleX = 1;
        _super.prototype.updatePercent.call(this, value, false);
        egret.Tween.removeTweens(this._bloodTween);
        egret.Tween.get(this._bloodTween, { loop: false }).to({ scaleX: value }, 1500);
    };
    BaseBossBloodStrip2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        egret.Tween.removeTweens(this._bloodTween);
        this._blood.pool();
        this._blood = null;
        this._bloodTween.pool();
        this._bloodTween = null;
        this._sourceArr = null;
    };
    BaseBossBloodStrip2.WIDTH = 406;
    return BaseBossBloodStrip2;
}(BaseStripView2));
__reflect(BaseBossBloodStrip2.prototype, "BaseBossBloodStrip2");
//# sourceMappingURL=BaseBossBloodStrip2.js.map