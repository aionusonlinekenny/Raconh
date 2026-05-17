/**
 * pzx 
 * 投资
 * 18.1.13
 */
class SysInvestCVO {
	private static _cvos:any;
	public id:number;
	public name:string;
    //价格（RMB）
	public price:number;
	public reward:string;
	/**登录天数 */
	public login_day:number;
	/**等级条件 */
	public lev_earn:string;

    /** 排序 */
	public sort:number;

	private _state:number=0;

	public setState(value:number):void
	{
		this._state = value;
	}
	/** 是否领取 1已领 */
	public get state():number
	{
		return this._state;
	}
	/** 是否可领 true 可领取*/
	public isReward():boolean
	{
		let type:string = "" + this.price;
		if(type == SysInvestType.SYSINVEST_MONTH_TYPE)
        {
			let day:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
			if(day>=this.login_day)
			{
				return true;
			}
			return false;
        }
        else
        {
			let list:ConditionVO[] = ConditionVO.getVOList(this.lev_earn);
			for(let vo of list)
			{
				if(!vo.isSatisfy())
				{
					return false
				}
			}
			return true;
        }
	}

	public  get desc():string
	{
		let str:string;
		let type:string = "" + this.price;
		if(type == SysInvestType.SYSINVEST_MONTH_TYPE)
        {
			let day:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
			let conent:string ="";
			if(day<this.login_day)
			{
				conent = HtmlUtil.addColorTag("("+day+"/"+this.login_day+")",Color.RED_STR);
			}
			else
			{
				conent = HtmlUtil.addColorTag("("+day+"/"+this.login_day+")",Color.GREEN_STR);
			}
            str= LangCVO.getContent("SysInvest2");
            str = StringUtils.setParam(str,this.login_day,conent);
        }
        else
        {
			let list:ConditionVO[] = ConditionVO.getVOList(this.lev_earn);
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
            str = LangCVO.getContent("SysInvest3");
			str = StringUtils.setParam(str,conent,current);
        }
		return str;
	}

    public static parse(bytes:egret.ByteArray):void
    {
		this._cvos = {};
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:SysInvestCVO = new SysInvestCVO();
			item.id = bytes.readByte();
			item.name = bytes.readUTF();
			item.price = bytes.readShort();
			item.reward = bytes.readUTF();
			item.login_day = bytes.readByte();
			item.lev_earn = bytes.readUTF();
			item.sort = bytes.readByte();
			this._cvos[item.id] = item;
        }
    }
		
	public static getCvos(price:string):SysInvestCVO[]
	{
		let arr:SysInvestCVO[]=[];
		for(let key in this._cvos)
		{
			if(this._cvos[key].price == price)
			{
				arr.push(this._cvos[key]);
			}
		}
		return arr;
	}

	public static setState(id:number,state:number):void
	{
		let cvo:SysInvestCVO = this._cvos[id];
		cvo.setState(state);
	}

	public static getName(price:string):string
	{
		let cvo:SysInvestCVO;
		if(price == SysInvestType.SYSINVEST_MONTH_TYPE)
		{
			//取一个卡名，所以写死1,取一个cvo
			cvo = this._cvos[1];
			return cvo.name;
		}
		else
		{
			//取一个卡名，所以写死20,取一个cvo
			cvo = this._cvos[20];
			return cvo.name;
		}
	}
}