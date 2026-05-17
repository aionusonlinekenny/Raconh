/**
 * pzx 
 * 18.1.25
 * 冲级好礼查询
 *  */
class LevItemQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LEVITEM_QUERY;
    }
    public receive(ip:TCPPacketIn):void
    {
        let ln:number = ip.readShort();
        for(let i:number=0;i<ln;i++)
        {
            let id:number = ip.readByte();
            let reward:number = ip.readByte();
            let num:number = ip.readShort();
            LevItemCVO.setCount(id,reward,num);
        }
        let act:number = ip.readByte();
        Manager.model.getcashCow().levItemModel.query(act);
    }
}