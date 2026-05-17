/**
 * pzx 
 * 18.2.28
 * 绝学 额外属性列表cvo
 */
class JueXueExtraAttrCVO {
	private static _data:Object = {};
	/**秘籍id */
	public id:number;
    public leve:number;
/** 额外属性（需累加） */
    public attr:string;
    private _attrVo:AttrVO
    public get attrVo():AttrVO
    {
        if(this._attrVo == null) this._attrVo = Manager.pool.create(AttrVO, this.attr);
        return this._attrVo;
    }

    public getAttrVOinfo():AttrVoInfo
    {
        return this.attrVo.attrInfos[0];
    }

	public static parse(bytes:egret.ByteArray):void
    {
        let tableCount:number = bytes.readShort();
        var info:JueXueExtraAttrCVO;
        for(let i:number = 0; i < tableCount; i++)
        {
            info = new JueXueExtraAttrCVO();
            info.id =bytes.readShort();
            info.leve = bytes.readShort();
            info.attr = bytes.readUTF();
            this._data[info.id+"_"+info.leve] = info;
        }
        JueXueAmbitCVO.parse(bytes);
    }
    /**list信息 */
    public static getCvos(id:number):JueXueExtraAttrCVO[]
    {
        let arr:Array<JueXueExtraAttrCVO>=[]
        for(let key in this._data)
        {
            let cvo:JueXueExtraAttrCVO = this._data[key];
            if(cvo.id == id)
            {
                arr.push(cvo);
            }
        }
        arr = ArrayUtil.sortOn(arr,["leve"]);
        return arr;
    }
	
}
