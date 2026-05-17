/**
 * drq 
 * 聚元信息CMD
 * 2018.4.2
 */
class JuyuanInfoCMD  extends BaseCMD
{
	public constructor() {
		super();
		this._protocol = Protocol.CMD_GATHER_INFO;
	}

	public receive(pi:TCPPacketIn):void
	{
		//接收魂球信息列表
		let id:number = pi.readShort();
		Manager.model.getJuyuan()._curId = id;

		//接收已通关层数
		let  guard:number = pi.readShort();

		Manager.model.getJuyuan().dispatchEvent(new JuyuanEvent(JuyuanEvent.JUYUAN_INFO_UPDATE));
	}
}