/**
 * 增加经验
 * liangyan
 * create 2017-11-14
*/
class ExpAddCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.EXP_ADD;
    }

    public receive(pi:TCPPacketIn):void
    {
        let exp = pi.readInt64();
        let vipExp = pi.readInt64();
    }
}