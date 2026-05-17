/**
 * 经验副本视图
 * luzhihong
 * create 2018.1.11
 */
class CopyExpAddRateView extends UIComponent implements IViewManager
{
    private _txt0:Label;
    private _txt1:Label;
    // private _txt2:Label;
    // private _txt3:Label;
    private _txt4:Label;
    private _txt5:Label;
    private _cbCoin:RadioButton;
    private _cbGold:RadioButton;
    private _btnClose:Button;
    private _btn:Button;
    private _redIcon:eui.Image;
    private _model:CopyExpModel;

    private _bgImg:BitmapRemote;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("activity", "CopyExpAddRateViewSkin");
        this.touchChildren = true;
	}

    public show():void
    {
        if(this.parent == null)
        {
            Manager.layer.tipsLayer.addChild(this);
            this.onResizeHandler(null);
        }
    }

    public hide():void
    {
        this.dispose();
    }
    
    protected configUI():void
    {
        super.configUI();

        if(!this._bgImg)
		{
			this._bgImg = Manager.pool.create(BitmapRemote);
			this._bgImg.x = 0;
			this._bgImg.y = 554;
			this._bgImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 720, 130);
			this.addChildAt(this._bgImg, 4);
		}

        this._model = Manager.model.getCopy().expModel;
        this._txt0.text = LangCVO.getContent("copy13");//每次成功提升都可增加人物10%的经验收益
        this._cbCoin.label = LangCVO.getContent("copy15");//银币提升
        this._cbGold.label = LangCVO.getContent("copy16");//元宝提升
        this._txt4.text = LangCVO.getContent("copy17", CopyExpConfigCVO.up_coin_need.num + CopyExpConfigCVO.up_coin_need.name);//{0}/次
        this._txt5.text = LangCVO.getContent("copy17", CopyExpConfigCVO.up_gold_need.num + CopyExpConfigCVO.up_gold_need.name);//{0}/次

        this.setDef();
    }

    private setDef():void
    {
        if(this._model.inspireRate < CopyExpConfigCVO.up_coin_rate_max) this._cbCoin.selected = true;
        else  this._cbGold.selected = true;
    }

    protected addEvent():void
    {
        super.addEvent();
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._model.addEventListener(CopyEvent.EXP_INSPIRE, this.updateExpRate, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onMoneyUpdateHandler, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.onMoneyUpdateHandler, this);
        // this._cbCoin.group.addEventListener(egret.Event.CHANGE, this.onChange, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._model.removeEventListener(CopyEvent.EXP_INSPIRE, this.updateExpRate, this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onMoneyUpdateHandler, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.onMoneyUpdateHandler, this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.config.gameWidth - this.width) / 2;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._btn:
                let type:number = this._cbCoin.selected ? 0 : 1;
                if(type == 0)
                {
                    if(this._model.inspireRate >= CopyExpConfigCVO.up_coin_rate_max)
                    {
                        FloatTips.addTips(LangCVO.getContent("copy20"));//银币提升已达上线，请用元宝提升
                        return;
                    }
                }
                else 
                {
                    if(this._model.inspireRate >= CopyExpConfigCVO.up_gold_rate_max)
                    {
                        FloatTips.addTips(LangCVO.getContent("copy21"));//收益加成已达上限
                        return;
                    }
                }
                Manager.control.getCopy().expUpRate(type);
				break;
			case this._btnClose:
                Manager.view.hide(ViewID.CopyExpAddRateView);
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

    private drawRedIcon():void
    {
        let canUp:boolean = false;
        if(this._model.inspireRate < CopyExpConfigCVO.up_coin_rate_max && CopyExpConfigCVO.up_coin_need.isEnough()) canUp = true;
        // else if(this._model.inspireRate < CopyExpConfigCVO.up_gold_rate_max && CopyExpConfigCVO.up_gold_need.isEnough()) canUp = true;
        this._redIcon.visible = canUp;
    }

    private drawExpRate():void
    {
        this._txt1.text = LangCVO.getContent("copy14", this._model.inspireRate/10);//当前提升       经验+{0}%
        this.setDef();
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawExpRate")) this.drawExpRate();
		if(this.isInvalid("drawRedIcon", "drawExpRate")) this.drawRedIcon();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawExpRate();
        this.drawRedIcon();
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.disposes(this._txt0, this._txt1, this._txt4, this._txt5, this._cbCoin, this._cbGold, this._btnClose, this._btn);
        ObjectUtil.removes(this._redIcon, this._bgImg);
        this._txt0 = null;
        this._txt1 = null;
        this._txt4 = null;
        this._txt5 = null;
        this._cbCoin = null;
        this._cbGold = null;
        this._btnClose = null;
        this._btn = null;
        this._redIcon = null;
        if(this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
    }
}