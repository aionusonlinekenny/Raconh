/**
 * pzx 
 * 2017.11.27
 * 提示
 */
class TextTips extends UIComponent implements IViewManager
{
    private _back:eui.Image;
    private _title:Label;
    private _content:Label;
    private _btnClose:eui.Image;
    
	private _textContent:string;
    
    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("common", "TextTipsSkin");
    }

    public configUI():void
    {
        super.configUI();
    }

    /** 
	 * @param textContent 提示内容
    */
    public show(textContent:string):void
    {
        this._textContent = textContent;
        
        if(this.parent == null)
        {
            this.onResizeHandler(null);
            Manager.layer.tipsLayer.addChild(this);
        }
        this.invalidate(InvalidationType.DATA);
    }

    public hide():void
    {
        this.dispose();
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

    private drawData():void
    {
        HtmlUtil.setTextFlow(this._content, this._textContent);
        this._content.height = this._content.textHeight;
        this._back.height = this._content.height + 85;
    }

    protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.TextTips);
	}

	public dispose():void
	{
		super.dispose();
        ObjectUtil.removes(this._back, this._btnClose);
        ObjectUtil.disposes(this._title, this._content);
        this._back = null;
        this._title = null;
        this._content = null;
        this._btnClose = null;
	}
}