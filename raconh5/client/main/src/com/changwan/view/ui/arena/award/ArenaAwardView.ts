/**
 *author Anydo
 *create 2017-12-28
 *description 
*/
class ArenaAwardView extends UIComponent
{
    private _title:eui.Image;
	private _popupView:BasePopUpView;
	private _imageBg1:BitmapRemote;
    private _listV:BaseVScrollerList;
	private _maxRankList:ArenaMaxListView;
	private _txt1:Label;
	private _txtRank:Label;

    public constructor()
    {
		super();
		this.skinName = Manager.path.getSkinName("arena", "ArenaAwardViewSkin");
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();
        this._title.y = 145;
		this._popupView.viewY = 167;
		this._popupView.bgHeight = 937;
        this._popupView.diImgVisible = false;
		this._imageBg1.load(Manager.path.getCommonPath("diwenBack1.png"));

        let dailyCVOs:Array<ArenaDailyCVO> = ArenaDailyCVO.cvos;
        this._listV.initBtnListData(ArenaDailyListItem, dailyCVOs, true);
        (<eui.VerticalLayout>this._listV.itemList.layout).gap = 5;
		
		this._maxRankList = new ArenaMaxListView();
		this._maxRankList.x = 35;
		this._maxRankList.y = 949;
		this.addChild(this._maxRankList);

		HtmlUtil.setTextFlow(this._txt1,LangCVO.getContent("arena19"));
		this._txtRank.text = LangCVO.getContent("arena18") + Manager.model.getArena().myRank;
	}

	protected addEvent():void
	{
		super.addEvent();
		this._popupView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
	}

	protected removeEvent():void
	{
		this._popupView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		super.removeEvent();
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onCloseHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.ArenaAwardView);
	}

	public show(...args:any[]):void
	{
		if(this.parent == null)
		{
			this.onResizeHandler(null);
			Manager.layer.tipsLayer.addChild(this);
		}
	}

	public hide():void
	{
		this.dispose();
        // Manager.view.show(ViewID.ActivityPanel);
        if(Manager.model.getArena().closeOpenBfPanel)
        {
            Manager.model.getArena().closeOpenBfPanel = false;
            Manager.view.show(ViewID.ClubLunjiantaiPanel, 0);
        }
	}

	public dispose()
	{
		super.dispose();
		if(this._loadComplete)
		{
			this._imageBg1.dispose();
			this._imageBg1 = null;
			this._listV.dispose();
			this._listV = null;
			this._popupView.dispose();
			this._popupView = null;
		}
		if(this._maxRankList)
		{
			this._maxRankList.dispose();
			this._maxRankList = null;
		}
	}
}