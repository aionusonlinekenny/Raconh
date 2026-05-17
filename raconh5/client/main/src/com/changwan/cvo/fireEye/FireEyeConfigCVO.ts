/**
 * 火眼金睛配置表
 * liangyan
 * create 2018-03-28
*/
class FireEyeConfigCVO
{
    private static _cvos:Object;
    /**每关结算倒计时 */
    public static ID_LEVEL_COUNTDOWN = 3;
    /**获得连胜奖励1的连胜数 */
    public static ID_WIN_TIMES = 4;
    /**画布宽 */
    public static ID_CANVAS_WIDTH = 5;
    /**画布高 */
    public static ID_CANVAS_HEIGHT = 6;
    /**连续错选次数上限 */
    public static ID_WRONG_TIMES = 7;
    /**错选限制时长（秒） */
    public static ID_BAN_HAND = 8;
    /**画布单屏高度（前端用） */
    public static ID_SEE_HEIGHT = 14;

    public id:number;
    public value:number;

    public static parse(bytes:egret.ByteArray):void
    {
        FireEyeConfigCVO._cvos = {};
        let cvoCount:number = bytes.readShort();
        let cvo:FireEyeConfigCVO;
        for(let i:number = 0 ; i < cvoCount; i ++)
        {
            cvo = new FireEyeConfigCVO();
            cvo.id = bytes.readByte();
            cvo.value = bytes.readShort();
            FireEyeConfigCVO._cvos[cvo.id] = cvo;
        }
    }

    public static getCVOByID(id:number):FireEyeConfigCVO
    {
        return FireEyeConfigCVO._cvos[id];
    }
}