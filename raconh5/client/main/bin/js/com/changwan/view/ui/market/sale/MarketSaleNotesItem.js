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
 * 市场记录item
 * pzx
 * create 2018-4-13
 */
var MarketSaleNotesItem = /** @class */ (function (_super) {
    __extends(MarketSaleNotesItem, _super);
    function MarketSaleNotesItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("market", "MarketSaleNotesItemSkin");
        return _this;
    }
    MarketSaleNotesItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MarketSaleNotesItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        var i = 1;
        if (data.type == 1) {
            this._txt0.text = LangCVO.getContent("market5");
        }
        else {
            this._txt0.text = LangCVO.getContent("market6");
            i = -1;
        }
        var cvo = ItemsCVO.getCvo(data.base_id);
        this._txt1.text = cvo.name;
        this._txt2.text = i * data.price + "";
        this._txt3.text = cw.DateUtil.formatStr(data.sale_time, cw.DateUtil.YYYY_MM_DD_HH_MM_SS);
    };
    MarketSaleNotesItem.prototype.dispose = function () {
        ObjectUtil.disposes(this._txt0, this._txt1, this._txt2, this._txt3);
        this._txt0 = null;
        this._txt1 = null;
        this._txt2 = null;
        this._txt3 = null;
    };
    return MarketSaleNotesItem;
}(ItemRenderer));
//# sourceMappingURL=MarketSaleNotesItem.js.map