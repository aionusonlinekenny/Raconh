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
 * boss复活界面
 * luzh
 * create 2017-12.25
*/
var BossReviveView = /** @class */ (function (_super) {
    __extends(BossReviveView, _super);
    function BossReviveView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("boss", "BossReviveViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    BossReviveView.prototype.show = function (id) {
        this._cvo = BossCVO.getCVO(id);
        if (this.parent == null) {
            this.onResizeHandler(null);
            Manager.layer.uiLayer.addChild(this);
        }
        this.invalidate(InvalidationType.DATA);
    };
    BossReviveView.prototype.hide = function () {
        this.dispose();
    };
    BossReviveView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._name.text = this._cvo.boss.name + " Lv." + this._cvo.boss.level;
    };
    BossReviveView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    BossReviveView.prototype.removeEvent = function () {
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    BossReviveView.prototype.onResizeHandler = function (e) {
        this.width = Manager.global.gameMain.stage.stageWidth;
    };
    BossReviveView.prototype.onTouchHandler = function (e) {
        switch (e.currentTarget) {
            case this._btn:
                Manager.view.show(30 /* BossPanel */, 1);
                break;
        }
        Manager.view.hide(31 /* BossReviveView */);
    };
    BossReviveView.prototype.enterBoss = function (id) {
        Manager.control.getBoss().enter(id);
    };
    BossReviveView.prototype.drawData = function () {
        this._name.text = this._cvo.boss.name + " Lv." + this._cvo.boss.level;
        this._head.load(Manager.path.getBossHeadPath(this._cvo.boss.url));
    };
    BossReviveView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    BossReviveView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    BossReviveView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._name, this._head, this._btn, this._closeBtn);
        this._name = null;
        this._head = null;
        this._btn = null;
        this._closeBtn = null;
        this._cvo = null;
    };
    return BossReviveView;
}(UIComponent));
//# sourceMappingURL=BossReviveView.js.map