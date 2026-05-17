/**
 *author Anydo
 *create 2017-11-6
 *description 
*/
class MapSelfWalkSyncPosCMD extends BaseCMD
{
    public constructor()
	{
		super();
		this._protocol = Protocol.MAP_SELF_WALK_SYNC_POS;
	}

	public posX:number;
	public posY:number;
	protected processOut(out:TCPPacketOut):void
	{
		out.writeShort(this.posX);
		out.writeShort(this.posY);
	}
}