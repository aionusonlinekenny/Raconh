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
// 选择角色登录
var RoleSelectLoginCMD = /** @class */ (function (_super) {
    __extends(RoleSelectLoginCMD, _super);
    function RoleSelectLoginCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ROLE_SELECT_LOGIN;
        return _this;
    }
    RoleSelectLoginCMD.prototype.processOut = function (pkg) {
        pkg.writeInt64(this.roleID);
        pkg.writeByte(this.curIsReConnect);
        pkg.writeUTF(this.extra);
    };
    return RoleSelectLoginCMD;
}(BaseCMD));
//# sourceMappingURL=RoleSelectLoginCMD.js.map