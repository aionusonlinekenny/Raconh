/**
 *author Anydo
 *create 2017-11-6
 *description 
*/
class MapPlayerRemoveCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAP_PLAYER_REMOVE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let count:number = pi.readShort();
        while(count > 0)
        {
            let id:number = pi.readInt64();
            let info:PlayerGameObjectInfo = Manager.model.getGameobject().getPlayerGameObject(id);
            if(info)
            {
                Manager.model.getGameobject().removeGameObject(info);
            }
            count--;
        }
    }
}