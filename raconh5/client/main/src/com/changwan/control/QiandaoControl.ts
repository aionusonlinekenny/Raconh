/**
 * drq 
 * 签到Control
 * 2018.3.23
 */
class QiandaoControl  extends BaseControl
{
	public constructor() {
		super();
	}

	protected addCMD():void
	{
		Manager.socket.addCMD(Protocol.CMD_SIGH_INFO,QiandaoInfoCMD);
		Manager.socket.addCMD(Protocol.CMD_DAILY_SIGN,QiandaoSignCMD);
		Manager.socket.addCMD(Protocol.CMD_DAILY_AWARD,QiandaoAwardCMD);
	}

	//发
	public sendInitInfo():void
	{
		let cmd:QiandaoInfoCMD = Manager.socket.getCMD(Protocol.CMD_SIGH_INFO)as QiandaoInfoCMD;
		cmd.send();
	}
	public sendSign(day:number):void
	{
		let cmd:QiandaoSignCMD = Manager.socket.getCMD(Protocol.CMD_DAILY_SIGN)as QiandaoSignCMD;
		cmd._day = day;
		cmd.send();
	}
	public sendAward(sec):void
	{
		let cmd:QiandaoAwardCMD = Manager.socket.getCMD(Protocol.CMD_DAILY_AWARD)as QiandaoAwardCMD;
		cmd._sec = sec;
		cmd.send();
	}

	
}