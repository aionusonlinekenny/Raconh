/**
 * 缥缈录警告提示
 */
class MaterialWarningView extends RenderSprite
{
    private _img:BitmapRemote;

    public constructor()
    {
        super();
        this.start();
        this.addEvent();
    }

    protected start():void
	{
		super.start();

        this.width = 455;
        this.height = 62;

        this._img = Manager.pool.create(BitmapRemote);
        this.addChild(this._img);
        this._img.load(PathInfo.getPath("res/material/material_warning.png", LoaderType.IMAGE));

        this.onResizeHandler();
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

    private onResizeHandler(e?:GlobalEvent):void
	{
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
        this.y = Manager.config.gameHeight - 350;
	}

    public show(time:number):void
    {
        if(time == 0)
            Manager.view.hide(ViewID.MaterialWarningView);
        else
        {
            if(!this.parent)
                Manager.layer.tipsLayer.addChild(this);
            Manager.render.add(this.onTimeoutHandler, this, time, 0, null, true);
        }
    }

    private onTimeoutHandler():void
    {
        Manager.render.remove(this.onTimeoutHandler, this);
        Manager.view.hide(ViewID.MaterialWarningView);
    }

    public hide():void
    {
        this.disposeSelf();
    }

    public disposeSelf():void
    {
        if(Manager.render.contains(this.onTimeoutHandler, this))
            Manager.render.remove(this.onTimeoutHandler, this);
        super.disposeSelf();
        ObjectUtil.remove(this._img);
        if(this._img)
            Manager.pool.push(this._img);
        this._img = null;
    }
}