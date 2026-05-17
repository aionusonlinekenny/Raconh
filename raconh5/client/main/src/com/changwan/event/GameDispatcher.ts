/**
 *author Anydo
 *create 2017-11-3
 *description 
*/
class GameDispatcher extends egret.EventDispatcher
{
    private static _instance:GameDispatcher = new GameDispatcher();
		
    public static getInstance():GameDispatcher
    {
        return this._instance;
    }

    //当天时间，
    private  _curTime:number=-1;

    /** 跨天刷新 */
    private crossDay():void
    {
        let second:number = this._curTime - Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		if(second<=0)
		{
            this._curTime = DateUtil.getToDayTime();
            this.dispatchEvent(new GlobalEvent(GlobalEvent.CROSS_DAY_EVENT));
		}
    }
　　//开始跨天计时
    public starCrossTime():void
    {
        this._curTime = DateUtil.getToDayTime();
        Manager.render.add(this.crossDay,this,60000);
    }


}