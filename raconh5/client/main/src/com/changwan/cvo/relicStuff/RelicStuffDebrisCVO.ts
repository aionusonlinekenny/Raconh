/**
 * 神器碎片
 * pzx
 * 18.3.9
 */
class RelicStuffDebrisCVO {
	private static _cvos:any;
	/** 碎片id*/
	public des_id:number;
	/** 名*/
	public name:string;
/** 属性 */
	public attr:string;

/**条件 */
	public condVo:ConditionVO;
    private _attrVO:AttrVO
    public get attrVO():AttrVO
    {
        if(this._attrVO == null) this._attrVO = Manager.pool.create(AttrVO, this.attr);
        return this._attrVO
    }

/** 神器id */
	public sqId:number;

	//是否激活
	private _isAct:boolean;

	public setisAct():void
	{
		this._isAct = true;
	}

    /** 是否激活 */
	public isActivity():boolean
	{
		return this._isAct;
	}
	/**
	 * 检测是否可激活
	 */
	public checkisActivity():boolean
	{
		if(this._isAct) return false;
		
		return this.condVo.isSatisfy();
	}

	public static parse(bytes:egret.ByteArray):void
    {
		this._cvos = {};
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:RelicStuffDebrisCVO = new RelicStuffDebrisCVO();
			item.des_id = bytes.readShort();
			item.name = bytes.readUTF();
			item.condVo=new ConditionVO(bytes.readUTF());
			//item.cond = bytes.readUTF();
			item.attr = bytes.readUTF();
			item.sqId = bytes.readByte();1
			this._cvos[item.des_id] = item;
        }
    }

	public static cvos(sqId:number):RelicStuffDebrisCVO[]
	{
		let arr:Array<RelicStuffDebrisCVO>=[];
		for(let key in this._cvos)
		{
			let cvo :RelicStuffDebrisCVO = this._cvos[key];
			if(cvo.sqId == sqId)
			{
				arr.push(cvo);
			}
		}
		return arr;
	}
	public static cvo(id:number):RelicStuffDebrisCVO
	{
		return this._cvos[id];
	}
	/** 设置激活碎片 */
	public static setActivity(id:number):void
	{
		let cvo:RelicStuffDebrisCVO = this._cvos[id];
		if(cvo)
		{
			cvo.setisAct();
		}
	}
	public static allcvos():any
	{
		return this._cvos;
	}


}