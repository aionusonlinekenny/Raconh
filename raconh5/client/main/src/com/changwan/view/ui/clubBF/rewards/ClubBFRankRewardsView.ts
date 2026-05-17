/**
 * 盟会战排名奖励视图
 * luzhihong
 * create 2018.1.30
 */
class ClubBFRankRewardsView extends UIComponent
{
    private _list:BaseVScrollerList;

    public constructor()
    {
        super();
		this.dispatchEvent(new eui.UIEvent(eui.UIEvent.COMPLETE));//
        this.touchChildren = true;
    }
    
    protected configUI():void
    {
        super.configUI();

        this._list = new BaseVScrollerList();
        this._list.x = 5;
        this._list.y = 122;
        this._list.width = 710;
        this._list.height = 1010;
        this.addChild(this._list);
		this._list.initBtnListData(ClubBFRankRewardsItem, ClubBFRankRewardsCVO.getCVOs(), true);
		(<eui.VerticalLayout>this._list.itemList.layout).gap = -5;
        
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.dispose(this._list);
        this._list = null;
    }
}