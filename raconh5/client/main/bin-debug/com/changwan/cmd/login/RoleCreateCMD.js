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
// 请求创建角色
var RoleCreateCMD = (function (_super) {
    __extends(RoleCreateCMD, _super);
    function RoleCreateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.ROLE_CREATE;
        return _this;
    }
    RoleCreateCMD.prototype.processOut = function (pkg) {
        pkg.writeUTF(this.name);
        pkg.writeByte(this.career);
        pkg.writeInt(this.serverID);
    };
    RoleCreateCMD.prototype.receive = function (pi) {
        var code = pi.readByte(); //0-成功 1-失败 2-非法字符 3-名字空 4-性别错误 5-服务器id错误
        var roleID = pi.readInt64();
        switch (code) {
            case 0:
                Manager.control.getLogin().selectRoleLogin(roleID, "");
                Manager.view.hide(29 /* CreateRoleView */);
                break;
            case 1:
                FloatTips.addTips("common19", Color.RED); //创建失败
                break;
            case 2:
                FloatTips.addTips("common20", Color.RED); //非法字符
                break;
            case 3:
                FloatTips.addTips("common21", Color.RED); //名字为空
                break;
            case 4:
                FloatTips.addTips("common22", Color.RED); //性别错误
                break;
            case 5:
                FloatTips.addTips("common23", Color.RED); //服务器id错误
                break;
            default:
                FloatTips.addTips("common19", Color.RED); //创建失败
                break;
        }
    };
    return RoleCreateCMD;
}(BaseCMD));
__reflect(RoleCreateCMD.prototype, "RoleCreateCMD");
//# sourceMappingURL=RoleCreateCMD.js.map