/**
 * 魔神降临数据
 * liangyan
 * create 2018-04-10
*/
class DevilInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.DEVIL_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let kingInfo = new DevilKingInfo();
        kingInfo.id = pi.readInt64();
        kingInfo.name = pi.readUTF();
        kingInfo.career = pi.readByte();
        Manager.model.getDevil().lastKingInfo = kingInfo;
    }
}