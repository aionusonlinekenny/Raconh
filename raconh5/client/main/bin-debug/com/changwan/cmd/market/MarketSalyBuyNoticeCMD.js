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
 * 记录
 *  */
var MarketSalyBuyNoticeCMD = (function (_super) {
    __extends(MarketSalyBuyNoticeCMD, _super);
    function MarketSalyBuyNoticeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_REQ_LOG;
        return _this;
    }
    MarketSalyBuyNoticeCMD.prototype.receive = function (ip) {
        //  array('name' => 'inc_attr', 'type' => 'arr', 'tuple' => 'true', 'desc' => '成长属性','vars'=> array(
        //                 array('name' => 'trade_type', 'type' => 'int8', 'desc' => '交易类型：1：出售，2：购买'),
        // 				array('name' => 'time', 'type' => 'int32', 'desc' => '交易时间'),
        //                 array('name' => 'item', 'type' => 'int32', 'desc' => '物品基础id'),
        // 				array('name' => 'count', 'type' => 'int16', 'desc' => '物品数量'),
        // 				array('name' => 'price', 'type' => 'int32', 'desc' => '税后交易价格'),
        //             )),
        var arr = [];
        var ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var info = new MarketSaleBuyNoticeInfo;
            info.type = ip.readByte();
            info.sale_time = ip.readInt();
            info.base_id = ip.readInt();
            info.count = ip.readShort();
            info.price = ip.readInt();
            arr.push(info);
        }
        Manager.model.getmarketModel().noticeList(arr);
    };
    return MarketSalyBuyNoticeCMD;
}(BaseCMD));
__reflect(MarketSalyBuyNoticeCMD.prototype, "MarketSalyBuyNoticeCMD");
//# sourceMappingURL=MarketSalyBuyNoticeCMD.js.map