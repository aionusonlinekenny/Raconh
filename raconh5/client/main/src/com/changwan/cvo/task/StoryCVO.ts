/**
 * 新手剧情表
 * liangyan
 * create 2018-03-14
*/
class StoryCVO
{
    private static _cvos:Object;

    /**id */
    public id:number;
    /**操作类型 */
    public type:number;
    /**脚本 */
    public script:string;

    public static parse(bytes:egret.ByteArray):void
    {
        StoryCVO._cvos = {};
        var baseCount:number = bytes.readShort();
        let cvo:StoryCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new StoryCVO();
            cvo.parseOne(bytes);
            StoryCVO._cvos[cvo.id] = cvo;
        }
    }

    private parseOne(data:egret.ByteArray):void
    {
        this.id = data.readShort();
        this.type = data.readByte();
        this.script = data.readUTF();
    }

    public static getCVO(id:number):StoryCVO
    {
        return this._cvos[id];
    }
}