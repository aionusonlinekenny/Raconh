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
 * 采集特效
 * liangyan
 * create 2018-03-16
*/
var CollectEffect = (function (_super) {
    __extends(CollectEffect, _super);
    function CollectEffect() {
        var _this = _super.call(this) || this;
        _this.skinName = "";
        return _this;
    }
    CollectEffect.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    CollectEffect.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    CollectEffect.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    CollectEffect.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.onResizeHandler(null);
    };
    CollectEffect.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth * 0.5) - 125;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight * 0.6);
    };
    CollectEffect.prototype.show = function (id, complete, completeTarget) {
        if (id === void 0) { id = "caiji"; }
        if (complete === void 0) { complete = null; }
        if (!this.parent) {
            this._ani = Manager.animation.createEffectAnimation(id, ResPriorityType.LOAD_LEVEL3, true, false);
            this._ani.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.aniPlayComplete, this);
            this.addChild(this._ani);
            this._complete = complete;
            this._completeTarget = completeTarget;
            Manager.layer.uiImageLayer.addChild(this);
        }
    };
    CollectEffect.prototype.aniPlayComplete = function () {
        if (this._complete)
            this._complete.call(this._completeTarget);
        Manager.view.hide(132 /* CollectEffect */);
    };
    CollectEffect.prototype.poolPushAni = function () {
        if (this._ani == null)
            return;
        Manager.pool.push(this._ani);
        this._ani.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.aniPlayComplete, this);
        this._ani = null;
    };
    CollectEffect.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    CollectEffect.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.poolPushAni();
        this._complete = null;
        this._completeTarget = null;
    };
    return CollectEffect;
}(UIComponent));
__reflect(CollectEffect.prototype, "CollectEffect", ["IViewManager"]);
//# sourceMappingURL=CollectEffect.js.map