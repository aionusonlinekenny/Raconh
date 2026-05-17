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
 * drq
 * 聚元 Ball
 * 2018.4.3
 */
var JuyuanBall = (function (_super) {
    __extends(JuyuanBall, _super);
    function JuyuanBall(index, cvo) {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("juyuan", "JuyuanBallSkin");
        _this._source = "juyuan_icon_" + (index + 1) + "_png";
        _this.touchChildren = true;
        _this.touchEnabled = false;
        _this._cvo = cvo;
        _this._index = index;
        return _this;
    }
    JuyuanBall.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._img.source = this._source;
    };
    JuyuanBall.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ballClick, this);
    };
    JuyuanBall.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ballClick, this);
    };
    JuyuanBall.prototype.ballClick = function () {
        Manager.view.show(139 /* JuyuanItem */, this._cvo, this._index);
    };
    JuyuanBall.prototype.setTouch = function (isTouch) {
        this.touchEnabled = isTouch;
    };
    JuyuanBall.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._img);
        this._img = null;
        this._source = null;
        this._cvo = null;
        this._index = null;
    };
    return JuyuanBall;
}(UIComponent));
__reflect(JuyuanBall.prototype, "JuyuanBall");
//# sourceMappingURL=JuyuanBall.js.map