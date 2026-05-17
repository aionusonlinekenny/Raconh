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
 * 查询
 *  */
var SysnoticeQueryCMD = (function (_super) {
    __extends(SysnoticeQueryCMD, _super);
    function SysnoticeQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SYSNOTICE_QUERY;
        return _this;
    }
    SysnoticeQueryCMD.prototype.receive = function (ip) {
        var ln = ip.readShort();
        var arr = [];
        for (var i = 0; i < ln; i++) {
            var info = new SysnoticeInfo();
            info.taskId = ip.readInt();
            info.state = ip.readByte();
            arr.push(info);
        }
        Manager.model.getSysnotice().querySysList(arr);
    };
    return SysnoticeQueryCMD;
}(BaseCMD));
__reflect(SysnoticeQueryCMD.prototype, "SysnoticeQueryCMD");
//# sourceMappingURL=SysnoticeQueryCMD.js.map