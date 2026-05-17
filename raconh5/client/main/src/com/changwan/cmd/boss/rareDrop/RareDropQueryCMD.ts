/**
 * pzx 
 * 18.2.1
 * 珍希掉落查询
 *  */
class RareDropQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_RAREDROP_QUERY;
    }
    public receive(ip:TCPPacketIn):void
    {
        let arr:RareDropInfo[] = [];
        let ln:number = ip.readShort();
        for(let i:number = 0;i<ln;i++)
        {
            let name:string = ip.readUTF();
            let time:number = ip.readInt();
            let monId:number = ip.readInt();
            let n:number = ip.readShort();
            for(let a:number= 0;a<n;a++)
            {
                let info:RareDropInfo = new RareDropInfo();
                info.name = name;
                info.time = time;
                info.mon_id = monId;
                info.item.base_id = ip.readInt();
                let l:number = ip.readShort();
                for(let j:number = 0;j<l;j++)
                {
                    let exinfo:ExattrItemsinfo = new ExattrItemsinfo;
                    exinfo.type = ip.readShort();
                    exinfo.target = ip.readInt();
                    exinfo.value = ip.readInt();
                    exinfo.desc = ip.readUTF();
                    info.item.infoList.push(exinfo);
                }
                arr.push(info);
            }
        }
        Manager.model.getBoss().rareDropModel.query(arr);
    }
}