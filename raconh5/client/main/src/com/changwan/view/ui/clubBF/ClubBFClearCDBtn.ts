/**
 * 盟会战清除CD界面
 * luzh 
 * 2018.1.29
 */
class ClubBFClearCDBtn extends UIComponent implements IViewManager
{
    private _label:eui.Image;
	private _cdView:NumImgView2;
    private _model:ClubBFModel;

    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("clubBF", "ClubBFClearCDBtnSkin");
        this.touchEnabled = true;
    }

    public show():void
    {
        if(this.parent == null) Manager.layer.uiLayer.addChild(this);
    }

    public hide():void
    {
        this.dispose();
    }

    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getClubBF();
        
        this._cdView = Manager.pool.create(NumImgView2);
        this._cdView.x = 172;
        this._cdView.y = 1;
        this._cdView.scaleX = this._cdView.scaleY = 1.2;
        this._label.parent.addChild(this._cdView);

        this.onResizeHandler(null);
        
		Manager.render.add(this.countDown, this, 1000);
		this.countDown();
    }

    protected addEvent():void
    {
        super.addEvent();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		// GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected removeEvent():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		// GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        super.removeEvent();
    }

	private onResizeHandler(e:GlobalEvent):void
	{
        // this.x = Math.round((Manager.config.gameWidth - this.width)>>1);
        this.x = 158;
        this.y = 150;
	}

    private onClickHandler(e:egret.TouchEvent)
    {
        if(this._model.cdClearNotAlert) Manager.control.getClubBF().clearCD();
        else Manager.view.show(ViewID.ClubBFClearCDView);
    }

	private countDown():void
	{
        let left:number = this._model.cd;
		if(left <= 0)
		{
			Manager.view.hide(ViewID.ClubBFClearCDBtn);
            Manager.view.hide(ViewID.ClubBFClearCDView);
			return;
		}
        this._cdView.setValue(left, "nums_count_", 0);
        this._label.x = this._cdView.x + this._cdView.width * 1.2 + 30;
	}

    public dispose():void
    {
		Manager.render.remove(this.countDown, this);
        super.dispose();
        ObjectUtil.dispose(this._cdView);
        ObjectUtil.remove(this._label);
        this._cdView = null;
        this._label = null;
        Manager.view.hide(ViewID.ClubBFClearCDView);
        Manager.model.getClubBF().cdEndTime = 0;
    }
}