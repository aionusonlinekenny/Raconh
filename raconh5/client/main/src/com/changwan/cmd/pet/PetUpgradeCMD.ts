/**
 * 宠物进阶协议
 * liangyan
 * create 2017-12-18
*/
class PetUpgradeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.PET_UPGRADE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let petModel = Manager.model.getPet();
        petModel.pinjie = pi.readShort();
        petModel.star = pi.readShort();
        petModel.starExp = pi.readInt();

        petModel.dispatchEvent(new PetEvent(PetEvent.UPGRADE));
    }
}