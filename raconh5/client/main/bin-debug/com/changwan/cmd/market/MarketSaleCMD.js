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
 * pzx
 * 18.4.17
 * 上架
 *  */
var MarketSaleCMD = (function (_super) {
    __extends(MarketSaleCMD, _super);
    function MarketSaleCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_STUFF_AUCTION;
        return _this;
    }
    MarketSaleCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.itemId);
        pkg.writeShort(this.count);
        pkg.writeInt(this.price);
    };
    MarketSaleCMD.prototype.receive = function (ip) {
        Manager.model.getmarketModel().setSaleItem(ip);
    };
    return MarketSaleCMD;
}(BaseCMD));
__reflect(MarketSaleCMD.prototype, "MarketSaleCMD");
//# sourceMappingURL=MarketSaleCMD.js.map