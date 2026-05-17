/**
 * 珍希掉落
 * create 18.2.1
 * pzx
 */
class RareDropModel extends egret.EventDispatcher
{
	/** 最大显示条数 */
	private readonly MAX_NUM:number = 50;
	private _list:Array<RareDropInfo>;

	public query(arr:Array<RareDropInfo>):void
	{
		this._list = ArrayUtil.sortOn(arr,["time"],[1]);
		if(this._list.length>this.MAX_NUM)
		{
			this._list.splice(this.MAX_NUM,this._list.length -1);
		}
		this.dispatchEvent(new BossEvent(BossEvent.RAREDROP_QUIER_EVENT));
	}
/** 珍希掉落信息列表 */
	public get list():RareDropInfo[]
	{
		return this._list;
	}

}