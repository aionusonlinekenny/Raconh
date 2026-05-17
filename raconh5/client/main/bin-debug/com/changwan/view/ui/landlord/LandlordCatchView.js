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
 * 斗地主抓捕
 */
var LandlordCatchView = (function (_super) {
    __extends(LandlordCatchView, _super);
    function LandlordCatchView(topParent, thisParent) {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this._topParent = topParent;
        _this._thisParent = thisParent;
        _this.skinName = Manager.path.getSkinName("landlord", "LandlordCatchViewSkin");
        return _this;
    }
    LandlordCatchView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getLaird();
        this._tips.stroke = 2;
        this._tips.strokeColor = 0;
        if (this._bgImg == null) {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._bg.addChild(this._bgImg);
            this.addChildAt(this._bgImg, this.getChildIndex(this._bg));
            this._bgImg.x = this._bg.x;
            this._bgImg.y = this._bg.y;
            this._bgImg.load(Manager.path.getPanelLandlordPath("landlord_di3", "jpg"));
        }
    };
    LandlordCatchView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.onInfoUpdateHandler, this);
        this._model.addEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.onCatchInfoUpdateHandler, this);
        this._enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    LandlordCatchView.prototype.removeEvent = function () {
        this._model.removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.onCatchInfoUpdateHandler, this);
        this._enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    LandlordCatchView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.onInfoUpdateHandler();
        Manager.control.getLaird().lairdCatch();
    };
    LandlordCatchView.prototype.onInfoUpdateHandler = function (e) {
        this._catchValue.text = (this._thisParent.catchInfo.value - this._model.lairdRoleInfo.catchCount) + "/" + this._thisParent.catchInfo.value;
    };
    LandlordCatchView.prototype.onCatchInfoUpdateHandler = function (e) {
        var list = e.params;
        if (!list || list.length == 0) {
            this._enterBtn.visible = this._tips.visible = true;
            this._playerList.visible = false;
        }
        else {
            this._enterBtn.visible = this._tips.visible = false;
            this._playerList.visible = true;
            this._playerList.initBtnListData(LandlordMsgItem, list, true);
        }
    };
    LandlordCatchView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._enterBtn:
                if (this._topParent)
                    this._topParent.changeMenuItem(0);
                break;
        }
    };
    LandlordCatchView.prototype.reuse = function (topParent, thisParent) {
        _super.prototype.reuse.call(this);
        this._topParent = topParent;
        this._thisParent = thisParent;
    };
    LandlordCatchView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._bg, this._catchValue, this._enterBtn, this._tips, this._playerList, this._bgImg);
        this._bg = null;
        if (this._catchValue)
            this._catchValue.dispose();
        this._catchValue = null;
        if (this._enterBtn)
            this._enterBtn.dispose();
        this._enterBtn = null;
        if (this._tips)
            this._tips.dispose();
        this._tips = null;
        if (this._playerList)
            this._playerList.dispose();
        this._playerList = null;
        this._topParent = null;
        this._thisParent = null;
        if (this._bgImg)
            this._bgImg.dispose();
        this._bgImg = null;
    };
    return LandlordCatchView;
}(UIComponent));
__reflect(LandlordCatchView.prototype, "LandlordCatchView");
//# sourceMappingURL=LandlordCatchView.js.map