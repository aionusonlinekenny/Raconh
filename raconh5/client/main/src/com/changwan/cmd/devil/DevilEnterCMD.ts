/**
 * 进入魔神降临地图
 * liangyan
 * create 2018-04-10
*/
class DevilEnterCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.DEVIL_ENTER;
    }

    public receive(pi:TCPPacketIn):void
    {
        let isSucc = pi.readByte() == 1;
        if(isSucc)
        {
            Manager.control.getDevil().askGrabList();
            Manager.control.getDevil().askRankList();
            Manager.view.show(ViewID.DevilGrabListView);
        }
    }
}