/**
 * pzx 
 * 17.11.28
 * 
 *  */
class ShopBuyCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SHOP_BUY;
    }

//ID
    public id:number;
//购买数量
    public num:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt(this.id);
        pkg.writeShort(this.num);
    }


    public receive(ip:TCPPacketIn):void
    {
        //let type:number = ip.readByte();
        let id:number = ip.readInt();
        let num:number = ip.readShort();
        let res:number = ip.readByte();
        Manager.model.getShop().buy(id,num,res);
    }
}