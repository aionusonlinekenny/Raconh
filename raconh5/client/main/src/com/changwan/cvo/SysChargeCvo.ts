/**
 * 元宝充值
 * pzx
 * 18.1.3
 */
class SysChargeCVO {
	private static _cvos:SysChargeCVO[];
	/** 充值id*/
	public id:number;
	/** RMB金额*/
	public money:number;
	/** 元宝额度*/
	public gold:number;
	/**元宝比例 */
	public ratio:number;
/** 首次赠送金额
0为不开启
对应数字为金额 */
	public first_retrive:number;
/**二次赠送金额
0为不开启
对应数字为金额 */
	public second_retrive:number;
/**首次显示标签返利
0为不开启 100% = 100 */
	public first_label:number;
/**二次显示标签返利
0为不开启 %*/
	public second_label:number;
/**显示元宝底图控制 */
	public goldImg:string;

	private _first:boolean= false;

	public setFirst():void
	{
		this._first = true;
	}
	/** 是否已首充 ture为是 */
	public get first():boolean
	{
		return this._first;
	}

	public static parse(bytes:egret.ByteArray):void
    {
		this._cvos = [];
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:SysChargeCVO = new SysChargeCVO();
			item.id = bytes.readByte();
			item.money = bytes.readInt();
			item.gold = bytes.readInt();
			item.ratio = bytes.readInt();
			item.first_retrive = bytes.readInt();
			item.second_retrive = bytes.readInt();
			item.first_label =bytes.readShort();
			item.second_label = bytes.readShort();
			item.goldImg = bytes.readUTF();
			this._cvos.push(item);
        }
    }

	public static cvos():SysChargeCVO[]
	{
		return this._cvos;
	}


}