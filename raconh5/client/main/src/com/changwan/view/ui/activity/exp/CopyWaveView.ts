/**
 * 第几波视图
 * luzhihong
 * create 2018.1.11
 */
class CopyWaveView extends Sprite implements IViewManager
{
    private _label:eui.Image;
	private _numView:NumImgView2;

	public constructor()
	{
		super();

        this._label = new eui.Image("copy_exp_label_wave_png");
        this.addChild(this._label);

		this._numView = Manager.pool.create(NumImgView2);
		this._numView.y = -12;
		this.addChild(this._numView);
	}

    public show(wave:number):void
    {
        this.reuse();

        this._numView.setValue(wave, "nums_countdown_", 28);
        this._numView.x = 52 - this._numView.width/2;
        if(this.parent == null)
        {
            Manager.layer.tipsLayer.addChild(this);
            this.y = 520;
            this.onResizeHandler(null);
        }

        egret.Tween.get(this).to({alpha: 1}, 500)
                             .wait(1000)
                             .to({alpha: 0}, 500)
                             .call(this.hideView, this);
    }

    private hideView():void
    {
        Manager.view.hide(ViewID.CopyWaveView);
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
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - 162) / 2;
	}

	public reuse(...args:any[]):void
	{
		super.reuse();
        this.alpha = 0;
        egret.Tween.removeTweens(this);
	}

    public dispose():void
    {
        egret.Tween.removeTweens(this);
        super.dispose();
        ObjectUtil.remove(this._label);
        ObjectUtil.dispose(this._numView);
        this._label = null;
        this._numView = null;
    }
}