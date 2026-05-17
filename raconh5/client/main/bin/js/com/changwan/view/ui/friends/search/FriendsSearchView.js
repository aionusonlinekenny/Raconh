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
 * 好友搜索面板
 * liangyan
 * create 2017-11-03
*/
var FriendsSearchView = /** @class */ (function (_super) {
    __extends(FriendsSearchView, _super);
    function FriendsSearchView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("friends/search", "FriendsSearchViewSkin");
        return _this;
    }
    FriendsSearchView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getFriends();
        this._list.itemList.layout.gap = -5;
        Manager.control.getFriends().changeSuggest();
        this._input.prompt = "请输入玩家名字";
        this._input.textDisplay.textAlign = "center";
    };
    FriendsSearchView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._searchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._list.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._model.addEventListener(FriendsEvent.SEARCH_SUCC, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.CHANGE_SUGGEST, this.onInfoUpdateHandler, this);
        this._model.addEventListener(FriendsEvent.ADD_PLAYER, this.onInfoUpdateHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    FriendsSearchView.prototype.removeEvent = function () {
        this._searchBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._changeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._list.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._model.removeEventListener(FriendsEvent.SEARCH_SUCC, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.CHANGE_SUGGEST, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(FriendsEvent.ADD_PLAYER, this.onInfoUpdateHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FriendsSearchView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.onResizeHandler(null);
    };
    FriendsSearchView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FriendsSearchView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FriendsSearchView.prototype.drawData = function () {
        var infos = Manager.model.getFriends().searchInfos;
        this._list.initBtnListData(FriendsListItem, infos, true);
        this._list.itemList.selectedIndex = -1;
    };
    FriendsSearchView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._searchBtn:
                if (cw.StringUtil.isEmptyStr(this._input.text)) {
                    FloatTips.addTips("请输入角色姓名", Color.RED);
                    return;
                }
                Manager.control.getFriends().searchFriends(this._input.text);
                break;
            case this._changeBtn:
                Manager.control.getFriends().changeSuggest();
                break;
            case this._addBtn:
                var ids = this.getAllIDs();
                var length_1 = ids.length;
                if (length_1 > 0)
                    Manager.control.getFriends().batchOperate(1, FriendsType.FRIEND, ids);
                break;
        }
    };
    FriendsSearchView.prototype.onShortcutHandler = function (e) {
        if (e.target instanceof List)
            return;
        var index = this._list.itemList.selectedIndex;
        if (index < 0)
            return;
        var item = this._list.itemList.getChildAt(index);
        if (ShortcutMenu.hasInstance && item == this._selectedItem) {
            ShortcutMenu.instance.move(e.stageX - this._stageX + 5, e.stageY + 5);
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
    FriendsSearchView.prototype.onInfoUpdateHandler = function (e) {
        if (e.type != FriendsEvent.ADD_PLAYER)
            this.invalidate(InvalidationType.DATA);
        else
            Manager.control.getFriends().changeSuggest();
    };
    FriendsSearchView.prototype.onResizeHandler = function (e) {
        this._stageX = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    FriendsSearchView.prototype.getAllIDs = function () {
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
    FriendsSearchView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._list, this._input, this._searchBtn, this._changeBtn, this._addBtn);
        this._list.dispose();
        this._list = null;
        this._input.dispose();
        this._input = null;
        this._searchBtn.dispose();
        this._searchBtn = null;
        this._changeBtn.dispose();
        this._changeBtn = null;
        this._addBtn.dispose();
        this._addBtn = null;
        this._model = null;
        if (this._selectedItem)
            this._selectedItem = null;
    };
    return FriendsSearchView;
}(UIComponent));
//# sourceMappingURL=FriendsSearchView.js.map