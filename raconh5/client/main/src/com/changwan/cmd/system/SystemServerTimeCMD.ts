class SystemServerTimeCMD extends BaseCMD
{
	public constructor()
    {
		super();
		this._protocol = Protocol.SYSTEM_SERVER_TIME;
	}

	public receive(pi:TCPPacketIn)
	{
		var serverTime:number = pi.readInt();
		var open_time:number = pi.readInt();
		var merge_time:number = pi.readInt();
		
		Manager.model.getLogin().serverTimeInfo.updateServerTime(serverTime);
		Manager.model.getLogin().serverTimeInfo.updateSeverOpenTime(open_time);
	}
}