/**
 * 火眼金睛物品配置表
 * liangyan
 * create 2018-03-28
*/
class FireEyeItemCVO
{
    private static _cvos:Object;
    /**招财猫类型 */
    public static TYPE_GOOD_CAT = 99;

    public id:number;
    /**资源id */
    public resID:number;
    /**名字 */
    public name:string;
    /**类型 */
    public type:number;

    public static parse(bytes:egret.ByteArray):void
    {
        FireEyeItemCVO._cvos = {};
        let cvoCount:number = bytes.readShort();
        let cvo:FireEyeItemCVO;
        for(let i:number = 0 ; i < cvoCount; i ++)
        {
            cvo = new FireEyeItemCVO();
            cvo.id = bytes.readShort();
            cvo.resID = (bytes.readUnsignedInt() << 32) | bytes.readUnsignedInt();
            cvo.name = bytes.readUTF();
            cvo.type = bytes.readShort();
            FireEyeItemCVO._cvos[cvo.id] = cvo;
        }
    }

    public static getCVOByID(id:number):FireEyeItemCVO
    {
        return FireEyeItemCVO._cvos[id];
    }

    public static getFirstCvoByType(type:number):FireEyeItemCVO
    {
        let cvo:FireEyeItemCVO;
        for(let key in FireEyeItemCVO._cvos)
        {
            cvo = FireEyeItemCVO._cvos[key];
            if(cvo && cvo.type == type) return cvo;
        }
        return null;
    }
}