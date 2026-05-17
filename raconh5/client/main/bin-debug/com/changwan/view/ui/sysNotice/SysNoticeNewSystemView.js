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
 * pzx
 * 17.12.19
 * 获取功能--面板
 */
var SysNoticeNewSystemView = (function (_super) {
    __extends(SysNoticeNewSystemView, _super);
    function SysNoticeNewSystemView() {
        var _this = _super.call(this) || this;
        _this.initView();
        _this.addEvent();
        return _this;
    }
    SysNoticeNewSystemView.prototype.initView = function () {
        this._backImg = BitmapRes.create("sysNotice_gongnengkaiqi_png", 50, 468);
        this.addChild(this._backImg);
        this._skillIcon = Manager.pool.create(BitmapRemote, null, 85, 80);
        this._skillIcon.x = 315;
        this._skillIcon.y = 498;
        this.addChild(this._skillIcon);
        this.touchEnabled = true;
    };
    SysNoticeNewSystemView.prototype.addEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    SysNoticeNewSystemView.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    SysNoticeNewSystemView.prototype.onTouchHandler = function (e) {
        this.onHideEff();
    };
    SysNoticeNewSystemView.prototype.onHideEff = function () {
        Manager.render.remove(this.onHideEff, this);
        this._backImg.visible = false;
        // let target = Manager.model.getLogin().homeView.getBtnPoint(this._pointId);
        // let btn:egret.DisplayObject = Manager.model.getLogin().homeView.getPanelBtn(this._pointId);
        var target;
        // if(btn)target = btn.parent.localToGlobal(btn.x,btn.y);
        target = Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR, this._pointId);
        if (target) {
            target = this.globalToLocal(target.x, target.y);
            egret.Tween.get(this._skillIcon).to({ x: target.x, y: target.y }, 1000).call(this.hideView, this);
        }
        else {
            this.hideView();
        }
    };
    SysNoticeNewSystemView.prototype.hideView = function () {
        Manager.view.hide(48 /* SysNoticeNewSystemView */);
    };
    SysNoticeNewSystemView.prototype.show = function (iconID, pointId) {
        if (pointId === void 0) { pointId = 2; }
        if (!this.parent) {
            this._skillIcon.reuse(null);
            this._skillIcon.load(Manager.path.getSysnoticePath("icon/" + iconID));
            Manager.render.add(this.onHideEff, this, 3000, 1);
            Manager.layer.uiLayer.addChild(this);
        }
        this._pointId = pointId;
    };
    SysNoticeNewSystemView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    SysNoticeNewSystemView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._skillIcon);
        Manager.render.remove(this.onHideEff, this);
        this.removeEvent();
        Manager.pool.push(this._backImg);
        this._backImg = null;
        Manager.pool.push(this._skillIcon);
        this._skillIcon = null;
    };
    return SysNoticeNewSystemView;
}(egret.DisplayObjectContainer));
__reflect(SysNoticeNewSystemView.prototype, "SysNoticeNewSystemView", ["IViewManager"]);
//# sourceMappingURL=SysNoticeNewSystemView.js.map