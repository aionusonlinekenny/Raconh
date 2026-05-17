/**
 * drq 
 * 聚元、突破CMD
 * 2018.4.2
 */
class JuyuanProgressCMD  extends BaseCMD
{
	public _type:number;
	public _args:number;

	public constructor() {
		super();
		this._protocol = Protocol.CMD_PROGRESS;
	}

	protected processOut(pkg:TCPPacketOut):void
	{
		pkg.writeByte(this._type);//1:突破，2:聚元
		pkg.writeByte(this._args);//type=1:_args是id；type=2：args为副本id
	}

	public receive(pi:TCPPacketIn):void
	{
		//0失败，1成功
		let state:number = pi.readByte();
		if(state == 1)
		{
			Manager.model.getJuyuan()._curId += 1;
			Manager.model.getJuyuan().dispatchEvent(new JuyuanEvent(JuyuanEvent.JUYUAN_PROGRESS_UPDATE));
		}
	}
}