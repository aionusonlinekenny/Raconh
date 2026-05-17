/**
 * pzx 
 * 18.3.16
 * 分享查询
 *  */
class ShareQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SHARE_QUERY;
    }
 // 1、元宝；2、神秘商城；3、荣誉商城；4、VIP商城
    public type:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
    }


    public receive(ip:TCPPacketIn):void
    {
        // array('name'=>'is_rewarded', 'type'=>'int8', 'desc'=>'0-未领取 1-已领取'),
        //         array('name'=>'status', 'type'=>'int8', 'desc'=>'0-未分享 1-已分享'),
        let is_rewarded:number = ip.readByte();
        let status:number = ip.readByte();
        Manager.model.getshare().returnQuery(is_rewarded,status);
    }
}