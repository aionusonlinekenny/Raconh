/**
 * 火眼金睛领取奖励
 * liangyan
 * create 2018-03-27
*/
class FireEyeFetchRewardsCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_FETCH;
    }
    /**奖励id */
    public id:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.id);
    }

    public receive(pi:TCPPacketIn):void
    {
        let id = pi.readShort();
        let count = pi.readShort();
        let goodsInfo:ItemsModelInfo;
        while (count > 0)
        {
            goodsInfo = new ItemsModelInfo();
            goodsInfo.base_id = pi.readInt();
            goodsInfo.bind = pi.readByte() == 1;
            goodsInfo.quantity = pi.readInt();
            count--;
        }
        if(Manager.model.getFireEye().fetchedRewards.indexOf(id) == -1)
        {
            Manager.model.getFireEye().fetchedRewards.push(id);
            Manager.model.getFireEye().dispatchEvent(new FireEyeEvent(FireEyeEvent.FIRE_EYE_UPDATE_REWARDS));
        }
    }
}