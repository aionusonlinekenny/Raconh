/**
 * 升级主动技能
 * liangyan
 * create 2017-11-21
*/
class SkillActiveUpgradeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.SKILL_ACTIVE_UPGRADE;
    }

    /**技能id */
    public id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.id);
    }
}