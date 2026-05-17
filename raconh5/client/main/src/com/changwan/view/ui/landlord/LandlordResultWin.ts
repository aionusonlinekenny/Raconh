/**
 * 斗地主胜利界面
 */
class LandlordResultWin extends UIComponent
{
	private _base:ResultWinBack;
	private _content:Label;

	private _endTime:number;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("landlord", "LandlordResultWinSkin");
	}

	protected configUI():void
	{
		super.configUI();

		HtmlUtil.setTextFlow(this._content, Manager.model.getLaird().resultContent);

		Manager.render.add(this.countDown, this, 1000);
		this.countDown();

		this.onResizeHandler(null);
	}

	private countDown():void
	{
		let left:number = this.leftTime;
		if(left == 0)
		{
			this.onClickHandler(null);
			return;
		}
		this._base.setTxt(LangCVO.getContent("activity2", left));
	}

	private get leftTime():number
	{
		let left:number = Math.floor((this._endTime - egret.getTimer())/1000);
		return left > 0 ? left : 0;
	}

	protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._base.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._base.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._base.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._base.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
		this.y = Math.round(Manager.global.gameMain.stage.stageHeight - this.height) / 2;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		Manager.render.remove(this.countDown, this);
		Manager.control.getLaird().lairdQuit();
		Manager.view.hide(ViewID.LandlordResultWin);
		Manager.model.getArena().exitArenaHandler();
		Manager.control.getLaird().lairdGuildInfo();
		Manager.control.getLaird().lairdCatch();
	}

	public show(countDownTime:number = 3):void
	{
		Manager.layer.tipsLayer.addChild(this);

		this._endTime = egret.getTimer() + countDownTime * 1000;
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose():void
	{
		Manager.render.remove(this.countDown, this);
		super.dispose();
		if(this._content)
			this._content.dispose();
		this._content = null;
		if(this._base)
			this._base.dispose();
		this._base = null;
	}
}