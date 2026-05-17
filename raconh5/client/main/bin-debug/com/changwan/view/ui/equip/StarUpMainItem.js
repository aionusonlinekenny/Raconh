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
 * 升星 主装备item
 * drq
 *  2018.04.12
 */
var StarUpMainItem = (function (_super) {
    __extends(StarUpMainItem, _super);
    function StarUpMainItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("equip", "StarUpItemSkin");
        _this._item = Manager.pool.create(BaseGoods);
        _this.addChild(_this._item);
        _this.swapChildren(_this._yichuandai, _this._item);
        return _this;
    }
    StarUpMainItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
    };
    StarUpMainItem.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
    };
    StarUpMainItem.prototype.onClickItem = function (e) {
        if (e === void 0) { e = null; }
        Manager.view.hide(147 /* StarUpExplainView */);
        var view = Manager.view.getView(12 /* EquipPanel */);
        if (view) {
            view.curView.updateMainEquip(this._data);
        }
    };
    StarUpMainItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    StarUpMainItem.prototype.setProperty = function (data) {
        if (data) {
            this._data = data;
            this._item.setCvo(data.cvo);
            if (data) {
                this.touchEnabled = true;
            }
            this._item.setStar(this._data.getStar());
            this._yichuandai.visible = false;
            if (this._data.storagetype == 1) {
                this._yichuandai.visible = true;
            }
        }
    };
    StarUpMainItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.dispose(this._item);
        this._item = null;
        this._data = null;
    };
    return StarUpMainItem;
}(UIComponent));
__reflect(StarUpMainItem.prototype, "StarUpMainItem");
//# sourceMappingURL=StarUpMainItem.js.map