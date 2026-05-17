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
 * 购买
 *  */
var MarketBuyCMD = /** @class */ (function (_super) {
    __extends(MarketBuyCMD, _super);
    function MarketBuyCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_BUY_AUCTION;
        return _this;
    }
    MarketBuyCMD.prototype.processOut = function (pkg) {
        // /array('name'=>'rid', 'type'=>'int64', 'desc'=>'角色id'),
        //         array('name' => 'sale_index', 'type' => 'int32', 'desc' => '拍卖单索引'),
        //         array('name' => 'num', 'type' => 'int16', 'desc' => '购买数量'),
        pkg.writeInt64(this.paly_id);
        pkg.writeInt(this.pos);
        pkg.writeShort(this.count);
    };
    MarketBuyCMD.prototype.receive = function (ip) {
        //    array('name'=>'rid', 'type'=>'int64', 'desc'=>'角色id'),
        //         array('name' => 'sale_index', 'type' => 'int32', 'desc' => '拍卖单索引'),
        // 		array('name' => 'num', 'type' => 'int16', 'desc' => '剩余数量'),
        var succe = ip.readByte();
        if (succe == 0)
            return;
        var palyId = ip.readInt64();
        var pos = ip.readInt();
        var count = ip.readShort();
        Manager.model.getmarketModel().buyInfo(palyId, pos, count);
    };
    return MarketBuyCMD;
}(BaseCMD));
//# sourceMappingURL=MarketBuyCMD.js.map