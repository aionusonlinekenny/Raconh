/**
 * pzx 
 * 2018.1.28
 * 
 */
class LevItemCVO
{
    private static _cvos:Array<LevItemCVO>;

/**ID */
	public id:number;
/**领取礼包等级 {cond,lev,20}|{cond,rein,1} */
	public lev_cond:ConditionVO[];
/**活动奖励显示 */
	public rewards:string;

	private _num:number=0;

	private _totalNum:number=0;

	public setNum(n:number):void
	{
		this._num = n;
	}
	public setTotalNum(n:number)
	{
		this._totalNum = n;
	}
	/** 已领取次数 */
	public get num():number
	{
		return this._num;
	}
	/** 剩余次数 */
	public get totalNum():number
	{
		return this._totalNum;
	}

	public desc():string
	{
		let str:string;
		let list:ConditionVO[] = this.lev_cond;
		let conent:string = "";
		let current:string = "";
		let info:PlayerGameObjectInfo = Manager.model.self;
		let color:string=Color.RED_STR;
		if(list[1])
		{
			conent = list[1].value+LangCVO.getContent("common14")+list[0].value+LangCVO.getContent("common15");
			current =info.attrInfo.zhuanshu+LangCVO.getContent("common14")+ info.attrInfo.level+LangCVO.getContent("common15");
			if(list[1].value<=info.attrInfo.zhuanshu && list[0].value<= info.attrInfo.level)
			{
				color = Color.GREEN_STR;
			}
		}
		else
		{
			conent =  list[0].value+LangCVO.getContent("common15");
			current = info.attrInfo.level+LangCVO.getContent("common15");
			if(list[0].value<= info.attrInfo.level)
			{
				color = Color.GREEN_STR;
			}
		}
		current = HtmlUtil.addColorTag("("+current+"/"+conent+")",color);
		conent = HtmlUtil.addColorTag(conent,Color.GREEN_STR);
		str = LangCVO.getContent("SysInvest3");
		str = StringUtils.setParam(str,conent,current);
		return str;
	}

	/** 是否可领 true 可领取*/
	public checkReward():boolean
	{
		if(this._totalNum<=0 || this._num == 1) return false;

		let list:ConditionVO[] = this.lev_cond;
		for(let vo of list)
		{
			if(!vo.isSatisfy())
			{
				return false
			}
		}

		return true;
	}

    public static parse(bytes:egret.ByteArray):void
    {
	   this._cvos = [];
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:LevItemCVO = new LevItemCVO();
			item.id = bytes.readByte();
			item.lev_cond = ConditionVO.getVOList(bytes.readUTF());
			item.rewards = bytes.readUTF();
			this._cvos.push(item);
        }
    }
	public static getCvos():Array<LevItemCVO>
	{
		return this._cvos;
	}

	public static getcvo(id:number):LevItemCVO
	{
		for(let item of this._cvos)
		{
			if(item.id == id)
			{
				return item;
			}
		}
	}


	public static setCount(id:number,count:number=0,num:number=0)
	{
		let cvo:LevItemCVO;
		for(let item of this._cvos)
		{
			if(item.id == id)
			{
				cvo = item;
				break;
			}
		}
		if(cvo)
		{

			cvo.setNum(count);
			if(num<0)
			{
				cvo.setTotalNum(cvo.totalNum -1);
			}
			else
			{
				cvo.setTotalNum(num);
			}
		}
	}
}