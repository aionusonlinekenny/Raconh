/**
 * 单个技能更新
 * liangyan
 * create 2017-12-07
*/
class SkillSingleUpdateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.SKILL_SINGLE_UPDATE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let id = pi.readShort();
        let level = pi.readShort();
        let cd = pi.readInt();
        let cvo = SkillCVO.getCVO(id);
        cvo.setRunning((cd > 0), cd);
        let info = new SkillInfo(cvo, level);
        if(Manager.model.getSkill().defaultSkill.cvo.groupID == info.cvo.groupID) Manager.model.getSkill().defaultSkill = info;
        else Manager.model.getSkill().updateCareerSkills(info);

        Manager.model.getSkill().dispatchEvent(new SkillEvent(SkillEvent.SKILL_SINGLE_UPDATE, info.cvo.groupID));
    }
}