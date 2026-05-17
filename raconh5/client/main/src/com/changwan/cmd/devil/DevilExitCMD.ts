/**
 * 退出魔神降临地图
 * liangyan
 * create 2018-04-10
*/
class DevilExitCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.DEVIL_EXIT;
    }

    public receive(pi:TCPPacketIn):void
    {
        let isSucc = pi.readByte() == 1;
        if(isSucc) Manager.view.hide(ViewID.DevilGrabListView);
    }
}