/**
 * pzx 
 * 18.1.11
 * 查询
 *  */
class SysPrivilegeQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SYSPRIVILEGE_QUERY;
    }

    public receive(ip:TCPPacketIn):void
    {
        let ln:number = ip.readShort();
        for(let i:number=0;i<ln;i++)
        {
            let id:number = ip.readByte();//特权id
            let reward:number = ip.readByte();
            Manager.model.getSysPrivilege().updateData(id,reward);
        }
    }
}