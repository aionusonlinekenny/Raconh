/**刷新物品数据 */
class UpdateItemReturnCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_UPDATE_ITEM_RETURN;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getItems().updateItemsList(pi);
    }
}