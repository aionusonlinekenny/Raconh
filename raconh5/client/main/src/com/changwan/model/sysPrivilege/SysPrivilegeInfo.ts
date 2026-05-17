class SysPrivilegeInfo {
	/** 1黄金特权卡，2钻石特权卡 */
	public id:number;
	/** 战力 */
	public fightImg:string;
	/**卡片 */
	public kaImg:string;
	/** 激活图片路径 */
	public activeImg:string;
	/** 模型id */
	public animationPath:string;

	public item2_itemImg:string ;
	public item2_titleImg:string ;
	/** 资源id */
	public aniPath:string;
/** 须要充值 */
	public rmb:number;

	private _isActive:boolean = false;
	/**是否已激活 */
	public setActive():void
	{
		this._isActive = true;
	}
	/**是否已激活 */
	public get isActive():boolean
	{
		return this._isActive;
	}
	private _isreward:boolean = false;
	/**是否已领取 */
	public setReward(value:number):void
	{
		this._isreward = value == 1;
	}
	/**是否已领取 */
	public get isreward():boolean
	{
		return this._isreward;
	}


}