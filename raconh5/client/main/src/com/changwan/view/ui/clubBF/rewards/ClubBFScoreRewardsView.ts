/**
 * 盟会战积分奖励视图
 * luzhihong
 * create 2018.1.30
 */
class ClubBFScoreRewardsView extends UIComponent
{
    private _model:ClubBFModel;
    private _cvos:Array<ClubBFScoreRewardsCVO>;
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
        this._model = Manager.model.getClubBF();
        this._cvos = ClubBFScoreRewardsCVO.getCVOs();

        this._list = new BaseVScrollerList();
        this._list.x = 5;
        this._list.y = 122;
        this._list.width = 710;
        this._list.height = 1010;
        this.addChild(this._list);
		this._list.initBtnListData(ClubBFScoreRewardsItem, null, true);
		(<eui.VerticalLayout>this._list.itemList.layout).gap = -5;

        this.drawList();
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getClubBF().addEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateList, this);
    }

    protected removeEvent():void
    {
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.REWARES_GET_STATE, this.updateList, this);
        super.removeEvent();
    }

    private updateList(e:CopyEvent):void
    {
        this.invalidate("drawList");
    }

    private drawList():void
    {
        this._cvos.sort(ClubBFScoreRewardsCVO.sortFun);
		this._list.dataProvider(this._cvos);
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawList")) this.drawList();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawList();
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.dispose(this._list);
        this._model = null;
        this._cvos = null;
        this._list = null;
    }
}