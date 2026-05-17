/**
 * 经验副本结算界面
 * luzhihong
 * create 2017-12-1
 */
class CopyExpResultView extends UIComponent implements IViewManager
{
    private _back:ResultWinBack;
	private _back1:BitmapRemote;
	private _scorePic:BitmapRemote;
	private _txtTime:Label;
	private _txtExp:Label;
    
	private _useTime:number;
	private _kills:number;
	private _exp:number;
	private _endTime:number;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("activity", "CopyExpResultViewSkin");
        this.touchChildren = true;
    }

    public show(useTime:number, kills:number, exp:number):void
    {
		this._useTime = useTime;
		this._kills = kills;
		this._exp = exp;
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
        let cvo:CopyExpScoreCVO = CopyExpScoreCVO.getCVOByKillNum(this._kills);
        this._scorePic.load(Manager.path.getActivityPath("exp/score_"+cvo.score+".png"));
        this._txtTime.text = cw.DateUtil.formatStr(this._useTime, cw.DateUtil.LEFT_HH_MM_SS, true);
        this._txtExp.text = GameUtil.getNumShortStr(this._exp);

		Manager.render.add(this.countDown, this, 1000);
		this.countDown();
    }

	private countDown():void
	{
		let left:number = this.leftTime;
		if(left == 0)
		{
			Manager.view.hide(ViewID.CopyExpResultView);
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
		Manager.view.hide(ViewID.CopyExpResultView);
	}

	public dispose():void
	{
        Manager.control.getCopy().exit();
		Manager.render.remove(this.countDown, this);
		super.dispose();
        ObjectUtil.disposes(this._back, this._back1, this._scorePic, this._txtTime, this._txtExp);
        this._back = null;
	    this._back1 = null;
	    this._scorePic = null;
	    this._txtTime = null;
	    this._txtExp = null;
	}
}