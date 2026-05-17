/**
 * pzx 
 * 18.2.28
 * 绝学 秘籍等级列表cvo
 */
class JueXueLeveCVO {
	private static _data:Object = {};
	/**秘籍id */
	public id:number;
    public leve:number;
	/**升级消耗*/
	public loss:string
/**升级获得(境界值)*/
	public gain:string
/** 属性（最终值，不累加） */
    public attr:string;

	public static parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readShort();
        var info:JueXueLeveCVO;
        let arr:Array<JueXueLeveCVO>;
        for(let i:number = 0; i < tableCount; i++)
        {
            info = new JueXueLeveCVO();
            info.id =bytes.readShort();
            info.leve = bytes.readShort();
            info.loss = bytes.readUTF();
            info.gain = bytes.readUTF();
            info.attr = bytes.readUTF();
            if(!this._data[info.id])
            {
                this._data[info.id] = new Array<JueXueLeveCVO>();
            }
            arr = this._data[info.id];
            arr.push(info);
        }
        JueXueExtraAttrCVO.parse(bytes);
    }
   
	/**
	 * 获得列表
	 */
	public static getList(id:number):Array<JueXueLeveCVO>
	{
		return this._data[id];
	}
    public static getCvo(id:number,leve:number):JueXueLeveCVO
    {
        let arr:Array<JueXueLeveCVO>=this._data[id];
        for(let i:number = arr.length-1;i>-1;i--)
        {
            if(arr[i].leve == leve)
            {
                return arr[i];
            }
        }
        return null;
    }
}
