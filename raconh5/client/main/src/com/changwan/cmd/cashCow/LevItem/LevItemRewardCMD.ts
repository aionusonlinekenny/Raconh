/**
 * pzx 
 * 18.1.18
 * 冲级好礼领奖
 *  */
class LevItemRewardCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LEVITEM_REWARD;
    }
     /** id */
    public id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.id);
    }
    public receive(ip:TCPPacketIn):void
    {
        let id:number = ip.readByte();
        LevItemCVO.setCount(id,1,-1);
        Manager.model.getcashCow().levItemModel.reward(id);
    }
}