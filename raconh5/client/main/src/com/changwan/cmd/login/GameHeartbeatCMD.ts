class GameHeartbeatCMD extends BaseCMD
{
	public constructor()
    {
		super();
		this._protocol = Protocol.GAME_HEARTBEAT;
	}

	public receive(pi:TCPPacketIn)
	{
		var serverTime:number = pi.readInt();
		
        Manager.control.getLogin().heartbeatLostCount = 0;
		Manager.model.getLogin().serverTimeInfo.updateServerTime(serverTime);
	}
}