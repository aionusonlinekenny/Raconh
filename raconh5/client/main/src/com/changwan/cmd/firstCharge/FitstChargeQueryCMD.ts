/**
 * pzx 
 * 18.1.8
 * 充值豪礼
 *  */
class FitstChargeQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_FIRSTCHARGE;
    }

    public receive(ip:TCPPacketIn):void
    {
        let n:number = ip.readByte();
        Manager.model.getSysCharge().returnIsReward(n==1);
    }
}