/**
 *author Anydo
 *create 2017-11-1
 *description 移除怪物
*/
class MapMonsterRemoveCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAP_MONSTER_REMOVE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let count:number = pi.readShort();
        while(count > 0)
        {
            let id:number = pi.readInt();
            let info:MonsterGameObjectInfo = Manager.model.getGameobject().getMonsterGameObject(id);
            if(info)
            {
                Manager.model.getGameobject().removeGameObject(info);
            }
            count--;
        }
    }
}