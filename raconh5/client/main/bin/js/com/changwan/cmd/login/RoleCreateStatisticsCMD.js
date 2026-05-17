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
// 加载创角页面完成
var RoleCreateStatisticsCMD = /** @class */ (function (_super) {
    __extends(RoleCreateStatisticsCMD, _super);
    function RoleCreateStatisticsCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ROLE_CREATE_STATISTICS;
        return _this;
    }
    RoleCreateStatisticsCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.serverID);
    };
    return RoleCreateStatisticsCMD;
}(BaseCMD));
//# sourceMappingURL=RoleCreateStatisticsCMD.js.map