/**
 * 副本Event
 * luzhihong
 * create 2017-12-4
 */
class CopyEvent extends BaseEvent
{
    //单个副本更新
    public static UPDATE_SINGLE:string = "UPDATE_SINGLE";
    //副本排行更新
    public static UPDATE_RANK:string = "UPDATE_RANK";
    
    public static UPDATE_BUY_COUNT:string = "UPDATE_BUY_COUNT";

    //*****************爬塔副本 start*******************//
    public static UPDATE_TOWER_INFO:string = "UPDATE_TOWER_INFO";
    //*****************爬塔副本 end*******************//
    
    //*****************经验副本 start*******************//
    public static EXP_INFO_UPDATE:string = "EXP_INFO_UPDATE";
    public static EXP_WAVE:string = "EXP_WAVE";
    public static EXP_INSPIRE:string = "EXP_INSPIRE";
    public static EXP_KILLS:string = "EXP_KILLS";
    public static EXP_GAINS:string = "EXP_GAINS";
    public static EXP_DATA_INIT:string = "EXP_DATA_INIT";
    //*****************经验副本 end*******************//
    
    //*****************银币副本 start*******************//
    public static SILVER_COOLING:string = "SILVER_COOLING";
    public static SILVER_BOXES:string = "SILVER_BOXES";
    public static SILVER_MINI:string = "SILVER_MINI";
    //*****************银币副本 end*******************//
}