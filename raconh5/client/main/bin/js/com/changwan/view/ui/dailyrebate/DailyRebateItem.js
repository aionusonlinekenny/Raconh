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
 * 天天返利item
 * pzx
 * create 18.3.14
 */
var DailyRebateItem = /** @class */ (function (_super) {
    __extends(DailyRebateItem, _super);
    function DailyRebateItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("dailyrebate", "DailyRebateItemSkin");
        return _this;
    }
    DailyRebateItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._list = [this._item0, this._item1, this._item2, this._item3];
    };
    DailyRebateItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    DailyRebateItem.prototype.setData = function (data) {
        this._cvo = data;
        this.invalidate(InvalidationType.DATA);
    };
    DailyRebateItem.prototype.drawData = function () {
        if (!this._cvo)
            return;
        this._rmbTxt.text = this._cvo.amount + LangCVO.getContent("common37"); //元
        this._ilingquImg.visible = this._cvo.isReward;
        var arr = GainLossVO.parse(this._cvo.loss);
        for (var i = arr.length - 1; i > -1; i--) {
            if (this._list[i]) {
                this._list[i].setGainLossVO(arr[i]);
            }
        }
    };
    DailyRebateItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    DailyRebateItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
    };
    DailyRebateItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        this._list.forEach(function (item, i) {
            Manager.pool.push(item);
        });
        this._list = null;
        this._rmbTxt.dispose();
        this._rmbTxt = null;
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._item3 = null;
        this.removeChild(this._ilingquImg);
        this._ilingquImg = null;
        this._cvo = null;
    };
    DailyRebateItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.clear(true);
    };
    return DailyRebateItem;
}(UIComponent));
//# sourceMappingURL=DailyRebateItem.js.map