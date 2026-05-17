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
 * 物品弹窗
 * luzhihong
 * create 2018.3.2
 */
var ItemsPrompt = (function (_super) {
    __extends(ItemsPrompt, _super);
    function ItemsPrompt() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("tips", "ChangeEquipTipsSkin");
        return _this;
    }
    ItemsPrompt.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._img.source = "common_label_use_use_now_png";
        this._item.data = this._itemInfo;
        this._itemName.text = this._itemInfo.cvo.name;
    };
    ItemsPrompt.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ItemsPrompt.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ItemsPrompt.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - 720) / 2);
    };
    ItemsPrompt.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btn:
                // if(this._itemInfo.cvo.prompt == LinkType.USE_ITEMS+"") Manager.model.getItems().useItems(this._itemInfo, this._itemInfo.quantity);
                // else Manager.link.linkStr(this._itemInfo.cvo.prompt);
                Manager.link.linkStr(this._itemInfo.cvo.prompt);
                break;
        }
        // Manager.view.hide(ViewID.ItemsPrompt);
        Manager.pool.push(this);
    };
    ItemsPrompt.prototype.reuse = function (item) {
        this.touchChildren = true;
        this._itemInfo = item;
        if (this.parent == null) {
            Manager.layer.tipsLayer.addChild(this);
            this.onResizeHandler(null);
        }
        _super.prototype.reuse.call(this);
    };
    ItemsPrompt.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._itemInfo = null;
    };
    ItemsPrompt.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._item, this._itemName, this._btn, this._closeBtn);
        ObjectUtil.remove(this._img);
        this._item = null;
        this._itemName = null;
        this._btn = null;
        this._img = null;
        this._closeBtn = null;
        this._itemInfo = null;
    };
    return ItemsPrompt;
}(UIComponent));
__reflect(ItemsPrompt.prototype, "ItemsPrompt");
//# sourceMappingURL=ItemsPrompt.js.map