// 踢下线
class GameKickOfflineCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.GAME_KICK_OFFLINE;
    }

    public receive(pi:TCPPacketIn)
    {
        let reason:number = pi.readByte();
        //0-未知 1-别处登录 2-被踢下线
        if(reason == 0)
        {
            alert("未知原因退出登录！");
        }
        else if(reason == 1)
        {
            Manager.socket.needReconnect = false;
            alert("您的账号已在别处登录！");
        }
        else if(reason == 2)
        {
            Manager.socket.needReconnect = false;
            alert("您已被踢下线！");
        }
    }
}