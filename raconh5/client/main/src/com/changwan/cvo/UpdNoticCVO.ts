/**
 * pzx 
 * 更新公告
 * 18.3.19
 */
class UpdNoticCVO {
	private static _cvo:UpdNoticCVO;
	
	/**物品显示 */
	public rewards:string;
/**公告正文 */
	public content:string;

	private _isReward:boolean;

	public setReward(value:number):void
	{
		this._isReward = value == 1;
	}
	/** 是否已领取奖励 */
	public get isReward():boolean
	{
		return this._isReward;
	}
    public static parse(bytes:egret.ByteArray):void
    {
		this._cvo = new UpdNoticCVO;
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
		this._cvo.rewards = bytes.readUTF();
		this._cvo.content = bytes.readUTF();
    }
		
	public static cvo():UpdNoticCVO
	{
		return this._cvo;
	}

}