/**
 * 
 * pzx
 * create 2018-3-16
 * 分享CVO
 * 
*/
class ShareCVO {
	private static _cvo:ShareCVO;


/**物品显示*/
	public rewards:string;

    /** 是否已分享 */
    private _status:boolean;
    /** 是否已领奖 真为领 */
    private _isReward:boolean;

    public setStatus(value:number)
    {
        this._status = value == 1;
    }
    public get status():boolean
    {
        return this._status;
    }

    public setReward(value:number):void
    {
        this._isReward = value == 1;
    }
    public isReward():boolean
    {
        return this._isReward;
    }


	public static parse(bytes:egret.ByteArray):void
    {
        let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        this._cvo = new ShareCVO;
        this._cvo.rewards = bytes.readUTF();
      

    }
    /**信息 */
    public static cvo():ShareCVO
    {
        return this._cvo;
    }
}
	