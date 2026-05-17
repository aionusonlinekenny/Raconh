class ItemsModelInfo
{
	/**所在位置(装备 :背包 :仓库,命格背包，穿上的命格,拍卖单索引)'),*/
	public pos:number;
	/**数量*/
	public quantity:number;
	//ID
	public id:number;
	//物品基础ID
	private _base_id:number;
	public get base_id():number {return this._base_id;}
	public set base_id(value:number)
	{
		if(this._base_id == value) return;
		this._base_id = value;
		if(Number(String(this._base_id).substr(2,1)) == 0)
			this.level = Number(String(this._base_id).substr(3,2)) * 10;
		else if(Number(String(this._base_id).substr(2,1)) == 1)
			this.turnLevel = Number(String(this._base_id).substr(3,2));
		this._cvo = ItemsCVO.getCvo(this._base_id);
	}
	/**物品模板表信息 */
	private _cvo:ItemsCVO;
	public get cvo():ItemsCVO { return this._cvo; }
	//是否绑定
	public bind:boolean;
    //过期时间戳
	public time:number;

	public infoList:Array<ExattrItemsinfo>=[];
    /** 存储空间  0为没有得到的物品，1在装备，2在背包，3 仓库*/
	public storagetype:number=0;
	/** 转生等级 */
	public turnLevel:number = 0;
	/** 等级 */
	public level:number = 0;
	/**
	 * 强化等级
	 */
	public strengthenLevel:number = 0;
	/**
	 * 职业
	 */
	public get career():number
	{
		return Number(String(this.base_id).substr(1,1));
	}

	/** 上次计算战力的属性版本号 */
    public attrVersion:number = 0;
	/** _attrVersion版本对应计算的战力值 */
    public fight:number = 0;

	public getStar():number
	{
		let i:number = 0;
		let jipinfo:ExattrItemsinfo;
		let inArr:ExattrItemsinfo[] = [];
		for(let jip:number = 0;jip<this.infoList.length;jip++)
		{
			jipinfo = this.infoList[jip];
			if(jipinfo.type == 1)
			{
				//1为极品属性
				inArr.push(jipinfo);
			}
		}
		let jipVO:AttrVO;
		for(let info of inArr)
		{
			jipVO = Manager.pool.create(AttrVO,info.target+","+info.value);
			let invo:AttrVoInfo =  jipVO.getinfo(info.target);
			if(invo.showStar == 1)
			{
				i++;
			}
			Manager.pool.push(jipVO);
		}
		return i;
	}
}
class ExattrItemsinfo
{
	/**1表代极品  2：命格*/
	public type:number;
    public target:number;//key'),
	public value:number;//属性值'),如果是命格，这个值就是命格等级
	public desc:string;//信息字符值(如装备刻字, 物品署名字)'),
}