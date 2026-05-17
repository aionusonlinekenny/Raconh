/**
 * 转生申请协议
 * liangyan
 * create 2017-12-14
*/
class ReinApplyCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.REIN_APPLY;
    }

    // protected processOut(pkg:TCPPacketOut):void{}

    public receive(pi:TCPPacketIn):void
    {
        let len = pi.readShort();
        let baseID:number;
        let bind:boolean;
        let count:number;
        while(len > 0)
        {
            let baseID = pi.readInt();
            let bind = pi.readByte() == 1;
            let count = pi.readInt();
            len--;
        }

        Manager.model.getRein().dispatchEvent(new ReinEvent(ReinEvent.REIN_APPLY));
    }
}