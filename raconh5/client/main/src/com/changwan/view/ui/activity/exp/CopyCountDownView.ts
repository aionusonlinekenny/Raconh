/**
 * 经验副本开始倒计时视图
 * luzhihong
 * create 2018.1.11
 */
class CopyCountDownView extends Sprite implements IViewManager
{
    private _label:eui.Image;
	private _numView:NumImgView2;
    private _endTime:number;

	public constructor()
	{
		super();

        this._label = new eui.Image("copy_exp_label_3_png");
        this.addChild(this._label);

		this._numView = Manager.pool.create(NumImgView2);
		this._numView.y = -12;
		this.addChild(this._numView);
	}

    public show(leftTime:number):void
    {
        this.reuse();
        this._endTime = leftTime + egret.getTimer()/1000;
        if(this.parent == null)
        {
            Manager.layer.tipsLayer.addChild(this);
            this.y = 320;
            this.onResizeHandler(null);
        }

		Manager.render.add(this.countDown, this, 1000);
		this.countDown();
    }

	private countDown():void
	{
        let left:number = Math.floor(this._endTime - egret.getTimer()/1000);
		if(left > 0)
		{
			this._numView.setValue(left, "nums_countdown_", -42);
            this._numView.x = 130 - this._numView.width/2;
		}
		else 
        {
            Manager.view.hide(ViewID.CopyCountDownView);
        }
	}

    public hide():void
    {
        this.dispose();
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - 415) / 2;
	}

    public dispose():void
    {
		Manager.render.remove(this.countDown, this);
        super.dispose();
        ObjectUtil.remove(this._label);
        ObjectUtil.dispose(this._numView);
        this._label = null;
        this._numView = null;
    }
}