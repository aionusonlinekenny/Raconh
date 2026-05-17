/**
 * 活动时间解析
 * pzx
 * create 2018-1-22
 */
class TimeRuleVO implements cw.IPool
{
	/**
	 * 绝对时间
	 */
	public static DATE:string = "date";
	/**开服天数 */
	public static OPEN:string = "open";
	/**合服天数 */
	public static MERGE:string = "merge";
	/** 循环活动*/
	public static CYCLE:string = "cycle";

	public type:string;

	private _condition:boolean;

	 
    public constructor()
	{
    }
     /**
     * 是否在时间范围内
     * @return
     */
	public isEnough():boolean
	{
		return this._condition;
	}
	/**
     * 时间规则：
绝对时间：{date, {}} 或者 {date, {{Y,M,D}, {Y,M,D}}} ; {} 表示永久 {Y,M,D}表示年月日
开服天数：{open, {M, N}} 或者 {open, N} ; {M, N} 表示开服第M天到第N天， N >= M
合服天数：{merge, {M, N}} 或者 {merge, N}; {M, N} 表示合服第M天到第N天， N >= M
循环活动：{cycle, {N, I, K}}； {N, I, K} 表示开服N天开始，周期为I天，持续K天，如开服第三天到第四天，七天一轮，填 {cycle, {3,7,1}}
     */
	public reuse(content:string):void
    {
		if(content != "")
        {
            var reg:RegExp = /{|}| /g;
            content = content.replace(reg,"");
            let arr:Array<string> = content.split(",");
            this.type = arr[0];
            switch(this.type)
            {
                case TimeRuleVO.DATE:
					let time:number = Manager.model.getLogin().serverTimeInfo.serverTime;
					let starDate:Date = new Date(Number(arr[1]),Number(arr[2])-1,Number(arr[3]));
					let endData:Date = new Date(Number(arr[4]),Number(arr[5])-1,Number(arr[6]));
					this._condition = starDate.getTime() <= time && time<= endData.getTime();
                	break;
				case TimeRuleVO.OPEN:
					let openTime:number = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
					this._condition = Number(arr[1])<= openTime && openTime <= Number(arr[2]);
					break;
            }
        }
	}
	public unuse():void
	{
		this.type="";
		this._condition= false;
	}
	public dispose(){}
}