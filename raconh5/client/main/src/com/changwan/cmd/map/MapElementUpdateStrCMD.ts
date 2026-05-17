/**
 *author Anydo
 *create 2017-11-6
 *description 
*/
class MapElementUpdateStrCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAP_ELEMENT_ATTR_UPDATE_STR;
    }

    public receive(pi:TCPPacketIn):void
    {
        let id:number = pi.readInt64();
        let info:AliveGameObjectInfo = Manager.model.getGameobject().getGameObject(id) as AliveGameObjectInfo;
        if(info != null)info.updatePartAttr(pi,2)
    }
}