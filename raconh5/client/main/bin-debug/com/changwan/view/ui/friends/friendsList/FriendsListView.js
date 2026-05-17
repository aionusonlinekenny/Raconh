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
 *liangyan
 *create 2017-11-02
*/
var FriendsListView = (function (_super) {
    __extends(FriendsListView, _super);
    function FriendsListView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("friends/friendsList", "FriendsListViewSkin");
        return _this;
    }
    FriendsListView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getFriends();
        Manager.control.getFriends().listRequest();
        this._list.itemList.layout.gap = -5;
    };
    FriendsListView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._batchDelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._list.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._model.addEventListener(FriendsEvent.ADD_PLAYER, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.DELETE_PLAYER, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.CHANGE_PLAYER_TYPE, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.UPDATE_PLAYER, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.CLEAR_LIST, this.onInfoUpdateHandler, this);
    };
    FriendsListView.prototype.removeEvent = function () {
        this._batchDelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._list.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._model.removeEventListener(FriendsEvent.ADD_PLAYER, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.DELETE_PLAYER, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.CHANGE_PLAYER_TYPE, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.UPDATE_PLAYER, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.CLEAR_LIST, this.onInfoUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FriendsListView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FriendsListView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FriendsListView.prototype.drawData = function () {
        var infos = this._model.getFriendsByType(FriendsType.FRIEND);
        infos.sort(function (a, b) { return (a.lastOnlineTime > b.lastOnlineTime ? -1 : 1); });
        this._list.initBtnListData(FriendsListItem, infos, true);
        this._list.itemList.selectedIndex = -1;
    };
    FriendsListView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._batchDelBtn:
                Manager.view.show(1 /* FriendsBatchDelView */);
                break;
        }
    };
    FriendsListView.prototype.onInfoUpdateHandler = function (e) {
        this.invalidate(InvalidationType.DATA);
    };
    FriendsListView.prototype.onShortcutHandler = function (e) {
        if (e.target instanceof List)
            return;
        var index = this._list.itemList.selectedIndex;
        if (index < 0)
            return;
        var item = this._list.itemList.getChildAt(index);
        if (ShortcutMenu.hasInstance && item == this._selectedItem) {
            ShortcutMenu.instance.move(e.localX + 5, e.stageY + 5);
            return;
        }
        this._selectedItem = item;
        if (this._selectedItem == null)
            return;
        var info = this._selectedItem.data;
        if (info == null)
            return;
        ShortcutMenu.instance.showTip(e.localX + 5, e.stageY + 5, info.id, info.nickName, info.type);
    };
    FriendsListView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._list, this._batchDelBtn);
        this._list.dispose();
        this._list = null;
        this._batchDelBtn.dispose();
        this._batchDelBtn = null;
        this._model = null;
        if (this._selectedItem)
            this._selectedItem = null;
    };
    return FriendsListView;
}(UIComponent));
__reflect(FriendsListView.prototype, "FriendsListView");
//# sourceMappingURL=FriendsListView.js.map