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
 * 主线副本单个排名信息
 * luzhihong
 * create 2017.12.2
 */
var CopyRankItem = (function (_super) {
    __extends(CopyRankItem, _super);
    function CopyRankItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("copy", "CopyRankItemSkin");
        return _this;
    }
    CopyRankItem.prototype.dataChanged = function () {
        var info = this.data;
        this._txtRank.text = "" + info.rank;
        this._txtName.text = info.name;
        this._txtPower.text = "" + info.power;
        this._txtValue.text = "" + info.value;
    };
    CopyRankItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._txtRank.dispose();
        this._txtRank = null;
        this._txtName.dispose();
        this._txtName = null;
        this._txtPower.dispose();
        this._txtPower = null;
        this._txtValue.dispose();
        this._txtValue = null;
    };
    return CopyRankItem;
}(ItemRenderer));
__reflect(CopyRankItem.prototype, "CopyRankItem");
//# sourceMappingURL=CopyRankItem.js.map