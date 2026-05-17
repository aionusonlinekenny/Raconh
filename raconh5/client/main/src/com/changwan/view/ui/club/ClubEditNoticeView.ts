/**
 * 宗门公告
 */
class ClubEditNoticeView extends UIComponent
{
	private _tipBaseView:BasePopUpView;
	private _input:TextInput;
	private _btn:Button;
	private _btnImg:eui.Image;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("club", "ClubEditNoticeViewSkin");
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();

		this._tipBaseView.titleImg.source = "club_notice_png";

		this._input.textDisplay.textColor = 0x7C6E62;
		this._input.textDisplay.height = 200;
		this._input.textDisplay.multiline = true;
		this._input.textDisplay.wordWrap = true;
		this._input.textDisplay.maxChars = 30;

		this._btnImg.touchEnabled = false;

		this.onResizeHandler(null);
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._tipBaseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._tipBaseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		super.removeEvent();
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.width = Manager.global.gameMain.stage.stageWidth;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._tipBaseView.closeBtn:
				Manager.view.hide(ViewID.ClubEditNoticeView);
				break;
			case this._btn:
				Manager.control.getClub().modifyAlter(this._input.text);
				Manager.view.hide(ViewID.ClubEditNoticeView);
				break;
		}
	}

	public show(desc:string):void
	{
		Manager.layer.tipsLayer.addChild(this);

		this._input.text = desc;
	}

	public hide():void
	{
		Manager.layer.tipsLayer.removeChild(this);
	}

	public dispose():void
	{
		super.dispose();

		ObjectUtil.removes(this._input, this._btn, this._btnImg);
		if(this._input)
			this._input.dispose();
		this._input = null;
		if(this._btn)
			this._btn.dispose();
		this._btn = null;
		this._btnImg = null;
		this._tipBaseView = null;
	}
}