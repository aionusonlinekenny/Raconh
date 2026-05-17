/**
 * pzx 
 * create 18.2.8
 * 寻宝model
 *  */
class ArtifactModel extends egret.EventDispatcher {
	//珍希列表
	private _itemList:Array<ArtifactLogInfo>=[];
	//玩家积分
	private _integral:number=0;
	//n已寻宝10的次数
	private _isTen_count:number=0;
//个人记录列表
	private _selfList:Array<ArtifactSelfLogInfo>;
/** 珍希珍表最大取15条数据 */
	public readonly MAX_NUM:number = 15;

	public query(arr:Array<ArtifactLogInfo>,value:number,value2:number):void
	{
		this._itemList = arr;
		this._integral = value;
		this._isTen_count = value2;
		this.dispatchEvent(new ArtifactEvent(ArtifactEvent.ARTIFACT_QUERY_EVENT));
	}
	public hunting(info:ArtifactLogInfo):void
	{
		this._itemList.push(info);
		if(this._itemList.length>this.MAX_NUM)
		{
			this._itemList.pop();
		}
	}
	public setIntegral(value:number,count:number)
	{
		this._integral = value;
		this._isTen_count = count;
		this.dispatchEvent(new ArtifactEvent(ArtifactEvent.ARTIFACT_INTEGRAL_EVENT));
	}
	/** 积分领奖 */
	public integralReward():void
	{
		this.dispatchEvent(new ArtifactEvent(ArtifactEvent.ARTIFACT_REWARD_EVENT));
	}
	public selfLog(arr:Array<ArtifactSelfLogInfo>)
	{
		this._selfList = arr;
		this.dispatchEvent(new ArtifactEvent(ArtifactEvent.ARTIFACT_LOG_EVENT));
	}

	public getItemList():Array<ArtifactLogInfo>
	{
		if(this._itemList.length<this.MAX_NUM)
		{
			//不足15条数据
			this.createArtifactInfo();
		}
		return this._itemList;
	}

	private createArtifactInfo():void
	{
		let any:any={0:{name:"轩辕公山",baseid:40000804},
			1:{name:"太史刀狂",baseid:40000814},
			2:{name:"钟离真人",baseid:40000803},
			3:{name:"武当三疯",baseid:40000808},
			4:{name:"少林真仙",baseid:40000813},
			5:{name:"左丘渭闾",baseid:40000818},
			6:{name:"东郭千里",baseid:40000804},
			7:{name:"义薄云天",baseid:40000814},
			8:{name:"丐帮乔主",baseid:40000803},
			9:{name:"慕容飞鸿",baseid:40000808},
			10:{name:"花谢花飞",baseid:40000813},
			11:{name:"入梦语嫣",baseid:40000818},
			12:{name:"南门飞燕",baseid:40000804},
			13:{name:"三生若曦",baseid:40000814},
			14:{name:"司空星儿",baseid:40000803}
		}
		let ln:number = this.MAX_NUM - this._itemList.length;
		for(let i:number = 0;i<ln;i++)
		{
			let info:ArtifactLogInfo = new ArtifactLogInfo();
			let obj:any=any[i];
			info.name = obj.name;
			info.base_id = obj.baseid;
			this._itemList.push(info);
		}
	}
	/** 玩家当前积分 */
	public getIntegral():number
	{
		return this._integral;
	}
	/**已寻宝10的次数 */
	public getTenCount():number
	{
		return this._isTen_count;
	}
	/** 个人信息记录 */
	public getSelfList():ArtifactSelfLogInfo[]
	{
		return this._selfList;
	}

}