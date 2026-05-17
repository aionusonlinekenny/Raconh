/**
 * pzx 
 * 充值活动
 * 18.1.19
 */
class RechargeActivityCVO {
	private static _cvos:any;
	public id:number;
    /**活动类型
1：单笔充值
2：今日累充
3：累计充值*/
	public type:number;
	/**活动时间
开服时间格式 {open,{1,7}}
特定时间格式 {date,{{2018,1,20},{2018,1,27}}} */
	public starTime:string;
/**过滤开服天数 */
	public severOpenDay:number;
/**所需充值金额  此处为rmb金额 */
	public RMB:number;
/**活动奖励 */
	public rewards:string;
	/** 限额领取次数  0为不限次数 */
	public maxCurent:number
    /** 排序 */
	public sort:number;

	private _curent:number=0;

/**可领奖次数 */
	private _num:number=0;

	public setCurent(value:number):void
	{
		this._curent = value;
	}
	/** 当前已领取次数 */
	public get curent():number
	{
		return this._curent;
	}
    /** 是否有奖可领，1为有*/
	public get isReward():number
	{
		let i:number = this.num;
		if(i>0)
		{
			return 1
		}
		return i;
	}

	public setmoney(value:number[]):void
	{
		this._num = 0;
		if(this.type == RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE)
		{
			for(let i:number = value.length-1;i>-1;i--)
			{
				if(value[i]== this.RMB)
				{
					this._num++;
				}
			}
		}
		else
		{
			let money:number =0;
			for(let i:number = value.length-1;i>-1;i--)
			{
				money += value[i];
			}
			this._num = Math.floor(money/this.RMB)
		}
	}
	/** 可领奖次数 -1已领完,0为未充值,大于0有奖可领*/
	public get num():number
	{
		if(this.maxCurent== 0)
		{
			return this._num - this._curent;
		}
		if(this._curent>=this.maxCurent)
		{
			return -1;
		}
		else
		{
			let i:number = this._num - this._curent;
			return i<0?0:i;
		}
	}
	/** 是否在活动时间内 */
	public getTimeOpen():boolean
	{
		if(Manager.model.getLogin().serverTimeInfo.serverOpenDays > this.severOpenDay)
		{
			let timeRule:TimeRuleVO = Manager.pool.create(TimeRuleVO,this.starTime);
			return timeRule.isEnough();
		}
		return false;
	}

    public static parse(bytes:egret.ByteArray):void
    {
		this._cvos = {};
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:RechargeActivityCVO = new RechargeActivityCVO();
			item.id = bytes.readShort();
			item.type = bytes.readByte();
			item.starTime = bytes.readUTF();
			item.severOpenDay = bytes.readShort();
			item.RMB = bytes.readInt();
			item.rewards = bytes.readUTF();
			item.maxCurent = bytes.readByte();
			item.sort = bytes.readByte();
			this._cvos[item.id] = item;
        }
    }
		
	public static getCvos(type:number):RechargeActivityCVO[]
	{
		let arr:RechargeActivityCVO[]=[];
		for(let key in this._cvos)
		{
			if(this._cvos[key].type == type && this._cvos[key].getTimeOpen())
			{
				arr.push(this._cvos[key]);
			}
		}
		arr = ArrayUtil.sortOn(arr,["sort"]);
		return arr;
	}
	public static getcvo(id:number):RechargeActivityCVO
	{
		return this._cvos[id];
	}

	public static setCurent(id:number):void
	{
		let cvo:RechargeActivityCVO = this._cvos[id];
		if(cvo)
		{
			let n:number = cvo.curent;
			cvo.setCurent(n+1);
		}
	}

	public static setListinfo(any:any):void
	{
		for(let key in any)
		{
			let cvo:RechargeActivityCVO = this._cvos[key];
			if(cvo)
			{
				let n:number = any[key];
				cvo.setCurent(n);
			}
		}
	}
	public static setmoneyInfo(type:number,value:number[]):void
	{
		for(let key in this._cvos)
		{
			if(this._cvos[key].type == type)
			{
				let cvo:RechargeActivityCVO = this._cvos[key];
				cvo.setmoney(value);
			}
		}
	}
}