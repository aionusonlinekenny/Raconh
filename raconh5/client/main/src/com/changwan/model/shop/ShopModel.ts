/**
 * pzx
 * 17.11.27
 * 商城mddel
 */
class ShopModel extends egret.EventDispatcher
{
    /**商城例表 <标识，<id,已购数量>>*///标识(1、元宝；2、神秘商城；3、荣誉商城；4、VIP商城,6、珍宝阁)
    private _shopList:Dictionary<number,Dictionary<number,number>>;

    public treasureGarretModel:TreasureGarretModel = new TreasureGarretModel();

    public constructor()
    {
        super();
        this._shopList = new Dictionary<number,Dictionary<number,number>>();
    }
    /**商城查询 */
    public queryList(type:number,dic:Dictionary<number,number>):void
    {
        if(this._shopList.containsKey(type))
        {
            this._shopList.remove(type);
        }
        this._shopList.add(type,dic);
        this.dispatchEvent(new ShopEvent(ShopEvent.SHOP_UPDATE_EVENT));
    }
/**更新 */
    public buy(id:number,num:number,res:number):void
    {
        if(res == 1)
        {
            let type:number = ShopCVO.getCvo(id).shop_type;
            let dic:Dictionary<number,number>;
            if(this._shopList.containsKey(type))
            {
                dic = this._shopList.get(type);
            }
            else
            {
                dic = new Dictionary<number,number>();
                this._shopList.add(type,dic)
            }
            if(dic.containsKey(id))
            {
                num = num + dic.get(id);
                dic.remove(id);
            }
            dic.add(id,num);
            this.dispatchEvent(new ShopEvent(ShopEvent.SHOP_BUY_EVENT));
        }
    }
   
     /**获取例表 */
    public getList(type:number):Dictionary<number,number>
    {
        if(this._shopList.containsKey(type))
        {
             return this._shopList.get(type);
        }
        else
        {
            Manager.control.getShop().query(type);
            return null;
        }
    }
    

}