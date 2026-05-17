/**
 * 盟主战排名信息
 */
class ClubLeaderWarRankInfo
{
    public id:number;
    public rank:number;
    public nickName:string;
    public career:number;
    /**活动开启后为净胜次数，结束为膜拜次数 */
    public winCount:number;
    /**排行榜净胜次数 */
    public rankWinCount:number;
}