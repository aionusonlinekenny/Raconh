/**
 * pzx 
 * 17.11.18
 * 查询免费倒计时CD
 *  */
class LifeGridCDQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LIFEGRID_INFO;
    }

    public receive(ip:TCPPacketIn):void
    {
        let cd:number = ip.readInt();
        Manager.model.getLifeGrid().returnqueryCd(cd);
    }
}