/**
 * 人物请求复活协议
 * liangyan
 * create 2017-12-06
*/
class ReviveApplyCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.REVIVE_APPLY;
    }

    public type:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
    } 

    public receive(pi:TCPPacketIn):void
    {
        let result = pi.readByte() == 1;
        if(result)
        {
            if(Manager.view.isOpening(ViewID.ReviveChooseView)) Manager.view.hide(ViewID.ReviveChooseView);
            else if(Manager.view.isOpening(ViewID.ReviveCDView)) Manager.view.hide(ViewID.ReviveCDView);
        }
    }
}