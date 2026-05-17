/**
 * 宠物悟性丹使用协议
 * liangyan
 * create 2017-12-18
*/
class PetWXDUseCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.PET_WXD_USE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let petModel = Manager.model.getPet();
        petModel.wxdUsed = pi.readInt();

        petModel.dispatchEvent(new PetEvent(PetEvent.WXD_USE));
    }
}