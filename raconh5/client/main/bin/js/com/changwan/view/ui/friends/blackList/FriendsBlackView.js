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
 * 好友黑名单面板
 * liangyan
 * create 2017-11-03
*/
var FriendsBlackView = /** @class */ (function (_super) {
    __extends(FriendsBlackView, _super);
    function FriendsBlackView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("friends/blackList", "FriendsBlackViewSkin");
        return _this;
    }
    FriendsBlackView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getFriends();
        this._list.itemList.layout.gap = -5;
    };
    FriendsBlackView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._deleteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._list.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._model.addEventListener(FriendsEvent.ADD_PLAYER, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.DELETE_PLAYER, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.CHANGE_PLAYER_TYPE, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.UPDATE_PLAYER, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.CLEAR_LIST, this.onInfoUpdateHandler, this);
    };
    FriendsBlackView.prototype.removeEvent = function () {
        this._deleteBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._list.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._model.removeEventListener(FriendsEvent.ADD_PLAYER, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.DELETE_PLAYER, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.CHANGE_PLAYER_TYPE, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.UPDATE_PLAYER, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.CLEAR_LIST, this.onInfoUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FriendsBlackView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FriendsBlackView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FriendsBlackView.prototype.drawData = function () {
        var infos = Manager.model.getFriends().getFriendsByType(FriendsType.BLACK);
        infos.sort(function (a, b) { return (a.lastOnlineTime > b.lastOnlineTime ? -1 : 1); });
        this._list.initBtnListData(FriendsListItem, infos, true);
        this._list.itemList.selectedIndex = -1;
    };
    FriendsBlackView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._deleteBtn:
                var ids = this.getAllIDs();
                Manager.view.show(116 /* FriendsConfirmView */, ids);
                break;
        }
    };
    FriendsBlackView.prototype.onInfoUpdateHandler = function (e) {
        this.invalidate(InvalidationType.DATA);
    };
    FriendsBlackView.prototype.onShortcutHandler = function (e) {
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
    FriendsBlackView.prototype.getAllIDs = function () {
        var result = [];
        var dataLen = this._list.itemList.dataProvider.length;
        var info;
        for (var i = 0; i < dataLen; i++) {
            info = this._list.itemList.dataProvider.getItemAt(i);
            if (info == null)
                continue;
            result.push(info.id);
        }
        return result;
    };
    FriendsBlackView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._list, this._deleteBtn);
        this._list.dispose();
        this._list = null;
        this._deleteBtn.dispose();
        this._deleteBtn = null;
        this._model = null;
        if (this._selectedItem)
            this._selectedItem = null;
    };
    return FriendsBlackView;
}(UIComponent));
//# sourceMappingURL=FriendsBlackView.js.map