/**
 * pzx 
 * 18.1.18
 * 七天领奖
 *  */
class SevenDaysRewardCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SEVENDAYS_REWARD;
    }
     /** id */
    public login_id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.login_id);
    }
    public receive(ip:TCPPacketIn):void
    {
        let day:number = ip.readByte();
        let n:number = ip.readByte();
        Manager.model.getcashCow().sevenDaysModel.reward(n,day);
    }
}