/**
 * 盟主战任命
 */
class ClubLeaderWarDesignateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_CLUB_LEADER_WAR_DESIGNATE;
    }

    public roleId:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt64(this.roleId);
    }

    public receive(pi:TCPPacketIn):void
    {
        let status:number = pi.readByte();
        if(status == 1)
        {
            FloatTips.addTips(LangCVO.getContent("clubLeaderWar27"), Color.GREEN);
            Manager.control.getClub().memberListQuery();
        }
        else
            FloatTips.addTips(LangCVO.getContent("clubLeaderWar28"), Color.RED);
    }
}