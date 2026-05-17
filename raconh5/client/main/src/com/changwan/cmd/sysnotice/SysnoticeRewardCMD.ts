/**
 * pzx 
 * 17.12.16
 * 领奖
 *  */
class SysnoticeRewardCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SYSNOTICE_REWARD;
    }
 /**任务id */
    public taskid:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt(this.taskid);
    }


    public receive(ip:TCPPacketIn):void
    {
        let taskId:number = ip.readInt();
        let stet:number = ip.readByte();
        Manager.model.getSysnotice().updateSysList(taskId,stet);
    }
}