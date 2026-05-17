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
 * 18.1.20
 * 充值活动查询
 *  */
var RechargeActivityQueryCMD = (function (_super) {
    __extends(RechargeActivityQueryCMD, _super);
    function RechargeActivityQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_RECHARGEACTIVITY_QUERY;
        return _this;
    }
    RechargeActivityQueryCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
    };
    RechargeActivityQueryCMD.prototype.receive = function (ip) {
        var type = ip.readByte(); //活动标识
        var time = ip.readInt();
        var ln = ip.readShort();
        var moneyArr = [];
        for (var i = 0; i < ln; i++) {
            var m = ip.readInt();
            moneyArr.push(m);
        }
        ln = ip.readShort();
        var any = {};
        for (var i = 0; i < ln; i++) {
            var id = ip.readByte(); //id
            var count = ip.readByte(); //已领取次数
            any[id] = count;
        }
        Manager.model.getrechargeActivity().queryList(type, time, moneyArr, any);
    };
    return RechargeActivityQueryCMD;
}(BaseCMD));
__reflect(RechargeActivityQueryCMD.prototype, "RechargeActivityQueryCMD");
//# sourceMappingURL=RechargeActivityQueryCMD.js.map