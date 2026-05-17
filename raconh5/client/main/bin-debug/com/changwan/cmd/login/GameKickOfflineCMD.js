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
// 踢下线
var GameKickOfflineCMD = (function (_super) {
    __extends(GameKickOfflineCMD, _super);
    function GameKickOfflineCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.GAME_KICK_OFFLINE;
        return _this;
    }
    GameKickOfflineCMD.prototype.receive = function (pi) {
        var reason = pi.readByte();
        //0-未知 1-别处登录 2-被踢下线
        if (reason == 0) {
            alert("未知原因退出登录！");
        }
        else if (reason == 1) {
            Manager.socket.needReconnect = false;
            alert("您的账号已在别处登录！");
        }
        else if (reason == 2) {
            Manager.socket.needReconnect = false;
            alert("您已被踢下线！");
        }
    };
    return GameKickOfflineCMD;
}(BaseCMD));
__reflect(GameKickOfflineCMD.prototype, "GameKickOfflineCMD");
//# sourceMappingURL=GameKickOfflineCMD.js.map