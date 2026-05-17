/**
 * drq 
 * 签到Model
 * 2018.3.23
 */
class QiandaoModel extends egret.EventDispatcher{
	private _dailyList:any[] = [];//每日签到列表
	private _totalList:any[] = [];//阶段列表
	private _buqian:number[] = [];//签到返回结果
	private _secResult:number[] = [];//阶段返回结果
	private _todayCanGet:boolean = true;//当天是否还未领取
	private _today:number;//当前天数

	public constructor() {
		super();
		let day:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;//开服天数
		this._today = (day%30)==0?30:day%30;
	}

	//存
	public setDailyList(id:number,state:number):void
	{
		for(let i=0;i<this._dailyList.length;i++)
		{
			if(this._dailyList[i][0] == id)
			{
				return;
			}
		}
		this._dailyList.push([id,state]);
	}

	public setTotalList(day:number,state:number):void
	{
		this._totalList.push([day,state]);
	}

	public setBuqian(id:number,state:number):void
	{
		this._buqian = [id,state];
	}

	public setSecResult(sec:number,result:number):void
	{
		this._secResult = [sec,result];
	}
	public setTodayCanGet(bool:boolean):void
	{
		this._todayCanGet = bool;
	}

	//读
	public getDailyList():any[]
	{
		return this._dailyList;
	}
	public getTotalList():any[]
	{
		return this._totalList;
	}
	public getBuQian():number[]
	{
		return this._buqian;
	}
	public getSecResult():number[]
	{
		return this._secResult;
	}
	public getTodayCanGet():boolean
	{
		return this._todayCanGet;
	}
	public getToday():number
	{
		return this._today;
	}
}