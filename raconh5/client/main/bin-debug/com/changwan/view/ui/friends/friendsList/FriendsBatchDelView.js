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
 * 批量删除好友界面
 * liangyan
 * create 2017-11-06
*/
var FriendsBatchDelView = (function (_super) {
    __extends(FriendsBatchDelView, _super);
    function FriendsBatchDelView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("friends/friendsList", "FriendsBatchDeleteSkin");
        return _this;
    }
    FriendsBatchDelView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    FriendsBatchDelView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._basePopUp.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._delBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._allCB.addEventListener(egret.Event.CHANGE, this.onChangeHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    FriendsBatchDelView.prototype.removeEvent = function () {
        this._basePopUp.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._delBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._allCB.removeEventListener(egret.Event.CHANGE, this.onChangeHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FriendsBatchDelView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.onResizeHandler(null);
    };
    FriendsBatchDelView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FriendsBatchDelView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FriendsBatchDelView.prototype.drawData = function () {
        var infos = Manager.model.getFriends().getBatchDelInfos();
        this._list.initBtnListData(FriendsDeleteItem, infos, true);
    };
    FriendsBatchDelView.prototype.onClickHandler = function (e) {
        var dataLen;
        var itemLen;
        switch (e.currentTarget) {
            case this._basePopUp.closeBtn:
                this._allCB.selected = false;
                this.onChangeHandler(null);
                break;
            case this._delBtn:
                var ids = this.getSelectedIDs();
                var length_1 = ids.length;
                if (length_1 > 0)
                    Manager.control.getFriends().batchOperate(0, FriendsType.FRIEND, ids);
                break;
        }
        Manager.view.hide(1 /* FriendsBatchDelView */);
    };
    FriendsBatchDelView.prototype.onInfoUpdateHandler = function () {
        this.invalidate(InvalidationType.DATA);
    };
    FriendsBatchDelView.prototype.onChangeHandler = function (e) {
        var dataLen = this._list.itemList.dataProvider.length;
        var itemLen = this._list.itemList.numChildren;
        var selected = this._allCB.selected;
        for (var i = 0; i < dataLen; i++) {
            if (i < itemLen)
                this._list.itemList.getChildAt(i).cbSelected = selected;
            this._list.itemList.dataProvider.getItemAt(i).selected = selected;
        }
    };
    FriendsBatchDelView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    FriendsBatchDelView.prototype.getSelectedIDs = function () {
        var result = [];
        var dataLen = this._list.itemList.dataProvider.length;
        var info;
        for (var i = 0; i < dataLen; i++) {
            info = this._list.itemList.dataProvider.getItemAt(i);
            if (info == null)
                continue;
            if (info.selected) {
                result.push(info.id);
            }
        }
        return result;
    };
    FriendsBatchDelView.prototype.show = function () {
        if (!this.parent)
            Manager.layer.tipsLayer.addChild(this);
    };
    FriendsBatchDelView.prototype.hide = function () {
        if (this.parent != null)
            this.dispose();
    };
    FriendsBatchDelView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._basePopUp, this._titleImg, this._delBtn, this._list, this._allCB);
        this._basePopUp.dispose();
        this._basePopUp = null;
        this._list.dispose();
        this._list = null;
        this._titleImg = null;
        this._delBtn.dispose();
        this._delBtn = null;
        this._allCB.dispose();
        this._allCB = null;
    };
    return FriendsBatchDelView;
}(UIComponent));
__reflect(FriendsBatchDelView.prototype, "FriendsBatchDelView", ["IViewManager"]);
//# sourceMappingURL=FriendsBatchDelView.js.map