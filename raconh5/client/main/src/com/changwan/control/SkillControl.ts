/**
 * 技能controller
 * liangyan
 * create 2017-11-21
*/
class SkillControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.SKILL_INFO, SkillInfoCMD);
        Manager.socket.addCMD(Protocol.SKILL_ACTIVE_UPGRADE, SkillActiveUpgradeCMD);
        Manager.socket.addCMD(Protocol.SKILL_PASSIVE_ACT, SkillPassiveActCMD);
        Manager.socket.addCMD(Protocol.SKILL_ALL_UP, SkillAllUpCMD);
        Manager.socket.addCMD(Protocol.SKILL_CD_CHANGE, SkillCdChangeCMD);
        Manager.socket.addCMD(Protocol.SKILL_SINGLE_UPDATE, SkillSingleUpdateCMD);
    }

    /**升级主动技能 */
    public upgradeActive(id:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.SKILL_ACTIVE_UPGRADE) as SkillActiveUpgradeCMD;
        cmd.id = id;
        cmd.send();
    }
    /**激活被动技能 */
    public actPassive(id:number):void
    {
        let cmd = Manager.socket.getCMD(Protocol.SKILL_PASSIVE_ACT) as SkillPassiveActCMD;
        cmd.id = id;
        cmd.send();
    }
    /**一键升级技能 */
    public allUp(arr:Array<any>):void
    {
        let cmd = Manager.socket.getCMD(Protocol.SKILL_ALL_UP) as SkillAllUpCMD;
        cmd.arr = arr;
        cmd.send();
    }
}