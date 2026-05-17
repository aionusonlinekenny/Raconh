/**
 * 
 * pzx
 * create 2018-3-15
 * 冲榜竞技Control
 * 
*/
class SrvRankControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.CMD_SRVRANK_QUERY, SrvRaknQueryCMD);
        Manager.socket.addCMD(Protocol.CMD_SRVRANK_REWARD, SrvRaknRewardCMD);
    }

  
    public query()
    {
        let cmd:SrvRaknQueryCMD = Manager.socket.getCMD(Protocol.CMD_SRVRANK_QUERY) as SrvRaknQueryCMD;
        cmd.send();
    }
  
    public reward(rank:number)
    {
        let cmd:SrvRaknRewardCMD = Manager.socket.getCMD(Protocol.CMD_SRVRANK_REWARD) as SrvRaknRewardCMD;
        cmd.rank = rank;
        cmd.send();
    }
}