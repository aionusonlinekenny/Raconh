/**
 *author Anydo
 *create 2018-1-8
 *description 
*/
class ArenaJumpBtnView extends UIComponent
{
    private _btn:eui.Image;

    public constructor()
    {
		super();
		this.skinName = Manager.path.getSkinName("arena", "ArenaJumpBtnViewSkin");
		this.touchChildren = true;
	}

    protected addEvent():void
    {
        super.addEvent();
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }
    
    protected removeEvent():void
    {
        super.removeEvent();
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = 0;//Manager.global.gameMain.stage.stageWidth - this.width;
        this.y = 987;
	}
    
    private onClickHandler(e:egret.TouchEvent):void
    {
        if(!Manager.model.getArena().isPlaying) return;
		Manager.model.getArena().showResultToolView();
    }
    
    public show(...args:any[]):void
	{
        this.onResizeHandler(null);
		Manager.layer.tipsLayer.addChild(this);
	}
    
    public hide():void
	{
        ObjectUtil.remove(this);
		this.dispose();
	}

    public dispose()
	{
		super.dispose();
		if(this._loadComplete)
		{
			this._btn=null;
		}
	}
}