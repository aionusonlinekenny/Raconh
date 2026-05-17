/**
 * pzx
 * 18.1.8
 * 首充豪礼
 */
class FirstChargeView extends UIComponent{
    private _rewardsBtn:Button;
    private _item0:BaseGoods;
    private _item1:BaseGoods;
    private _item2:BaseGoods;
    private _item3:BaseGoods;
    private _close:eui.Image;
    /**战斗力特效 */
    private _fightBit:BitmapRemote;
    /** 固定单笔首充1元可领奖 */
    public static VIP_EXP:number = 1;

    private _bitimg:BitmapRemote;

    private _itemArr:BaseGoods[];

    private _dimianAni:Animation;
    private _scxlAni:Animation;

    private _redicon:eui.Image;

	public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("first_charge", "FirstChargeViewSkin");
        this.visible = false;
    }
    protected configUI():void
    {
        super.configUI();
        this._itemArr = [this._item0,this._item1,this._item2,this._item3];
        this.onResizeHandler(null);
        if(this._fightBit==null)
        {
            this._fightBit = Manager.pool.create(BitmapRemote);
            this._fightBit.x = 160;
            this._fightBit.y = 798;
            this.addChild(this._fightBit);
            this._fightBit.touchEnabled = false;
            this._fightBit.load(Manager.path.getPanelFristChargePath("firstCharge_zhandouli2"));
        }

        if(this._dimianAni==null)
        {
            this._dimianAni = Manager.animation.createEffectAnimation("dimian");
            this._dimianAni.x = 160;
            this._dimianAni.y = 448;
            this.addChildAt(this._dimianAni,1);
            this._dimianAni.touchEnabled = false;
            this._dimianAni.play();
        }
        if(this._scxlAni==null)
        {
            this._scxlAni = Manager.animation.createEffectAnimation("scxl");
            this._scxlAni.x = 160;
            this._scxlAni.y = 400;
            this.addChildAt(this._scxlAni,2);
            this._scxlAni.touchEnabled = false;
            this._scxlAni.play();
        }

        if(this._bitimg == null)
		{
			this._bitimg = Manager.pool.create(BitmapRemote);
			this._bitimg.x = 0;
			this._bitimg.y = 143;
			this.addChildAt(this._bitimg,0);
			this._bitimg.load(Manager.path.getPanelFristChargePath("firstCharge_kuang"));
		}
    }

    protected addEvent():void
    {
        super.addEvent();
        this._close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._rewardsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRewardsHandler,this);
    }
    protected onTouchCloseHandler(e:egret.TouchEvent):void
    {
        Manager.view.hide(ViewID.FirstChargeView);
    }
    private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        if(!this.visible)
        this.visible = true;
	}

    protected removeEvent():void
    {
        super.removeEvent();
        this._close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._rewardsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRewardsHandler,this);
    }
    private onRewardsHandler(e:egret.TouchEvent):void
    {
        if(Manager.model.getVip().exp<FirstChargeView.VIP_EXP)
        {
            Manager.view.show(ViewID.SysChargePanel);
            return;
        }
        if(!Manager.model.getSysCharge().isReward)
        {
            Manager.control.getFirstCharge().reward();
        }
    }

    protected initData():void
    {
        super.initData();
    }

    protected drawAll():void
	{
		super.drawAll();
        this.drawData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    public setData(data):void
    {
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
        let cvo:FirstChargeCVO = FirstChargeCVO.cvo();
        let items:GainLossVO[] = GainLossVO.parse(cvo.rewards);
        let str:string = cvo.effect;
        var reg:RegExp = /\[|]|[] /g;
        str = str.replace(reg,"");
        let strArr:string[]= str.split(",");
        for(let i:number= 0;i<4;i++)
        {
            if(items[i])
            {
                this._itemArr[i].baseId = items[i].baseId;
                this._itemArr[i].count = items[i].num;
                this._itemArr[i].setEffect(strArr[i]);
            }
            else
            {
                this._itemArr[i].clear();
            }
        }
        this._redicon.visible = Manager.model.getVip().exp>=FirstChargeView.VIP_EXP;
    }

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
		this.clear();
    }
	
	private clear(isRemove:boolean=false):void
	{
		if(isRemove)
		{
			ObjectUtil.removes(this._item0,this._item1,this._item2,this._item3,this._close,this._redicon);
		}
        this._rewardsBtn.dispose();
        this._rewardsBtn=null;
        Manager.pool.push(this._item0);
        Manager.pool.push(this._item1);
        Manager.pool.push(this._item2);
        Manager.pool.push(this._item3);
        this._item0=null;
        this._item1=null;
        this._item2=null;
        this._item3=null;
        this._close=null;
        this._redicon = null;
        if(this._fightBit)
        {
            Manager.pool.push(this._fightBit);
            this._fightBit=null;
        }
        this._itemArr=null;
        if(this._dimianAni)
        {
            Manager.pool.push(this._dimianAni);
            this._dimianAni=null;
        }
        if(this._scxlAni)
        {
            if(this._scxlAni.parent)
                this._scxlAni.parent.removeChild(this._scxlAni);
            Manager.pool.push(this._scxlAni);
            this._scxlAni=null;
        }
        if(this._bitimg)
		{
			Manager.pool.push(this._bitimg);
            this._bitimg = null;
        }
	}
    public show(value:number):void
    {
        if(Manager.view.isOpening(ViewID.RollTips))
        {
            Manager.view.hide(ViewID.RollTips);
        }
        Manager.layer.tipsLayer.addChild(this);
    }

    public hide():void
    {
        this.dispose();
    }

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }

}