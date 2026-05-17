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
 *视图基类
 *devil
 *create 2017-11-01
 *update
*/
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(needAddToStage) {
        if (needAddToStage === void 0) { needAddToStage = false; }
        var _this = _super.call(this) || this;
        _this._disposeFlag = false;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        _this._needAddToStage = needAddToStage;
        return _this;
    }
    Sprite.prototype.start = function () { };
    Sprite.prototype.addEvent = function () {
        if (this._needAddToStage) {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.__addedToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
        }
    };
    Sprite.prototype.removeEvent = function () {
        if (this._needAddToStage) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.__addedToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStage, this);
        }
    };
    Sprite.prototype.__addedToStage = function (e) { };
    Sprite.prototype.__removeFromStage = function (e) { };
    Sprite.prototype.move = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Sprite.prototype.reuse = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.start();
        this.addEvent();
    };
    Sprite.prototype.unuse = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        this.removeEvent();
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.alpha = 1;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.visible = true;
        this.touchEnabled = false;
        this.touchChildren = false;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        this.mask = null;
    };
    Sprite.prototype.dispose = function () {
        if (!this._disposeFlag) {
            this._disposeFlag = true;
            this.disposeSelf();
        }
        else {
            Trace.error("Sprite同时删除多次");
        }
    };
    Sprite.prototype.disposeSelf = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        this.removeEvent();
    };
    return Sprite;
}(egret.DisplayObjectContainer));
__reflect(Sprite.prototype, "Sprite", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=Sprite.js.map