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
var RoleInfoUpdateStrCMD = /** @class */ (function (_super) {
    __extends(RoleInfoUpdateStrCMD, _super);
    function RoleInfoUpdateStrCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ROLE_INFO_UPDATE_STR;
        return _this;
    }
    RoleInfoUpdateStrCMD.prototype.receive = function (pi) {
        Manager.model.getLogin().updateRoleInfoPartAttr(pi, 2);
    };
    return RoleInfoUpdateStrCMD;
}(BaseCMD));
//# sourceMappingURL=RoleInfoUpdateStrCMD.js.map