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
 * 市场玩家例表查询
 *  */
var MarketQueryCMD = (function (_super) {
    __extends(MarketQueryCMD, _super);
    function MarketQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_ALL_MARKET;
        return _this;
    }
    MarketQueryCMD.prototype.receive = function (ip) {
        var arr = [];
        var ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var info = new MarketPlayNameInfo;
            info.play_Id = ip.readInt64();
            info.name = ip.readUTF();
            arr.push(info);
        }
        Manager.model.getmarketModel().queryList(arr);
    };
    return MarketQueryCMD;
}(BaseCMD));
__reflect(MarketQueryCMD.prototype, "MarketQueryCMD");
//# sourceMappingURL=MarketQueryCMD.js.map