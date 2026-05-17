/**
 * pzx 
 * 17.12.16
 * 投资领奖
 *  */
class SysInvestRewardCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SYSINVEST_REWARD;
    }
    /**id */
    public id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.id);
    }

    public receive(ip:TCPPacketIn):void
    {
        Manager.model.getSysInvest().sysList(ip);
    }
}