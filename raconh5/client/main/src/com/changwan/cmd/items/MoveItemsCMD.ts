//存储空间转移物品到另一个存储空间
class MoveItemsCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_MOVE_ITEM;
    }
//  array('name' => 'storage1', 'type' => 'int8', 'desc' => '从存储空间1'),
 //array('name' => 'storage2', 'type' => 'int8', 'desc' => '转移到存储空间2'),
    public type1:number;
    public type2:number;
    public pos:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type1);
        pkg.writeInt(this.pos);
        pkg.writeByte(this.type2);
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getItems().dispatchEventWith(ItemsEvent.EQUIP_UPDATE_EVENT);
    }
}