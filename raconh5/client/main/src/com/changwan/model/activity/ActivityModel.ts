/**
 * 活跃Model
 * luzhihong
 * create 2017-11-22
 */
class ActivityModel extends egret.EventDispatcher
{
    public constructor()
    {
        super();
        this.cleanDailyStates();
        this.cleanDailySchedules()
    }
    /*解析表*/
    // public parseCVOs(bytes:egret.ByteArray):void
    // {
    //     let tabCount:number = bytes.readByte();
    //     ActivityCVO.parse(bytes);
    //     ActivityScheduleCVO.parse(bytes);
    // }

    /*当前日常活跃度值*/
    private _curDailyValue:number=0;
    public get curDailyValue():number{return this._curDailyValue;}
    public set curDailyValue(value:number)
    {
        this._curDailyValue = value;
    }
    private _dailyGetStates:Array<number>;//日常已领取id列表
    private _dailyCounts:Object;//日常完成数量_counts[id] = count;
    private _dailySchedules:Array<number>;//日常阶段已领取id列表
    /*清空日常奖励*/
    public cleanDailyStates():void
    {
        this._dailyGetStates = [];
        this._dailyCounts = new Object();
    }
    /*清空日常阶段*/
    public cleanDailySchedules():void
    {
        this._dailySchedules = [];
    }

    /*设置日常完成和领取状态*/
    public setDailyState(id:number, count:number, hasGet:boolean):void
    {
        if(hasGet && this._dailyGetStates.indexOf(id) == -1) this._dailyGetStates.push(id);
        this._dailyCounts[id] = count;
    }
    /*设置日常阶段领取状态*/
    public setDailySchedule(id:number):void
    {
        if(this._dailySchedules.indexOf(id) == -1) this._dailySchedules.push(id);
    }

    /*取日常领取状态*/
    public dailyHasGet(id:number):boolean
    {
        return this._dailyGetStates.indexOf(id) != -1;
    }
    /*取日常领取状态*/
    public dailyFinishCount(id:number):number
    {
        return this._dailyCounts[id] == null ? 0 : this._dailyCounts[id];
    }
    /*取日常阶段领取状态*/
    public dailyScheduleHasGet(id:number):boolean
    {
        return this._dailySchedules.indexOf(id) != -1;
    }
}