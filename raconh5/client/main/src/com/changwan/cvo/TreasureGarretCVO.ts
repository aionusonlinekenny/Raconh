/**
 * pzx 
 * 珍宝阁
 * 18.2.3
 */
class TreasureGarretCVO {
	private static _cvos:Array<TreasureGarretCVO>;
	//最大刷新次数
	private static _max_count:number;
	/**元宝价格 */
	public loss:string;
	/** 刷新次数 */
	public count:number;
    public static parse(bytes:egret.ByteArray):void
    {
		this._cvos = [];
		this._max_count = 0;
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:TreasureGarretCVO = new TreasureGarretCVO();
			item.loss = bytes.readUTF();
			let n:number = bytes.readByte();
			item.count = n;
			this._cvos.push(item);
			if(this._max_count<n)
			{
				this._max_count = n;
			}
        }
    }

/** 最大刷新次数 */
	public static get max_count():number
	{
		return this._max_count ;
	}
		
	public static getCvo(count:number):TreasureGarretCVO
	{
		for(let cvo of this._cvos)
		{
			if(cvo.count == count) return cvo;
		}
	}
}