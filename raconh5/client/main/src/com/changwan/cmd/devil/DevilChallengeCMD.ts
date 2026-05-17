/**
 * 魔神降临挑战玩家
 * liangyan
 * create 2018-04-10
*/
class DevilChallengeCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.DEVIL_CHALLENGE;
    }

    public id:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt64(this.id);
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.view.hide(ViewID.DevilGrabListView);
        ObjectUtil.remove(Manager.layer.panelDarkLayer);
        ObjectUtil.remove(Manager.layer.uiLayer);
        ObjectUtil.remove(Manager.layer.effectLayer);
        Manager.model.getDevil().updatePKData(pi);
        Manager.view.show(ViewID.DevilGrabEff);
    }
}