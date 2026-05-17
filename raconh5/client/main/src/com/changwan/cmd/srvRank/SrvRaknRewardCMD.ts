/**
 * pzx 
 * 18.3.21
 * 冲榜竞技领奖
 *  */
class SrvRaknRewardCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SRVRANK_REWARD;
    }
    public rank:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.rank);
    }

    public receive(ip:TCPPacketIn):void
    {
        let day:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
		if(day<8)
		{
          
            let rank:number = ip.readByte();
            let statu:number = ip.readByte();
            SrvRankCVO.setstatus(day,rank,statu);
            Manager.model.getsrvRank().reward();
        }
    }
}