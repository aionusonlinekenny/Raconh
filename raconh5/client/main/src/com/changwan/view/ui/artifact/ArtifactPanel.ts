/**
 * 寻宝
 * pzx 
 * create 18.2.7
 */
class ArtifactPanel extends Panel
{
	private _view:UIComponent;
	private _bitimg:BitmapRemote;

    public constructor()
    {
        super(false);
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
                this.basePanel.downFrameImg.visible  = false;
				this.basePanel.backBtn.visible = false;
				this.basePanel.scrollerList.visible = false;
				this.basePanel.title = "artifact_lingyange_png";
				this.basePanel.setBottomBackTop(1170);
				this._view = Manager.pool.create(ArtifactView);
				if(this._bitimg == null)
				{
					this._bitimg = Manager.pool.create(BitmapRemote);
					this._bitimg.x = 0;
					this._bitimg.y = 113;
					this.basePanel.addChildAt(this._bitimg,3);
					this._bitimg.load(Manager.path.getArtifact("artifact_di.jpg"));
				}
				this._bitimg.visible = true;
				if(Manager.view.isOpening(ViewID.RollTips)) Manager.view.hide(ViewID.RollTips);
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
				Manager.view.hide(ViewID.ArtifactPanel);
				break;
		}
	}

    public dispose():void
    {
        super.dispose();
        ObjectUtil.remove(this._view);
        if(this._view) this._view.dispose();
        this._view = null;

		if(this._bitimg)
		{
			Manager.pool.push(this._bitimg)
			this._bitimg = null;
		}
    }
}