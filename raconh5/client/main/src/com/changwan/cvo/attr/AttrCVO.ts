/**
 * pzx 
 * 17.11.13
 * 属性表
 */
class AttrCVO
{

    private static _data:Object = {};

      //属性名字
    public name:string;
    //短名
    public shortName:string;
    /**标签（客户端）*/
    public type:string;

    public id:number;
    /** 是否百分比显示，1是，0否 */
    public format:number;
    /** 是否星星，1是，0否 */
    public showStar:number;



    public static parse(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        var info:AttrCVO;
        
        for(let i:number = 0; i < tableCount; i++)
        {
            info = new AttrCVO();
            info.name =bytes.readUTF();
            info.shortName =bytes.readUTF();
            info.type = bytes.readUTF();
            info.id = bytes.readByte();
            info.format = bytes.readByte();
            info.showStar = bytes.readByte();
            this._data[info.id] = info;
        }
    }
    /**信息 */
    public static getInfo(id:number):AttrCVO
    {
        return this._data[id];
    }
    
}
