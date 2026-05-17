/**
 * 火眼金睛闯关数据
 * liangyan
 * create 2018-03-27
*/
class FireEyeLevelCVO
{
    private static _cvos:Object;
    /**最高关卡 */
    public static maxLevel:number;

    /**关卡id */
    public id:number;
    /**闯关时长 */
    public time:number;
    /**找到物品获得的积分数 */
    public findScore:number;
    /**剩余每秒积分数 */
    public timeScore:number;

    public static parse(bytes:egret.ByteArray):void
    {
        FireEyeLevelCVO._cvos = {};
        let cvoCount:number = bytes.readShort();
        this.maxLevel = cvoCount;
        let cvo:FireEyeLevelCVO;
        for(let i:number = 0 ; i < cvoCount; i ++)
        {
            cvo = new FireEyeLevelCVO();
            cvo.id = bytes.readByte();
            cvo.time = bytes.readByte();
            cvo.findScore = bytes.readByte();
            cvo.timeScore = bytes.readByte();
            FireEyeLevelCVO._cvos[cvo.id] = cvo;
        }
    }

    public static getCVOByID(id:number):FireEyeLevelCVO
    {
        return FireEyeLevelCVO._cvos[id];
    }
}