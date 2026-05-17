/**
 * pzx 
 * 18.2.28
 * 绝学 境界列表cvo
 */
class JueXueAmbitCVO {
	private static _data:Object = {};
	/**秘籍id */
	public id:number;
    /**境界名 */
    public name:string;
	/**升级消耗(境界值)*/
	public loss:string
/** 属性 （最终值，不累加）*/
    public attr:string;

	public static parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readShort();
        var info:JueXueAmbitCVO;
        for(let i:number = 0; i < tableCount; i++)
        {
            info = new JueXueAmbitCVO();
            info.id =bytes.readByte();
            info.name = bytes.readUTF();
            info.loss = bytes.readUTF();
            info.attr = bytes.readUTF();
            this._data[info.id] = info;
        }
    }
    /**信息 */
    public static getInfo(id:number):JueXueAmbitCVO
    {
        return this._data[id];
    }
}
