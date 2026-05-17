/**
 * boss复活界面
 * luzh
 * create 2017-12.25
*/
class BossReviveView extends UIComponent implements IViewManager
{
    private _name:Label;
    private _head:BitmapRemote;
    private _btn:Button;
    private _closeBtn:Button;
    private _cvo:BossCVO;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("boss", "BossReviveViewSkin");
        this.touchChildren = true;
    }

    public show(id:number):void
    {
        this._cvo = BossCVO.getCVO(id);
        if(this.parent == null)
        {
            this.onResizeHandler(null);
            Manager.layer.uiLayer.addChild(this);
        }
        this.invalidate(InvalidationType.DATA);
    }

    public hide():void
    {
        this.dispose();
    }

    protected configUI():void
    {
        super.configUI();
        this._name.text = this._cvo.boss.name + " Lv." + this._cvo.boss.level;
    }

    protected addEvent():void
    {
        super.addEvent();
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.removeEvent();
    }

	private onResizeHandler(e:GlobalEvent):void
	{
		this.width = Manager.global.gameMain.stage.stageWidth;
	}

    private onTouchHandler(e:egret.TouchEvent):void
    {
        switch(e.currentTarget)
        {
            case this._btn:
                Manager.view.show(ViewID.BossPanel, 1);
                break;
        }
        Manager.view.hide(ViewID.BossReviveView);
    }

    private enterBoss(id:number):void
    {
        Manager.control.getBoss().enter(id);
    }

    private drawData():void
    {
        this._name.text = this._cvo.boss.name + " Lv." + this._cvo.boss.level;
        this._head.load(Manager.path.getBossHeadPath(this._cvo.boss.url));
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.disposes(this._name, this._head, this._btn, this._closeBtn);
        this._name = null;
        this._head = null;
        this._btn = null;
        this._closeBtn = null;
        this._cvo = null;
    }
}