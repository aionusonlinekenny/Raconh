/**
 * 技能信息协议
 * liangyan
 * create 2017-11-21
*/
class SkillInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.SKILL_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getSkill().resetCareerSkills();
        let len = pi.readShort();
        let info:SkillInfo;
        let cvo:SkillCVO;
        let id:number;
        let level:number;
        let cd:number;
        for(let i = 0; i < len; i++)
        {
            id = pi.readShort();
            level = pi.readShort();
            cd = pi.readInt();
            cvo = SkillCVO.getCVO(id);
            cvo.setRunning((cd > 0), cd);
            info = new SkillInfo(cvo, level);
            if(Manager.model.getSkill().defaultSkill.cvo.groupID == info.cvo.groupID) Manager.model.getSkill().defaultSkill = info;
            else Manager.model.getSkill().careerSkills.push(info);
        }
        Manager.model.getSkill().parseHookSkills();

        Manager.model.getSkill().dispatchEvent(new SkillEvent(SkillEvent.SKILL_UPDATE));
    }
}