/**
 * drq 
 * 签到奖励 CVO
 * 2018.3.22
 */
class QiandaoGainCVO {
	private static _cvo:QiandaoGainCVO[];

	public  id:number;//id
	public day:number;//天数
	public gain:string;//奖励
	public reward:string;//显示奖励
	public isGet:boolean;//是否已领取

	public static parse(bytes:egret.ByteArray):void
	{
		this._cvo = [];
		let tableCount:number = bytes.readShort();
		for(let i=0;i<tableCount;i++)
		{
			let item:QiandaoGainCVO = new QiandaoGainCVO();
			item.id = bytes.readByte();
			item.day = bytes.readInt();
			item.gain = bytes.readUTF();
			item.reward = bytes.readUTF();
			item.isGet = false;
			this._cvo.push(item);
		}
	}

	public static getCvos():QiandaoGainCVO[]
	{
		return this._cvo;
	}

}