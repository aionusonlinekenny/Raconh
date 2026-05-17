/**
 * 一键删除确认界面
 * liangyan
 * create 2018-03-06
*/
class FriendsConfirmView extends UIComponent
{
    private _popView:BasePopUpView;
    private _txt:Label;
    private _confirmBtn:Button;
    private _cancelBtn:Button;

    private _ids:number[];

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("friends/blackList", "FriendsConfirmViewSkin");
    }

    protected configUI():void
    {
        super.configUI();

        this._popView.titleImg.source = "friends_btn_all_delete_png";
        this._txt.text = LangCVO.getContent("friends1");//是否确定一键删除所有黑名单？

        this.onResizeHandler(null);
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._popView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    protected removeEvent():void
    {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._popView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        super.removeEvent();
    }

    private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._popView.closeBtn:
			case this._cancelBtn:
				Manager.view.hide(ViewID.FriendsConfirmView);
				break;
			case this._confirmBtn:
                if(this._ids.length > 0) Manager.control.getFriends().batchOperate(0, FriendsType.BLACK, this._ids);
				Manager.view.hide(ViewID.FriendsConfirmView);
				break;
		}
	}

    public show(ids:number[]):void
	{
        this._ids = ids;
        if(!this.parent) Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
        if(this.parent) this.dispose();
	}

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._popView, this._txt, this._cancelBtn, this._confirmBtn);
        this._popView.dispose();
        this._popView = null;
        this._txt.dispose();
        this._txt = null;
        this._cancelBtn.dispose();
        this._cancelBtn = null;
        this._confirmBtn.dispose();
        this._confirmBtn = null;
        this._ids = null;
    }
}