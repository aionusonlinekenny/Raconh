/**
 * 宗门捐献
 */
class ClubCareerUpgradeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_UPGRADE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let career:number = pi.readShort();
        Manager.model.getClub().clubInfo.clubCareer = career;
        Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_CAREER));
    }
}