/**
 * pzx 
 * 17.11.28
 * 查询
 *  */
class ShopQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_SHOP_QUEYT;
    }
 // 1、元宝；2、神秘商城；3、荣誉商城；4、VIP商城
    public type:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
    }


    public receive(ip:TCPPacketIn):void
    {
         let type:number = ip.readByte();
        let ln:number = ip.readShort();
        var dic:Dictionary<number,number> = new Dictionary<number,number>();
        for(let i:number = 0;i<ln;i++)
        {
            let itemId:number = ip.readInt();
            let num:number = ip.readShort();
            dic.add(itemId,num);
        }
        Manager.model.getShop().queryList(type,dic);
    }
}