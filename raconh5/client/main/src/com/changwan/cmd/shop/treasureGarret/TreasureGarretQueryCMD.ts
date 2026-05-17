/**
 * pzx 
 * 18.2.5
 * 珍宝阁查询
 *  */
class TreasureGarretQueryCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_TREASUREGARRET_QUERY;
    }
//  // 1、元宝；2、神秘商城；3、荣誉商城；4、VIP商城
//     public type:number;

//     protected processOut(pkg:TCPPacketOut):void
//     {
//         pkg.writeByte(this.type);
//     }


    public receive(ip:TCPPacketIn):void
    {
        
        Manager.model.getShop().treasureGarretModel.updateDatA(ip);
        let time:number = ip.readInt();
        Manager.model.getShop().treasureGarretModel.setTime(time);
    }
}