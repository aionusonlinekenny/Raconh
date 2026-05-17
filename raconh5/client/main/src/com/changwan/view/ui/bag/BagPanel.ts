class BagPanel extends Panel implements IViewManager
{
	// //功能按钮间距离
	// private static BUTTON_OFFSET:number = 120;

	private _bagView:BagView2;
	private _depotView:DepotView2;
	private _ronglianView:RonglianView;
	private _curView:UIComponent;
	private _menuBtnContent:Array<any>;
	private _isLoadComplete:boolean = false;
	// private _scrollH:number = 0;

	/**
	 * 用于溶炼播放动画时不能操作
	 */
	public cantClick:boolean = false;

	private _isAutoRonglian:boolean = false;
	private _curIndex:number = 0;

	public constructor()
	{
		super(false);
	}

	protected configUI():void
	{
		super.configUI();
		this.basePanel.setBottomBackTop(1000);

		let canRonglian:boolean = Manager.model.getEquip().checkCanRonglian();

		this._menuBtnContent = [
				{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "bag_beibao1_png", imgClick: "bag_beibao1_png", showRedIcon:false },
				{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "bag_cangku1_png", imgClick: "bag_cangku1_png", showRedIcon:false },
				{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "ronglian_btnImg_png", imgClick: "ronglian_btnImg_png", showRedIcon:canRonglian }
		];
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
	}

	protected addEvent():void
    {
		super.addEvent();
		// GameDispatcher.getInstance().addEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
	}

	protected removeEvent():void
	{
		// GameDispatcher.getInstance().removeEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
		super.removeEvent();
	}

	// private onFuncBtnLoadComplete(e:BaseUIEvent):void
	// {
	// 	if(!this._isLoadComplete && e.data == BaseFuncBtn && this._scrollH != 0)
	// 	{
	// 		this._isLoadComplete = true;
	// 		this.basePanel.scrollerList.scroller.viewport.scrollH = this._scrollH;
	// 		this._scrollH = 0;

	// 		for(let i:number=0; i<this._menuBtnContent.length; i++)
	// 		{
	// 			if(i == this.basePanel.scrollerList.itemList.selectedIndex)
	// 				this._menuBtnContent[i].isSelected = true;
	// 			else
	// 				this._menuBtnContent[i].isSelected = false;
	// 		}
	// 	}
	// }

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);
		
		Manager.view.hide(ViewID.BagPanel);
	}

	private onItemUpdateHandler(e:ItemsEvent):void
	{
		if(!Manager.render.contains(this.onItemUpdate, this))
			Manager.render.add(this.onItemUpdate, this, 100);
	}

	private onItemUpdate():void
	{
		let rongLianbtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(2) as BaseFuncBtn;
		if(rongLianbtn)
			rongLianbtn.setIconShow(Manager.model.getEquip().checkCanRonglian());

		if(Manager.render.contains(this.onItemUpdate, this))
			Manager.render.remove(this.onItemUpdate, this);
	}

	public dispose()
	{
		if(Manager.render.contains(this.onItemUpdate, this))
			Manager.render.remove(this.onItemUpdate, this);
		this._curView = null;
		if(this._bagView)
		{
			this._bagView.dispose();
			this._bagView = null;
		}
		if(this._depotView)
		{
			this._depotView.dispose();
			this._depotView = null;
		}
		if(this._ronglianView)
		{
			Manager.pool.push(this._ronglianView);
			this._ronglianView = null;
		}
		
		super.dispose();
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		if(this.cantClick) return;

		super.onFuncBtnChangeHandler(e);

		var index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;

		if(index == 2 && !OpenCVO.isOpen(OpenConst.ID_RONGLIAN, true))
		{
			this.basePanel.scrollerList.itemList.selectedIndex = this._curIndex;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
			return;
		}

		if(this._curView && this._curView.parent)
			{
				if(this._curView == this._ronglianView && Manager.model.getGuide().curID == GuideID.RONG_LIAN)
					 Manager.control.getTask().hideGuide();
				this._curView.parent.removeChild(this._curView);
			}

		switch(index)
		{
			case 0:
				if(!this._bagView)
					// this._bagView = Manager.pool.create(BagView2, this);
					this._bagView = new BagView2(this);
				
				this._curView = this._bagView;
				this.basePanel.title = "bag_beibao_png";
				break;
			case 1:
				if(!this._depotView)
					this._depotView = new DepotView2();
				this._curView = this._depotView;
				this.basePanel.title = "bag_cangku_png";
				break;
			case 2:
				if(!this._ronglianView)
					this._ronglianView = Manager.pool.create(RonglianView, this, this._isAutoRonglian);
				this._curView = this._ronglianView;
				this.basePanel.title = "bag_ronglian_png";
				break;
		}
		if(!this._curView.parent) this.addChild(this._curView);
		this._curIndex = index;
	}

	public show(tabIndex:number = 0, isAutoRonglian:boolean = false):void
	{
		this._isAutoRonglian = isAutoRonglian;
		super.show(tabIndex);
		
		// this.changeFuncBtn(tabIndex);
	}

	// public changeFuncBtn(index:number):void
	// {
	// 	this._scrollH = BagPanel.BUTTON_OFFSET * index;
	// 	this.basePanel.scrollerList.itemList.selectedIndex = index;
	// 	this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
	// }
}