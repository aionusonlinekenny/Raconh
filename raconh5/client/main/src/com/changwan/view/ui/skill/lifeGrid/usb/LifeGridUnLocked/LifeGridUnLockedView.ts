/**
 * 新命格框解锁-面板
 * pzx
 * create 2018-2-12
*/
class LifeGridUnLockedView extends egret.DisplayObjectContainer implements IViewManager
{
    private _infos:Array<ItemsModelInfo>;
	private _countDownTime:number;
    private _callback:Function;

    private _labelImg:BitmapRes;
    private _bgImg:BitmapRemote;
    private _skillIcon:BitmapRemote;

    private _lifeGridId:number;

    public constructor()
    {
        super();
        this.initView();
        this.addEvent();
    }
    
    private initView():void
    {
        this._bgImg = Manager.pool.create(BitmapRemote);
        this._bgImg.x = 50;
        this._bgImg.y = 528;
        this._bgImg.load(PathInfo.getPath("res/lifeGrid/common_kaiqi2.png", LoaderType.IMAGE));
        this.addChild(this._bgImg);

        this._labelImg = BitmapRes.create("newLifeGrid_jiesuomingge_png", 196, 658);
        this.addChild(this._labelImg);
        
        this._skillIcon = Manager.pool.create(BitmapRemote, null, 86, 86);
        this._skillIcon.x = 323;
        this._skillIcon.y = 552;
        this.addChild(this._skillIcon);

        this.touchEnabled = true;

        this.onResizeHandler(null);
    }

    private addEvent():void
    {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    private removeEvent():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    }

    protected onTouchHandler(e:egret.TouchEvent):void
    {
        this.onHideEff();
    }

    private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - 620) / 2;
	}

    protected onHideEff():void
    {
        Manager.render.remove(this.onHideEff, this);
        this._bgImg.visible = false;
        this._labelImg.visible = false;
        let target:egret.Point = Manager.model.getLogin().home.getGlobalPos(HomeView2.BAR,HomeView2.SKILL_POS);
        let target2:egret.Point = this._skillIcon.parent.localToGlobal(this._skillIcon.x, this._skillIcon.y);
        let target3:egret.Point = target.subtract(target2);
        let target4:egret.Point = target3.add(new egret.Point(this._skillIcon.x, this._skillIcon.y));
        egret.Tween.get(this._skillIcon).to({x:target4.x, y:target4.y}, 1000).call(this.tweenCallBack,this);
    }

    private tweenCallBack():void
    {
        if(Manager.model.getCopy().towerModel.canChallenge(false))
        {
            Manager.view.show(ViewID.TowerCopyWinView, this._infos, this._countDownTime , this._callback);
        }
        else
        {
            Manager.view.show(ViewID.CopyResultWin, this._infos, this._countDownTime , this._callback);
        }
        Manager.view.hide(ViewID.LifeGridUnLockedView);
    }

    public show(...args:any[]):void
    {
        this._infos = args[0];
        this._countDownTime = args[1];
        this._callback = args[2]
        // 小于10为命格框，大于1000为命格id
        this._lifeGridId = args[3];
        this.darwData();
        Manager.layer.tipsLayer.addChild(this);
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

    protected darwData():void
    {
        this._skillIcon.reuse(null);
        if(this._lifeGridId<10)
        {
            this._skillIcon.load(Manager.path.getPanelLifeGridPath("/icon/lifeGrid_add.png","",LoaderType.IMAGE));
            this._skillIcon.x = 333;
            this._skillIcon.y = 563;
            this._labelImg.source = "newLifeGrid_jiesuomingge_png";
        }
        else
        {
            let cvo:ItemsCVO = ItemsCVO.getCvo(this._lifeGridId);
            this._skillIcon.load(Manager.path.getIconPath(cvo.imgId))
            this._skillIcon.x = 323;
            this._skillIcon.y = 552;
            this._labelImg.source = "newLifeGrid_jiesuoxinmingge_png";
        }
        Manager.render.add(this.onHideEff, this, 3000, 1);
    }
        
    public dispose():void
    {
        egret.Tween.removeTweens(this._skillIcon);
        Manager.render.remove(this.onHideEff, this);
        this.removeEvent();
        Manager.pool.push(this._bgImg);
        this._bgImg = null;
        Manager.pool.push(this._skillIcon);
        this._skillIcon = null;
        Manager.pool.push(this._labelImg);
        this._labelImg = null;

        this._infos = null;
        this._countDownTime = 0;
        this._callback = null;
    }
}