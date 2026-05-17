/**
 * 盟会战排名奖励项
 * luzhihong
 * create 2018.1.30
 */
class ClubBFRankRewardsItem extends ItemRenderer
{
    private _txt:Label;
	private _goodItems:Array<Goods>;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("clubBF", "ClubBFRankRewardsItemSkin");
    }

    private get cvo():ClubBFRankRewardsCVO{return this.data as ClubBFRankRewardsCVO;}

    protected dataChanged():void
    {
        this._txt.text = this.cvo.desc;//
        if(this.cvo.id == 1) this._txt.textColor = Color.RED;
        else if(this.cvo.id == 2) this._txt.textColor = Color.ORANGE;
        else if(this.cvo.id == 3) this._txt.textColor = Color.PURPLE;
        else this._txt.textColor = 0x00A0FD;//Color.BLUE;
        
        // this.pushGoods();
        this._goodItems = [];
        let item:Goods;
        for(let i:number=0, len:number=this.cvo.rewards.length; i<len; i++)
        {
            item = Manager.pool.create(Goods);
            item.x = 14 + i*115;
            item.y = 4;
            item.data = this.cvo.rewards[i].item;
            this.addChild(item);
            this._goodItems.push(item);
        }
    }

    private pushGoods():void
    {
        if(this._goodItems)
        {
            for(let i:number=this._goodItems.length-1; i>=0; i--)
            {
                Manager.pool.push(this._goodItems[i]);
            }
            this._goodItems = null;
        }
    }

    public dispose():void
    {
        this.pushGoods();
		super.dispose();
        ObjectUtil.dispose(this._txt);
        this._txt = null;
	}
}