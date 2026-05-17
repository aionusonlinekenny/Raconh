/**
 * 日常活动表
 * liangyan
 * create 2017-12-21
*/
class DailyActivityCVO
{
    private static _cvos:Object;
    /**进行中 */
	public static STATE_IN = 1;
    /**结束 */
    public static STATE_END = 2;
    /**预告 */
    public static STATE_PRE = 3;
	
    /**下方固定显示的系统入口 */
	public static SHOW_TYPE_ALWAYS = 1;
    /**左侧需要通过任务或者时间判断进行显示的玩法图标 */
	public static SHOW_TYPE_NOTICE = 2;
    /**上方显示的各类运营活动和排行榜、分享图标 */
	public static SHOW_TYPE_YUNYING = 3;

    public id:number;
    /**活动类型 一天n场的活动使用 */
    public actType:number;
    /**预告描述 */
    // public preDesc:string;
    /**资源id */
    public resID:number;
    /**活动开关 */
    public isOpen:boolean;
    /**活动名称 */
    public name:string;
    /**活动类型
     * 1.下方固定显示的系统入口
     * 2.左侧需要通过任务或者时间判断进行显示的玩法图标
     * 3.上方显示的各类运营活动和排行榜、分享图标
     * */
    public type:number;
    /**运营活动图标排序 */
    public sortIndex:number;
    /**开服第X天必开启 */
    public srvOpenDay:number;
    private _weekOpenStr:string;
    /**时间（周几）0:周日 1:周一 依次类推 -1表示每天 多日则"/"隔开
     */
    public get weekOpenDay():string[]
    {
        return this._weekOpenStr.split("/");
    }
    /**图标下方文本提示 */
    public iconLabel:string;
    /**活动时间描述 */
    public timeDesc:string;
    /**开始时间（秒） */
    public startTime:number;
    /**结束时间（秒） */
    public endTime:number;
    private _condStr:string;
    private _condArr:Array<ConditionVO>;
    /**开启条件 */
    public get condition():Array<ConditionVO>
    {
        if(!this._condArr) this._condArr = ConditionVO.getVOList(this._condStr);
        return this._condArr;
    }
    /**满足所有开启条件 */
    public isAllCondSatisfy(showTips:boolean = false):boolean
    {
        let conds = this.condition;
        let len = conds ? conds.length : 0;
        let vo:ConditionVO;
        for(let i = 0; i < len; i++)
        {
            vo = conds[i];
            if(!vo.isSatisfy(null, showTips)) return false;
        }
        return true;
    }
    /**奖励展示 */
    public rewards:Array<GainLossVO>;
    /**活动规则描述 */
    public ruleDesc:string;
    /**场次 0：标记第一场 1：标记第二场 */
    public session:number;
    /**界面链接 */
    public viewStr:string;
    /**光效 */
    public needAni:boolean;
    /**后置ID */
    public nextID:number;
    /**是否已经玩过 */
    public isPlayed:boolean = false;

    private _status:number;
    /**活动状态 1进行中，2结束*/
	public get status():number {return this._status;}
	private _time:number;
    /**活动结束时间戳 */
	public get time():number {return this._time;}
	public setTime(status:number, time:number):void
	{
		if(this._status == status && this._time == time) return;
		this._status = status;
        this._time = time + (Manager.model.getLogin().serverTimeInfo.serverTime / 1000);

        if(this._status == DailyActivityCVO.STATE_END) Manager.model.getActIcon().removeID(this.id);
        else if(this.isAllCondSatisfy()) Manager.model.getActIcon().addID(this.id);
	}

    private parseOne(data:egret.ByteArray):void
    {
        this.id = data.readShort();
        this.actType = data.readShort();
        // this.preDesc = data.readUTF();
        this.resID = data.readShort();
        this.isOpen = data.readByte() == 1;
        this.name = data.readUTF();
        this.type = data.readByte();
        this.sortIndex = data.readByte();
        this.srvOpenDay = data.readShort();
        this._weekOpenStr = data.readUTF();
        this.iconLabel = data.readUTF();
        this.timeDesc = data.readUTF();
        this.startTime = data.readInt();
        this.endTime = data.readInt();
        this._condStr = data.readUTF();
        this.rewards = GainLossVO.parse(data.readUTF());
        this.ruleDesc = data.readUTF();
        this.session = data.readByte();
        this.viewStr = data.readUTF();
        this.needAni = data.readByte() == 1;
        this.nextID = data.readShort();

        this._status = 0;
    }

    public static parse(bytes:egret.ByteArray):void
    {
        DailyActivityCVO._cvos = {};
        var tableCount:number = bytes.readByte();
        var baseCount:number = bytes.readShort();
        let cvo:DailyActivityCVO;
        for (var i = 0; i < baseCount; i++)
        {
            cvo = new DailyActivityCVO();
            cvo.parseOne(bytes);
            DailyActivityCVO._cvos[cvo.id] = cvo;
        }
    }

    public static getCVO(id:number):DailyActivityCVO
    {
        return DailyActivityCVO._cvos[id];
    }

    public static getAlwaysShowCVOs():Array<DailyActivityCVO>
	{
		let result:Array<DailyActivityCVO> = [];
        let cvo:DailyActivityCVO;
		for(let key in DailyActivityCVO._cvos)
        {
            cvo = DailyActivityCVO._cvos[key];
			if(cvo.type == this.SHOW_TYPE_ALWAYS) result.push(cvo);
		}
		return result;
	}

    public static getShowCVO(type:number):Array<DailyActivityCVO>
    {
        let result:Array<DailyActivityCVO> = [];
        let cvo:DailyActivityCVO;
        let showIDs = Manager.model.getActIcon().showIDs;
        let now = new Date(Manager.model.getLogin().serverTimeInfo.serverTime);
        let strArr:Array<string>;
        let openDayIsAdd:boolean = false;
        for(let key in DailyActivityCVO._cvos)
        {
            cvo = DailyActivityCVO._cvos[key];
            if(!cvo) continue;
            if(!cvo.isOpen) continue;
            if(showIDs.indexOf(cvo.id) != -1) continue;
            if(cvo.type != type) continue;
            if(type == DailyActivityCVO.SHOW_TYPE_ALWAYS)
            {
                result.push(cvo);
                continue;
            }
            if(Manager.model.getLogin().serverTimeInfo.serverOpenDays == cvo.srvOpenDay && openDayIsAdd == false)
            {
                result.push(cvo);
                openDayIsAdd = true;
                continue;
            }
            strArr = cvo.weekOpenDay;
            if(strArr.length > 0 && strArr[0] != "-1" && strArr.indexOf(String(now.getDay())) == -1) continue;
            if(!cvo.isAllCondSatisfy()) continue;
            if(!cvo.isInTime) continue;
            result.push(cvo);
        }
        return result;
    }

    public get isInTime():boolean
    {
        if(this.type == DailyActivityCVO.SHOW_TYPE_ALWAYS) return true;
        if(this._status == DailyActivityCVO.STATE_END) return false;
        if(this._status == DailyActivityCVO.STATE_PRE) return false;
        let now = Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        if(this._status == DailyActivityCVO.STATE_IN && this._time > 0) return now < this._time;
        if(this.startTime > 0 && this.endTime > 0)
        {
            let curSecond = Manager.model.getLogin().serverTimeInfo.todaySeconds;
            return curSecond >= this.startTime && curSecond < this.endTime;
        }
        return true;
    }
}