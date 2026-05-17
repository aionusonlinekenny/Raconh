/**
 * 采集特效
 * liangyan
 * create 2018-03-16
*/
class CollectEffect extends UIComponent implements IViewManager
{
    private _ani:Animation;
    private _complete:Function;
    private _completeTarget:any;

    public constructor()
    {
        super();
        this.skinName = "";
    }

    protected configUI():void
    {
        super.configUI();
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

    protected initData():void
    {
        super.initData();
        this.onResizeHandler(null);
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth * 0.5) - 125;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight * 0.6);
    }

    public show(id:string = "caiji", complete:Function = null, completeTarget:any):void
    {
        if(!this.parent)
        {
            this._ani = Manager.animation.createEffectAnimation(id,ResPriorityType.LOAD_LEVEL3,true,false);
            this._ani.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.aniPlayComplete, this);
            this.addChild(this._ani);
            this._complete = complete;
            this._completeTarget = completeTarget;
            Manager.layer.uiImageLayer.addChild(this);
        }
    }

    private aniPlayComplete():void
    {
        if(this._complete) this._complete.call(this._completeTarget);
        Manager.view.hide(ViewID.CollectEffect);
    }

    private poolPushAni():void
    {
        if(this._ani == null) return;
        Manager.pool.push(this._ani);
        this._ani.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.aniPlayComplete, this);
        this._ani = null;
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
        super.dispose();
        this.poolPushAni();
        this._complete = null;
        this._completeTarget = null;
    }
}