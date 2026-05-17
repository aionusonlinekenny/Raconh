/**
 * 签到阶段item
 * drq
 * create 2018-3-27
 */
class QiandaoSceduleItem extends UIComponent
{
    private _model:QiandaoModel;
    private _cvo:QiandaoGainCVO;
    private _lastValue:number;

    private _bar:eui.Image;
    private _circle:eui.Image;
    private _box:eui.Image;
    private _txt:Label;
    private _label:eui.Image;
    private _boxAni:Animation;

	private BAR_W:number = 80;
	public constructor(cvo:QiandaoGainCVO, lastValue:number) {
		super();
		this._cvo = cvo;
        this._lastValue = lastValue;
		this.skinName = Manager.path.getSkinName("activity", "DailyScheduleItemSkin");
        this.touchChildren = true;
	}

	protected configUI():void
    {
		let boxArr = ["activity_xiangzi_4_png","activity_xiangzi_3_png","activity_xiangzi_1_png","activity_xiangzi_2_png"];
        this._model = Manager.model.getQiandao();
        this._box.source = boxArr[this._cvo.id-1];
        this._txt.text = LangCVO.getContent("qiandao32",this._cvo.day);
		 this._txt.x = 75;
        
        this.drawDaily();
        this.drawSchedule();
    }

	protected addEvent():void
    {
        super.addEvent();
        this._model.addEventListener(QiandaoEvent.QIANDAO_SCHEDULE_DAILY, this.drawDaily, this);
		this._model.addEventListener(QiandaoEvent.QIANDAO_SCHEDULE_AWARD, this.drawSchedule, this);
		this._box.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickBox,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._model.removeEventListener(QiandaoEvent.QIANDAO_SCHEDULE_DAILY, this.drawDaily, this);
		this._model.removeEventListener(QiandaoEvent.QIANDAO_SCHEDULE_AWARD, this.drawSchedule, this);
		this._box.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickBox,this);
    }

	private onClickBox(e:egret.TouchEvent = null):void
    {
        let arr:string[] =  this._cvo.reward.split("|");
        let arrLoss:GainLossVO[] = [];
        for(let i=0;i<arr.length;i++)
        {
            let loss:GainLossVO = new GainLossVO(arr[i]);
            arrLoss.push(loss);
        }
		
		let curValue:number = this._model.getDailyList().length;
		let canget:boolean = curValue >= this._cvo.day;
        let cbi:CallBackInfo = canget ? Manager.pool.create(CallBackInfo, this.clickCallback, this, this._cvo.id) : null;
		Manager.view.show(ViewID.ArenaMaxAwardView, arrLoss, canget, cbi);
    }

    private clickCallback(cvoId:number):void
    {
        Manager.control.geQiandao().sendAward(cvoId);
    }

	private drawDaily():void
    {
		let curValue:number = this._model.getDailyList().length;
        if(curValue < this._cvo.day)
        {
            let cur:number = curValue > this._lastValue ? curValue - this._lastValue : 0;
            let total:number = this._cvo.day - this._lastValue;
            this._bar.width = this.BAR_W * cur / total;
            this._circle.visible = false;
        }
        else
        {
            this._bar.width = this.BAR_W;
            this._circle.visible = true;
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

	private drawSchedule():void
    {
		let curValue:number = this._model.getDailyList().length;
		//let curItem = this._model.get
        if(this._cvo.isGet)
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
            if(curValue >= this._cvo.day)
            {
                this.addAni();
            }
            else
            {
                this.removeAni();
            }
        }
    }

    public dispose():void
    {
        super.dispose();
        this.removeAni();
        ObjectUtil.dispose(this._model);
        ObjectUtil.removes(this._bar,this._circle,this._box,this._txt,this._label);
        this._model = null;
        this._cvo = null;
        this._lastValue = null;
        this._bar = null;
        this._circle = null;
        this._box = null;
        this._txt = null;
        this._label = null;
        this._boxAni = null;
	    this.BAR_W = null;
    }
}