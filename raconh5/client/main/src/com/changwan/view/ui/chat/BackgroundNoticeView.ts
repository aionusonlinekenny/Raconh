/**
 * 后台公告视图
 * liangyan
 * create 2017-11-14
*/
class BackgroundNoticeView extends UIComponent implements IViewManager
{
    private _txt:Label;
    private _closeBtn:Button;

    private _content:string;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("chat","BackgroundNoticeSkin");
        this.touchChildren = true;
    }
    
    protected addEvent():void
    {
        super.addEvent();
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }

    protected removeEvent():void
    {
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        super.removeEvent();
    }

    protected drawAll():void
	{
		super.drawAll();
        this.drawData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    private drawData():void
    {
        this._txt.text = this._content;
    }

    private onTouchHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.BackgroundNoticeView);
    }

    public show(content:string):void
    {
        this._content = content;
        if(!this.parent) Manager.layer.uiLayer.addChild(this);
    }

    public hide():void
    {
       if(this.parent) this.dispose();
    }

    public dispose():void
    {
        super.dispose();
        this._txt.dispose();
        this._closeBtn.dispose();
        this._txt = null;
        this._closeBtn = null;
    }
}