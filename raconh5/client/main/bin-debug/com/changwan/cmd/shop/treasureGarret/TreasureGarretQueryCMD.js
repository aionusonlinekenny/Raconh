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
 * 18.2.5
 * 珍宝阁查询
 *  */
var TreasureGarretQueryCMD = (function (_super) {
    __extends(TreasureGarretQueryCMD, _super);
    function TreasureGarretQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_TREASUREGARRET_QUERY;
        return _this;
    }
    //  // 1、元宝；2、神秘商城；3、荣誉商城；4、VIP商城
    //     public type:number;
    //     protected processOut(pkg:TCPPacketOut):void
    //     {
    //         pkg.writeByte(this.type);
    //     }
    TreasureGarretQueryCMD.prototype.receive = function (ip) {
        Manager.model.getShop().treasureGarretModel.updateDatA(ip);
        var time = ip.readInt();
        Manager.model.getShop().treasureGarretModel.setTime(time);
    };
    return TreasureGarretQueryCMD;
}(BaseCMD));
__reflect(TreasureGarretQueryCMD.prototype, "TreasureGarretQueryCMD");
//# sourceMappingURL=TreasureGarretQueryCMD.js.map