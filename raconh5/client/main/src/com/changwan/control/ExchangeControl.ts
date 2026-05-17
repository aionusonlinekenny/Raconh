/**
 * drq 
 * 兑换活动 control
 * 2018.4.19
 */
class ExchangeControl extends BaseControl
{
	public constructor() {
		super();
	}

	protected addCMD():void
	{
		Manager.socket.addCMD(Protocol.CMD_EXCHANGE_INFO,ExchangeInfoCMD);
		Manager.socket.addCMD(Protocol.CMD_EXCHANGE,ExchangeCMD);
	}

	//发
	public sendInitInfo():void
	{
		let cmd:ExchangeInfoCMD = Manager.socket.getCMD(Protocol.CMD_EXCHANGE_INFO)as ExchangeInfoCMD;
		cmd.send();
	}
	public sendExchange(id:number):void
	{
		let cmd:ExchangeCMD  = Manager.socket.getCMD(Protocol.CMD_EXCHANGE)as ExchangeCMD;
		cmd._id = id;
		cmd.send();
	}
}