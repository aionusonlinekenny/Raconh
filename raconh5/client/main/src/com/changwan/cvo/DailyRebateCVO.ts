/**
 * pzx 
 * 18.3.14
 * 天天返利cvo
 */
class DailyRebateCVO {
	private static _data:Object = {};
	/** 固定活动的总天数  一定是从服务开始第n天开始，连续不间断，中间不加插循环*/
	private static _fixedDay:number=0;
	/** 可循环的总天数 */
	private static _loopDay:number=0;
	/** 开服活动天数
具体数字为开服天数 */
	public open_day:number;
	/**类型
1为固定活动
0为循环活动 */
	public type:number;
	/** 充值额度（rmb） */
	public amount:number;
	/** 奖励显示 */
	public loss:string;
	//是否已领取
	private _isReward:boolean;
	//是否已充值
	private _ischarge:boolean;


	public setReward():void
	{
		this._isReward = true;
	}
	/**
	 * 是否已领取奖励
	 */
	public get isReward():boolean
	{
		return this._isReward;
	}
	public setCharge():void
	{
		this._ischarge = true;
	}
	/**
	 * 检测是否可领取
	 */
	public checkReward():boolean
	{
		if(this._isReward) return false;

		return this._ischarge;
	}

	public static parse(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        var info:DailyRebateCVO;
        this._data = {};
        for(let i:number = 0; i < tableCount; i++)
        {
            info = new DailyRebateCVO();
            info.open_day =bytes.readShort();
            info.type = bytes.readByte();
			info.amount =bytes.readShort();
			info.loss = bytes.readUTF();
			if(info.type == 1)
			{
				//1为固定活动
				if(this._fixedDay<info.open_day)
				{
					this._fixedDay = info.open_day;
				}
			}
			else if(info.type == 0)
			{
				if(!this._data[info.open_day]) this._loopDay++;
			}
			if(!this._data[info.open_day])
            {
				this._data[info.open_day] = {};
			}
			this._data[info.open_day][info.amount] = info;
        }
    }

	public static setReward(prite:number):void
	{
		let day:number=2;
		let cvo:DailyRebateCVO = this._data[day][prite];
	}
/** 
 * 获取当天活动数列表
 * 注：(此活动入口与首充豪礼为前后置关系，游戏内激活了首充豪礼，并且为开服第二天或之后即可开启)
 * 
 * @param day 开服天数
 */
	public static getcovs(day:number):any
	{
		//if(day < 2) return null;//屏蔽，改为开服第１天可显示
		if(this._data[day])
		{
			return this._data[day];
		}
		else
		{
			//取循环天数
			let i:number = day%this._loopDay;
			if(i==0) i = this._loopDay;
			let d:number = this._fixedDay + i;
			return this._data[d];
		}
	}
}