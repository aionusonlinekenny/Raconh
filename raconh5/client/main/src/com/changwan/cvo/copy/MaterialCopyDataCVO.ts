/**
 * 缥缈录
 * Simon
 * create 2018-3-16
 */
class MaterialCopyDataCVO
{
    private static cvos:Object;
    public static MAX_ID:number = 0;

    public id:number;
    /**星数 */
    public star:number;
    /**奖励 */
    public award:GainLossVO;
    /**显示奖励 */
    public showAward:GainLossVO[];

    /*解析表*/
    public static parse(bytes:egret.ByteArray):void
    {
        let tabCount:number = bytes.readByte();
        MaterialCopyDataCVO.cvos = [];
        let cvo:MaterialCopyDataCVO;
        let rowCount:number = bytes.readShort();
        for (let j = 0; j < rowCount; j++)
        {
            cvo = new MaterialCopyDataCVO();
            cvo.id = bytes.readShort();
            cvo.star = bytes.readShort();
            cvo.award = new GainLossVO(bytes.readUTF());
            cvo.showAward = GainLossVO.parse(bytes.readUTF());
            MaterialCopyDataCVO.cvos[cvo.id] = cvo;
            MaterialCopyDataCVO.MAX_ID = cvo.id;
        }
    }

    public static getInfo(id:number):MaterialCopyDataCVO
    {
        return MaterialCopyDataCVO.cvos[id];
    }
}