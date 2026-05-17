/**
 * 银币副本内信息视图
 * luzhihong
 * create 2018.1.19
 */
class CopySilverInfoView extends UIComponent implements IViewManager
{
    private _txtAdd:Label;
    private _txtTime:Label;
    private _txtSilver:Label;
    private _txtGold:Label;
    private _box0:CopySilverBox;
    private _box1:CopySilverBox;
    private _box2:CopySilverBox;
    // private _box3:CopySilverBox;
    private _imgPercent:eui.Image;
	private _numView:NumImgView2;
    private _gBottom:eui.Group;

    private _model:CopySilverModel;
    private _cvo:CopyCVO;
    private _rate:number=0;
    private _silver:number=0;
    private _gold:number=0;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("activity", "CopySilverInfoViewSkin");
        this.touchChildren = true;
	}

    public show():void
    {
        if(this.parent == null)
        {
            Manager.layer.uiLayer.addChildAt(this, 0);
        }
    }

    public hide():void
    {
        this.dispose();
    }
    
    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getCopy().silverModel;
        this._cvo = CopyCVO.getCVO(CopyConst.ID_SILVER);
        
        // this._box0.source("copy_silver_0_png");
        // this._box1.source("copy_silver_1_png");
        // this._box2.source("copy_silver_2_png");
        // this._box3.source("copy_silver_3_png");
        
		this._numView = Manager.pool.create(NumImgView2);
		this._numView.y = this._imgPercent.y;
		this._gBottom.addChild(this._numView);

        if(!Manager.model.getCopy().silverModel.needGuide)
        {
            Manager.render.add(this.countdown, this, 1000);
            this.countdown();
        }
        else HtmlUtil.setTextFlow(this._txtTime, LangCVO.getContent("boss4") + "00:00");
        
        this.onResizeHandler(null);
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._model.addEventListener(CopyEvent.SILVER_MINI, this.updateMini, this);
        this._model.addEventListener(CopyEvent.SILVER_BOXES, this.updateBoxIDs, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._model.removeEventListener(CopyEvent.SILVER_MINI, this.updateMini, this);
        this._model.removeEventListener(CopyEvent.SILVER_BOXES, this.updateBoxIDs, this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.width = Math.round(Manager.config.gameWidth);
        this.x = -this.parent.x;
	}
		
    private _lastShowSctTime:number=0;
    private updateMini(e:CopyEvent):void
    {
        let curRate:number = e.params["rate"]/10;
        let disRate:number = curRate - this._rate;
        if(disRate > 0) Manager.pool.create(SCTView, SCTConst.TYPE_SILVER_RATE, disRate, Manager.model.self.getSctPos());
        let disSilver:number = e.params["silver"] - this._silver;

        let time:number = egret.getTimer();
        if(disSilver > 0 && (time - this._lastShowSctTime > 200)) 
        {
            this._lastShowSctTime = time;
            Manager.pool.create(SCTView, SCTConst.TYPE_SILVER, disSilver, Manager.model.self.getSctPos());
        }

        this._model.rate = curRate;
        this._rate = curRate;
        this._silver = e.params["silver"];
        this._gold = e.params["gold"];
		this.invalidate("drawMini");
    }

    private updateBoxIDs(e:CopyEvent = null):void
    {
        //{id:pi.readInt64(), pos:new egret.Point(pi.readInt(), pi.readInt()), time:pi.readInt(), total:pi.readShort()};//序号、id、恢复时间戳、总冷却时间
        // this._box0.setData(e.params[1]["id"], e.params[1]["pos"], e.params[1]["time"], e.params[1]["total"]);
        // this._box1.setData(e.params[2]["id"], e.params[2]["pos"], e.params[2]["time"], e.params[2]["total"]);
        // this._box2.setData(e.params[3]["id"], e.params[3]["pos"], e.params[3]["time"], e.params[3]["total"]);
        // this._box3.setData(e.params[4]["id"], e.params[4]["pos"], e.params[4]["time"]);
        let boxesData:Object = this._model.boxesData;
        if(boxesData)
        {
            this._box0.setData(boxesData[1]["id"], boxesData[1]["pos"], boxesData[1]["time"], boxesData[1]["total"]);
            this._box1.setData(boxesData[2]["id"], boxesData[2]["pos"], boxesData[2]["time"], boxesData[2]["total"]);
            this._box2.setData(boxesData[3]["id"], boxesData[3]["pos"], boxesData[3]["time"], boxesData[3]["total"]);
        }
    }

    private drawMini():void
    {
        // obj["rate"] = pi.readShort();
        // obj["silver"] = pi.readInt();
        // obj["gold"] = pi.readInt();
        this._txtAdd.text = LangCVO.getContent("copy23", this._rate);//宝箱祝福：银币+{0}%
        this._txtSilver.text = LangCVO.getContent("copy24") + this._silver;//累计银币：
        this._txtGold.text = LangCVO.getContent("copy25") + this._gold;//累计元宝：
        HtmlUtil.setTextFlow(this._txtAdd, LangCVO.getContent("copy23", this._rate));
        HtmlUtil.setTextFlow(this._txtSilver, LangCVO.getContent("copy24")+HtmlUtil.addColorTag(this._silver+"", Color.GREEN_STR_2));
        HtmlUtil.setTextFlow(this._txtGold, LangCVO.getContent("copy25")+HtmlUtil.addColorTag(this._gold+"", Color.GREEN_STR_2));
        this._numView.setValue(this._rate, "nums_vip2_", 15);
        this._numView.x = 46 - (this._numView.width+20)/2;
        this._imgPercent.x = this._numView.x + this._numView.width + 5;
    }

    private countdown():void
    {
        let str:string = HtmlUtil.addColorTag(cw.DateUtil.formatStr(this._cvo.leftTime, cw.DateUtil.LEFT_MM_SS, true), Color.GREEN_STR_2);
        HtmlUtil.setTextFlow(this._txtTime, LangCVO.getContent("boss4") + str);

        this._box0.countdown();
        this._box1.countdown();
        this._box2.countdown();
        // this._box3.countdown();
    }

    private guideCB():void
    {
        Manager.control.getCopy().askMonster(CopyConst.ID_SILVER);
        Manager.render.add(this.countdown, this, 1000);
        this.countdown();
        Manager.render.add(this.guideDelay, this, 2000, 1);
        Manager.model.getCopy().silverModel.needGuide = false;
        Manager.control.getTask().hideGuide();
    }

    private guideDelay():void
    {
        Manager.render.remove(this.guideDelay, this);
        this._box0.guideClick();
    }

	protected draw():void
	{
		super.draw();
        if(this.isInvalid("drawMini")) this.drawMini();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawMini();
        this.updateBoxIDs();
    }
    /**引导 */
    public setGuide():void
    {
        if(Manager.model.getGuide().curID == GuideID.COIN_COPY)
        {
            let pos = this._box0.parent.localToGlobal(this._box0.x,this._box0.y);
            Manager.control.getTask().showGuide(pos, (this._box0.width>>1)+8, (this._box0.height>>1)+8, this.guideCB, this);
        }
    }

    public dispose():void
    {
        // this._model.clean();
        if(Manager.model.getGuide().curID == GuideID.COIN_COPY) Manager.control.getTask().hideGuide();
        Manager.render.remove(this.countdown, this);
        Manager.render.remove(this.guideDelay, this);
        super.dispose();
        ObjectUtil.disposes(this._txtAdd, this._txtTime, this._txtSilver, this._txtGold, this._box0, this._box1, this._box2, this._numView);
        ObjectUtil.removes(this._imgPercent, this._gBottom);
        this._txtAdd = null;
        this._txtTime = null;
        this._txtSilver = null;
        this._txtGold = null;
        this._box0 = null;
        this._box1 = null;
        this._box2 = null;
        // this._box3 = null;
        this._numView = null;
        this._imgPercent = null;
        this._gBottom = null;
        this._model = null;
        this._cvo = null;
    }
}