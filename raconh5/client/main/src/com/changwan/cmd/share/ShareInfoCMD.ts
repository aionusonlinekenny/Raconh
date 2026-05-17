/**
 * pzx 
 * 18.3.16
 * 分享
 *  */
class ShareInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SHARE_INFO;
    }

    public receive(ip:TCPPacketIn):void
    {
        let status:number = ip.readByte();
        Manager.model.getshare().returnShareInfo(status);
    }
}