/**
 * 盟主战排名
 */
class ClubLeaderWarRankView extends UIComponent
{
	private _basePopView:BasePopUpView;
	private _scrollerList:BaseVScrollerList;
	private _myRank:Label;
	private _myWinCount:Label;

	private _model:ClubLeaderWarModel;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("clubLeaderWar", "ClubLeaderWarRankViewSkin");
		this.visible = false;
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();

		this.visible = true;
		this._model = Manager.model.getClubLeaderWar();

		this._basePopView.titleImg.source = "clubLeaderWar_rankTitle_png";
        this._basePopView.bgHeight = 700;

		this.onResizeHandler();
	}

	protected initData():void
	{
		Manager.control.getClubLeaderWar().rankQuery();
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._basePopView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._model.addEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_RANK_UPDATE, this.onRankUpdateHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._basePopView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._model.removeEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_RANK_UPDATE, this.onRankUpdateHandler, this);
		super.removeEvent();
	}

	private onResizeHandler(e?:GlobalEvent):void
	{
		this.width = Manager.global.gameMain.stage.stageWidth;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._basePopView.closeBtn:
				Manager.view.hide(ViewID.ClubLeaderWarRankView);
				break;
		}
	}

	private onRankUpdateHandler(e:ClubLeaderWarEvent):void
	{
		this._scrollerList.initBtnListData(ClubLeaderWarRankItem, this._model.info.rankList, true);
		(<eui.HorizontalLayout>this._scrollerList.itemList.layout).gap = -2;

		for(let i:number=0; i<this._model.info.rankList.length; i++)
		{
			if(this._model.info.rankList[i].id == Manager.model.self.id)
			{
				this._myRank.text = this._model.info.rankList[i].rank + "";
				if(this._model.status == 0)
					this._myWinCount.text = this._model.info.rankList[i].rankWinCount + "";
				else if(this._model.status == 1)
					this._myWinCount.text = this._model.info.rankList[i].winCount + "";
			}
		}
	}

	public show():void
	{
		Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._basePopView, this._scrollerList, this._myRank, this._myWinCount);
		if(this._basePopView)
			this._basePopView.dispose();
		this._basePopView = null;
		if(this._scrollerList)
			this._scrollerList.dispose();
		this._scrollerList = null;
		if(this._myRank)
			this._myRank.dispose();
		this._myRank = null;
		if(this._myWinCount)
			this._myWinCount.dispose();
		this._myWinCount = null;
		this._model = null;
	}
}