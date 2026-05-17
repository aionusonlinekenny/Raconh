/**
 * pzx 
 * 18.2.28
 * 绝学 秘籍列表cvo
 */
class JueXueCVO {
	private static _data:Object = {};
	/**秘籍id */
	public id:number;
	/**秘籍名字 */
	public name:string;
	/**秘籍类型 */
	public type:number;
	/**激活消耗*/
	public active_loss:string
/**激活获得(境界值)*/
	public active_gain:string
/**属性 */
	public attr:string

	private _lev:number=0;

	public get lev():number
	{
		return this._lev;
	}
	public setLev(value:number)
	{
		this._lev = value;
	}

	public get levCvo():JueXueLeveCVO
	{
		if(this._lev== 0) return null;
		return JueXueLeveCVO.getCvo(this.id,this._lev);
	}

	/** 获取境界值 */
    public getJingjie():number
    {
		if(this._lev==0) return 0;
        let i:number = 0;
        let loss:GainLossVO = new GainLossVO(this.active_gain);
		i = loss.num;
		if(this._lev>1)
		{
			let arr:Array<JueXueLeveCVO>=JueXueLeveCVO.getList(this.id);
			for(let cvo of arr)
			{
				if(cvo.leve<this._lev)
				{
					let lo:GainLossVO = new GainLossVO(cvo.gain);
					i += lo.num;
				}
				else
				{
					break;
				}
			}
		}
		return i;
    }
    /** 获得战斗力 */
	public getFight():number
	{
		if(this._lev== 0) return 0;
		let fig:number = 0;
		let attrStr:string="";
		let exlist:JueXueExtraAttrCVO[] = JueXueExtraAttrCVO.getCvos(this.id);
        for(let i:number = exlist.length-1;i>-1;i--)
        {
            let exCvo:JueXueExtraAttrCVO = exlist[i];
            if(exCvo.leve<=this._lev)
            {
               attrStr = exCvo.attr+"|";
            }
        }
		let attVO:AttrVO
		if(attrStr.length>0)
		{
			attVO = Manager.pool.create(AttrVO,attrStr);
			fig = attVO.getFighting();
			Manager.pool.push(attVO);
		}
		let cvo:JueXueLeveCVO = JueXueLeveCVO.getCvo(this.id,this._lev);
		attVO = Manager.pool.create(AttrVO,cvo.attr);
		fig += attVO.getFighting();
		Manager.pool.push(attVO);
		return fig;
	}
	/** 检测是否可升级 */
	public checkUpgrade():boolean
	{
		let loss:GainLossVO;
		if(this._lev==0)
		{
			loss = new GainLossVO(this.active_loss);
			return loss.isEnough();
		}
		else
		{
			let cvo:JueXueLeveCVO = JueXueLeveCVO.getCvo(this.id,this._lev);
			if(cvo.loss=="") return false;
			loss = new GainLossVO(cvo.loss);
			return loss.isEnough();
		}
	}

	public static parse(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        var info:JueXueCVO;
        
        for(let i:number = 0; i < tableCount; i++)
        {
            info = new JueXueCVO();
            info.id =bytes.readShort();
            info.name = bytes.readUTF();
            info.type = bytes.readByte();
            info.active_loss = bytes.readUTF();
            info.active_gain = bytes.readUTF();
			info.attr = bytes.readUTF();
            this._data[info.id] = info;
        }
        JueXueLeveCVO.parse(bytes);
    }
    /**信息 */
    public static getCvo(id:number):JueXueCVO
    {
        return this._data[id];
    }
	/**
	 * 获得列表
	 */
	public static getList(type:number):Array<JueXueCVO>
	{
		let arr:JueXueCVO[] = [];
		for(let key in this._data)
		{
			let cvo:JueXueCVO = this._data[key];
			if(cvo.type == type)
			{
				arr.push(cvo);
			}
		}
		arr = ArrayUtil.sortOn(arr,["id"]);
		return arr;
	}

	public static totalFight():number
	{
		let fight:number= 0;
		for(let key in this._data)
		{
			let cvo:JueXueCVO = this._data[key];
			if(cvo._lev>0)
			{
				fight += cvo.getFight();
			}
		}
		return fight;
	}
	public static data():Object
	{
		return this._data;
	}

}
