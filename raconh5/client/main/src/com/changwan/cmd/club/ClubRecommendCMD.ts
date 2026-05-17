/**
 * 宗主数据更新
 */
class ClubRecommendCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_RECOMMEND;
    }

    public receive(pi:TCPPacketIn):void
    {
        let list:Array<ClubRecommendInfo> = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let info:ClubRecommendInfo = Manager.pool.create(ClubRecommendInfo);
            info.clubId = pi.readInt64();
            info.clubType = pi.readByte();
            info.playerCount = pi.readInt();
            list.push(info);
        }
        Manager.model.getClub().updateChooseClubInfo(list);
    }
}