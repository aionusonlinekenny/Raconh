/**
 *author Anydo
 *create 2017-12-5
 *description 
*/
class SkillCdChangeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.SKILL_CD_CHANGE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let id:number = pi.readShort();
        let cd:number = pi.readInt();
        let cvo:SkillCVO = SkillCVO.getCVO(id);
        cvo.setRunning((cd > 0), cd);
    }
}