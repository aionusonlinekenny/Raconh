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
 * 18.1.11
 * 查询
 *  */
var SysPrivilegeQueryCMD = /** @class */ (function (_super) {
    __extends(SysPrivilegeQueryCMD, _super);
    function SysPrivilegeQueryCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_SYSPRIVILEGE_QUERY;
        return _this;
    }
    SysPrivilegeQueryCMD.prototype.receive = function (ip) {
        var ln = ip.readShort();
        for (var i = 0; i < ln; i++) {
            var id = ip.readByte(); //特权id
            var reward = ip.readByte();
            Manager.model.getSysPrivilege().updateData(id, reward);
        }
    };
    return SysPrivilegeQueryCMD;
}(BaseCMD));
//# sourceMappingURL=SysPrivilegeQueryCMD.js.map