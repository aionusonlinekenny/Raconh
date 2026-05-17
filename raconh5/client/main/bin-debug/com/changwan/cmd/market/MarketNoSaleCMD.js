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
 * 下架
 *  */
var MarketNoSaleCMD = (function (_super) {
    __extends(MarketNoSaleCMD, _super);
    function MarketNoSaleCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CANCEL_AUCTION;
        return _this;
    }
    MarketNoSaleCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.pos);
    };
    MarketNoSaleCMD.prototype.receive = function (ip) {
        var pos = ip.readInt();
        Manager.model.getmarketModel().noSaleItem(pos);
    };
    return MarketNoSaleCMD;
}(BaseCMD));
__reflect(MarketNoSaleCMD.prototype, "MarketNoSaleCMD");
//# sourceMappingURL=MarketNoSaleCMD.js.map