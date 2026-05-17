/**
 * 爬塔面板
 * luzhihong
 * create 2017-11-22
 */
 class TowerCopyPanel extends Panel
{
	private _index:number = -1;
	private _curView:UIComponent;
	private _bg:BitmapRemote;

    public constructor()
    {
        super(false);
    }
    
	protected configUI():void
    {
		super.configUI();
		this.basePanel.setBottomBackTop(985);
		this.basePanel.title = "activity_title_1_png";
		let btnDatas = [
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "activity_copy_tower_btn_png", imgClick: "activity_copy_tower_btn_png"},
		];
		
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
		
		Manager.render.add(this.renderInvalid, this);
    }

	protected renderInvalid(interval:number):void
	{
		Manager.render.remove(this.renderInvalid, this);
		this.updateTower();
	}

	protected addEvent():void
	{
		super.addEvent();
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
	}

	protected removeEvent():void
	{
		super.removeEvent();
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
	}
		
    private updateTower(e:GameObjectAttrEvent = null):void
    {
		let btn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(0) as BaseFuncBtn;
        if(btn) 
		{
			let model = Manager.model.getCopy().towerModel;
			btn.setIconShow(OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA) && (model.canSaodang || model.canChallenge()));
		}
    }

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.TowerCopyPanel);
				break;
		}
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1 || index == this._index) return;

		// let isBack:boolean = false;
		// switch(index)
		// {
		// 	case 0:
		// 		isBack = !OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA, true);
		// 		break;
		// }
		// if(isBack)
		// {
		// 	if(this._index == undefined || this._index < 0) this._index = 0;
		// 	this.basePanel.scrollerList.itemList.selectedIndex = this._index;
		// 	return;
		// }

		this._index = index;
		// if(this._curView != null)
		// {
		// 	this._curView.dispose();
		// 	this.basePanel.backImg.source = "common_panelBg_png";
		// }
		switch(index)
		{
			case 0:
				this._curView = new TowerCopyView();
				this.basePanel.backImg.source = "";
				if(this._bg == null) this._bg = Manager.pool.create(BitmapRemote);
				this._bg.y = 118;
				this._bg.load(Manager.path.getActivityPath("activity_copy_tower_bg.jpg"));
				this.basePanel.addChildAt(this._bg, this.basePanel.getChildIndex(this.basePanel.backImg) - 1);
				// this.basePanel.setBottomBackTop(985);
				break;
		}
		this.basePanel.addChildAt(this._curView, 2);
        // this.basePanel.title = "activity_title_" + this._index + "_png";
	}

	public dispose():void
	{
		Manager.render.remove(this.renderInvalid, this);
		super.dispose();
		if(this.basePanel != null)
		{
			this.basePanel.dispose();
			this.basePanel = null;
		}
		if(this._curView != null)
		{
			this._curView.dispose();
			this._curView = null;
		}
		if(this._bg) Manager.pool.push(this._bg);
		this._bg = null;
	}
}