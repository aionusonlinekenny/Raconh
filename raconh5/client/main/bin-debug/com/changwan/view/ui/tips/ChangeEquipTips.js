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
var ChangeEquipTips = (function (_super) {
    __extends(ChangeEquipTips, _super);
    function ChangeEquipTips() {
        var _this = _super.call(this) || this;
        _this._isAddEvent = false;
        _this.skinName = Manager.path.getSkinName("tips", "ChangeEquipTipsSkin");
        return _this;
    }
    ChangeEquipTips.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._img.touchEnabled = false;
    };
    ChangeEquipTips.prototype.initView = function () { };
    ChangeEquipTips.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("onItemUpdate"))
            this.onItemUpdate();
    };
    ChangeEquipTips.prototype.addEvent = function () {
        if (this._isAddEvent)
            return;
        this._isAddEvent = true;
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
    };
    ChangeEquipTips.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
        this._isAddEvent = false;
    };
    ChangeEquipTips.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
    };
    ChangeEquipTips.prototype.onItemUpdateHandler = function (e) {
        if (e.params == 2) {
            this.invalidate("onItemUpdate");
        }
    };
    ChangeEquipTips.prototype.onItemUpdate = function () {
        if (!this._itemInfo) {
            this.dispose();
            return;
        }
        var info = Manager.model.getItems().getItemPos(this._itemInfo.pos);
        if (!info)
            this.dispose();
    };
    ChangeEquipTips.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._closeBtn:
                this.dispose();
                break;
            case this._btn:
                Manager.control.getItems().moveItems(this._itemInfo.storagetype, ItemsType.EQUIE, this._itemInfo.pos);
                this.dispose();
                break;
        }
    };
    ChangeEquipTips.prototype.reuse = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.reuse.call(this, args);
        if (this._isAddEvent == false)
            this.addEvent();
    };
    ChangeEquipTips.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    ChangeEquipTips.prototype.setData = function (value) {
        if (!value)
            return;
        _super.prototype.setData.call(this, value);
    };
    ChangeEquipTips.prototype.drawData = function () {
        this._itemInfo = this._data;
        if (this._itemInfo.cvo) {
            this._item.clear();
            this._item.data = this._itemInfo;
            this._itemName.text = this._itemInfo.cvo.name;
        }
        _super.prototype.drawData.call(this);
    };
    ChangeEquipTips.prototype.showByParent = function (parent) {
        parent.addChild(this);
        this.x = (Manager.global.gameMain.stage.$stageWidth - this.width) / 2;
        this.y = (Manager.global.gameMain.stage.$stageHeight - this.height) / 2;
    };
    ChangeEquipTips.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        Manager.pool.push(Manager.tips.changeEquipTips);
        Manager.tips.changeEquipTips = null;
    };
    return ChangeEquipTips;
}(BaseItemsTips));
__reflect(ChangeEquipTips.prototype, "ChangeEquipTips");
//# sourceMappingURL=ChangeEquipTips.js.map