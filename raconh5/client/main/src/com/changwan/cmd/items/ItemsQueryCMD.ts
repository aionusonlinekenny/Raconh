
class ItemsQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.GOODS_QUERY_INFO;
    }

    /**存储空间(1:装备 2:背包 3:仓库) */
    public type:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getItems().queryItemsList(pi);
    }
}