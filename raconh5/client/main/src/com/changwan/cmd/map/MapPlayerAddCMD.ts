/**
 *author Anydo
 *create 2017-11-4
 *description 
*/
class MapPlayerAddCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAP_PLAYER_ADD;
    }

    public receive(pi:TCPPacketIn):void
    {
        if(!Manager.model.getMap().mapDataLoadComplete) return;
        let playerInfo:PlayerGameObjectInfo;
		let roleInfo:RoleInfo;
        let len:number = pi.readShort();
        for(let i:number = 0; i < len; i++)
        {
            let id:number = pi.readInt64();
            playerInfo = Manager.model.getGameobject().getPlayerGameObject(id);
            if(playerInfo == null)
            {
                roleInfo = Manager.pool.create(RoleInfo);
                roleInfo.id = id;
                playerInfo = Manager.pool.create(PlayerGameObjectInfo, id, roleInfo);
                playerInfo.parse(pi);
                Manager.model.getGameobject().addGameObject(playerInfo);
            }
            else
            {
                Trace.trace("Error:MapPlayerAddCMD:receive","服务器乱发信息过来！")
                playerInfo.parse(pi);
            }
        }
    }
}