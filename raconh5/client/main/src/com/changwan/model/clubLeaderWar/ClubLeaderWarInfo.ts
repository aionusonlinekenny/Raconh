/**
 * 盟主战活动信息
 */
class ClubLeaderWarInfo
{
    /**玩家排名 */
    public rank:number;
    /**剩余进入次数 */
    public playNum:number;
    /**恢复进入次数时间戳 */
    public playCountdown:number;
    /**膜拜次数 */
    public mobaiCount:number;
    /**下次活动开始时间 */
    public nextTime:number;
    /**排名信息 */
    public rankList:Array<ClubLeaderWarRankInfo>;
}