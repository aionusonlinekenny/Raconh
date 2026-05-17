class ServerTimeInfo
{
    private _serverTime:number;//服务器时间,毫秒,number
    private _startTime:number;//临时记录
    /**开服时间(秒) */
    private _svrOpenTime:number;//

    public constructor()
    {
        this._startTime = 0;
        this._serverTime = 0;
        this._svrOpenTime = 0;
    }
    
    public get serverTime():number
    {
        // return this._serverTime + (new Date().getTime() - this._startTime);
        return this._serverTime + (egret.getTimer() - this._startTime);
    }
    public get svrOpenTime():number
    {
        return this._svrOpenTime;
    }

    public updateServerTime(time:number):void
    {
        this._serverTime = time * 1000;
        this._startTime = egret.getTimer();//new Date().getTime();
    }
    public updateSeverOpenTime(time:number):void
    {
        this._svrOpenTime = time;
    }
    /**开服天数 */
    public get serverOpenDays():number
	{
        let start = cw.DateUtil.getDateBySecs(this._svrOpenTime);
        let startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());//取当天0时
        let nowDate = cw.DateUtil.getDateBySecs(this.serverTime / 1000);
		let temp = cw.DateUtil.disDay(startDate, nowDate);
		let passDay = Math.ceil(temp);
		return passDay;
	}
    
    /**今天秒数 */
    public get todaySeconds():number
	{
        let date = new Date(this.serverTime);//取当天0时
        return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
	}
}