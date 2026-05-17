/**
 * 盟主战
 * Simon
 * 2018.2.2
 */
class ClubLeaderWarPanel extends Panel
{
	private _clubLeaderWarView:ClubLeaderWarView;

    /** 当前功能界面 */
	private curView:any;
    private _curFuncIndex:number;

	public constructor()
	{
		super(false);
	}

    protected configUI():void
    {
        super.configUI();

        this.basePanel.title = "clubLeaderWar_title_png";

		let menuBtnContent:Array<any> = [
			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "clubLeaderWar_funcBtn1_png", imgClick: "clubLeaderWar_funcBtn1_png" }
		];
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, menuBtnContent);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
    }

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				// Manager.view.hide(ViewID.ClubLeaderWarPanel);
				break;
		}
	}

    protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		if(this.curView && this.curView.parent)
			this.curView.parent.removeChild(this.curView);
		this._curFuncIndex = this.basePanel.scrollerList.itemList.selectedIndex;
		switch(this._curFuncIndex)
		{
			case 0:
				this._clubLeaderWarView = Manager.pool.create(ClubLeaderWarView);
				if(!this._clubLeaderWarView.parent)
					this.addChild(this._clubLeaderWarView);
				this.curView = this._clubLeaderWarView;
				break;
        }
    }

	public dispose():void
	{
        super.dispose();
        
		if(this._clubLeaderWarView)
            this._clubLeaderWarView.dispose();
		this._clubLeaderWarView = null;
	}
}