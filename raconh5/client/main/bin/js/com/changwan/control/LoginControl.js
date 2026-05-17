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
var LoginControl = /** @class */ (function (_super) {
    __extends(LoginControl, _super);
    function LoginControl() {
        var _this = _super.call(this) || this;
        _this._heartbeatLastSendTime = 0;
        _this.heartbeatLostCount = 0;
        return _this;
    }
    LoginControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.CLIENT_LOG, ClientLogCMD);
        Manager.socket.addCMD(Protocol.GAME_HEARTBEAT, GameHeartbeatCMD);
        Manager.socket.addCMD(Protocol.SYSTEM_SERVER_TIME, SystemServerTimeCMD);
        Manager.socket.addCMD(Protocol.GAME_LOGIN_REQUEST, GameLoginRequestCMD);
        Manager.socket.addCMD(Protocol.ROLE_LIST_REQUEST, RoleListRequestCMD);
        Manager.socket.addCMD(Protocol.NICKNAME_RONDOM, NickNameRandomCMD);
        Manager.socket.addCMD(Protocol.ROLE_CREATE, RoleCreateCMD);
        Manager.socket.addCMD(Protocol.ROLE_CREATE_STATISTICS, RoleCreateStatisticsCMD);
        Manager.socket.addCMD(Protocol.ROLE_SELECT_LOGIN, RoleSelectLoginCMD);
        Manager.socket.addCMD(Protocol.GAME_KICK_OFFLINE, GameKickOfflineCMD);
        Manager.socket.addCMD(Protocol.GUEST_LOGIN_REQUEST, GuestLoginRequestCMD);
        Manager.socket.addCMD(Protocol.CHAT_MONITOR_LOGIN, ChatMonitorLoginCMD);
        Manager.socket.addCMD(Protocol.OFFLINE_PROFIT_NOTICE, OfflineProfitNotice);
    };
    LoginControl.prototype.startSendHeartbeat = function () {
        Manager.render.add(this.checkSendHeartbeat, this, 200);
    };
    LoginControl.prototype.checkSendHeartbeat = function () {
        var curTime = Manager.model.getLogin().serverTimeInfo.serverTime;
        var passTime = curTime - this._heartbeatLastSendTime;
        if (passTime > 20000) {
            Manager.socket.sendOnlyProtocol(Protocol.GAME_HEARTBEAT);
            this._heartbeatLastSendTime = curTime;
            this.heartbeatLostCount++;
            if (this.heartbeatLostCount > 3) {
                // Manager.socket.closeRemoteSocket();
                // Manager.socket.isClose = true;
            }
        }
    };
    LoginControl.prototype.sendLogToServer = function (str) {
        var cmd = Manager.socket.getCMD(Protocol.CLIENT_LOG);
        cmd.str = str;
        cmd.send();
    };
    /**
     * 账号登录请求
     */
    LoginControl.prototype.loginRequest = function () {
        var cmd = Manager.socket.getCMD(Protocol.GAME_LOGIN_REQUEST);
        cmd.time = Manager.model.getLogin().logintTime;
        cmd.account = Manager.model.getLogin().clientName;
        cmd.loginBunch = Manager.model.getLogin().loginBunch;
        cmd.loginOtherData = Manager.model.getLogin().loginOtherData;
        cmd.send();
    };
    /**
     * 角色列表
     */
    LoginControl.prototype.roleListRequest = function () {
        var cmd = Manager.socket.getCMD(Protocol.ROLE_LIST_REQUEST);
        cmd.serverID = Manager.model.getLogin().serverId;
        cmd.send();
    };
    /**
     * 随机名字
     */
    LoginControl.prototype.randomName = function (career) {
        var cmd = Manager.socket.getCMD(Protocol.NICKNAME_RONDOM);
        cmd.career = career;
        cmd.serverID = Manager.model.getLogin().serverId;
        cmd.send();
    };
    /**
     * 创建角色
     */
    LoginControl.prototype.createRole = function (name, career) {
        var cmd = Manager.socket.getCMD(Protocol.ROLE_CREATE);
        cmd.name = name;
        cmd.career = career;
        cmd.serverID = Manager.model.getLogin().serverId;
        cmd.send();
    };
    /**
     * 加载创角页面完成，后台统计用
     */
    LoginControl.prototype.loadCreateRoleComplete = function () {
        var cmd = Manager.socket.getCMD(Protocol.ROLE_CREATE_STATISTICS);
        cmd.serverID = Manager.model.getLogin().serverId;
        cmd.send();
    };
    /**
     * 选择角色登录
     */
    LoginControl.prototype.selectRoleLogin = function (id, extraParam) {
        var cmd = Manager.socket.getCMD(Protocol.ROLE_SELECT_LOGIN);
        cmd.roleID = id;
        cmd.curIsReConnect = Manager.model.getLogin().isSocketReConnect ? 1 : 0;
        cmd.extra = extraParam;
        cmd.send();
    };
    /**
     * 游客/机器人登录请求
     */
    LoginControl.prototype.guestLoginRequest = function (loginType) {
        var cmd = Manager.socket.getCMD(Protocol.GUEST_LOGIN_REQUEST);
        cmd.type = loginType;
        cmd.send();
    };
    /**
     * 聊天监控登录请求
     */
    LoginControl.prototype.chatMonitorLogin = function (timeStamp, account, sign) {
        var cmd = Manager.socket.getCMD(Protocol.CHAT_MONITOR_LOGIN);
        cmd.time = timeStamp;
        cmd.account = account;
        cmd.sign = sign;
        cmd.send();
    };
    return LoginControl;
}(BaseControl));
//# sourceMappingURL=LoginControl.js.map