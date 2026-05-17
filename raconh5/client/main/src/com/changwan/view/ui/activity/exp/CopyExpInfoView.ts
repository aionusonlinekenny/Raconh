/**
 * 经验副本内信息视图
 * luzhihong
 * create 2018.1.11
 */
class CopyExpInfoView extends UIComponent implements IViewManager
{
    private _txtScore:Label;
    private _txtKill:Label;
    private _txtTime:Label;
    private _txtExp:Label;
    private _imgScore:eui.Image;
    private _group:eui.Group;
    private _btnExpUp:eui.Image;
    private _btnKillUp:eui.Image;
    private _expUpRedIcon:eui.Image;
    private _killUpRedIcon:eui.Image;
    private _txtExpRate:Label;
    private _model:CopyExpModel;
    private _cvo:CopyCVO;
    private _score:string;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("activity", "CopyExpInfoViewSkin");
        this.touchChildren = true;
	}

    public show():void
    {
        if(this.parent == null)
        {
            Manager.layer.uiLayer.addChild(this);
            this.onResizeHandler(null)
        }
    }

    public hide():void
    {
        this.dispose();
    }
    
    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getCopy().expModel;
        this._cvo = CopyCVO.getCVO(CopyConst.ID_EXP);

        // FilterUtil.setTxtFilter(this._txtExpRate);

        if(!Manager.model.getCopy().expModel.needGuide)
        {
            Manager.render.add(this.countdown, this, 1000);
            this.countdown();
        }
        else HtmlUtil.setTextFlow(this._txtTime, LangCVO.getContent("boss4") + "00:00");
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnExpUp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnKillUp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._model.addEventListener(CopyEvent.EXP_INSPIRE, this.updateExpRate, this);
        this._model.addEventListener(CopyEvent.EXP_GAINS, this.updateExps, this);
        this._model.addEventListener(CopyEvent.EXP_KILLS, this.updateKills, this);
        this._model.addEventListener(CopyEvent.EXP_DATA_INIT, this.updateDataInit, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onMoneyUpdateHandler, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.onMoneyUpdateHandler, this);
        Manager.model.getVip().addEventListener(VipEvent.EXP_UPDATE, this.updateRecharge, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._btnExpUp.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnKillUp.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._model.removeEventListener(CopyEvent.EXP_INSPIRE, this.updateExpRate, this);
        this._model.removeEventListener(CopyEvent.EXP_GAINS, this.updateExps, this);
        this._model.removeEventListener(CopyEvent.EXP_KILLS, this.updateKills, this);
        this._model.removeEventListener(CopyEvent.EXP_DATA_INIT, this.updateDataInit, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onMoneyUpdateHandler, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.onMoneyUpdateHandler, this);
        Manager.model.getVip().removeEventListener(VipEvent.EXP_UPDATE, this.updateRecharge, this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this._group.x = Manager.config.gameWidth - this.parent.x - 110;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._btnExpUp:
                Manager.view.show(ViewID.CopyExpAddRateView);
				break;
			case this._btnKillUp:
                Manager.view.show(ViewID.FirstChargeView);
				break;
		}
	}

    private onMoneyUpdateHandler(e?:GameObjectAttrEvent):void
    {
		this.invalidate("drawRedIcon");
    }
		
    private updateExpRate(e:CopyEvent):void
    {
		this.invalidate("drawExpRate");
    }

    private updateExps(e:CopyEvent):void
    {
		this.invalidate("drawExps");
    }

    private updateKills(e:CopyEvent):void
    {
		this.invalidate("drawKills");
    }
    
    private updateDataInit(e:CopyEvent):void
    {
		this.invalidate("drawDataInit");
    }

    private updateRecharge(e:VipEvent):void
    {
		this.invalidate("drawRecharge");
    }

    private drawExpRate():void
    {
        // 41	经验
        let rate:number = this._model.inspireRate/10;
        this._txtExpRate.text = LangCVO.getContent("common41") + "+" + rate + "%";
    }

    private drawRedIcon():void
    {
        let canUp:boolean = false;
        if(this._model.inspireRate < CopyExpConfigCVO.up_coin_rate_max && CopyExpConfigCVO.up_coin_need.isEnough()) canUp = true;
        // else if(this._model.inspireRate < CopyExpConfigCVO.up_gold_rate_max && CopyExpConfigCVO.up_gold_need.isEnough()) canUp = true;
        this._expUpRedIcon.visible = canUp;
    }

    private drawExps():void
    {
        // 9	经验池：
        let str:string = HtmlUtil.addColorTag(GameUtil.getNumShortStr(this._model.exp), Color.GREEN_STR);
        HtmlUtil.setTextFlow(this._txtExp, LangCVO.getContent("copy9") + str);
    }

    private drawKills():void
    {
        let str:string = HtmlUtil.addColorTag(this._model.kills+"", Color.GREEN_STR);
        HtmlUtil.setTextFlow(this._txtKill, LangCVO.getContent("copy10") + str);//已击杀：

        let cvo:CopyExpScoreCVO = CopyExpScoreCVO.getCVOByKillNum(this._model.kills);
        if(this._score != cvo.score)
        {
            this._score = cvo.score;
            this._imgScore.source = "copy_exp_score_" + cvo.score + "_png";
            
            egret.Tween.removeTweens(this._imgScore);
            egret.Tween.get(this._imgScore).to( {scaleX: 3, scaleY:3}, 250, egret.Ease.circOut)
                                           .to( {scaleX: 1, scaleY:1}, 250, egret.Ease.circIn);
        }
        let nextCVO:CopyExpScoreCVO = CopyExpScoreCVO.getCVO(cvo.id + 1);
        if(nextCVO)
        {
            HtmlUtil.setTextFlow(this._txtScore, LangCVO.getContent("copy11", nextCVO.kill_num, HtmlUtil.addColorTag(nextCVO.score, Color.RED_STR)));//击杀{0}只怪可升到{1}评价
        }
        else this._txtScore.text = LangCVO.getContent("copy12");//12	已获得最高评价
    }

    private drawRecharge():void
    {
        this._btnKillUp.visible = this._killUpRedIcon.visible = Manager.model.getVip().exp == 0;
    }

    private countdown():void
    {
        let str:string = HtmlUtil.addColorTag(cw.DateUtil.formatStr(this._cvo.leftTime, cw.DateUtil.LEFT_MM_SS, true), Color.GREEN_STR);
        HtmlUtil.setTextFlow(this._txtTime, LangCVO.getContent("boss4") + str);
    }

    private guideCB():void
    {
        Manager.control.getCopy().askMonster(CopyConst.ID_EXP);
        Manager.render.add(this.countdown, this, 1000);
        this.countdown();
        Manager.view.show(ViewID.CopyExpAddRateView);
        Manager.model.getCopy().expModel.needGuide = false;
        Manager.control.getTask().hideGuide();
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawExpRate", "drawDataInit")) this.drawExpRate();
		if(this.isInvalid("drawExps", "drawDataInit")) this.drawExps();
		if(this.isInvalid("drawKills", "drawDataInit")) this.drawKills();
        if(this.isInvalid("drawRedIcon", "drawExpRate", "drawDataInit")) this.drawRedIcon();
        if(this.isInvalid("drawRecharge")) this.drawRecharge();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawExpRate();
        this.drawExps();
        this.drawKills();
         this.drawRedIcon();
        this.drawRecharge();
    }
    /**引导 */
    public setGuide():void
    {
        if(Manager.model.getGuide().curID == GuideID.EXP_COPY)
        {
            let pos:egret.Point = this._btnExpUp.parent.localToGlobal(this._btnExpUp.x,this._btnExpUp.y);
            Manager.control.getTask().showGuide(pos, this._btnExpUp.width>>1, this._btnExpUp.height>>1, this.guideCB, this);
        }
    }

    public dispose():void
    {
        this._model.clean();
        Manager.render.remove(this.countdown, this);
        egret.Tween.removeTweens(this._imgScore);
        if(Manager.model.getGuide().curID == GuideID.EXP_COPY) Manager.control.getTask().hideGuide();
        super.dispose();
        ObjectUtil.disposes(this._txtScore, this._txtKill, this._txtTime, this._txtExp, this._txtExpRate);
        ObjectUtil.removes(this._imgScore, this._group, this._btnExpUp, this._btnKillUp, this._expUpRedIcon, this._killUpRedIcon);
        this._txtScore = null;
        this._txtKill = null;
        this._txtTime = null;
        this._txtExp = null;
        this._imgScore = null;
        this._group = null;
        this._btnExpUp = null;
        this._btnKillUp = null;
        this._expUpRedIcon = null;
        this._killUpRedIcon = null;
        this._txtExpRate = null;
        this._model = null;
        this._cvo = null;
    }
}