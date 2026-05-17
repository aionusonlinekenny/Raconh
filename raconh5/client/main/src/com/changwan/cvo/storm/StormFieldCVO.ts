/**
 *author luzh
 *create 2018.4.21
 *description 江湖风云区域cvo
*/
class StormFieldCVO
{
    public id:number;//
    public name:string;//势力名
    public pos:egret.Point;//位置

    private static _cvos:Object;
    public static parse(bytes:egret.ByteArray)
    {
        this._cvos = {};
        var baseCount:number = bytes.readShort();
        let cvo:StormFieldCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new StormFieldCVO();
            cvo.id = bytes.readByte();
            cvo.name = bytes.readUTF();
            cvo.pos = PointUtil.getPoint2(bytes.readUTF());
            this._cvos[cvo.id] = cvo;
        }
    }

    public static getCVOs():Object
    {
        return this._cvos;
    }




    //--------------------------------------------------------------------------------------
    public static parseCVOs(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readByte();
        StormFieldCVO.parse(bytes);
        StormStrongHoldCVO.parse(bytes);
    }
}