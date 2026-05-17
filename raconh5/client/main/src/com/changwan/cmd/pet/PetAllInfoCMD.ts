/**
 * 宠物全部信息协议
 * liangyan
 * create 2017-12-18
*/
class PetAllInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.PET_ALL_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let petModel = Manager.model.getPet();
        petModel.pinjie = pi.readShort();
        petModel.star = pi.readShort();
        petModel.starExp = pi.readInt();
        petModel.zzdUsed = pi.readInt();
        petModel.wxdUsed = pi.readInt();
        petModel.huanhuaID = pi.readShort();

        petModel.dispatchEvent(new PetEvent(PetEvent.ALL_INFO));
    }
}