/**
 * 盟会战面板
 * luzhihong
 * create 2018.1.25
 */
 class ClubBFPanel extends Panel
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

		this.basePanel.setBottomBackTop(979);

		let btnDatas = [
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "clubBF_btn_0_png", imgClick: "clubBF_btn_0_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "clubLeaderWar_funcBtn1_png", imgClick: "clubLeaderWar_funcBtn1_png"}
		];
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;

		Manager.render.add(this.renderInvalid, this);
    }

	protected renderInvalid(interval:number):void
	{
		Manager.render.remove(this.renderInvalid, this);
		this.update();
		this.onClubLeaderWarInfoUpdateHandler();
	}

	protected addEvent():void
	{
		super.addEvent();
        Manager.model.getClubBF().addEventListener(ClubBFEvent.SCORE_UPDATE, this.update, this);
        Manager.model.getClubBF().addEventListener(ClubBFEvent.REWARES_GET_STATE, this.update, this);
		Manager.model.getClubLeaderWar().addEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_INFO_UPDATE, this.onClubLeaderWarInfoUpdateHandler, this);
	}

	protected removeEvent():void
	{
		super.removeEvent();
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.SCORE_UPDATE, this.update, this);
        Manager.model.getClubBF().removeEventListener(ClubBFEvent.REWARES_GET_STATE, this.update, this);
		Manager.model.getClubLeaderWar().removeEventListener(ClubLeaderWarEvent.CLUB_LEADER_WAR_INFO_UPDATE, this.onClubLeaderWarInfoUpdateHandler, this);
	}

    private update(e:egret.Event = null):void
    {
		let btn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(0) as BaseFuncBtn;
        if(btn) btn.setIconShow(Manager.model.getClubBF().hasCanGet);
    }

	private onClubLeaderWarInfoUpdateHandler(e:ClubLeaderWarEvent = null):void
	{
		let btn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(1) as BaseFuncBtn;
        if(btn) btn.setIconShow(OpenCVO.isOpen(OpenConst.ID_CLUB_LEADER) && Manager.model.getClubLeaderWar().checkCanMobai());
	}
	
	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.ClubBFPanel);
				Manager.view.show(ViewID.ClubPanel);
				break;
		}
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;

		let isBack:boolean = false;
		switch(index)
		{
			case 1:
				isBack = !OpenCVO.isOpen(OpenConst.ID_CLUB_LEADER, true);
				break;
		}
		if(isBack)
		{
			if(this._index == undefined || this._index < 0)
			this.basePanel.scrollerList.itemList.selectedIndex = this._index;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
			return;
		}

		this._index = index;

		if(this._curView != null) this._curView.dispose();
		switch(index)
		{
			case 0:
				this._curView = new ClubBFView(this)
				break;
			case 1:
				this._curView = new ClubLeaderWarView();
				break;
		}
		this.basePanel.addChildAt(this._curView, 2);
		
		if(this._index == 1)
			this.basePanel.title = "clubLeaderWar_title_png";
		else
			this.basePanel.title = "clubBF_title_" + this._index + "_png";
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