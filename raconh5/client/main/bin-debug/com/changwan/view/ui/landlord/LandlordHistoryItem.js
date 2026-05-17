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
var LandlordHistoryItem = (function (_super) {
    __extends(LandlordHistoryItem, _super);
    function LandlordHistoryItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("landlord", "LandlordHistoryItemSkin");
        return _this;
    }
    LandlordHistoryItem.prototype.dataChanged = function () {
        this._time.text = cw.DateUtil.formatStr(this.data.time, cw.DateUtil.YYYY_MM_DD_HH_MM_SS);
        HtmlUtil.setTextFlow(this._content, this.data.content);
    };
    LandlordHistoryItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._time, this._content, this._line);
        if (this._time)
            this._time.dispose();
        this._time = null;
        if (this._content)
            this._content.dispose();
        this._content = null;
        this._line = null;
    };
    return LandlordHistoryItem;
}(ItemRenderer));
__reflect(LandlordHistoryItem.prototype, "LandlordHistoryItem");
//# sourceMappingURL=LandlordHistoryItem.js.map