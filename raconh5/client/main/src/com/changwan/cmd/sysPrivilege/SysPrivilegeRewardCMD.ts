/**
 * pzx 
 * 18.1.11
 * 领奖
 *  */
class SysPrivilegeRewardCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SYSPRIVILEGE_REWARD;
    }
 /**id */
    public type:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
    }

    public receive(ip:TCPPacketIn):void
    {
        let id:number = ip.readByte();//特权id
        let reward:number = ip.readByte();
        Manager.model.getSysPrivilege().updateData(id,reward);
    }
}