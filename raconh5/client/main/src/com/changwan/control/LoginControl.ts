class LoginControl extends BaseControl
{
    /** 最后一次发送心跳包的时间 */
    private _heartbeatLastSendTime:number;
	/** 心跳包连续丢失次数 */
    public heartbeatLostCount:number;

    public constructor()
    {
        super();
        this._heartbeatLastSendTime = 0;
        this.heartbeatLostCount = 0;
	}

    protected addCMD():void
    {
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
    }

    public startSendHeartbeat()
    {
        Manager.render.add(this.checkSendHeartbeat, this, 200);
    }

    private checkSendHeartbeat()
    {
        let curTime = Manager.model.getLogin().serverTimeInfo.serverTime;
        let passTime = curTime - this._heartbeatLastSendTime;
        if(passTime > 20000)
        {
            Manager.socket.sendOnlyProtocol(Protocol.GAME_HEARTBEAT);
            this._heartbeatLastSendTime = curTime;
            this.heartbeatLostCount++;
            if(this.heartbeatLostCount > 3)
            {
                // Manager.socket.closeRemoteSocket();
                // Manager.socket.isClose = true;
            }
        }
    }

    public sendLogToServer(str:string)
    {
        let cmd:ClientLogCMD = Manager.socket.getCMD(Protocol.CLIENT_LOG) as ClientLogCMD;
        cmd.str = str;
        cmd.send();
    }

    /**
     * 账号登录请求
     */
    public loginRequest()
    {
        let cmd:GameLoginRequestCMD = Manager.socket.getCMD(Protocol.GAME_LOGIN_REQUEST) as GameLoginRequestCMD;
        cmd.time = Manager.model.getLogin().logintTime;
        cmd.account = Manager.model.getLogin().clientName;
        cmd.loginBunch = Manager.model.getLogin().loginBunch;
        cmd.loginOtherData = Manager.model.getLogin().loginOtherData;
        cmd.send();
    } 

    /**
     * 角色列表
     */
    public roleListRequest()
    {
        let cmd:RoleListRequestCMD = Manager.socket.getCMD(Protocol.ROLE_LIST_REQUEST) as RoleListRequestCMD;
        cmd.serverID = Manager.model.getLogin().serverId;
        cmd.send();
    }
    /**
     * 随机名字
     */
    public randomName(career:number)
    {
        let cmd:NickNameRandomCMD = Manager.socket.getCMD(Protocol.NICKNAME_RONDOM) as NickNameRandomCMD;
        cmd.career = career;
        cmd.serverID = Manager.model.getLogin().serverId;
        cmd.send();
    }
    /**
     * 创建角色
     */
    public createRole(name:string, career:number)
    {
        let cmd:RoleCreateCMD = Manager.socket.getCMD(Protocol.ROLE_CREATE) as RoleCreateCMD;
        cmd.name = name;
        cmd.career = career;
        cmd.serverID = Manager.model.getLogin().serverId;
        cmd.send();
    }
    /**
     * 加载创角页面完成，后台统计用
     */
    public loadCreateRoleComplete()
    {
        let cmd:RoleCreateStatisticsCMD = Manager.socket.getCMD(Protocol.ROLE_CREATE_STATISTICS) as RoleCreateStatisticsCMD;
        cmd.serverID = Manager.model.getLogin().serverId;
        cmd.send();
    }
    
    /**
     * 选择角色登录
     */
    public selectRoleLogin(id:number, extraParam:string)
    {
        let cmd:RoleSelectLoginCMD = Manager.socket.getCMD(Protocol.ROLE_SELECT_LOGIN) as RoleSelectLoginCMD;
        cmd.roleID = id;
        cmd.curIsReConnect = Manager.model.getLogin().isSocketReConnect ? 1 : 0;
        cmd.extra = extraParam;
        cmd.send();
    }
    /**
     * 游客/机器人登录请求
     */
    public guestLoginRequest(loginType:number)
    {
        let cmd:GuestLoginRequestCMD = Manager.socket.getCMD(Protocol.GUEST_LOGIN_REQUEST) as GuestLoginRequestCMD;
        cmd.type = loginType;
        cmd.send();
    }
    /**
     * 聊天监控登录请求
     */
    public chatMonitorLogin(timeStamp:number, account:string, sign:string)
    {
        let cmd:ChatMonitorLoginCMD = Manager.socket.getCMD(Protocol.CHAT_MONITOR_LOGIN) as ChatMonitorLoginCMD;
        cmd.time = timeStamp;
        cmd.account = account;
        cmd.sign = sign;
        cmd.send();
    }
}