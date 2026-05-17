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
// 游客/机器人登录请求
var GuestLoginRequestCMD = /** @class */ (function (_super) {
    __extends(GuestLoginRequestCMD, _super);
    function GuestLoginRequestCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.GUEST_LOGIN_REQUEST;
        return _this;
    }
    GuestLoginRequestCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
    };
    return GuestLoginRequestCMD;
}(BaseCMD));
//# sourceMappingURL=GuestLoginRequestCMD.js.map