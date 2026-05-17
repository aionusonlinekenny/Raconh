//删除物品
class DeleteItemCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_DIELETE_ITEM;
    }

    /**存储空间(1:装备 2:背包 3:仓库) */
    public type:number;
    public id:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
        pkg.writeInt(this.id);
    }
}