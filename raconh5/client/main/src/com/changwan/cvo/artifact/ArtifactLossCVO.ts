/**
 * pzx 
 * 寻宝消耗
 * 18.2.7
 */
class ArtifactLossCVO {
	private static _cvos:any;
	/** 抽奖次数类型
道具消耗：0
寻宝1次：1
寻宝10次：10 */
	public type:number;
	/** 消耗 */
	public loss:string;
	

    public static parse(bytes:egret.ByteArray):void
    {
		this._cvos = {};
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			var item:ArtifactLossCVO = new ArtifactLossCVO();
			item.type = bytes.readByte();
			item.loss = bytes.readUTF();
			this._cvos[item.type] = item;
        }
		
    }
		
	public static getCvo(type:number):ArtifactLossCVO
	{
		return this._cvos[type];
	}
	
}