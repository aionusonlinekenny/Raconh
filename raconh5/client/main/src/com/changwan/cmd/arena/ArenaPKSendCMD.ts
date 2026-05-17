/**
 *author Anydo
 *create 2018-1-2
 *description 
*/
class ArenaPKSendCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ARENA_PK_SEND;
    }

    public rank:number;//要挑战的排名
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeShort(this.rank);
    }

    public receive(pi:TCPPacketIn):void
    {
        // Manager.layer.panelDarkLayer.visible = false;
        // Manager.layer.uiLayer.visible = false;
        // Manager.layer.effectLayer.visible = false;
        Manager.view.hide(ViewID.ClubPanel);
        ObjectUtil.remove(Manager.layer.panelDarkLayer);
        ObjectUtil.remove(Manager.layer.uiLayer);
        ObjectUtil.remove(Manager.layer.effectLayer);
    }
}