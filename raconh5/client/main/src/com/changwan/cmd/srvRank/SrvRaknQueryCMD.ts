/**
 * pzx 
 * 18.3.21
 * 冲榜竞技
 *  */
class SrvRaknQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SRVRANK_QUERY;
    }

    public receive(ip:TCPPacketIn):void
    {
        let day:number = ip.readByte();
		if(day<8)
		{
            let ln:number = ip.readShort();
            
            for(let i:number=0;i<ln;i++)
            {
                let rank:number = ip.readByte();
                let statu:number = ip.readByte();
                SrvRankCVO.setstatus(day,rank,statu);
            }
            let rank1Name:string = ip.readUTF();
            let mainRank:number = ip.readShort();
            Manager.model.getsrvRank().returnQuery(mainRank,rank1Name);
		}
        
    }
}