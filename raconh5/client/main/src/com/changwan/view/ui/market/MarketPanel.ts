/**
 * pzx 
 * 市场
 * 2018.4.10
 */
class MarketPanel extends Panel{
	private _view:UIComponent;
	private _bit:BitmapRemote;
	public constructor()
    {
        super(false);
    }
    protected configUI():void
    {
        super.configUI();
		let btnDatas = [
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "market_tanweitb_png", imgClick: "market_tanweitb_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "market_shangjiatb_png", imgClick: "market_shangjiatb_png"}
		];
		
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = -2;
		this.basePanel.setBottomBackTop(1280);
    }

    protected addEvent():void
    {
        super.addEvent();
    }

    protected removeEvent():void
    {
        super.removeEvent();
    }
	protected initData():void
    {
        super.initData();
    }
	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		if(this._view)
		{
			this._view.dispose();
			this._view = null;
		}
		if(this._bit)
		{
			Manager.pool.push(this._bit);
			this._bit=null;
		}
		switch(index)
		{
			case 0:
				this._view = new MarketView();
				this._bit = Manager.pool.create(BitmapRemote);
				this._bit.y = 116;
				this._bit.x = 5;
				this._bit.load(Manager.path.getPanelUiImgPath("market/market_di2","jpg"))
				break;
			case 1:
				this._view = new MarketSaleView();
				this._bit = Manager.pool.create(BitmapRemote);
				this._bit.y = 116;
				this._bit.x = 0;
				this._bit.load(Manager.path.getPanelUiImgPath("market/market_di","jpg"))
				break;
		}
        this.basePanel.title = "market_titel_"+index+"_png";
		if(this._view && !this._view.parent) this.addChild(this._view);
		this.basePanel.addChildAt(this._bit,3);
	}

    protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.MarketPanel);
				break;
		}
	}
	public dispose():void
    {
        super.dispose();
        ObjectUtil.remove(this._view);
        if(this._view) this._view.dispose();
        this._view = null;
    }
}