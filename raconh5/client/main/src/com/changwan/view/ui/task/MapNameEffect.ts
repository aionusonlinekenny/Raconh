/**
 * 地图名字特效
 * liangyan
 * create 2018-03-06
*/
class MapNameEffect extends UIComponent implements IViewManager
{
    public _back:eui.Image;
    private _miss:Animation;

    private _mask:egret.Rectangle;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("task", "MapNameEffectSkin");
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
        this.onResizeHandler(null);
    }

    protected drawAll():void
    {
        super.drawAll();
        this.drawLayout();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.LAYOUT)) this.drawLayout();
    }

    private drawLayout():void
    {
        Manager.render.add(this.render, this);
    }

    private hidePnl():void
    {
        Manager.render.remove(this.hidePnl, this);
        Manager.view.hide(ViewID.MapNameEffect);
    }

    private onResizeHandler(e:GlobalEvent):void
    {
        this.x = Manager.global.gameMain.stage.stageWidth * 0.7;
        this.y = Manager.global.gameMain.stage.stageHeight * 0.3;
    }

    protected render(interval:number):void
	{
		if(this._mask.y >= this._miss.y + 200)
        {
            Manager.render.remove(this.render, this);
            this._miss.gotoAndPlay(2);
            Manager.render.add(this.hidePnl, this, 2100, 1, null, true);
            return;
        }

        this._mask.y += 1;
	}

    public show():void
    {
        if(!this.parent) Manager.layer.tipsLayer.addChild(this);

        this._miss = Manager.animation.createEffectAnimation("longmen", 0, true, true);
        this._miss.x = -80;
        this._miss.y = -22;
        this._miss.gotoAndStop(1);
        this.addChild(this._miss);

        // this._mask = Manager.pool.create(egret.Shape);
        // this._mask.graphics.beginFill(0, 1);
        this._mask = new egret.Rectangle(this._miss.x + 130, this._miss.y - 100, 60, 200);
        // this._mask.graphics.endFill();
        // this.addChild(this._mask);
        this._miss.mask = this._mask;
    }

    public hide():void
    {
        Manager.model.getTask().parseStep(RookieConst.FIRST_ID);
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
        if(Manager.render.contains(this.hidePnl, this)) Manager.render.remove(this.hidePnl, this);
        if(Manager.render.contains(this.render, this)) Manager.render.remove(this.render, this);
        super.dispose();
        ObjectUtil.removes(this._back, this._miss);
        if(this._back) this._back.bitmapData = null;
        this._back = null;
        if(this._miss) Manager.pool.push(this._miss);
        this._miss = null;
        // if(this._mask) Manager.pool.push(this._mask);
        this._mask = null;
    }
}