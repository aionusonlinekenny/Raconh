/**
 *author Anydo
 *create 2017-11-4
 *description 怪物走路
*/
class MapMonsterWalkCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAP_MONSTER_WALK;
    }

    public receive(pi:TCPPacketIn):void
    {
        let monsterID:number = pi.readInt();
        let monster:MonsterGameObjectInfo = Manager.model.getGameobject().getMonsterGameObject(monsterID);
        if(monster == null) return;
        if(!monster.getAliveFlag()) return;
        let walkType:number = pi.readByte();
        let len:number = pi.readShort();
        let path:egret.Point[] = [];
        for(let i:number = 0; i < len; i++) path.push(new egret.Point(pi.readShort(), pi.readShort()));
        // if(path.length > 0 && !(path[0].x == monster.x && path[0].y == monster.y)) path.unshift(monster.position);
        if(path.length > 0 && !(path[0].x == monster.x && path[0].y == monster.y)) path.unshift(new egret.Point(monster.x,monster.y));
        if(path.length > 0)
        {
            path = monster.handleCurentPath(path, monster.x, monster.y);
            monster.walk(path, walkType);
        }
    }
}