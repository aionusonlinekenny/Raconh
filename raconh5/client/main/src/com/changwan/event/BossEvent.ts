/**
 * luzhihong
 * create 2017-12-27
 */
class BossEvent extends BaseEvent
{
    //BOSS信息更新（血量和重生时间）
    public static BLOOD_INFO:string = "BLOOD_INFO";
    //BOSS复活或击杀更新
    public static KILLED_OR_REVIVE:string = "KILLED_OR_REVIVE";
    //BOSS挑战次数更新
    public static CHALLENGE_TIMES:string = "CHALLENGE_TIMES";
    //BOSS关注更新
    public static ATTENTION:string = "ATTENTION";
    //敌对玩家列表更新
    public static ENEMY_LIST:string = "ENEMY_LIST";
    //伤害排名更新
    public static RANK_LIST:string = "RANK_LIST";
//珍希掉落
    public static RAREDROP_QUIER_EVENT = "RAREDROP_QUIER_EVENT";
}