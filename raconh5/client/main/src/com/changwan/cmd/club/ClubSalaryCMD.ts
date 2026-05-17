/**
 * 宗门职位福利
 */
class ClubSalaryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_SALARY;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getClub().clubInfo.isGetReward = 1;
        Manager.model.getClub().dispatchEvent(new ClubEvent(ClubEvent.UPDATE_CLUB_INFO));
    }
}