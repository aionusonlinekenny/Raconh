/**
 *  副本挂机点
 * luzhihong
 * create 2017.12.4
 */
class CopyHookPosCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_HOOK_POS;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        // array('name' => 'x', 'type' => 'int32', 'desc' => 'x坐标'),
        // array('name' => 'y', 'type' => 'int32', 'desc' => 'y坐标'),
        Manager.model.getAuto().hookPos = new egret.Point(pi.readInt(), pi.readInt());
    }
}