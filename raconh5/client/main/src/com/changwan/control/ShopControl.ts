/**
 * pzx 
 * 17.11.28
     * 商Control
     */
class ShopControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.CMD_SHOP_BUY,ShopBuyCMD);
         Manager.socket.addCMD(Protocol.CMD_SHOP_QUEYT,ShopQueryCMD);

         Manager.socket.addCMD(Protocol.CMD_TREASUREGARRET_QUERY,TreasureGarretQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_TREASUREGARRET_UPDATE,TreasureGarretUpdateCMD);
    }
    /**
     * 查询
     */
    public query(type:number):void
    {
        let cmd:ShopQueryCMD = Manager.socket.getCMD(Protocol.CMD_SHOP_QUEYT) as ShopQueryCMD;
        cmd.type = type;
        cmd.send();
    }

    public buy(id:number,type:number,num:number):void
    {
        let cmd:ShopBuyCMD = Manager.socket.getCMD(Protocol.CMD_SHOP_BUY) as ShopBuyCMD;
        cmd.id = id;
        cmd.num = num;
        cmd.send();
    }
    /**
     * 珍宝阁查询
     */
    public treasureGarretQuery():void
    {
        let cmd:TreasureGarretQueryCMD = Manager.socket.getCMD(Protocol.CMD_TREASUREGARRET_QUERY) as TreasureGarretQueryCMD;
        cmd.send();
    }
    /**
     * 珍宝阁刷新
     */
    public treasureGarretUpdate():void
    {
        let cmd:TreasureGarretUpdateCMD = Manager.socket.getCMD(Protocol.CMD_TREASUREGARRET_UPDATE) as TreasureGarretUpdateCMD;
        cmd.send();
    }
}