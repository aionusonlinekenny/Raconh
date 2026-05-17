/**
 *author Anydo
 *create 2017-12-14
 *description 
*/
class PoisoningNoticeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.POISONING_NOTICE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let attackID:number = pi.readInt64();
        let attackedID:number = pi.readInt64();
        let hurtValue:number = pi.readInt();

        let attack:AliveGameObjectInfo = Manager.model.getGameobject().getGameObject(attackID) as AliveGameObjectInfo;
        let attacked:AliveGameObjectInfo = Manager.model.getGameobject().getGameObject(attackedID) as AliveGameObjectInfo;
        if(!attack.isSelfGO && !attacked.isSelfGO) return;
        let direction:number = attack ? PointUtil.getAngle(attack.x, attack.y, attacked.x, attacked.y) : 0;
        let sctType:number = (attacked.isType(GameObjectType.SELF)) ? SCTConst.TYPE_HURT : SCTConst.TYPE_SKILL;
        attacked.playSCT(sctType, hurtValue, direction);
    }
}