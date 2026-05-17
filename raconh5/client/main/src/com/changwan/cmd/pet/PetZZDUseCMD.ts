/**
 * 宠物资质丹使用协议
 * liangyan
 * create 2017-12-18
*/
class PetZZDUseCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.PET_ZZD_USE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let petModel = Manager.model.getPet();
        petModel.zzdUsed = pi.readInt();

        petModel.dispatchEvent(new PetEvent(PetEvent.ZZD_USE));
    }
}