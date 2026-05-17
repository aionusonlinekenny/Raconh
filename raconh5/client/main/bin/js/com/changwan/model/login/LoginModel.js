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
var LoginModel = /** @class */ (function (_super) {
    __extends(LoginModel, _super);
    function LoginModel() {
        var _this = _super.call(this) || this;
        /** 登陆加密串 */
        _this.loginBunch = "";
        /** 登陆其他数据 */
        _this.loginOtherData = "";
        _this.roleInfos = [];
        _this.isSocketReConnect = false;
        _this.serverTimeInfo = new ServerTimeInfo();
        return _this;
    }
    LoginModel.prototype.showHomeView = function () {
        if (this.home)
            return;
        this.home = new HomeView2();
    };
    LoginModel.prototype.getRoleInfoByID = function (roleId) {
        var roleInfo;
        for (var i = 0; i < this.roleInfos.length; i++) {
            roleInfo = this.roleInfos[i];
            if (roleInfo != null && roleInfo.id == roleId)
                return roleInfo;
        }
        return null;
    };
    /**
     * pi:后端数据
     * dataType:1--int32, 2--string, 3--int64
     */
    LoginModel.prototype.updateRoleInfoPartAttr = function (pi, dataType) {
        var type;
        var value;
        var selfInfo = Manager.model.self;
        var len = pi.readShort();
        for (var j = 0; j < len; j++) {
            type = pi.readByte();
            if (dataType == 1)
                value = pi.readInt();
            else if (dataType == 2)
                value = pi.readUTF();
            else if (dataType == 3)
                value = pi.readInt64();
            if (selfInfo.attrInfo.getValue(type) != -1) {
                selfInfo.attrInfo.setValue(type, value);
            }
        }
    };
    return LoginModel;
}(egret.EventDispatcher));
//# sourceMappingURL=LoginModel.js.map