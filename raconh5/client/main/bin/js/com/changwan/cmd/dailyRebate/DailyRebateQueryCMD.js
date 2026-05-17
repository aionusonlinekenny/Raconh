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
 * 18.3.14
 * 天天返利查询
 *  */
var DailyRebateQueryCMD = /** @class */ (function (_super) {
    __extends(DailyRebateQueryCMD, _super);
    function DailyRebateQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_DAILYREBATE_QUERY;
        return _this;
    }
    DailyRebateQueryCMD.prototype.receive = function (ip) {
        var money = ip.readInt();
        var ln = ip.readShort();
        var any = {};
        while (ln > 0) {
            ln--;
            var amount = ip.readShort(); //额度
            var reward = ip.readByte(); //是否已领取奖励 0-否 1-是'
            any[amount] = reward;
        }
        Manager.model.getdailyRebate().query(money, any);
    };
    return DailyRebateQueryCMD;
}(BaseCMD));
//# sourceMappingURL=DailyRebateQueryCMD.js.map