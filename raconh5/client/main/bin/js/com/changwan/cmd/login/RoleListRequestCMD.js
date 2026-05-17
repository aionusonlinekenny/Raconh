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
// 请求角色列表
var RoleListRequestCMD = /** @class */ (function (_super) {
    __extends(RoleListRequestCMD, _super);
    function RoleListRequestCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ROLE_LIST_REQUEST;
        return _this;
    }
    RoleListRequestCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.serverID);
    };
    RoleListRequestCMD.prototype.receive = function (pi) {
        var length = pi.readShort();
        if (length > 0) {
            var info = void 0;
            var list = [];
            for (var i = 0; i < length; i++) {
                info = new RoleInfo();
                info.id = pi.readInt64();
                var nickName = pi.readUTF();
                var career = pi.readByte();
                var level = pi.readInt();
                list.push(info);
            }
            Manager.model.getLogin().roleInfos = list;
            Manager.control.getLogin().selectRoleLogin(info.id, "");
        }
        else {
            Manager.view.show(29 /* CreateRoleView */);
        }
        Manager.view.hide(28 /* LoginView */);
    };
    return RoleListRequestCMD;
}(BaseCMD));
//# sourceMappingURL=RoleListRequestCMD.js.map