/**
 * drq 
 * 功法阁
 * 2018.4.11
 */
class GfgPanel extends Panel{
	private _bitimg:BitmapRemote;
	private _btnDatas:any[];
	private _curView:UIComponent;

	public constructor() {
		super(false);
		// this.skinName = Manager.path.getSkinName("gfg", "gfgPanelSkin");
	}

	protected configUI():void
    {
		super.configUI();
		this._btnDatas = [
				{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "role_jingmai_click_png", imgClick: "role_jingmai_click_png", showRedIcon: Manager.model.getJingMai().checkCoin() },
				{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "juyuan_panel_icon_png", imgClick: "juyuan_panel_icon_png", showRedIcon:Manager.model.getJuyuan().checkCoin() }
			];
		if(this._bitimg == null)
		{
			this._bitimg = Manager.pool.create(BitmapRemote);
			this._bitimg.y = 116;
			this.basePanel.addChildAt(this._bitimg,3);
		}
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
	}

	protected addEvent():void
	{
		super.addEvent();
		Manager.model.self.addEventListener(GameObjectAttrEvent.GUILDCONTRI, this.onGfgIconShowHander, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL,this.onGfgIconShowHander,this); 
		Manager.model.getJuyuan().addEventListener(JuyuanEvent.JUYUAN_PROGRESS_UPDATE,this.onGfgIconShowHander,this); 
		Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onGfgIconShowHander, this);
		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.onGfgIconShowHander,this);
	}
	protected removeEvent():void
	{
		Manager.model.self.removeEventListener(GameObjectAttrEvent.GUILDCONTRI, this.onGfgIconShowHander, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL,this.onGfgIconShowHander,this); 
		Manager.model.getJuyuan().removeEventListener(JuyuanEvent.JUYUAN_PROGRESS_UPDATE,this.onGfgIconShowHander,this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onGfgIconShowHander, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.onGfgIconShowHander,this);
		super.removeEvent();
	}

	//更新红点
	private onGfgIconShowHander(e:BaseEvent):void
	{
		if(!e) return;
		if(e.type == GameObjectAttrEvent.GUILDCONTRI)
		{
			let dis:egret.DisplayObject = this.basePanel.scrollerList.itemList.getElementAt(0);
			(<BaseFuncBtn>dis).setIconShow( Manager.model.getJingMai().checkCoin());
		}
		if(e.type == GameObjectAttrEvent.LEVEL || e.type == JuyuanEvent.JUYUAN_PROGRESS_UPDATE || e.type == GameObjectAttrEvent.COIN || ItemsEvent.ITEM_UPDATE_EVENT)
		{
			let dis:egret.DisplayObject = this.basePanel.scrollerList.itemList.getElementAt(1);
			(<BaseFuncBtn>dis).setIconShow( Manager.model.getJuyuan().checkCoin());
		}
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		if(this._curView)
		{
			this._curView.dispose();
			this._curView = null;
		}
		super.onFuncBtnChangeHandler(e);

		switch(index)
		{
			case 0:
				if(OpenCVO.isOpen(OpenConst.ID_JINGMAI,true))
				{
					this.basePanel.title = "jingmai_title_png";
					this.basePanel.setBottomBackTop(978);
					this._curView = Manager.pool.create(JingmaiView, this);
					this._bitimg.visible = true;
					this._bitimg.load(Manager.path.getPanelUiImgPath("jingmai/jingmai_zhengdi","png"));
					this._bitimg.y = 171;
					this._bitimg.x = 70;
				}else if(OpenCVO.isOpen(OpenConst.ID_JUYUAN,true))
				{
					Manager.view.show(ViewID.GfgPanel,1);
				}else{
					Manager.view.show(ViewID.ClubPanel);
				}
				
				break;
			case 1:
				if(OpenCVO.isOpen(OpenConst.ID_JUYUAN,true))
				{
					this.basePanel.title = "juyuan_title_png";
					this.basePanel.setBottomBackTop(978);
					this._bitimg.visible = true;
					this._bitimg.load(Manager.path.getPanelUiImgPath("juyuan/juyuan_back","jpg"));
					this._bitimg.y = 90;//115;
					this._bitimg.x = 0;
					this._curView = Manager.pool.create(JuyuanView);
					
				}else if(OpenCVO.isOpen(OpenConst.ID_JINGMAI)){
					Manager.view.show(ViewID.GfgPanel,0);
				}else{
					Manager.view.show(ViewID.ClubPanel);
				}
               break;
		}
        if(this._curView && !this._curView.parent)this.addChild(this._curView);
	}

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.show(ViewID.ClubPanel);
				break;
		}
	}

	public dispose():void
	{
		if(this._curView) this._curView.dispose();
		super.dispose();
		ObjectUtil.remove(this._curView);
		this._curView = null;
		if(this._bitimg)
		{
			Manager.pool.push(this._bitimg);
			this._bitimg = null;
		}
		this._btnDatas = null;
	}

}