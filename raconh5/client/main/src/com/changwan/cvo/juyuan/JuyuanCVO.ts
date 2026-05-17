/**
 * drq 
 * 聚元 CVO
 * 2018.3.30
 */
class JuyuanCVO {
	private static _cvos:Array<JuyuanCVO>;

	public sort_id:number;//唯一id
	public id:number;//魂球id
	public step:number;//阶数
	public star:number;//魂球星数
	public next_id:number;//下一魂球id
	public next_step:number;//下一阶数
	public next_star:number;//下一星数
	public consume:string;//消耗材料可到下一星阶
	public attr:string;//属性
	public t_attr:string;//
	public cond:string;//条件判断

	public static parse(bytes:egret.ByteArray):void
	{
		this._cvos = [];
		let pageCount:number = bytes.readByte();
		let tableCount:number = bytes.readShort();

		for(let i=0;i<tableCount;i++)
		{
			var item:JuyuanCVO = new JuyuanCVO();
			item.sort_id = bytes.readInt();
			item.id = bytes.readInt();
			item.step = bytes.readInt();
			item.star = bytes.readByte();
			item.next_id = bytes.readInt();
			item.next_step = bytes.readInt();
			item.next_star = bytes.readByte();
			item.consume = bytes.readUTF();
			item.attr = bytes.readUTF();
			item.t_attr = bytes.readUTF();
			item.cond = bytes.readUTF();
			this._cvos.push(item);
		}
		//
	}
	public static getCvo():Array<JuyuanCVO>
	{
		return this._cvos;
	}
}