/**
 * 魔神降临panel
 * liangyan
 * create 2018-04-10
*/
class DevilPanel extends Panel
{
    private _view:UIComponent;
    private _menuBtnContent:Array<any>;
	private _bitimg:BitmapRemote;

    public constructor()
    {
        super(false);
    }

    protected configUI():void
    {
        super.configUI();
        // this.basePanel.backBtn.selected = false;
        this._menuBtnContent = [];
		this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "devil_btn_png", imgClick: "devil_btn_png" });
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
        (<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
        this.basePanel.setBottomBackTop(980);
    }

    protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		super.onFuncBtnChangeHandler(e);

		if(this._view)
		{
			this._view.dispose();
			this._view = null;
            if(this._bitimg) Manager.pool.push(this._bitimg);
            this._bitimg = null;
		}
		switch(index)
		{
			case 0:
                Manager.control.getDevil().askInfo();
                this.basePanel.title = "devil_title_png";
                // this.basePanel.backImg.source = "";
				this.basePanel.backImg.visible = false;
                this.basePanel.setBottomBackTop(980);
				this._view = Manager.pool.create(DevilView);
				if(this._bitimg == null)
				{
                    let path = Manager.path.getDevilPath("back", Extension.JPG);
					this._bitimg = Manager.pool.create(BitmapRemote, path);
                    this._bitimg.x = 6;
                    this._bitimg.y = 110;
					this.basePanel.addChildAt(this._bitimg, 0);
				}
				break;

		}
		if(this._view && !this._view.parent) this.addChild(this._view);
	}

	public get curView():UIComponent
	{
		return this._view;
	}

    protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.DevilPanel);
				break;
		}
	}

    public dispose():void
    {
        super.dispose();
        ObjectUtil.remove(this._view);
        if(this._view) this._view.dispose();
        this._view = null;

        this._menuBtnContent.length = 0;
		if(this._bitimg)
		{
			Manager.pool.push(this._bitimg)
			this._bitimg = null;
		}
    }
}