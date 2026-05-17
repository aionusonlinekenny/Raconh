/**
 * 火眼金睛单关结算信息
 * liangyan
 * create 2018-03-22
*/
class FireEyeLevelResultInfo
{
    /**自己找到物品 */
    public findCount:number;
    /**自己物品积分 */
    public findScore:number;
    /**自己剩余时间 */
    public leftTime:number;
    /**自己时间积分 */
    public timeScore:number;
    /**自己总积分 */
    public selfScore:number;
    /**自己总用时 */
    public selfTime:number;
    /**获得物品数组 */
    public gainGoods:Array<ItemsModelInfo>;
    /**对手名字 */
    public enemyName:string;
    /**对手总积分 */
    public enemyScore:number;
    /**对手用时 */
    public enemyTime:number;

    /**是否自己胜利 */
    public selfWin:boolean;
    /**是否自己领先 */
    public get isSelfLead():boolean
    {
        return this.selfScore > this.enemyScore;
    }
}