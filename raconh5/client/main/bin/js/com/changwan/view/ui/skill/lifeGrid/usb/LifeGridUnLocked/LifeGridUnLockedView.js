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
 * 新命格框解锁-面板
 * pzx
 * create 2018-2-12
*/
var LifeGridUnLockedView = /** @class */ (function (_super) {
    __extends(LifeGridUnLockedView, _super);
    function LifeGridUnLockedView() {
        var _this = _super.call(this) || this;
        _this.initView();
        _this.addEvent();
        return _this;
    }
    LifeGridUnLockedView.prototype.initView = function () {
        this._bgImg = Manager.pool.create(BitmapRemote);
        this._bgImg.x = 50;
        this._bgImg.y = 528;
        this._bgImg.load(PathInfo.getPath("res/lifeGrid/common_kaiqi2.png", LoaderType.IMAGE));
        this.addChild(this._bgImg);
        this._labelImg = BitmapRes.create("newLifeGrid_jiesuomingge_png", 196, 658);
        this.addChild(this._labelImg);
        this._skillIcon = Manager.pool.create(BitmapRemote, null, 86, 86);
        this._skillIcon.x = 323;
        this._skillIcon.y = 552;
        this.addChild(this._skillIcon);
        this.touchEnabled = true;
        this.onResizeHandler(null);
    };
    LifeGridUnLockedView.prototype.addEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    LifeGridUnLockedView.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    LifeGridUnLockedView.prototype.onTouchHandler = function (e) {
        this.onHideEff();
    };
    LifeGridUnLockedView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - 620) / 2;
    };
    LifeGridUnLockedView.prototype.onHideEff = function () {
        Manager.render.remove(this.onHideEff, this);
        this._bgImg.visible = false;
        this._labelImg.visible = false;
        var target = Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR, HomeView2.SKILL_POS);
        var target2 = this._skillIcon.parent.localToGlobal(this._skillIcon.x, this._skillIcon.y);
        var target3 = target.subtract(target2);
        var target4 = target3.add(new egret.Point(this._skillIcon.x, this._skillIcon.y));
        egret.Tween.get(this._skillIcon).to({ x: target4.x, y: target4.y }, 1000).call(this.tweenCallBack, this);
    };
    LifeGridUnLockedView.prototype.tweenCallBack = function () {
        if (Manager.model.getCopy().towerModel.canChallenge(false)) {
            Manager.view.show(62 /* TowerCopyWinView */, this._infos, this._countDownTime, this._callback);
        }
        else {
            Manager.view.show(26 /* CopyResultWin */, this._infos, this._countDownTime, this._callback);
        }
        Manager.view.hide(114 /* LifeGridUnLockedView */);
    };
    LifeGridUnLockedView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._infos = args[0];
        this._countDownTime = args[1];
        this._callback = args[2];
        // 小于10为命格框，大于1000为命格id
        this._lifeGridId = args[3];
        this.darwData();
        Manager.layer.tipsLayer.addChild(this);
    };
    LifeGridUnLockedView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    LifeGridUnLockedView.prototype.darwData = function () {
        this._skillIcon.reuse(null);
        if (this._lifeGridId < 10) {
            this._skillIcon.load(Manager.path.getPanelLifeGridPath("/icon/lifeGrid_add.png", "", LoaderType.IMAGE));
            this._skillIcon.x = 333;
            this._skillIcon.y = 563;
            this._labelImg.source = "newLifeGrid_jiesuomingge_png";
        }
        else {
            var cvo = ItemsCVO.getCvo(this._lifeGridId);
            this._skillIcon.load(Manager.path.getIconPath(cvo.imgId));
            this._skillIcon.x = 323;
            this._skillIcon.y = 552;
            this._labelImg.source = "newLifeGrid_jiesuoxinmingge_png";
        }
        Manager.render.add(this.onHideEff, this, 3000, 1);
    };
    LifeGridUnLockedView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._skillIcon);
        Manager.render.remove(this.onHideEff, this);
        this.removeEvent();
        Manager.pool.push(this._bgImg);
        this._bgImg = null;
        Manager.pool.push(this._skillIcon);
        this._skillIcon = null;
        Manager.pool.push(this._labelImg);
        this._labelImg = null;
        this._infos = null;
        this._countDownTime = 0;
        this._callback = null;
    };
    return LifeGridUnLockedView;
}(egret.DisplayObjectContainer));
//# sourceMappingURL=LifeGridUnLockedView.js.map