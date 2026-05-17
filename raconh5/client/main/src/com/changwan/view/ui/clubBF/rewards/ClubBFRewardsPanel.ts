/**
 * 盟会战奖励面板
 * luzhihong
 * create 2018.1.25
 */
 class ClubBFRewardsPanel extends Panel
{
    private _index:number;
	private _curView:UIComponent;

    public constructor()
    {
        super(false);
    }
    
    protected configUI():void
    {
		super.configUI();

		this.basePanel.setBottomBackTop(1200);

		this.basePanel.title = "clubBF_rewards_title_png";

		let btnDatas = [
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "clubBF_rewards_btn_0_png", imgClick: "clubBF_rewards_btn_0_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "clubBF_rewards_btn_1_png", imgClick: "clubBF_rewards_btn_1_png"}
		];
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;

		Manager.render.add(this.renderInvalid, this);
    }

	protected renderInvalid(interval:number):void
	{
		Manager.render.remove(this.renderInvalid, this);
		this.update();
	}

	protected addEvent():void
	{
		super.addEvent();
        Manager.model.getClubBF().addEventListener(ClubBFEvent.SCORE_UPDATE, this.update, this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.REWARES_GET_STATE, this.update, this);
	}

	protected removeEvent():void
	{
		super.removeEvent();
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.SCORE_UPDATE, this.update, this);
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.REWARES_GET_STATE, this.update, this);
	}

    private update(e:egret.Event = null):void
    {
		let btn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(0) as BaseFuncBtn;
        if(btn) btn.setIconShow(Manager.model.getClubBF().hasCanGet);
    }
		
	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.ClubBFRewardsPanel);
				break;
		}
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		this._index = index;

		if(this._curView != null) this._curView.dispose();
		switch(index)
		{
			case 0:
				this._curView = new ClubBFScoreRewardsView();
				break;
			case 1:
				this._curView = new ClubBFRankRewardsView();
				break;
		}
		this.addChild(this._curView);
	}

    public dispose():void
    {
		Manager.render.remove(this.renderInvalid, this);
        super.dispose();
		if(this._curView != null)
		{
			this._curView.dispose();
			this._curView = null;
		}
    }
}