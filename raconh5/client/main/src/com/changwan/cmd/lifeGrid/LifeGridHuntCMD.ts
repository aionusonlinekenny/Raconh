/**
 * pzx 
 * 17.12.27
 * 猎命
 *  */
class LifeGridHuntCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LIFEGRID_HUNT;
    }
    //猎命类型
    public type:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
        
    }

    public receive(ip:TCPPacketIn):void
    {
        let type:number = ip.readByte();
        let ln:number = ip.readShort();
        let arr:ItemsModelInfo[] =[];
        for(let i:number = 0;i<ln;i++)
        {
            let info:ItemsModelInfo = new ItemsModelInfo();
            info.base_id = ip.readInt();
            info.bind = ip.readByte()==1;
            info.quantity = ip.readInt();
            arr.push(info);
        }
        Manager.model.getLifeGrid().returnHunt(arr,type);
    }
}