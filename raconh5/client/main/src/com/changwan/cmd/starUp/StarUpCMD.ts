/**
 * drq 
 * 升星CMD
 * 2018.4.16
 */
class StarUpCMD extends BaseCMD
{
	public _storageType:number;
	public _itemId:number;
	public _otherIdList:number[] = [];

	public constructor() {
		super();
		this._protocol = Protocol.CMD_UP_STAR;
	}

	protected processOut(pkg:TCPPacketOut):void
	{
		pkg.writeByte(this._storageType);//升星的装备所在的背包类型
		pkg.writeInt(this._itemId);//升星装备的id
		pkg.writeShort(this._otherIdList.length);
		for(let i=0;i<this._otherIdList.length;i++)//副装备列表
		{
			pkg.writeInt(this._otherIdList[i]);//背包装备id
		}
	}

	public receive(pi:TCPPacketIn):void
	{
		let type:number = pi.readByte();
		let id:number = pi.readInt();
		let result:number = pi.readByte();
		let any:any ={};
		any.type = type;
		any.id = id;
		any.result = result;
		Manager.model.getStarUp().dispatchEvent(new StarUpEvent(StarUpEvent.STARUP_UPDATE,any));
	}

}