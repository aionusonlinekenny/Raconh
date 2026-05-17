/**
 * 投资容器
 * pzx
 * create 18.1.13
 */
class SysInvestView extends UIComponent{
	private _buyGroup:eui.Group;
	private _buyBtn:Button;
	private _labelImg:eui.Image;
	private _activeImg:eui.Image;
	private _scroll:BaseVScrollerList;
	private _type:string=SysInvestType.SYSINVEST_MONTH_TYPE;
    private _model:SysInvestModel;

    public static instince:SysInvestView;

	public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("sysInvest", "SysInvestViewSkin");
        SysInvestView.instince = this;
    }
    protected configUI():void
    {
        super.configUI();
		this._scroll.initBtnListData(SysInvestItem, [], true);
        this._model = Manager.model.getSysInvest();
        this._labelImg.touchEnabled = false;
        Manager.control.getSysInvest().query();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuyFunHandler,this);
        this._model.addEventListener(SysInvestEvent.SYSINVEST_UPDATE_EVENT,this.drawData,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuyFunHandler,this);
        this._model.removeEventListener(SysInvestEvent.SYSINVEST_UPDATE_EVENT,this.drawData,this);
    }
    private onBuyFunHandler(e:egret.TouchEvent):void
    {
        let str:string = LangCVO.getContent("SysInvest1");//是否花费<font color = '#38b800'>{0}元</font>购买<font color = '#38b800'>{1}</font>？

        let name = SysInvestCVO.getName(this._type);
        str = StringUtils.setParam(str,this._type,name);

        let ok:CallBackInfo = Manager.pool.create(CallBackInfo,this.onCallBackFun,this);
        Manager.tips.showTips(str,ok,true);
    }
    /** 购买回调 */
    private onCallBackFun():void
    {
        Manager.platform.pay(Number(this._type),1);
    }
    
    public getisActive():boolean
    {
        if(this._model.isActive(this._type))
        {
            return true;
        }
        else 
        {
            this.onBuyFunHandler(null);
            return false;
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

    public setData(type:string):void
    {
		this._type = type;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
        if(this._type==SysInvestType.SYSINVEST_MONTH_TYPE)
        {
            this._labelImg.source ="sysInvest_28_png";
        }
        else
        {
            this._labelImg.source ="sysInvest_188_png";
        }
        let list:SysInvestCVO[] = SysInvestCVO.getCvos(this._type);
        list = ArrayUtil.sortOn(list,["state","sort"]);
		this._scroll.dataProvider(list);
        if(this._model.isActive(this._type))
        {
            this._activeImg.visible = true;
        }
        else 
        {
            this._activeImg.visible = false;
        }
        this._buyGroup.visible = !this._activeImg.visible;
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
			ObjectUtil.removes(this._buyGroup,this._labelImg,this._activeImg);
		}
		this._buyGroup=null;
        this._buyBtn.dispose();
        this._buyBtn=null;
        this._labelImg=null;
        this._activeImg=null;
        this._scroll.dispose();
        this._scroll=null;
        this._model=null;
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}