/**
 * pzx 
 * 17.12.18
 * 预告
 */
class SysNoticePanel extends Panel
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
		let btnDatas = [
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "sysNotice_yugaotu_png", imgClick: "sysNotice_yugaotu_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "sysNotice_btn_1_png", imgClick: "sysNotice_btn_1_png"}
		];
		
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
    }

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.SysNoticePanel);
				break;
		}
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1 || index == this._index) return;
		this._index = index;

		if(index == 1 && !OpenCVO.isOpen(OpenConst.ID_PLOT_COPY, true))
		{
			this.basePanel.scrollerList.itemList.selectedIndex = 0;
			this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
			return;
		}

		if(this._curView != null)
		{
			this._curView.dispose();
			this.basePanel.backImg.source = "common_panelBg_png";
		}
		switch(index)
		{
			case 0:
				this._curView = new SysNoticeView()
				// this.basePanel.setBottomBackTop(1280);
				break;
			case 1:
				this._curView = new MainCopyView()
				// this.basePanel.setBottomBackTop(985);
				break;
		}
		this.basePanel.addChildAt(this._curView, 2);
        this.basePanel.title = "sysNotice_title_" + this._index + "_png";
	}

	public dispose():void
	{
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