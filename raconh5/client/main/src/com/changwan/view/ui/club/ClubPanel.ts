/**
 * 宗门
 * Simon
 * 2017.12.14
 */
class ClubPanel extends Panel
{
	private _chooseClubView:ChooseClubView;
	private _clubBuildView:ClubBuildView;
	//private _jingmaiView:JingmaiView;
	private _bitimg:BitmapRemote;
	//private _curView:UIComponent;
	//private _inJingmaiPanel:boolean = false;

	public constructor()
	{
		super(false);
	}

	protected initData():void
    {
		super.initData();
		
		if(Manager.model.self.attrInfo.guildID == 0)
		{
			this.basePanel.title = "club_chooseClub_png";
			if(!this._chooseClubView)
				this._chooseClubView = Manager.pool.create(ChooseClubView);
			this.addChild(this._chooseClubView);
		}
		else
		{
			let id:number = Manager.model.self.attrInfo.guildID;
			this.basePanel.title = "club_name" + String(id).substr(String(id).length - 1, 1) + "2_png";
			if(!this._clubBuildView)
				this._clubBuildView = Manager.pool.create(ClubBuildView, this);
			this.addChild(this._clubBuildView);

			Manager.control.getClub().query();
		}
	} 

	protected addEvent():void
	{
		super.addEvent();
		Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_INFO, this.onClubInfoUpdate, this);

	}
	
	protected removeEvent():void
	{
		Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_INFO, this.onClubInfoUpdate, this);
		super.removeEvent();
	}



	private onClubInfoUpdate(e:ClubEvent):void
	{
		if(this._chooseClubView)
		{
			Manager.pool.push(this._chooseClubView);
			this._chooseClubView = null;
		}
		if(!this._clubBuildView)
		{
			this._clubBuildView = Manager.pool.create(ClubBuildView, this);
			this.addChild(this._clubBuildView);
			//this.addChildAt()
		}
	}

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
					this.initData();
					if(this._bitimg)
					{
						this._bitimg.visible = false;
					}
				Manager.view.hide(ViewID.ClubPanel);
				if(Manager.model.getGuide().curID == GuideID.CLUB_JOIN) Manager.control.getTask().hideGuide();
				break;
		}
	}

	// public showJingmai():void
	// {
	// 	if(this._chooseClubView)
	// 	{
	// 		Manager.pool.push(this._chooseClubView);
	// 		this._chooseClubView = null;
	// 	}
	// 	if(this._clubBuildView)
	// 	{
	// 		Manager.pool.push(this._clubBuildView);
	// 		this._clubBuildView = null;
	// 	}
	// 	this._inJingmaiPanel = true;

	// 	if(this._bitimg == null)
	// 	{
	// 		this._bitimg = Manager.pool.create(BitmapRemote);
	// 		this.basePanel.addChildAt(this._bitimg,3);
	// 	}
	// 	if(!this._curView)
	// 	{
	// 		let menuBtnContent = [
	// 			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "role_jingmai_click_png", imgClick: "role_jingmai_click_png", showRedIcon: Manager.model.getJingMai().checkCoin() },
	// 			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "juyuan_panel_icon_png", imgClick: "juyuan_panel_icon_png", showRedIcon:Manager.model.getJuyuan().checkCoin() }
	// 		];
	// 		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, menuBtnContent);
	// 		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;

	// 	//this.basePanel.title = "role_title5_png";
	// 	this.basePanel.scrollerList.itemList.selectedIndex=0
	// 	this.onFuncBtnChangeHandler(null);
	// 	}


	// }

	public show(viewId:number):void
	{
		super.show();
		if(this._clubBuildView)
			this._clubBuildView.showView(viewId);
	}

	// protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	// {
	// 	if(!this._inJingmaiPanel) return;
	// 	let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
	// 	if(index == -1) return;
	// 	if(this._curView)
	// 	{
	// 		this._curView.dispose();
	// 		//Manager.pool.push(this._curView);
	// 		this._curView = null;
	// 	}
	// 	super.onFuncBtnChangeHandler(e);

	// 	switch(index)
	// 	{
	// 		case 0:
	// 			this.basePanel.title = "jingmai_title_png";
	// 			this.basePanel.setBottomBackTop(978);
	// 			this._curView = Manager.pool.create(JingmaiView, this);
	// 			this._bitimg.visible = true;
	// 			this._bitimg.load(Manager.path.getPanelUiImgPath("jingmai/jingmai_zhengdi","png"));
	// 			this._bitimg.y = 171;
	// 			this._bitimg.x = 70;
	// 			break;
	// 		case 1:
    //             this.basePanel.title = "juyuan_title_png";
    //             this.basePanel.setBottomBackTop(978);
	// 			this._bitimg.visible = true;
	// 			this._bitimg.load(Manager.path.getPanelUiImgPath("juyuan/juyuan_back","jpg"));
	// 			this._bitimg.y = 90;//115;
	// 			this._bitimg.x = 0;
	// 			this._curView = Manager.pool.create(JuyuanView);
	// 			break;
	// 	}
    //     if(this._curView && !this._curView.parent)this.addChild(this._curView);
	// 	// if(Manager.model.getJuyuan()._toJuyuan)//需要跳到聚元
	// 	// {
	// 	// 	if(!this._clubBuildView)
	// 	// 		this._clubBuildView = Manager.pool.create(ClubBuildView, this);
	// 	// 	this.addChild(this._clubBuildView);
	// 	// 	Manager.pool.push(this._clubBuildView);
	// 	// }
	// 	//this.basePanel.addChildAt(this._curView, this.basePanel.getChildIndex(this.basePanel.bottomBackImg) + 1);
	// }

	public dispose():void
	{
		super.dispose();

		if(this._chooseClubView)
			this._chooseClubView.dispose();
		this._chooseClubView = null;
		if(this._clubBuildView)
			this._clubBuildView.dispose();
		this._clubBuildView = null;
		// if(this._jingmaiView)
		// 	this._jingmaiView.dispose();
		// this._jingmaiView = null;
		if(this._bitimg)
			this._bitimg.dispose();
		this._bitimg = null;
	}
}