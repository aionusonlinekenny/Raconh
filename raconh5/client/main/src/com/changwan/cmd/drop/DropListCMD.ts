/**
 * 掉落列表信息
 * luzhihong
 * create 2017-11-20
 */
class DropListCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.DROP_LIST;
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name'=>'map', 'type'=>'int32', 'desc'=>'地图base_id'),
                // array('name'=>'x', 'type'=>'int32', 'desc'=>'x坐标'),
                // array('name'=>'y', 'type'=>'int32', 'desc'=>'y坐标'),
                // array('name'=>'items', 'type'=>'arr', 'desc'=>'掉落物品', 'vars'=>array(
                //     array('name'=>'id', 'type'=>'int32', 'desc'=>'物品base_id'),
                //     array('name'=>'is_get', 'type'=>'int8', 'desc'=>'是否进包'),
                //     array('name'=>'quantity', 'type'=>'int32', 'desc'=>'物品数量'),
        let mapID:number = pi.readInt();
        if(Manager.model.getMap().getId() != mapID) return;

        let x = pi.readInt();
        let y = pi.readInt();
        let len:number = pi.readShort();
        while(len--)
        {
            let info:DropGameObjectInfo = Manager.pool.create(DropGameObjectInfo, egret.getTimer());
            info.x = x;
            info.y = y;
            info.setData(pi.readInt(), pi.readByte()!=0, pi.readInt());
            Manager.model.getGameobject().addGameObject(info);
        }
    }
}