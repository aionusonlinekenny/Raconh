/**
 * 盟会战清除CD界面
 * luzh 
 * 2018.1.29
 */
class ClubBFClearCDView extends UIComponent implements IViewManager
{
    private _txt:Label;
    private _checkBox:CheckBox;
    private _btnConfirm:Button;
    private _btnCancel:Button;
    private _btnClose:eui.Image;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("clubBF", "ClubBFClearCDSkin");
        this.touchChildren = true;
    }

    public show():void
    {
        if(this.parent == null) Manager.layer.tipsLayer.addChildAt(this, 0);
    }

    public hide():void
    {
        this.dispose();
    }

    protected configUI():void
    {
        super.configUI();

        HtmlUtil.setTextFlow(this._txt, LangCVO.getContent("clubBF6", ClubBFConfigCVO.clear_cd_cost.num));//确定花费      {0}清除CD吗？

        this.onResizeHandler(null);
    }

    protected addEvent():void
    {
        super.addEvent();
        this._checkBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        this._checkBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.removeEvent();
    }

	private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round((Manager.config.gameWidth - this.width)>>1);
        this.y = 351;
	}

    private onTouchHandler(e:egret.TouchEvent):void
    {
        switch(e.currentTarget)
        {
            case this._checkBox:
                Manager.model.getClubBF().cdClearNotAlert = this._checkBox.selected;
                return;
            case this._btnConfirm:
                Manager.control.getClubBF().clearCD();
                break;
        }
        Manager.view.hide(ViewID.ClubBFClearCDView);
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.disposes(this._txt, this._checkBox, this._btnConfirm, this._btnCancel);
        ObjectUtil.remove(this._btnClose);
        this._txt = null;
        this._checkBox = null;
        this._btnConfirm = null;
        this._btnCancel = null;
        this._btnClose = null;
    }
}