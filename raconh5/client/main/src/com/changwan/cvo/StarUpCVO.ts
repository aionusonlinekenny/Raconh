/**
 * drq 
 * 升星 CVO
 * 2018.4.17
 */
class StarUpCVO {
	private static _cvos:Array<StarUpCVO>;

	public item_id:number;//道具id
	public star:number;//星数
	public  offer_val:number;//提供分值
	public need_val:number;//升星所需分值

	public static parse(bytes:egret.ByteArray):void
	{
		this._cvos = [];
		let pageCount:number = bytes.readByte();
		let tableCount:number = bytes.readShort();

		for(let i=0;i<tableCount;i++)
		{
			let item:StarUpCVO = new StarUpCVO();
			item.item_id = bytes.readInt();
			item.star  = bytes.readByte();
			item.offer_val = bytes.readShort();
			item.need_val = bytes.readShort();
			this._cvos.push(item);
		}
		//
	}
	public static getCvo():Array<StarUpCVO>
	{
		return this._cvos;
	}
}