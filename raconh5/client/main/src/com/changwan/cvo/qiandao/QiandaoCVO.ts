/**
 * drq 
 * 签到 CVO
 * 2018.3.21
 */
class QiandaoCVO 
{
	private static _cvos:Array<QiandaoCVO>;

	public id:number;//id
	public days:number;//天数
	public gain:string;//奖励
	public extra:string;//特权奖励
	public consume:string;//补签消耗

	public static parse(bytes:egret.ByteArray):void
	{
		this._cvos = [];
		let pageCount:number = bytes.readByte();
		let tableCount:number = bytes.readShort();
		for(var i=0;i<tableCount;i++)
		{
			var item:QiandaoCVO = new QiandaoCVO();
			item.id = bytes.readByte();
			item.days = bytes.readInt();
			item.gain = bytes.readUTF();
			item.extra = bytes.readUTF();
			item.consume = bytes.readUTF();
			this._cvos.push(item);
		}
		QiandaoGainCVO.parse(bytes);
	}

	public static getCvo():Array<QiandaoCVO>
	{
		return this._cvos;
	}
}