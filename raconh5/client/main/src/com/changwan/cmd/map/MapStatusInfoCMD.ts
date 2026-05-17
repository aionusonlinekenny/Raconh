/**
 *author luzh
 *create 2018.4.9
 *description 
*/
class MapStatusInfoCMD extends BaseCMD
{

    public constructor()
	{
		super();
		this._protocol = Protocol.MAP_STATUS_INFO;
	}

	public receive(pi:TCPPacketIn):void
	{
        if(Manager.model.getMap().mapCVO.id != MapConst.ID_HOME) return;
        let statusInfo:StatusGameObjectInfo;
		let roleInfo:RoleInfo;
        Manager.model.getGameobject().removeGameObjectByType(GameObjectType.STATUE);

        roleInfo = Manager.pool.create(RoleInfo);
        roleInfo.id = pi.readInt64();
        statusInfo = Manager.pool.create(StatusGameObjectInfo, roleInfo.id, roleInfo);
        statusInfo.parse(pi);
        Manager.model.getGameobject().addGameObject(statusInfo);
	}
}