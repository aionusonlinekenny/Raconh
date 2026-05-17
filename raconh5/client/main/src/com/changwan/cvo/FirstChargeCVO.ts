/**
 * 充值豪礼
 * pzx
 * 18.1.8
 */
class FirstChargeCVO {
	private static _cvo:FirstChargeCVO;
	/** 物品显示*/
	public rewards:string;
	/**模型id */
	public modelId:string;
	/**特效物品格[itemPurple2Eff,itemPurple2Eff,itemPurple2Eff,itemPurple2Eff]  index 对应物品*/
	public effect:string;

	public static parse(bytes:egret.ByteArray):void
    {
		let pageCount:number = bytes.readByte();
        let tableCount:number = bytes.readShort();
        for (var i = 0; i < tableCount; i++)
        {
			this._cvo = new FirstChargeCVO();
			this._cvo.rewards = bytes.readUTF();
			this._cvo.modelId = bytes.readUTF();
			this._cvo.effect = bytes.readUTF();
        }
    }

	public static cvo():FirstChargeCVO
	{
		return this._cvo;
	}


}