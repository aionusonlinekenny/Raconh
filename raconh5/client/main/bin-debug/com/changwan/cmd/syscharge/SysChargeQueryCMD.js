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
 * 17.12.16
 * 充值查询
 *  */
var SysChargeQueryCMD = (function (_super) {
    __extends(SysChargeQueryCMD, _super);
    function SysChargeQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SYSCHARGE_QUERY;
        return _this;
    }
    SysChargeQueryCMD.prototype.receive = function (ip) {
        var ln = ip.readShort();
        var arr = [];
        for (var i = 0; i < ln; i++) {
            var n = ip.readByte();
            arr.push(n);
        }
        Manager.model.getSysCharge().returnQuery(arr);
    };
    return SysChargeQueryCMD;
}(BaseCMD));
__reflect(SysChargeQueryCMD.prototype, "SysChargeQueryCMD");
//# sourceMappingURL=SysChargeQueryCMD.js.map