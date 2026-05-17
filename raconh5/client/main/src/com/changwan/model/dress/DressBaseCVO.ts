/**
 * 装扮基础信息
 * liangyan
 * create 2017-11-28
*/
class DressBaseCVO
{
    public constructor()
    {
        this._baseAttrCfg = "";
        this._baseAttr = null;
		this.isActived = false;
        this._leftTime = 0;
    }

    public dressType:number;
		
	protected _templateID:number;
	public get templateID():number { return this._templateID;}
	public name:string;
	public description:string;
		
	public resID:number; //资源id
		
	protected _baseAttrCfg:string;
	private _baseAttr:AttrVO;
	//附加属性
	public get baseAttr():AttrVO
	{
		if(this._baseAttr == null) this._baseAttr = Manager.pool.create(AttrVO, this._baseAttrCfg);
		return this._baseAttr;
	}
    /**有效时间，秒为单位。0:永久有效 */
	public time:number;
		
	/**是否限时 */ 
	public get isTimeLimited():boolean
	{
		return this.time != 0;
	}
	/**是否已激活 */
	public isActived:boolean;
		
	public startTime:number;
	private _leftTime:number;
	private _updateTime:number;
	public get leftTime():number
	{
		let t = this._leftTime - (Manager.model.getLogin().serverTimeInfo.serverTime - this._updateTime) / 1000;
		return t > 0 ? t : 0;
	}
	public set leftTime(value:number)
	{
		this._leftTime = value;
        this._updateTime = Manager.model.getLogin().serverTimeInfo.serverTime;
	}
}