/**
 * pzx 
 * 七天登陆
 * 18.1.29
 */
class SevenDaysCVO {
	private static _cvos:Array<SevenDaysCVO>;
	/**登录天数 */
	public login_day_id:number;
	
	public rewards:string;
	/**战斗力显示 */
	public fightNum:number;

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
		return this.login_day_id<= Manager.model.getcashCow().sevenDaysModel.login_day;
	}


    public static parse(bytes:egret.ByteArray):void
    {
		this._cvos = [];
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:SevenDaysCVO = new SevenDaysCVO();
			item.login_day_id = bytes.readByte();
			item.rewards = bytes.readUTF();
			item.fightNum = bytes.readInt();
			this._cvos.push(item);
        }
    }
		
	public static getCvos():SevenDaysCVO[]
	{
		return this._cvos;
	}
	public static getcvo(id:number):SevenDaysCVO
	{
		for(let cvo of this._cvos)
		{
			if(cvo.login_day_id == id)
			{
				return cvo;
			}
		}
	}

	public static setState(login_day_id:number,state:number):void
	{
		for(let cvo of this._cvos)
		{
			if(cvo.login_day_id == login_day_id)
			{
				cvo.setState(state);
			}
		}
	}

}