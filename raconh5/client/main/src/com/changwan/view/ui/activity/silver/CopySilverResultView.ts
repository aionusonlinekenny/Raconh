/**
 * 银币副本结算界面
 * luzhihong
 * create 2018.1.19
 */
class CopySilverResultView extends UIComponent implements IViewManager
{
    private _back:ResultWinBack;
	private _back1:BitmapRemote;
	private _box:BitmapRemote;
	private _txtKill:Label;
	private _txtRate:Label;
	private _txtSilver:Label;
	private _txtGold:Label;
    
	private _kills:number;
	private _rate:number;
	private _silver:number;
	private _gold:number;
	private _endTime:number;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("activity", "CopySilverResultViewSkin");
        this.touchChildren = true;
    }

    public show(kills:number, rate:number, silver:number, gold:number):void
    {
		this._kills = kills;
		this._rate = rate;
		this._silver = silver;
		this._gold = gold;
		this._endTime = egret.getTimer() + 10 * 1000;
        
        if(this.parent == null)
        {
            this.x = (Manager.config.gameWidth - this.width) >> 1;
            this.y = 213;
            Manager.layer.tipsLayer.addChild(this);
        }
        this.invalidate(InvalidationType.DATA);
    }

    protected configUI():void
    {
        super.configUI();
        this._back1.load(Manager.path.getActivityPath("exp/back1.png"));
        this._box.load(Manager.path.getActivityPath("silver/box.png"));
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
    }

    private drawData():void
    {
        this._txtKill.text = this._kills+"";
        this._txtRate.text = "+" + (this._rate/10) + "%";
        this._txtSilver.text = GameUtil.getNumShortStr(this._silver);
        this._txtGold.text = GameUtil.getNumShortStr(this._gold);

		Manager.render.add(this.countDown, this, 1000);
		this.countDown();
    }

	private countDown():void
	{
		let left:number = this.leftTime;
		if(left == 0)
		{
			Manager.view.hide(ViewID.CopySilverResultView);
			return;
		}
		this._back.setTxt(LangCVO.getContent("activity2", left));
	}

	private get leftTime():number
	{
		let left:number = Math.floor((this._endTime - egret.getTimer())/1000);
		return left > 0 ? left : 0;
	}

    public hide():void
    {
        this.dispose();
    }

    protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._back.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._back.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._back.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.CopySilverResultView);
	}

	public dispose():void
	{
        Manager.control.getCopy().exit();
		Manager.render.remove(this.countDown, this);
		super.dispose();
        ObjectUtil.disposes(this._back, this._back1, this._box, this._txtKill, this._txtRate, this._txtSilver, this._txtGold);
        this._back = null;
	    this._back1 = null;
	    this._box = null;
	    this._txtKill = null;
	    this._txtRate = null;
	    this._txtSilver = null;
	    this._txtGold = null;
	}
}