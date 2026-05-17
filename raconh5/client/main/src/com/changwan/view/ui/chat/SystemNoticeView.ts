/**
 * 系统公告
 * liangyan
 * create 2017-11-14
*/
class SystemNoticeView extends UIComponent
{
    private static _instance:SystemNoticeView;
    public static get instance():SystemNoticeView
    {
        if(this._instance == null) this._instance = new SystemNoticeView();
        return this._instance;
    }
    public static nullInstance():void {this._instance = null;}

    private _txt:Label;
    private _content:string;

    private readonly TXT_X:number = 456;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("chat", "SystemNoticeSkin");
    }

    protected configUI():void
    {
        super.configUI();
        this.mask = new egret.Rectangle(43,0,413,44)
        this.onResizeHandler(null);
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
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
        egret.Tween.removeTweens(this._txt);
        HtmlUtil.setTextFlow(this._txt, this._content);
        this._txt.x = 456;

        let duration:number = this._txt.width * 25;
        egret.Tween.get(this._txt).to({x:43 - this._txt.width}, duration).wait(200).call(this.hide, this);
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        this.y = 300;
    }

    public show(content:string):void
    {
        if(this.parent == null)
        {
            Manager.layer.tipsLayer.addChild(this);
        }
        this._content = content;
        this.invalidate(InvalidationType.DATA);
    }

    public hide():void
    {
        if(this.parent != null) this.dispose();
    }

    public dispose():void
    {
        SystemNoticeView.nullInstance();
        egret.Tween.removeTweens(this._txt);
        super.dispose();
        this._txt.dispose();
        this._txt = null;
        this.mask = null;
    }
}