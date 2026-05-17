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
 * 18.1.18
 * 金蟾查询
 *  */
var CashCowQueryCMD = (function (_super) {
    __extends(CashCowQueryCMD, _super);
    function CashCowQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_CASHCOW_QUERY;
        return _this;
    }
    CashCowQueryCMD.prototype.receive = function (ip) {
        var time = ip.readInt();
        var isActive = ip.readByte();
        var draw = ip.readByte();
        var current = ip.readByte(); //领奖次数，不包括免费
        var rewardnum = ip.readByte(); //实际领免费的次数
        Manager.model.getcashCow().returnCashCowInfo(time, draw, current, isActive, rewardnum);
    };
    return CashCowQueryCMD;
}(BaseCMD));
__reflect(CashCowQueryCMD.prototype, "CashCowQueryCMD");
//# sourceMappingURL=CashCowQueryCMD.js.map