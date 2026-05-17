/**
 *author Anydo
 *create 2017-11-1
 *description 地图怪物添加、更新
*/
class MapMonsterAddCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAP_MONSTER_ADD;
    }

    public receive(pi:TCPPacketIn):void
    {
        if(!Manager.model.getMap().mapDataLoadComplete) return;
        let count:number = pi.readShort();
        let direction:string;
        
        while(count > 0)
        {
            let id:number = pi.readInt();
            let monster:MonsterGameObjectInfo = Manager.model.getGameobject().getMonsterGameObject(id);
            if(monster == null)
            {
                monster = Manager.pool.create(MonsterGameObjectInfo,id,pi.readShort());
                monster.parse(pi,true);
                
                if(monster.cvo.singleDic) direction = Direction.RIGHT_TOP;
                else if(monster.cvo.birthDirIndex >= 0) direction = Direction.directions[monster.cvo.birthDirIndex];
                else direction = Direction.getRandomDirection();
                monster.setDirection(direction);
                if(monster.getBlood() > 0)
                {
                    Manager.model.getGameobject().addGameObject(monster);
                }
            }
            else
            {
                Trace.trace("Error:MapMonsterAddCMD:receive","服务器不该发信息过来！")
                monster.parse(pi,false);
            }
            count --;
        }
    }
}