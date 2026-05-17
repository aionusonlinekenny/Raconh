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
 * 18.4.19
 *　实时刷新
 *  */
var MarketUpdInfoCMD = (function (_super) {
    __extends(MarketUpdInfoCMD, _super);
    function MarketUpdInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_UPD_MARKET_INFO;
        return _this;
    }
    MarketUpdInfoCMD.prototype.receive = function (ip) {
        var type = ip.readByte(); //１增加，２删除
        var palyId = ip.readInt64();
        var name = ip.readUTF();
        Manager.model.getmarketModel().updDateList(type, palyId, name);
    };
    return MarketUpdInfoCMD;
}(BaseCMD));
__reflect(MarketUpdInfoCMD.prototype, "MarketUpdInfoCMD");
//# sourceMappingURL=MarketUpdInfoCMD.js.map