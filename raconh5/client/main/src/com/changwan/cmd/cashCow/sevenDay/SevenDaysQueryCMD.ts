/**
 * pzx 
 * 18.1.29
 * 七天登陆查询
 *  */
class SevenDaysQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SEVENDAYS_QUERY;
    }
    public receive(ip:TCPPacketIn):void
    {
        let day:number = ip.readByte();
        let ln:number = ip.readShort();
        for(let i:number=0;i<ln;i++)
        {
            let id:number = ip.readByte();
            let num:number = ip.readByte();
            SevenDaysCVO.setState(id,num);
        }
        Manager.model.getcashCow().sevenDaysModel.query(day);
    }
}