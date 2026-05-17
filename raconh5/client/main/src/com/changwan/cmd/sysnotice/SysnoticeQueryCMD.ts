/**
 * pzx 
 * 17.12.16
 * 查询
 *  */
class SysnoticeQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SYSNOTICE_QUERY;
    }

    public receive(ip:TCPPacketIn):void
    {
        let ln:number = ip.readShort();
        let arr:Array<SysnoticeInfo>=[];
        for(let i:number=0;i<ln;i++)
        {
            let info:SysnoticeInfo = new SysnoticeInfo();
            info.taskId = ip.readInt();
            info.state = ip.readByte();
            arr.push(info);
        }
        Manager.model.getSysnotice().querySysList(arr);
    }
}