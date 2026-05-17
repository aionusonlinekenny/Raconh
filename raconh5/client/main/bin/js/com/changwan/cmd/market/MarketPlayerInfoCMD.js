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
 * 市场玩家信息
 *  */
var MarketPlayerInfoCMD = /** @class */ (function (_super) {
    __extends(MarketPlayerInfoCMD, _super);
    function MarketPlayerInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_REQ_MARKET;
        return _this;
    }
    MarketPlayerInfoCMD.prototype.processOut = function (pkg) {
        pkg.writeInt64(this.id);
    };
    MarketPlayerInfoCMD.prototype.receive = function (ip) {
        var info = new MarketPlayerInfo;
        info.play_id = ip.readInt64();
        info.career = ip.readByte();
        var ln = ip.readShort();
        info.itemList = [];
        for (var i = 0; i < ln; i++) {
            var item = new MarketItemInfo();
            item.pos = ip.readInt();
            item.price = ip.readInt();
            item.base_id = ip.readInt();
            item.bind = ip.readByte() == 1;
            item.quantity = ip.readShort();
            var l = ip.readShort();
            for (var j = 0; j < l; j++) {
                var exarr = new ExattrItemsinfo();
                exarr.type = ip.readShort();
                exarr.target = ip.readInt();
                exarr.value = ip.readInt();
                exarr.desc = ip.readUTF();
                item.infoList.push(exarr);
            }
            item.sale_time = ip.readInt();
            info.itemList.push(item);
        }
        Manager.model.getmarketModel().setMarketInfo(info);
    };
    return MarketPlayerInfoCMD;
}(BaseCMD));
//# sourceMappingURL=MarketPlayerInfoCMD.js.map