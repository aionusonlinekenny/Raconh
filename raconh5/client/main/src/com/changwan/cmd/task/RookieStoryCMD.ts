/**
 * 新手剧情协议
 * liangyan
 * create 2018-03-14
*/
class RookieStoryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ROOKIE_STORY;
    }

    public receive(pi:TCPPacketIn):void
    {
        let id = pi.readShort();
        Manager.model.getTask().parseStep(id);
    }
}