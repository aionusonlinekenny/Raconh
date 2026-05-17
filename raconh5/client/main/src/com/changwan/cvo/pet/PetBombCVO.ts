/**
 *author Anydo
 *create 2018-1-11
 *description 
*/
class PetBombCVO
{
    public static cvos:Object;

    public resId:number;
    public config:string;

    public parseOne(data:egret.ByteArray):void
    {
        this.resId = data.readShort();
        this.config = data.readUTF();
    }

    public static getBombPoss(resId:number):egret.Point[]
    {
        let cvo:PetBombCVO = this.cvos[resId];
        if(cvo == null) return null;
        return PointUtil.getPoint3(cvo.config,"|",",");
    }
}