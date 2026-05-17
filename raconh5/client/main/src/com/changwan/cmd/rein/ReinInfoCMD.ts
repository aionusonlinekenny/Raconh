/**
 * 转生信息协议
 * liangyan
 * create 2017-12-14
*/
class ReinInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.REIN_INFO;
    }

    // protected processOut(pkg:TCPPacketOut):void{}
    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getRein().bossCount = pi.readShort();
        Manager.model.getRein().dispatchEvent(new ReinEvent(ReinEvent.REIN_INFO));
    }
}