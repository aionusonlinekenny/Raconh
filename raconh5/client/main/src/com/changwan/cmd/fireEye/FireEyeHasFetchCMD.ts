/**
 * 火眼金睛已领取的奖励数据
 * liangyan
 * create 2018-03-27
*/
class FireEyeHasFetchCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.FIRE_EYE_HAS_FETCH;
    }

    public receive(pi:TCPPacketIn):void
    {
        let count = pi.readShort();
        let model = Manager.model.getFireEye();
        model.fetchedRewards = [];
        while(count > 0)
        {
            model.fetchedRewards.push(pi.readByte());
            count--;
        }
        Manager.model.getFireEye().dispatchEvent(new FireEyeEvent(FireEyeEvent.FIRE_EYE_UPDATE_REWARDS));
    }
}