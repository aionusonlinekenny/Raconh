/**
 * 盟会战购买鼓舞BUFF界面
 * luzh 
 * 2018.1.29
 */
class ClubBFBuyBuffView extends UIComponent implements IViewManager
{
    private _icon:BitmapRemote;
    private _txt:Label;
    private _btnConfirm:Button;
    private _btnCancel:Button;
    private _btnClose:eui.Image;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("clubBF", "ClubBFBuyBuffSkin");
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

        this._icon.load(Manager.path.getClubBFPath("guwu.png"));

        this.onGoldUpdateHandler(null);
        this.onResizeHandler(null);
    }

    protected addEvent():void
    {
        super.addEvent();
        this._btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.onGoldUpdateHandler, this);
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        this._btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.onGoldUpdateHandler, this);
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.removeEvent();
    }

    private onGoldUpdateHandler(e:GameObjectAttrEvent):void
    {
        let color:string = ClubBFConfigCVO.club_buff_cost.isEnough() ? Color.GREEN_STR : Color.RED_STR;
        HtmlUtil.setTextFlow(this._txt, LangCVO.getContent("clubBF8", HtmlUtil.addColorTag(ClubBFConfigCVO.club_buff_cost.num+"", color)));//花费      {0}鼓舞，全盟成员攻击+10%
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
            case this._btnConfirm:
                if(Manager.model.getClubBF().clubBFHasBuy) break;
                if(!ClubBFConfigCVO.club_buff_cost.isEnough(true)) break;
                Manager.control.getClubBF().buyClubBuff();
                break;
        }
        Manager.view.hide(ViewID.ClubBFBuyBuffView);
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.disposes(this._icon, this._txt, this._btnConfirm, this._btnCancel);
        ObjectUtil.remove(this._btnClose);
        this._icon = null;
        this._txt = null;
        this._btnConfirm = null;
        this._btnCancel = null;
        this._btnClose = null;
    }
}