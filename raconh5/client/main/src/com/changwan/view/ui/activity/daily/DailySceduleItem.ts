/**
 * 日常阶段item
 * luzhihong
 * create 2017-11-23
 */
class DailySceduleItem extends UIComponent
{
    private _cvo:ActivityScheduleCVO;
    private _model:ActivityModel;
    private _lastValue:number;
    private _bar:eui.Image;
    private _circle:eui.Image;
    private _box:eui.Image;
    private _txt:Label;
    private _label:eui.Image;
    private _boxAni:Animation;

    private BAR_W:number = 80;

	public constructor(cvo:ActivityScheduleCVO, lastValue:number)
	{
		super();
        this._cvo = cvo;
        this._lastValue = lastValue;
		this.skinName = Manager.path.getSkinName("activity", "DailyScheduleItemSkin");
        this.touchChildren = true;
	}

    protected configUI():void
    {
        this._model = Manager.model.getActivity();
        this._box.source = "activity_xiangzi_"+this._cvo.id+"_png";
        this._txt.text = "" + this._cvo.value;
        
        this.drawDaily();
        this.drawSchedule();
    }
    
    protected addEvent():void
    {
        super.addEvent();
        this._model.addEventListener(ActivityEvent.DAILY_SCHEDULE_UPDATE, this.updateSchedule, this);
        this._model.addEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
		this._box.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._model.removeEventListener(ActivityEvent.DAILY_SCHEDULE_UPDATE, this.updateSchedule, this);
        this._model.removeEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
		this._box.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    private updateDaily(e:ActivityEvent):void
    {
		this.invalidate("drawDaily");
    }

    private updateSchedule(e:ActivityEvent):void
    {
		this.invalidate("drawSchedule");
    }

    private drawDaily():void
    {
        let curValue:number = this._model.curDailyValue;
        if(curValue < this._cvo.value) 
        {
            let cur:number = curValue > this._lastValue ? curValue - this._lastValue : 0;
            let total:number = this._cvo.value - this._lastValue;
            this._bar.width = this.BAR_W * cur / total;
            this._circle.visible = false;
        }
        else
        {
            this._bar.width = this.BAR_W;
            this._circle.visible = true;
        }
    }

    private drawSchedule():void
    {
        if(this._cvo.hasGet)
        {
            this._label.visible = true;
            this._box.touchEnabled = false;
            this._box.filters = [FilterUtil.getBrightFilter(-60)];
            this.removeAni();
        }
        else 
        {
            this._label.visible = false;
            this._box.touchEnabled = true;
            this._box.filters = [];
            if(this._cvo.canGet)
            {
                this.addAni();
            }
            else
            {
                this.removeAni();
            }
        }
    }

    private addAni():void
    {
        if(this._boxAni == null)
        {
            this._boxAni = Manager.animation.createEffectAnimation("dailyBox");
            this._boxAni.move(this._box.x+318, this._box.y+316);
            this.addChild(this._boxAni);
        }
    }
    private removeAni():void
    {
        if(this._boxAni)
        {
            Manager.pool.push(this._boxAni);
            this._boxAni = null;
        }
    }

    private onClickHandler(e:egret.TouchEvent = null):void
    {
        // if(this._cvo.canGet)
        // {
        //     Manager.control.getActivity().getDailySchedule(this._cvo.id);
        // }
        let canGet:boolean = this._cvo.canGet;
        let cbi:CallBackInfo = canGet ? Manager.pool.create(CallBackInfo, this.callBack, this, this._cvo.id) : null;
        Manager.view.show(ViewID.ArenaMaxAwardView, this._cvo.gains, canGet, cbi);
    }

    private callBack(cvoId:number):void
    {
        Manager.control.getActivity().getDailySchedule(cvoId);
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawDaily")) this.drawDaily();
		if(this.isInvalid("drawSchedule","drawDaily")) this.drawSchedule();
	}

    // protected drawAll():void
    // {
    //     super.drawAll();
    //     this.drawDaily();
    //     this.drawSchedule();
    // }

    public dispose():void
    {
        super.dispose();
        this.removeAni();
        ObjectUtil.dispose(this._txt);
        ObjectUtil.removes(this._bar, this._circle, this._box, this._label);
        this._model = null;
        this._cvo = null;
        this._bar = null;
        this._circle = null;
        this._box = null;
        this._txt = null;
        this._label = null;
    }
}