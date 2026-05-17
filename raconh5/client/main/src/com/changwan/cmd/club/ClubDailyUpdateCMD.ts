/**
 * 宗门每日更新推送
 */
class ClubDailyUpdateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_DAILY_UPDATE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let clubInfo:ClubInfo = Manager.model.getClub().clubInfo;
        if(clubInfo)
        {
            clubInfo.donate = pi.readInt();
            clubInfo.hisDonate = pi.readInt64();
            clubInfo.donateList = [];
            let donateLen:number = pi.readShort();
            for(let j:number=0; j<donateLen; j++)
            {
                let type:number = pi.readByte();
                if(clubInfo.donateList[type - 1])
                    clubInfo.donateList[type - 1].count = pi.readShort();
            }
            clubInfo.isGetReward = pi.readByte();
            Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_INFO));
            Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_DONATE));
        }
    }
}