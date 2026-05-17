/**
 * pzx 
 * 18.2.5
 * 珍宝阁刷新
 *  */
class TreasureGarretUpdateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_TREASUREGARRET_UPDATE;
    }

    public receive(ip:TCPPacketIn):void
    {
        
        Manager.model.getShop().treasureGarretModel.updateDatA(ip);
    }
}