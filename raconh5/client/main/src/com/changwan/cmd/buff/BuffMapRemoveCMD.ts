/**
 *author Anydo
 *create 2017-11-30
 *description 
*/
class BuffMapRemoveCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.BUFF_MAP_REMOVE;
    }

    public receive(pi:TCPPacketIn):void
    {
        var aliveID:number = pi.readInt64();
        let groupID:number = pi.readInt();
        var alive:AliveGameObjectInfo = Manager.model.getGameobject().getGameObject(aliveID) as AliveGameObjectInfo;
        if(alive == null) return;
        let buff:BuffCVO = alive.getBuffById(groupID) as BuffCVO;
        if(buff != null)
        {
            alive.removeBuff(buff);
        }
    }
}