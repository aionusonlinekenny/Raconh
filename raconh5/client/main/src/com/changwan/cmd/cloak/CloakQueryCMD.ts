/**
 * pzx 
 * 17.11.28
 * 查询
 *  */
class CloakQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLOAK_QUEYT;
    }

    public receive(ip:TCPPacketIn):void
    {
        let currentId:number = ip.readShort();
        let ln:number = ip.readShort();
        var dic:Dictionary<number,number> = new Dictionary<number,number>();
        for(let i:number = 0;i<ln;i++)
        {
            let id:number = ip.readShort();
            let num:number = ip.readByte();
            dic.add(id,num);
        }
        Manager.model.getCloak().queryList(currentId,dic);
    }
}