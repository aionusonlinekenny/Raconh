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
var RoleInfoUpdateInt64CMD = /** @class */ (function (_super) {
    __extends(RoleInfoUpdateInt64CMD, _super);
    function RoleInfoUpdateInt64CMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ROLE_INFO_UPDATE_INT64;
        return _this;
    }
    RoleInfoUpdateInt64CMD.prototype.receive = function (pi) {
        Manager.model.getLogin().updateRoleInfoPartAttr(pi, 3);
    };
    return RoleInfoUpdateInt64CMD;
}(BaseCMD));
//# sourceMappingURL=RoleInfoUpdateInt64CMD.js.map