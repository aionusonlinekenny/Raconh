/**
 * 宠物攻击协议
 * liangyan
 * create 2017-12-29
*/
class PetAttackCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.PET_ATTACK;
    }

    public skillID:number;
    public targetID:number;
    
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.skillID);
        pkg.writeInt64(this.targetID);
    }
}