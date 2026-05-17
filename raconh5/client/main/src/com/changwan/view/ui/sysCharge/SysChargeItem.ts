/**
 * pzx 
 * 2018.1.2
 */
class SysChargeItem extends UIComponent{
	/** 选中物效框 */
	private _kuangImg:eui.Image;
	/**元宝背景图 */
	private _goldBgImg:eui.Image;
	private _czImg:eui.Image;
	private _largessGroup:eui.Group;
	/** 充值返利 */
	private _chargeGroup:eui.Group;
	/** 元宝 */
	private _goldTxt:Label;
	/** 元 */
	private _moneyTxt:Label;
	/**赠送元宝 */
	private _goldTxt0:Label;
//返利
	private _progiftNum:NumImgView2;
	private _perImg:eui.Image;

	private _data:SysChargeCVO;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("syscharge", "SysChargeItemSkin");
		this.touchChildren = false;
		this.touchEnabled = true;
    }
    protected configUI():void
    {
        super.configUI();
		if(!this._progiftNum)
		{
			this._progiftNum = Manager.pool.create(NumImgView2);
			this._progiftNum.y = this._perImg.y;
			this._chargeGroup.addChild(this._progiftNum);
		}

    }

    protected addEvent():void
    {
        super.addEvent();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

	private onClickHandler(e:egret.TouchEvent):void
	{
		Manager.platform.pay(this._data.money);
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

    public setData(data:SysChargeCVO):void
    {
		this._data = data;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
		let mon:string = HtmlUtil.addColorTag(this._data.money + LangCVO.getContent("common37"),Color.DEF_STR);
		HtmlUtil.setTextFlow(this._moneyTxt,mon);
		this._goldTxt.text = "" + this._data.gold;
		this._goldBgImg.source = this._data.goldImg;

		let label:number=0;
		let retrive:number = 0;
		if(this._data.first)
		{
			label = this._data.second_label;
			retrive = this._data.second_retrive;
			this._czImg.source = "sysCharge_sc_png";
		}
		else
		{
			label = this._data.first_label;
			retrive = this._data.first_retrive;
			this._czImg.source = "sysCharge_cz_png";
		}

		if(label>0)
		{
			this._chargeGroup.visible = true;
			this._progiftNum.setValue(label,"nums_syscharge_", 10);
		}
		else
		{
			this._chargeGroup.visible = false;
		}
		if(retrive>0)
		{
			this._largessGroup.visible = true;
			this._goldTxt0.text = "" + retrive;
		}
		else
		{
			this._largessGroup.visible = false;
		}
		this._progiftNum.x = this._perImg.x - this._progiftNum.width-15;
    }

	public setkuangBgImg(value:boolean):void
	{
		this._kuangImg.visible = value;
		let color:string = Color.WHITE_STR;
		if(!value)
		{
			color = Color.DEF_STR;
		}
		let mon:string = HtmlUtil.addColorTag(this._data.money + LangCVO.getContent("common37"),color);
		HtmlUtil.setTextFlow(this._moneyTxt,mon);
	}
	public get data():SysChargeCVO
	{
		return this._data;
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
			ObjectUtil.removes(this._kuangImg,this._goldBgImg,this._czImg,this._largessGroup,this._chargeGroup
			,this._progiftNum,this._perImg);
		}
		this._kuangImg.bitmapData = null;
		this._kuangImg=null;
		this._goldBgImg.bitmapData = null;
		this._goldBgImg=null;
		this._czImg.bitmapData = null;
		this._czImg=null;
		this._largessGroup=null;
		this._chargeGroup=null;
		this._goldTxt.dispose();
		this._goldTxt=null;
		this._moneyTxt.dispose();
		this._moneyTxt=null;
		this._goldTxt0.dispose();
		this._goldTxt0=null;
		Manager.pool.push(this._progiftNum);
		this._progiftNum=null;
		this._perImg.bitmapData = null;
		this._perImg=null;
		this._data=null;
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }

}