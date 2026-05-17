class UILayer extends Sprite
{
    public constructor()
    {
        super();

        this.width = 720;
        this.height = 1280;
        this.touchChildren = true;
        
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

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
	}
}