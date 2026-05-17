/**
 *  取消副本挂机点
 * luzhihong
 * create 2018.3.10
 */
class CopyHookPosCancelCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_HOOK_POS;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getAuto().hookPos = null;
        // Manager.model.getAuto().autoHook = false;
    }
}