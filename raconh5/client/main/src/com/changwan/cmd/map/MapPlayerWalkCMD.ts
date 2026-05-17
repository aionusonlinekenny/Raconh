/**
 *author Anydo
 *create 2017-11-6
 *description 
*/
class MapPlayerWalkCMD extends BaseCMD
{
	public constructor()
	{
		super();
		this._protocol = Protocol.MAP_PLAYER_WALK;
	}

	public walkType:number;
	public path:egret.Point[];
	protected processOut(out:TCPPacketOut):void
	{
		out.writeByte(this.walkType);
		var count:number = this.path.length;
		out.writeShort(count);
		for(let i:number = 0; i < count; i++)
		{
			out.writeShort(this.path[i].x);
			out.writeShort(this.path[i].y);
		}
	}

	public receive(pi:TCPPacketIn):void
	{
		if(!Manager.model.getMap().mapDataLoadComplete) return;
		var id:number = pi.readInt64();
		var walkType:number = pi.readByte();
		var player:PlayerGameObjectInfo = Manager.model.getGameobject().getPlayerGameObject(id);
		if(player != null && player.getAliveFlag() && !player.isType(GameObjectType.SELF))
		{
			var path:egret.Point[] = [];
			var count:number = pi.readShort();
			while(count > 0)
			{
				path.push(new egret.Point(pi.readShort(),pi.readShort()));
				count--;
			}

			if(walkType == WalkType.JUMP)
			{
				if(path.length >= 2)
				{
					let startPos:egret.Point = path.shift();
					player.dispatchJumpSyn(startPos, path);
				}
			}
			else if(walkType == WalkType.SPRINT)
			{
				player.walk(path, WalkType.SPRINT);
			}
			else if(walkType == WalkType.SLIDE)
			{
				player.walk(path, WalkType.SLIDE);
			}
			else
			{
				if(path.length > 0)
				{
					path = player.handleCurentPath(path, player.x, player.y);
					if(path.length > 0) player.walk(path, WalkType.WALK);
				}
			}
		}
	}
}