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
// 账号登录请求协议
var GameLoginRequestCMD = /** @class */ (function (_super) {
    __extends(GameLoginRequestCMD, _super);
    function GameLoginRequestCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.GAME_LOGIN_REQUEST;
        return _this;
    }
    GameLoginRequestCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.time);
        pkg.writeUTF(this.account);
        pkg.writeUTF(this.loginBunch);
        pkg.writeUTF(this.loginOtherData);
    };
    GameLoginRequestCMD.prototype.receive = function (pi) {
        //0-成功 1-失败 2-封号 3-封ip 4-聊天登录成功
        var result = pi.readByte();
        switch (result) {
            case 0:
                Manager.control.getLogin().roleListRequest();
                break;
            case 1:
                break;
            case 2:
                Manager.socket.needReconnect = false;
                alert("您的账号已被封！");
                break;
            case 3:
                Manager.socket.needReconnect = false;
                alert("您所在的IP已被封！");
                break;
            case 4:
                break;
            default:
                break;
        }
    };
    return GameLoginRequestCMD;
}(BaseCMD));
//# sourceMappingURL=GameLoginRequestCMD.js.map