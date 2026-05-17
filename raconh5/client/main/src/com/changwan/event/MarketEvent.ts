/**
 * pzx 
 * 18.4.17
 * 市场event
 */
class MarketEvent extends BaseEvent
{
    /**玩家列表 */
    public static MARKET_LIST_INFO_EVENT:string = "MARKET_LIST_INFO_EVENT";
　　/**玩家摊位信息 */
    public static MARKET_PLAYER_INFO_EVENT:string = "MARKET_PLAYER_INFO_EVENT";
    /**更新列表 */
    public static MARKET_UPD_LIST_EVENT:string = "MARKET_UPD_LIST_EVENT";
//记录
    public static MARKET_QUERY_NOTICE_EVENT:string = "MARKET_QUERY_NOTICE_EVENT";
/**购买 */
    public static MARKET_BUY_EVENT:string = "MARKET_BUY_EVENT";
}