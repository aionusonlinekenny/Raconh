/**
 *author Anydo
 *create 2017-11-16
 *description 
*/
class MapMonsterDeadCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAP_MONSTER_DEAD;
    }

    public receive(pi:TCPPacketIn):void
    {
        let id:number = pi.readInt();//怪物ID
        let attackId:number = pi.readInt64();//攻击者ID
        let beatBack:boolean = (pi.readByte() == 1);//是否死亡击飞
        let info:MonsterGameObjectInfo = Manager.model.getGameobject().getMonsterGameObject(id);
        if(info)
        {
            info.playDeadAnimation();//死亡特效
            if(info.cvo.deadNoHide) return;//配置怪物死亡不消失时，不执行，由AliveFlag移除info
            Manager.model.getGameobject().removeGameObject(info);
        }
    }
}