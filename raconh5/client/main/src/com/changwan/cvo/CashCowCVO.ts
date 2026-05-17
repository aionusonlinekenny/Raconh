/**
 * pzx 
 * 金蟾聚宝
 * 18.1.18
 */
class CashCowCVO {
	private static _cvo:CashCowCVO;
	/**首次银币额 */
	public coin:number;
    //每次增加额
	public coin_up:number;
	/**聚宝所需元宝 */
	public gold_need:string;

	private _treasureNum:number = 0;
	/** 已聚宝次数 */
	private _crunt:number=0;

	public setTreasure(value:number):void
	{
		this._treasureNum = value;
	}
	/** 可聚宝总次数 */
	public get truesureNum():number
	{
		return this._treasureNum;
	}
	public setCrunt(value:number):void
	{
		this._crunt = value;
	}
	/** 已聚宝次数 */	
	public get crunt():number
	{
		return this._crunt;
	}


    public static parse(bytes:egret.ByteArray):void
    {
		this._cvo = new CashCowCVO;
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < 1; i++)
        {
			this._cvo.coin = bytes.readInt();
			this._cvo.coin_up = bytes.readInt();
			this._cvo.gold_need = bytes.readUTF();
        }
    }
		
	public static getCvo():CashCowCVO
	{
		return this._cvo;
	}

}