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
 * 一键删除确认界面
 * liangyan
 * create 2018-03-06
*/
var FriendsConfirmView = (function (_super) {
    __extends(FriendsConfirmView, _super);
    function FriendsConfirmView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("friends/blackList", "FriendsConfirmViewSkin");
        return _this;
    }
    FriendsConfirmView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._popView.titleImg.source = "friends_btn_all_delete_png";
        this._txt.text = LangCVO.getContent("friends1"); //是否确定一键删除所有黑名单？
        this.onResizeHandler(null);
    };
    FriendsConfirmView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._popView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    FriendsConfirmView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._popView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FriendsConfirmView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    FriendsConfirmView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._popView.closeBtn:
            case this._cancelBtn:
                Manager.view.hide(116 /* FriendsConfirmView */);
                break;
            case this._confirmBtn:
                if (this._ids.length > 0)
                    Manager.control.getFriends().batchOperate(0, FriendsType.BLACK, this._ids);
                Manager.view.hide(116 /* FriendsConfirmView */);
                break;
        }
    };
    FriendsConfirmView.prototype.show = function (ids) {
        this._ids = ids;
        if (!this.parent)
            Manager.layer.tipsLayer.addChild(this);
    };
    FriendsConfirmView.prototype.hide = function () {
        if (this.parent)
            this.dispose();
    };
    FriendsConfirmView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._popView, this._txt, this._cancelBtn, this._confirmBtn);
        this._popView.dispose();
        this._popView = null;
        this._txt.dispose();
        this._txt = null;
        this._cancelBtn.dispose();
        this._cancelBtn = null;
        this._confirmBtn.dispose();
        this._confirmBtn = null;
        this._ids = null;
    };
    return FriendsConfirmView;
}(UIComponent));
__reflect(FriendsConfirmView.prototype, "FriendsConfirmView");
//# sourceMappingURL=FriendsConfirmView.js.map