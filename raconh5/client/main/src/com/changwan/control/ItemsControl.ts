/**
     * 背包道具Control
     */
class ItemsControl extends BaseControl
{
    public constructor()
    {
		super();
	}

    protected addCMD():void
    {
         Manager.socket.addCMD(Protocol.GOODS_QUERY_INFO,ItemsQueryCMD);
         Manager.socket.addCMD(Protocol.CMD_ADD_ITEM_RETURN,AddItemReturnCMD);
         Manager.socket.addCMD(Protocol.CMD_DIELETE_ITEM,DeleteItemCMD);
         Manager.socket.addCMD(Protocol.CMD_DIELETE_ITEM_REUTNR,DeleteItemReturnCMD);
         Manager.socket.addCMD(Protocol.CMD_MOVE_ITEM,MoveItemsCMD);
         Manager.socket.addCMD(Protocol.CMD_UPDATE_ITEM_RETURN,UpdateItemReturnCMD);
         Manager.socket.addCMD(Protocol.CMD_USE_ITEM,UseItemCMD);

    }
    /**
     * 道具查询
     */
    public itemsQuery(value:number):void
    {
    let cmd:ItemsQueryCMD = Manager.socket.getCMD(Protocol.GOODS_QUERY_INFO) as ItemsQueryCMD;
        cmd.type = value;
        cmd.send();
    }
     /**
     * 删除物品
     */
    public deleteItems(value:number,id:number):void
    {
        let cmd:DeleteItemCMD = Manager.socket.getCMD(Protocol.CMD_DIELETE_ITEM) as DeleteItemCMD;
        cmd.type = value;
        cmd.id = id;
        cmd.send();
    }
     /**
     * 使用背包物品
     */
    public useItems(id:number,value:number,baseid:number):void
    {
        let cmd:UseItemCMD = Manager.socket.getCMD(Protocol.CMD_USE_ITEM) as UseItemCMD;
        cmd.count = value;
        cmd.id = id;
        cmd.base_id = baseid;
        cmd.send();
    }
     /**
     * 存储空间转移物品到另一个存储空间
     */
    public moveItems(value:number,value1:number,pos:number):void
    {
        let cmd:MoveItemsCMD = Manager.socket.getCMD(Protocol.CMD_MOVE_ITEM) as MoveItemsCMD;
        cmd.type1 = value;
        cmd.type2 = value1;
        cmd.pos = pos;
        cmd.send();
    }
}