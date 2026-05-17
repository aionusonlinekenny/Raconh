/**
 * 魔神降临退出1v1场景
 * liangyan
 * create 2018-04-18
*/
class DevilExitGrabCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.DEVIL_EXIT_GRAB;
    }

    public receive(pi:TCPPacketIn):void
    {
        let isSucc = pi.readByte() == 1;
        if(isSucc) Manager.model.getDevil().exitGrabHandler();
    }
}