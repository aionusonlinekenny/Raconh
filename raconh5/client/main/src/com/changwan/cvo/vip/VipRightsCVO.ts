/**
 * vip特权表
 * liangyan
 * create 2017-12-25
*/
class VipRightsCVO
{
    public static cvos:Object;

    /**等级 */
    public level:number;
    /**开启VIP商城 */
    public shopOpen:boolean;
    /**铜钱副本可购买次数 */
    public coinCopyBuy:number;
    /**经验副本可购买次数 */
    public expCopyBuy:number;
    /**免费补签次数 */
    public freeSign:number;
    /**快速扫荡次数 */
    public copySweep:number;
    /**摇钱树使用次数 */
    public treeShake:number;
    /**竞技场挑战次数 */
    public arenaAdd:number;

    public parse(data:egret.ByteArray):void
    {
        this.level = data.readByte();
        this.shopOpen = data.readByte() == 1;
        this.coinCopyBuy = data.readByte();
        this.expCopyBuy = data.readByte();
        this.freeSign = data.readByte();
        this.copySweep = data.readByte();
        this.treeShake = data.readByte();
        this.arenaAdd = data.readByte();
    }

    public static getCVO(level:number):VipRightsCVO
    {
        return VipRightsCVO.cvos[level];
    }
}