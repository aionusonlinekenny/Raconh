/**
 * 宗门信息协议
 * Simon
 * create 2017-12-15
*/
class ClubInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let clubInfo:ClubInfo = Manager.model.getClub().clubInfo;
        clubInfo.clubType = pi.readByte();
        clubInfo.clubName = pi.readUTF();
        clubInfo.desc = pi.readUTF();
        let len:number = pi.readShort();
        if(len > 0)
        {
            clubInfo.masterId = pi.readInt64();
            clubInfo.masterName = pi.readUTF();
            clubInfo.masterSex = pi.readByte();
            clubInfo.masterVip= pi.readByte();
            clubInfo.masterClubCareer = pi.readShort();
            clubInfo.masterFashion = pi.readInt();
            clubInfo.masterCloak = pi.readInt();
            clubInfo.masterWeapon = pi.readInt();
        }
        clubInfo.memberType = pi.readByte();
        clubInfo.clubCareer = pi.readShort();
        clubInfo.donate = pi.readInt();
        clubInfo.hisDonate = pi.readInt64();
        clubInfo.donateList = [];
        for(let j:number=0; j<2; j++)
        {
            let clubDonateInfo:ClubDonateInfo = Manager.pool.create(ClubDonateInfo);
            clubDonateInfo.donateType = j + 1;
            clubDonateInfo.count = 0;
            clubInfo.donateList.push(clubDonateInfo);
        }
        let donateLen:number = pi.readShort();
        for(let j:number=0; j<donateLen; j++)
        {
            let type:number = pi.readByte();
            if(clubInfo.donateList[type - 1])
                clubInfo.donateList[type - 1].count = pi.readShort();
        }
        clubInfo.isGetReward = pi.readByte();
        Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_INFO));
    }
}