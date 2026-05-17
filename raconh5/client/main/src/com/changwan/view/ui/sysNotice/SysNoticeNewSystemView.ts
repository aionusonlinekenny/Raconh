/**
 * pzx 
 * 17.12.19
 * 获取功能--面板
 */
class SysNoticeNewSystemView extends egret.DisplayObjectContainer implements IViewManager
{
    private _backImg:BitmapRes;
    private _skillIcon:BitmapRemote;

	private _pointId:number;

	public constructor()
    {
		super();
        this.initView();
        this.addEvent();
	}

    private initView():void
    {
        this._backImg = BitmapRes.create("sysNotice_gongnengkaiqi_png", 50, 468);
        this.addChild(this._backImg);
        this._skillIcon = Manager.pool.create(BitmapRemote, null, 85, 80);
        this._skillIcon.x = 315;
        this._skillIcon.y = 498;
        this.addChild(this._skillIcon);

        this.touchEnabled = true;
    }

    private addEvent():void
    {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }

    private removeEvent():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    }

    protected onTouchHandler(e:egret.TouchEvent):void
    {
        this.onHideEff();
    }

	protected onHideEff():void
    {
        Manager.render.remove(this.onHideEff, this);
        this._backImg.visible  = false;
        // let target = Manager.model.getLogin().homeView.getBtnPoint(this._pointId);
        // let btn:egret.DisplayObject = Manager.model.getLogin().homeView.getPanelBtn(this._pointId);
        let target:egret.Point;
        // if(btn)target = btn.parent.localToGlobal(btn.x,btn.y);
        target = Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR,this._pointId);
        if(target)
        {
            target = this.globalToLocal(target.x, target.y);
            egret.Tween.get(this._skillIcon).to({x:target.x, y:target.y}, 1000).call(this.hideView, this);
        }
        else
        {
            this.hideView();
        }
    }

    private hideView():void
    {
        Manager.view.hide(ViewID.SysNoticeNewSystemView);
    }

	public show(iconID:number|string,pointId:number=2):void
    {
        if(!this.parent)
        {
            this._skillIcon.reuse(null);
			this._skillIcon.load(Manager.path.getSysnoticePath("icon/"+iconID));
            Manager.render.add(this.onHideEff, this, 3000, 1);
            Manager.layer.uiLayer.addChild(this);
        }
		this._pointId = pointId;
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    public dispose():void
    {
        egret.Tween.removeTweens(this._skillIcon);
        Manager.render.remove(this.onHideEff, this);
        this.removeEvent();
        Manager.pool.push(this._backImg);
        this._backImg = null;
        Manager.pool.push(this._skillIcon);
        this._skillIcon = null;
    }
}