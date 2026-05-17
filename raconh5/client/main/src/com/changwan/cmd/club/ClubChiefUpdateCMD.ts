/**
 * 宗主数据更新
 */
class ClubChiefUpdateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_CHIEF_UPDATE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let clubInfo:ClubInfo = Manager.model.getClub().clubInfo;
        if(clubInfo)
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
        Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_INFO));
    }
}