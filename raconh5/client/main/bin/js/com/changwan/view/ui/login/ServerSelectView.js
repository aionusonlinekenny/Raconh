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
 * 选择服务器界面
 * luzhihong
 * create 2017-12-14
 */
var ServerSelectView = /** @class */ (function (_super) {
    __extends(ServerSelectView, _super);
    function ServerSelectView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("login", "ServerSelectViewSkin");
        return _this;
    }
    ServerSelectView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        var listData = this._parent.serverList;
        this._groupList.initBtnListData(ServerGroupItem, listData, true);
        // (<eui.VerticalLayout>this._list.itemList.layout).gap = -5;
        this._itemList.initBtnListData(ServerItem, null, true);
        this._groupList.itemList.selectedIndex = listData[0].list.length > 0 ? 0 : 1;
        this._groupList.itemList.scrollH;
        this.onGroupListChange(null);
        this.onResizeHandler(null);
    };
    /**
     * @param id 副本ID
    */
    ServerSelectView.prototype.show = function (parentView) {
        this._parent = parentView;
        if (this.parent == null)
            Manager.layer.tipsLayer.addChild(this);
    };
    ServerSelectView.prototype.hide = function () {
        this.dispose();
    };
    ServerSelectView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._groupList.itemList.addEventListener(eui.UIEvent.CHANGE, this.onGroupListChange, this);
        this._itemList.itemList.addEventListener(eui.UIEvent.CHANGE, this.onItemListChange, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ServerSelectView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._groupList.itemList.removeEventListener(eui.UIEvent.CHANGE, this.onGroupListChange, this);
        this._itemList.itemList.removeEventListener(eui.UIEvent.CHANGE, this.onItemListChange, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ServerSelectView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.config.gameWidth - this.width) / 2;
    };
    ServerSelectView.prototype.onGroupListChange = function (e) {
        var item = this._groupList.itemList.selectedItem;
        if (this._selectedGItem == item)
            return;
        if (this._selectedGItem)
            this._selectedGItem.selected = false;
        this._selectedGItem = item;
        this._selectedGItem.selected = true;
        this._itemList.dataProvider(this._selectedGItem.list);
    };
    ServerSelectView.prototype.onItemListChange = function (e) {
        this._parent.setServer(this._itemList.itemList.selectedItem);
        Manager.view.hide(27 /* ServerSelectView */);
    };
    ServerSelectView.prototype.onClickHandler = function (e) {
        Manager.view.hide(27 /* ServerSelectView */);
    };
    ServerSelectView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._groupList, this._itemList);
        ObjectUtil.remove(this._btnClose);
        this._groupList = null;
        this._itemList = null;
        this._btnClose = null;
        this._selectedGItem = null;
        this._parent = null;
    };
    return ServerSelectView;
}(UIComponent));
//# sourceMappingURL=ServerSelectView.js.map