/**
 *author luzh
 *create 2018.4.21
 *description 江湖风云据点cvo
*/
class StormStrongHoldCVO
{
    public id:number;//据点id
    public fieldID:number;//据点所属势力区域
    public name:string;//据点名字
    public step:number;//据点阶级
    public next_id:string;//占领后可进攻的据点id
    public last_id:string;//可攻击该据点的前提据点
    public map_id:number;//地图id
    public pos:egret.Point;//据点位置

    private static _cvos:Object;
    public static parse(bytes:egret.ByteArray)
    {
        this._cvos = {};
        var baseCount:number = bytes.readShort();
        let cvo:StormStrongHoldCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new StormStrongHoldCVO();
            cvo.id = bytes.readShort();
            cvo.fieldID = bytes.readByte();
            cvo.name = bytes.readUTF();
            cvo.step = bytes.readByte();
            cvo.next_id = bytes.readUTF();
            cvo.last_id = bytes.readUTF();
            cvo.map_id = bytes.readShort();
            cvo.pos = PointUtil.getPoint2(bytes.readUTF());
            this._cvos[cvo.id] = cvo;
        }
    }

    public static getCVO(id:number):StormStrongHoldCVO
    {
        return this._cvos[id] as StormStrongHoldCVO;
    }

    public static getCVOsByFieldID(fieldID:number):Array<StormStrongHoldCVO>
    {
        let result:Array<StormStrongHoldCVO> = [];
        let cvo:StormStrongHoldCVO;
        for(let key in this._cvos)
        {
            cvo = this._cvos[key];
            if(cvo.fieldID == fieldID) result.push(cvo);
        }
        return result;
    }
}