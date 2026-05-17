// 账号登录请求协议
class GameLoginRequestCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.GAME_LOGIN_REQUEST;
    }

    /**
     * 时间戳
     */
    public time:number;
    /**
     * 账号
     */
    public account:string;
    /**
     * 登录串
     */
    public loginBunch:string;
    /** 登陆其他数据 */
    public loginOtherData:string;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt(this.time);
        pkg.writeUTF(this.account);
        pkg.writeUTF(this.loginBunch);
        pkg.writeUTF(this.loginOtherData);
    }

    public receive(pi:TCPPacketIn):void
    {
        //0-成功 1-失败 2-封号 3-封ip 4-聊天登录成功
        let result:number = pi.readByte();
        switch(result)
        {
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
    }
}