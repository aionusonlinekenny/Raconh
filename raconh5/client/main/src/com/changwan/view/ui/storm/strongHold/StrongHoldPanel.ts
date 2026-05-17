/**
 * 人物
 */
class StrongHoldPanel extends Panel
{
	private _view:StrongHoldView;

	public constructor()
	{
		super(false);
	}

	protected configUI():void
	{
		super.configUI();

		this.basePanel.title = "storm_field_title_png";
		
		let menuBtnContent:Array<any> = [
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "storm_field_btn_1_png", imgClick: "storm_field_btn_1_png" },
			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "storm_field_btn_2_png", imgClick: "storm_field_btn_2_png" },
			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "storm_field_btn_3_png", imgClick: "storm_field_btn_3_png" },
			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "storm_field_btn_4_png", imgClick: "storm_field_btn_4_png" }
		];
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, menuBtnContent);

        this._view = ObjectUtil.createObj(StrongHoldView)
        this.basePanel.addChildAt(this._view, 2);
	}

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.StrongHoldPanel);
				break;
		}
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		var index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;

		super.onFuncBtnChangeHandler(e);

        this._view.fieldID = index + 1;
	}

	public dispose():void
	{
		super.dispose();

		if(this._view)
			this._view.dispose();
		this._view = null;
	}
}