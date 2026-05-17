/**
 * 宗门捐献
 */
class ClubDonateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_DONATE;
    }

    public type:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
    }

    public receive(pi:TCPPacketIn):void
    {
        let type:number = pi.readByte();
        let count:number = pi.readShort();
        let hisDonate:number = pi.readInt64();

        let info:ClubDataCVO = ClubDataCVO.getClubDonateById(type);
        if(info)
            FloatTips.addTips(LangCVO.getContent("club16", info.gainValue), Color.GREEN);

        Manager.model.getClub().clubInfo.hisDonate = hisDonate;
        let list:Array<ClubDonateInfo> = Manager.model.getClub().clubInfo.donateList;
        for(let i:number=0; i<list.length; i++)
        {
            if(list[i].donateType == type)
            {
                list[i].count = count;
            }
        }
        Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_INFO));
        Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_DONATE));
    }
}