/**
 * 聚元 copyCVO
 * drq
 * create 2018-4-4
 */
class JuyuanCopyCVO 
{
	private static _cvo:Array<JuyuanCopyCVO>;

	private cell:number;//层数
	private name:string;//关卡名称
	private mon:string;//怪物ID
	private sysID:number;//关卡奖励
	private conds:string;//进入副本的条件

	public static parse(bytes:egret.ByteArray):void
	{
		this._cvo = [];
		let tableCount:number = bytes.readShort();
		for(let i=0;i<tableCount;i++)
		{
			let item:JuyuanCopyCVO = new JuyuanCopyCVO();
			item.cell = bytes.readShort();
			item.name = bytes.readUTF();
			item.mon = bytes.readUTF();
			item.sysID = bytes.readShort();
			item.conds = bytes.readUTF();
			this._cvo.push(item);
		}
	}

	public static getCvos():JuyuanCopyCVO[]
	{
		return this._cvo;
	}
}