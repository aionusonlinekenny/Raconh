/**
 *author Anydo
 *create 2017-11-30
 *description 
*/
class BuffMapAddCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.BUFF_MAP_ADD;
    }

    public receive(pi:TCPPacketIn):void
    {
        var aliveID:number = pi.readInt64();
        var alive:AliveGameObjectInfo = Manager.model.getGameobject().getGameObject(aliveID) as AliveGameObjectInfo;
        if(alive == null) return;
        let groupID:number = pi.readInt();
        let buffLevel:number = pi.readByte();
        let buff:BuffCVO = alive.getBuffById(groupID) as BuffCVO;
        if(buff == null)
        {
            buff = BuffCVO.getCVO(groupID, buffLevel);
            alive.addBuff(buff);
        }
    }
}