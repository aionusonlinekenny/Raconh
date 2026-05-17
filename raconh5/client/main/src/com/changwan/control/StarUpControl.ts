/**
 * drq 
 * 升星 control
 * 2018.4.16
 */
class StarUpControl extends BaseControl
{
	public constructor() {
		super();
	}

	protected addCMD():void
	{
		Manager.socket.addCMD(Protocol.CMD_UP_STAR,StarUpCMD);
	}

	//发
	public sendStarUp(type:number, id:number, arr:number[]):void
	{
		let cmd:StarUpCMD = Manager.socket.getCMD(Protocol.CMD_UP_STAR)as StarUpCMD;
		cmd._storageType = type;
		cmd._itemId = id
		cmd._otherIdList = arr;
		cmd.send();
	}

}