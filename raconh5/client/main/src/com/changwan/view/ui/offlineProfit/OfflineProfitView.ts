/**
 *author Anydo
 *create 2017-12-20
 *description 
*/
class OfflineProfitView extends UIComponent
{
	private _popupView:BasePopUpView;
	private _btnOk:Button;
	private _groupPic:eui.Group;
	private _groupBack:eui.Group;
	private _txt1:Label;
	private _txt2:Label;
	private _txt3:Label;
	private _txt4:Label;
	private _txt5:Label;
	private _txt6:Label;
	private _txt7:Label;
	private _txt8:Label;
	private _txt9:Label;
	private _txt10:Label;
	private _txt11:Label;

	public constructor()
    {
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("offlineProfit", "OfflineProfitViewSkin");
	}

	protected configUI():void
	{
		super.configUI();
		this._popupView.bgHeight = 555;
		this._groupBack.alpha = 0.4;
		this._groupPic.touchEnabled = this._groupPic.touchChildren = false;
		this._groupBack.touchEnabled = this._groupBack.touchChildren = false;
	}

	protected addEvent():void
	{
		super.addEvent();
		this._btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
		this._popupView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
	}

	protected removeEvent():void
	{
		this._btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
		this._popupView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		super.removeEvent();
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onCloseHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.OfflineProfitView);
	}

	public show(...args:any[]):void
	{
		if(this.parent == null)
		{
			this.onResizeHandler(null);
			Manager.layer.tipsLayer.addChild(this);
		}
		let time:number = args[0];
        let exp:number = args[1];
        let coin:number = args[2];
        let zbCount:number = args[3];
        let rlCount:number = args[4];
        let qhsCount:number = args[5];

		this._txt1.text = LangCVO.getContent("offlineProfit1", Math.floor(time / 60), Math.floor(time % 60));
		this._txt2.text = LangCVO.getContent("offlineProfit2", Math.floor(time / 60), Math.floor(time % 60));
		if(exp >= 100000000) this._txt3.text = ((exp / 100000000).toFixed(2) + LangCVO.getContent("offlineProfit3"));
		else if(exp >= 10000) this._txt3.text = ((exp / 10000).toFixed(2) + LangCVO.getContent("offlineProfit4"));
		else this._txt3.text = String(exp);
		let color1:number = Manager.model.getSysPrivilege().getdata2(SysprivilegeType.GOLD_CARD).isActive ? Color.PURPLE : Color.GRAY;
		let color2:number = Manager.model.getSysPrivilege().getdata2(SysprivilegeType.DIAMOND_CARD).isActive ? Color.ORANGE : Color.GRAY;
		this._txt4.textColor = color1;
		this._txt4.text = LangCVO.getContent("offlineProfit5");
		this._txt5.textColor = color2;
		this._txt5.text = LangCVO.getContent("offlineProfit6");
		if(coin >= 100000000) this._txt6.text = ((coin / 100000000).toFixed(2) + LangCVO.getContent("offlineProfit3"));
		else if(coin >= 10000) this._txt6.text = ((coin / 10000).toFixed(2) + LangCVO.getContent("offlineProfit4"));
		else this._txt6.text = String(coin);
		this._txt7.textColor = color1;
		this._txt7.text = LangCVO.getContent("offlineProfit5");
		this._txt8.textColor = color2;
		this._txt8.text = LangCVO.getContent("offlineProfit6");
		this._txt9.text = LangCVO.getContent("offlineProfit7") + zbCount;
		this._txt10.text = LangCVO.getContent("offlineProfit8") + rlCount;
		this._txt11.text = LangCVO.getContent("offlineProfit9") + qhsCount;
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose()
	{
		super.dispose();
		if(this._loadComplete)
		{
			this._popupView.dispose();
			this._popupView = null;
			this._btnOk.dispose();
			this._btnOk = null;
			for(let i:number = 1; i <= 11; i++)
			{
				this["_txt"+i].dispose();
				this["_txt"+i] = null;
			}
		}
	}
}