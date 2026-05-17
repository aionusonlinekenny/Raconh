/**
 * pzx 
 * 二级界面
 * 17.12.26
 */
class PopUpView extends UIComponent{
	protected _popupView:BasePopUpView;
	public constructor()
    {
        super();
        this.visible = false;
        this.touchChildren = true;
    }
    protected configUI():void
    {
        super.configUI();
        this.onResizeHandler(null);
    }

    protected addEvent():void
    {
		 this._popupView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
         GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.addEvent();
    }

    protected removeEvent():void
    {
		 this._popupView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
         GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.removeEvent();
    }
	protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        
    }
    private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        if(!this.visible)
        this.visible = true;
	}



    public show(...args:any[]):void
    {
        Manager.layer.tipsLayer.addChild(this);
    }

    public hide():void
    {
        this.dispose();
    }


    public dispose():void
    {
        super.dispose();
		this._popupView.dispose()
		this._popupView = null;
        
    }
}