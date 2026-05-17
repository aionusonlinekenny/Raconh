/**
 * drq 
 * 签到信息请求CMD
 * 2018.3.23
 */
class QiandaoInfoCMD extends BaseCMD
{
	public constructor() {
		super();
		this._protocol = Protocol.CMD_SIGH_INFO;
	}

	public receive(pi:TCPPacketIn):void
	{
		//阶段列表
		let length:number = pi.readShort();
		for(let i=0;i<length;i++)
		{
			let id:number = pi.readByte();
			let state:number = pi.readByte();
			QiandaoGainCVO.getCvos()[id-1].isGet = true;
			Manager.model.getQiandao().setTotalList(id,state);
		}
		
		//每日列表
		let length2:number = pi.readShort();
		for(let j=0;j<length2;j++)
		{
			let days:number = pi.readByte();
			let state:number = pi.readByte();
			if(days == Manager.model.getQiandao().getToday())
			{
				Manager.model.getQiandao().setTodayCanGet(false);
			}
			Manager.model.getQiandao().setDailyList(days,state);
		}
		//事件
		Manager.model.getQiandao().dispatchEvent(new QiandaoEvent(QiandaoEvent.QIANDAO_INFO_UPDATE));
	}
}