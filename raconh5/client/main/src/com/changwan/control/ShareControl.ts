/**
 * 
 * pzx
 * create 2018-3-16
 *  分享Control
 * 
*/
class ShareControl extends BaseControl
{
    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.CMD_SHARE_INFO, ShareInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_SHARE_QUERY, ShareQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_SHARE_REWARD, ShareRewardCMD);
    }

    public query()
    {
        let cmd:ShareQueryCMD = Manager.socket.getCMD(Protocol.CMD_SHARE_QUERY) as ShareQueryCMD;
        cmd.send();
    }
    public shareInfo()
    {
        let cmd:ShareInfoCMD = Manager.socket.getCMD(Protocol.CMD_SHARE_INFO) as ShareInfoCMD;
        cmd.send();
    }
     public reward()
    {
        let cmd:ShareRewardCMD = Manager.socket.getCMD(Protocol.CMD_SHARE_REWARD) as ShareRewardCMD;
        cmd.send();
    }
}