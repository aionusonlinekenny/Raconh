/**
 * 击杀记录
 * liangyan
 * create 2017-11-14
*/
class KillRecordCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.KILL_RECORD;
    }

    public receive(pi:TCPPacketIn):void
    {
        let id = pi.readInt64();
        let name = pi.readUTF();
    }
}