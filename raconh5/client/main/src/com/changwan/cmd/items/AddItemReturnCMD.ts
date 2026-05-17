/**存储空间增加物品 */
class AddItemReturnCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_ADD_ITEM_RETURN;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getItems().addTemsList(pi);
    }
}