/**
 *author Anydo
 *create 2017-12-28
 *description 
*/
class ArenaDailyListItem extends ItemRenderer
{
    private _txt:Label;
	private _goodItems:Array<Goods> = [];

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("arena", "ArenaDailyListItemSkin");
    }

    protected dataChanged():void
    {
        this.disposeItems();
        let info = this.data as ArenaDailyCVO;
        if(info == null) return;
        this._txt.text = info.des;
        this._goodItems = [];
	    let goods:Array<GainLossVO> = info.gains;
		var len:number = goods.length > 3 ? 3 : goods.length;
		var item:Goods;
        for(var i:number = 0; i < len; i++)
		{
            item = Manager.pool.create(Goods);
            item.x = 262 + i * 130;
            item.y = -5;
            item.data = goods[i].item;
            this.addChild(item);
            this._goodItems.push(item);
        }
    }

    private disposeItems():void
    {
        for(let i:number = 0; i < this._goodItems.length; i++)
        {
            Manager.pool.push(this._goodItems[i]); 
        }
		this._goodItems = null;
    }

    public dispose():void
    {
        super.dispose();
        this._txt.dispose();
        this._txt = null;
        this.disposeItems();
    }
}