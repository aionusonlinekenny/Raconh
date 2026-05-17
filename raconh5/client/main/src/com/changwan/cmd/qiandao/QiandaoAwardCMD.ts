/**
 * drq 
 * 签到阶段奖励CMD
 * 2018.3.23
 */
class QiandaoAwardCMD extends BaseCMD
{
	public _sec:number;//阶段

	public constructor() {
		super();
		this._protocol = Protocol.CMD_DAILY_AWARD;
	}

	protected processOut(pkg:TCPPacketOut):void
	{
		pkg.writeByte(this._sec);
	}

	public receive(pi:TCPPacketIn):void
	{
		let sec = pi.readByte();
		let state = pi.readByte();
		QiandaoGainCVO.getCvos()[sec-1].isGet = true;
		Manager.model.getQiandao().setSecResult(sec,state);
		//Manager.model.getQiandao().dispatchEvent(new QiandaoEvent(QiandaoEvent.QIANDAO_AWARD_UPDATE));
		Manager.model.getQiandao().dispatchEvent(new QiandaoEvent(QiandaoEvent.QIANDAO_SCHEDULE_AWARD));
	}
}