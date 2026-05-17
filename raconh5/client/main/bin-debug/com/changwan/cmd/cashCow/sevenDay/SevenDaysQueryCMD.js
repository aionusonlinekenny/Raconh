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
 * 18.1.29
 * 七天登陆查询
 *  */
var SevenDaysQueryCMD = (function (_super) {
    __extends(SevenDaysQueryCMD, _super);
    function SevenDaysQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SEVENDAYS_QUERY;
        return _this;
    }
    SevenDaysQueryCMD.prototype.receive = function (ip) {
        var day = ip.readByte();
        var ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var id = ip.readByte();
            var num = ip.readByte();
            SevenDaysCVO.setState(id, num);
        }
        Manager.model.getcashCow().sevenDaysModel.query(day);
    };
    return SevenDaysQueryCMD;
}(BaseCMD));
__reflect(SevenDaysQueryCMD.prototype, "SevenDaysQueryCMD");
//# sourceMappingURL=SevenDaysQueryCMD.js.map