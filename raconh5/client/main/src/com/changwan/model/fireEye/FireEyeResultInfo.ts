/**
 * 火眼金睛活动结算信息
 * liangyan
 * create 2018-03-27
*/
class FireEyeResultInfo
{
    /**自己积分 */
    public selfScore:number;
    /**自己用时 */
    public selfTime:number;
    /**获得物品数组 */
    public gainGoods:Array<ItemsModelInfo>;
    /**对手名字 */
    public enemyName:string;
    /**对手积分 */
    public enemyScore:number;
    /**对手用时 */
    public enemyTime:number;

    /**是否自己胜利 */
    public get isSelfWin():boolean
    {
        return this.selfScore > this.enemyScore;
    }
}