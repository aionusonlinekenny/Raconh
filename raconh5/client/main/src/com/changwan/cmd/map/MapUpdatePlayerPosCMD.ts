/**
 *author Simon
 *create 2018-1-12
 *description 
*/
class MapUpdatePlayerPosCMD extends BaseCMD
{
    public constructor()
	{
		super();
		this._protocol = Protocol.MAP_UPDATE_PLAYER_POS;
	}

	public receive(pi:TCPPacketIn):void
	{
        let posX:number = pi.readShort();
        let posY:number = pi.readShort();
	}
}