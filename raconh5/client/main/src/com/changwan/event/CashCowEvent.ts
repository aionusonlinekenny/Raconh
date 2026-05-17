/**
 * pzx 
 * 17.12.18
 */
class CashCowEvent extends BaseEvent
{
    //更新
    public static CASHCOW_UPDATE_EVENT:string = "CASHCOW_UPDATE_EVENT";
    /** 冲级好礼更新 */
    public static LEVITEM_UPDATE_EVENT:string = "LEVITEM_UPDATE_EVENT";
/** 冲级好礼查询 */
    public static LEVITEM_QUERY_EVENT:string = "LEVITEM_QUERY_EVENT";
/** 七天登陆 */
    public static SEVENDAYS_QUERY_EVENT:string = "SEVENDAYS_QUERY_EVENT";
/**七天登陆领奖 */
    public static SEVENDAYS_REWARD_EVENT:string = "SEVENDAYS_REWARD_EVENT";
}