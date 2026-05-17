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
 * 降龙十八掌技能图标飞向首充图标
 * liangyan
 * create 2018-03-12
*/
var SkillIconFlyEffect = (function (_super) {
    __extends(SkillIconFlyEffect, _super);
    function SkillIconFlyEffect() {
        var _this = _super.call(this) || this;
        _this.initView();
        _this.addEvent();
        return _this;
    }
    SkillIconFlyEffect.prototype.initView = function () {
        this._aniIcon = Manager.animation.createEffectAnimation("zqqg");
        this._aniIcon.gotoAndStop(1);
        this.addChild(this._aniIcon);
    };
    SkillIconFlyEffect.prototype.addEvent = function () {
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    SkillIconFlyEffect.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    SkillIconFlyEffect.prototype.tweenCallBack = function () {
        Manager.model.getLogin().home.switch(HomeView2.FIRST_CHARGE, true, true);
        Manager.view.hide(126 /* SkillIconFlyEffect */);
    };
    SkillIconFlyEffect.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - 105) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - 105) / 2;
    };
    SkillIconFlyEffect.prototype.show = function () {
        this.onResizeHandler(null);
        if (!this.parent) {
            Manager.model.getLogin().home.switch(HomeView2.FIRST_CHARGE, false, true);
            var pos = Manager.model.getLogin().home.getGlobalPos(HomeView2.FIRST_CHARGE);
            egret.Tween.get(this).wait(2000).to({ x: pos.x, y: pos.y }, 2000).call(this.tweenCallBack, this);
            Manager.layer.tipsLayer.addChild(this);
        }
    };
    SkillIconFlyEffect.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    SkillIconFlyEffect.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this.removeEvent();
        Manager.pool.push(this._aniIcon);
        this._aniIcon = null;
    };
    return SkillIconFlyEffect;
}(egret.DisplayObjectContainer));
__reflect(SkillIconFlyEffect.prototype, "SkillIconFlyEffect", ["IViewManager"]);
//# sourceMappingURL=SkillIconFlyEffect.js.map