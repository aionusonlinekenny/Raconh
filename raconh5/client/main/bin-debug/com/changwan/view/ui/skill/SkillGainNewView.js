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
 * 获取新技能--面板
 * liangyan
 * create 2017-11-21
*/
var SkillGainNewView = (function (_super) {
    __extends(SkillGainNewView, _super);
    function SkillGainNewView() {
        var _this = _super.call(this) || this;
        _this.initView();
        _this.addEvent();
        return _this;
    }
    SkillGainNewView.prototype.initView = function () {
        this._backImg = BitmapRes.create("skill_gain_new_back_png", 50, 528);
        this.addChild(this._backImg);
        this._skillIcon = Manager.pool.create(BitmapRemote, null, 86, 86);
        this._skillIcon.x = 323;
        this._skillIcon.y = 552;
        this.addChild(this._skillIcon);
        this.touchEnabled = true;
    };
    SkillGainNewView.prototype.addEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    SkillGainNewView.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    SkillGainNewView.prototype.onTouchHandler = function (e) {
        this.onHideEff();
    };
    SkillGainNewView.prototype.onHideEff = function () {
        Manager.render.remove(this.onHideEff, this);
        this._backImg.visible = false;
        var target = Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR, HomeView2.SKILL_POS);
        var target2 = this._skillIcon.parent.localToGlobal(this._skillIcon.x, this._skillIcon.y);
        var target3 = target.subtract(target2);
        var target4 = target3.add(new egret.Point(this._skillIcon.x, this._skillIcon.y));
        egret.Tween.get(this._skillIcon).to({ x: target4.x, y: target4.y }, 1000).call(this.hideCallback, this);
    };
    SkillGainNewView.prototype.hideCallback = function () {
        Manager.view.hide(3 /* SkillGainNewView */);
    };
    SkillGainNewView.prototype.show = function (iconID) {
        if (!this.parent) {
            this._skillIcon.load(Manager.path.getSkillIconPath(iconID));
            Manager.render.add(this.onHideEff, this, 3000, 1);
            Manager.layer.uiLayer.addChild(this);
        }
    };
    SkillGainNewView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    SkillGainNewView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._skillIcon);
        Manager.render.remove(this.onHideEff, this);
        this.removeEvent();
        Manager.pool.push(this._backImg);
        this._backImg = null;
        Manager.pool.push(this._skillIcon);
        this._skillIcon = null;
    };
    return SkillGainNewView;
}(egret.DisplayObjectContainer));
__reflect(SkillGainNewView.prototype, "SkillGainNewView", ["IViewManager"]);
//# sourceMappingURL=SkillGainNewView.js.map