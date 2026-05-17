
/**
 * 寻宝积分参数
 * pzx 
 * create 18.2.7
 */
class ArtifactIntegralCVO {
	private static _cvos:ArtifactIntegralCVO[];

	public id:number;
	/**类型
1 阶段积分
2 n次奖励
 */
	
	public type:number;
	/**
	 * 参数
	 * type=2时，args=10为首次额外奖励
	 */
	public args:number;
	/**
	 * 奖励
	 */
	public rewards:string;

	private _state:number = 0;

	public setIsReward(value:number)
	{
		this._state = value;
	}
/** 是否已领奖 */
	public isReward():number
	{
		return this._state;
	}

	public static parse(bytes:egret.ByteArray):void
    {
		this._cvos = [];
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:ArtifactIntegralCVO = new ArtifactIntegralCVO();
			item.id = bytes.readShort();
			item.type = bytes.readByte();
			item.args = bytes.readShort();
			item.rewards = bytes.readUTF();
			this._cvos.push(item);
        }
    }

	public static setisReward(type:number,args:number,reward:number)
	{
		for(let cvo of this._cvos)
		{
			if(cvo.type == type && cvo.args == args)
			{
				cvo.setIsReward(reward);
			}
		}
	}
	/** 返回当前积分cvo */
	public static getCurIntegralCvo():ArtifactIntegralCVO
	{
		let ln:number = this._cvos.length;
		let maxindex:number;
		for(let i:number=0;i<ln;i++)
		{
			let cvo = this._cvos[i];
			if(cvo.type == ArtifactType.integral_type)
			{
				if(cvo.isReward() == 0)
				{
					//未领就返回当前cvo
					return cvo;
				}
				maxindex = i;
			}
		}
		//全部已领取，返回最大积分的cvo
		return this._cvos[maxindex];
	}

	public static getIsFristCvo():ArtifactIntegralCVO
	{
		let point:number = Manager.model.getArtifact().getTenCount();
		let args:number;
		if(point == 0) 
		{
			args = ArtifactType.FIRST_TYPE_ONE;
		}
		else if(point<ArtifactType.FIRST_TYPE_FIRE)
		{
			args = ArtifactType.FIRST_TYPE_FIRE;
		}
		else
		{
			return null;
		}


		let ln:number = this._cvos.length;
		for(let i:number=0;i<ln;i++)
		{
			let cvo = this._cvos[i];
			if(cvo.type == ArtifactType.is_First_type)
			{
				if(cvo.args == args)
				{
					//未领就返回当前cvo
					return cvo;
				}
			}
		}
		return null;
	}
}