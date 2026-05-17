/**
 * 银币副本面板
 * luzhihong
 * create 2017-11-22
 */
 class CopySilverPanel extends Panel
{
	private _index:number = -1;
	private _curView:UIComponent;

    public constructor()
    {
        super(false);
    }
    
	protected configUI():void
    {
		super.configUI();
        this.basePanel.setBottomBackTop(985);
		this.basePanel.title = "activity_title_3_png";
		let btnDatas = [
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "copy_silver_btn_png", imgClick: "copy_silver_btn_png"}
		];
		
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
		
		Manager.render.add(this.renderInvalid, this);
    }

	protected renderInvalid(interval:number):void
	{
		Manager.render.remove(this.renderInvalid, this);
		this.updateSilverCopy();
	}

	protected addEvent():void
	{
		super.addEvent();
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.updateSilverCopy, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.updateSilverCopy, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateItem, this);
	}

	protected removeEvent():void
	{
		super.removeEvent();
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.updateSilverCopy, this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.updateSilverCopy, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateItem, this);
	}

	private updateItem(e:ItemsEvent):void
	{
		this.updateSilverCopy();
	}
	
    private updateSilverCopy(e:egret.Event = null):void
    {
		let btn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(0) as BaseFuncBtn;
        if(btn) 
		{
        	let cvo:CopyCVO = CopyCVO.getCVO(CopyConst.ID_SILVER);
			btn.setIconShow(OpenCVO.isOpen(OpenConst.ID_JINYUTANG) && Manager.model.getCopy().expModel.leftCount > 0 && cvo.isLossEnough() && cvo.isAllCondSatisfy());
		}
    }

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.CopySilverPanel);
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
		// 		isBack = !OpenCVO.isOpen(OpenConst.ID_JINYUTANG, true);
		// 		break;
		// }
		// if(isBack)
		// {
		// 	if(this._index == undefined || this._index < 0) this._index = 0;
		// 	this.basePanel.scrollerList.itemList.selectedIndex = this._index;
		// 	return;
		// }

		this._index = index;
		if(this._curView != null)
		{
			this._curView.dispose();
		}
		switch(index)
		{
			case 0:
				this._curView = new CopySilverView();
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
	}
}