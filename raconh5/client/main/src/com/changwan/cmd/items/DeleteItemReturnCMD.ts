/**删除物品通知 */
class DeleteItemReturnCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_DIELETE_ITEM_REUTNR;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getItems().dletelItems(pi);
    }
}