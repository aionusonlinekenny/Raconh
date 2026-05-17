/**
 * 火眼金睛下一关信息
 * liangyan
 * create 2018-03-27
*/
class FireEyeNextLevelInfo
{
    /**关卡数 */
    public level:number;
    /**目标物品数据 */
    public datas:Array<any>;
    /**闯关开始时间戳（当前时间小于此值，则需倒计时结束才能开始闯关） */
    public startTime:number;
    /**闯关时长 */
    public levelTime:number;
}