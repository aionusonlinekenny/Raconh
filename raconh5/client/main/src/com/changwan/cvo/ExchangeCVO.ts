/**
 * drq 
 * 兑换活动 CVO
 * 2018.4.19
 */
class ExchangeCVO {
	private static _cvos:Array<ExchangeCVO>;

	public id:number;//活动id
	public type:number;//活动类型
	public startTime:string;//活动时间
	public serverOpenDay:number;//过滤开服天数
	public limit:string;//限制VIP等级
	public rewards:string;//兑换材料
	public result:string;//兑换获得
	public maxCurent:number;//限额领取次数
	public sort:number;//排序

	public curCount:number;//当前次数

	public static parse(bytes:egret.ByteArray):void
	{
		this._cvos = [];
		let pageCount:number = bytes.readByte();
		let tableCount:number = bytes.readShort();

		for(let i=0;i<tableCount;i++)
		{
			let item:ExchangeCVO = new ExchangeCVO();
			item.id = bytes.readShort();
			item.type = bytes.readByte();
			item.startTime = bytes.readUTF();
			item.serverOpenDay = bytes.readShort();
			item.limit = bytes.readUTF();
			item.rewards = bytes.readUTF();
			item.result = bytes.readUTF();
			item.maxCurent = bytes.readShort();
			item.sort = bytes.readByte();
			item.curCount = 0;
			this._cvos.push(item);
		}
	}

	public static getCvo():Array<ExchangeCVO>
	{
		return this._cvos;
	}

	public static getServerDay():number
	{
		return this._cvos[0].serverOpenDay;
	}
}