/**
 * drq 
 * 日常签到、补签CMD
 * 2018.3.23
 */
class QiandaoSignCMD extends BaseCMD
{
	public _day:number;

	public constructor() {
		super();
		this._protocol = Protocol.CMD_DAILY_SIGN;
	}

	protected processOut(pkg:TCPPacketOut):void
	{
		pkg.writeByte(this._day);
	}

	public receive(pi:TCPPacketIn):void
	{
		let day:number = pi.readByte();
		let state:number = pi.readByte();
		if(day == Manager.model.getQiandao().getToday())
		{
			Manager.model.getQiandao().setTodayCanGet(false);
			let cashView:CashCowPanel = Manager.view.getView(ViewID.CashCowPanel) as CashCowPanel;
			cashView.delQiandaoRedIcon();
		}
		Manager.model.getQiandao().setBuqian(day,state);
		
		Manager.model.getQiandao().dispatchEvent(new QiandaoEvent(QiandaoEvent.QIANDAO_SIGN_UPDATE));
		Manager.model.getQiandao().dispatchEvent(new QiandaoEvent(QiandaoEvent.QIANDAO_SCHEDULE_DAILY));
		Manager.model.getQiandao().dispatchEvent(new QiandaoEvent(QiandaoEvent.QIANDAO_SCHEDULE_AWARD));
	}
}