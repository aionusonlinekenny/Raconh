/**
 * drq 
 * 聚元Control
 * 2018.4.2
 */
class JuyuanControl extends BaseControl
{
	public constructor() {
		super();
	}

	protected addCMD():void
	{
		Manager.socket.addCMD(Protocol.CMD_GATHER_INFO,JuyuanInfoCMD);
		Manager.socket.addCMD(Protocol.CMD_PROGRESS,JuyuanProgressCMD);
	}

	//发
	public senInitInfo():void
	{
		let cmd:JuyuanInfoCMD = Manager.socket.getCMD(Protocol.CMD_GATHER_INFO)as JuyuanInfoCMD;
		cmd.send();
	}
	public sendProgress(type:number,args:number):void
	{
		let cmd:JuyuanProgressCMD = Manager.socket.getCMD(Protocol.CMD_PROGRESS)as JuyuanProgressCMD;
		cmd._type = type;
		cmd._args = args;
		cmd.send();
	}
}