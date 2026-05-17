/**
 * vip额度更新协议
 * liangyan
 * create 2017-12-25
*/
class VipExpUpdateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.VIP_EXP_UPDATE;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getVip().exp = pi.readShort();
    }
}