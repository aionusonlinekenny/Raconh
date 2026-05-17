/**
 * pzx 
 * 18.４.２４
 * 特权卡体验
 *  */
class SysPrivilegeExperienceCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SYSPRIVILEGE_EXPERIENCE;
    }

    public receive(ip:TCPPacketIn):void
    {
        let time:number = ip.readShort();
        Manager.model.getSysPrivilege().expTime(time);
    }
}