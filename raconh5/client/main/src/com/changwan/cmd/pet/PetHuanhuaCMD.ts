/**
 * 宠物幻化协议
 * liangyan
 * create 2017-12-18
*/
class PetHuanhuaCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.PET_HUANHUA;
    }

    public id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.id);
    }

    public receive(pi:TCPPacketIn):void
    {
        let petModel = Manager.model.getPet();
        petModel.huanhuaID = pi.readShort();
        petModel.dispatchEvent(new PetEvent(PetEvent.HUANHUA));
    }


}