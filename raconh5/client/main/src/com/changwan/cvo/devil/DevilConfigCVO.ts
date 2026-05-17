/**
 * 魔神降临配置表
 * liangyan
 * create 2018-04-19
*/
class DevilConfigCVO
{
    private static _cvos:Object;
    public id:number;
    public value:string;

    /**1V1对手起始点 */
    public static ID_ENEMY_BIRTH_POS = 11;
    /**1V1对手目标点 */
    public static ID_ENEMY_TARGET_POS = 12;
    /**1V1对手宠物起始点 */
    public static ID_ENEMY_PET_BIRTH_POS = 13;
    /**1V1对手宠物目标点 */
    public static ID_ENEMY_PET_TARGET_POS = 14;
    /**1V1地图id */
    public static ID_GRAB_MAP = 15;
    /**1V1自己目标点 */
    public static ID_SELF_TARGET_POS = 16;
    /**1V1自己宠物目标点 */
    public static ID_SELF_PET_TARGET_POS = 17;

    public static parse(bytes:egret.ByteArray):void
    {
        DevilConfigCVO._cvos = {};
        var tableCount:number = bytes.readByte();
        var baseCount:number = bytes.readShort();
        let cvo:DevilConfigCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new DevilConfigCVO();
            cvo.parseOne(bytes);
            DevilConfigCVO._cvos[cvo.id] = cvo;
        }
    }

    private parseOne(data:egret.ByteArray):void
    {
        this.id = data.readShort();
        this.value = data.readUTF();
    }

    public static getCVO(id:number):DevilConfigCVO
    {
        return DevilConfigCVO._cvos[id];
    }
}