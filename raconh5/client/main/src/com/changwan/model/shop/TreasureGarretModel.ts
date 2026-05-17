/**
 * pzx 
 * 珍宝阁model
 * create 18.2.3
 */
class TreasureGarretModel extends egret.EventDispatcher
{
	// 上次刷新的时间
	private _time:number;
//当前刷新次数
	private _count:number=0;
//商品列表id
	private _shopList:Array<number>;
// 免费次数
	private _freeCount:number=0;

	public updateDatA(ip:TCPPacketIn)
	{
		this._freeCount = ip.readByte();
        this._count = ip.readByte();
        let ln:number = ip.readShort();
        this._shopList = [];
        for(let i:number = 0;i<ln;i++)
        {
            let id:number = ip.readShort();
            this._shopList.push(id);
        }
		if(ln==0)
		{
			//若ln为0 ，是新号，由于新号后端刷新不了数据，所以这里由前端写死6个数据，------运营已确认，有问题找 心斌，超武
			this._shopList = [51,63,75,87,99,111];
		}
		this.dispatchEvent(new ShopEvent(ShopEvent.TREASUREGARRET_UPDATE_EVENT));
		if(ip.protocol == Protocol.CMD_TREASUREGARRET_UPDATE)
		{
			Manager.control.getShop().query(ShopType.TREASUREGARRET_TYPE);
		}
	}
	public setTime(time:number):void
	{
		this._time = time;//７小时刷新一次
	}
	/** 免费刷新cd ７小时刷新一次*/
	public get freeTime():number
	{
		// if(this._freeCount == 0)
		// {
		// 	this._time = 0;
		// 	return 0;
		// }
		// if(this._time>0)
		// {
		// 	return this._time;
		// }
		// let second:number = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		// let nowDate = cw.DateUtil.getDateBySecs(second);
		// let hours:number = nowDate.getHours();
		// let updateData:Date;
		// if(hours>=0 && hours<6)
		// {
		// 	 updateData= new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(),6);//取当天6时
		// }
		// else if(hours>=6 && hours<12)
		// {
		// 	updateData = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(),12);//取当天12时
		// }
		// else if(hours>=12 && hours<18)
		// {
		// 	updateData = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(),18);//取当天18时
		// }
		// else 
		// {
		// 	updateData = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(),23,59,59);//取当天0时
		// }
		// this._time = Math.round(updateData.getTime()/1000);
		return this._time;
	}
/** 元宝刷新次数 */
	public count():number
	{
		return this._count;
	}

	public shopList():Array<number>
	{
		if(!this._shopList)
		{
			Manager.control.getShop().treasureGarretQuery();
		}
		return this._shopList;
	}
/** 是否有免费次数 */
	public checkfreeTime():boolean
	{
		if(!OpenCVO.isOpen(OpenConst.ID_TREASURE_GARRET)) return false;
        return this._freeCount == 0;
	}
	

}