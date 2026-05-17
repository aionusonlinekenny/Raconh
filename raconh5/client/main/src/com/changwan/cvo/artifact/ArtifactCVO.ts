/**
 * pzx 
 * 寻宝首具数据
 * 18.2.7
 */
class ArtifactCVO {
	private static _itemCvos:ArtifactCVO[];
	/** 道具 */
	public item:string;
	/** 排序 */
	public sort:number;
	

    public static parse(bytes:egret.ByteArray):void
    {
		this._itemCvos = [];
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:ArtifactCVO = new ArtifactCVO();
			item.item = bytes.readUTF();
			item.sort = bytes.readByte();
			this._itemCvos[item.sort] = item;
        }
		ArtifactIntegralCVO.parse(bytes);
		ArtifactLossCVO.parse(bytes);
    }
		
	public static getCvos():ArtifactCVO[]
	{
		return this._itemCvos;
	}
}