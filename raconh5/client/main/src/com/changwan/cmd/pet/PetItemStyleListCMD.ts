/**
 *author Anydo
 *create 2018-2-1
 *description 
*/
class PetItemStyleListCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.PET_ITEM_STYLE_LIST;
    }

    public receive(pi:TCPPacketIn):void
    {
        let len:number = pi.readShort();
        for(let i:number = 0; i < len; i++)
        {
            let resId:number = pi.readShort();
            Manager.model.getPet().addItemStyle(resId);
        }
    }
}