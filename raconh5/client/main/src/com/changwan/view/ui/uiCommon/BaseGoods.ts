class BaseGoods extends UIComponent
{
	protected _bgImg:eui.Image;
	private _itemSelect:eui.Image;
	protected _itemImg:eui.Image;
	private _countTxt:Label;
	private _strengthenLevelTxt:Label;
	private _amountTxt:Label;
	private _cvo:ItemsCVO;
	private _baseId:number;
	private _bind:boolean;
	private _countkunImg:eui.Image;
/**品色底框     CVO ：color字段*/
	private _backbgImg:eui.Image;

	private _equipLocation:number;
	private _callback:Function;
	private _thisObj:any;
	private _path:PathInfo;

	private _count:number=0;
	private _strengthenLevel:number=0;
	private _curAmount:number=0;
	private _totalAmount:number=0;

	private _lossVo:GainLossVO;
	private _star1:eui.Image;
	private _star2:eui.Image;
	private _star3:eui.Image;
	private _star:number=0;

	protected _jieImg:eui.Image;
	protected _jieTxt:Label;

	private _isStrengthen:boolean

	/** 特效资源名 */
	private _pathEff:string="";
	private _itemAni:Animation;

	private _isBgShow:boolean;


	public unuse():void
	{
		super.unuse();
		this.clear();
		this.x = 0;
		this.y = 0;
	}

	public reuse():void
	{
		super.reuse();
		this.touchEnabled = true;
		this.touchChildren = false;
		this.clear();
	}

	public constructor() {
		super();
		this.touchEnabled = true;
		this.touchChildren = false;
		this.skinName = Manager.path.getSkinName("uiCommon", "BaseGoodsSkin");
	}
	protected configUI():void
    {
		super.configUI();

		if(this._itemSelect && this._itemSelect.parent) this._itemSelect.parent.removeChild(this._itemSelect);
	
		//this.showStar();
		this._jieTxt.visible = this._jieImg.visible=false;
	}

    protected addEvent():void
    {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickFun,this);
	}
	protected removeEvent():void
    {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickFun,this);
	}
	protected clickFun(e:egret.TouchEvent):void
	{
		if(this._cvo)
		{
			if(this._cvo.group == 1)
			{
				Manager.view.show(ViewID.BagEquipTips, this._cvo);
			}
			else
			{
				Manager.view.show(ViewID.ItemsTips, this._cvo);
			}
			 
		}
	}
	protected drawAll():void
	{
		super.drawAll();
		this.drawData();
		this.drawItemAmout();
		this.drawCount();
	}
	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawCount")) this.drawCount();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
		if(this.isInvalid("drawStrengthenLevel")) this.drawStrengthenLevel();
		if(this.isInvalid("drawItemAmout")) this.drawItemAmout();
		if(this.isInvalid("drawBgHide")) this.drawBgHide();
	}

	public set baseId(value:number)
	{
		if(this._baseId == value)
		{
			return;
		} 
		this._baseId = value;
		this._cvo = ItemsCVO.getCvo(this._baseId);
		this.invalidate(InvalidationType.DATA);
	}
	public get baseId():number
	{
		return this._baseId;
	}

	private drawData():void
	{
		if(!this._cvo) return;
		this.initBackBgImg();
		this.initItemImg();
		this.showjie();
	}
	public get cvo():ItemsCVO
	{
		return this._cvo;
	}

	public setCvo(value:ItemsCVO=null)
	{
		if(value == null) 
		{
			this.clear();
			return;
		}
		if(this._cvo && this._cvo.id == value.id)
		{
			return;
		}
		this._cvo = value;
		this._baseId = this._cvo.id;
		this.invalidate(InvalidationType.DATA);
	}


	public set count(value:number)
	{
		if(this._count == value) return;
		this._count = value;
		this.invalidate("drawCount");
	}
	public get count():number
	{
		return this._count;
	}

	private drawCount():void
	{
		if(this._count <= 1)
		{
			this._countTxt.text = "";
			if(this._curAmount == 0)
				this._countkunImg.visible = false;
		}
		else
		{
			this._countTxt.text = GameUtil.getNumShortStr(this._count);
			this._countkunImg.visible = true;
		}
	}

	public setStrengthenLevel(value:number, isStrengthen:boolean = false)
	{
		if(this._strengthenLevel == value) return;
		this._strengthenLevel = value;
		this._isStrengthen = isStrengthen;
		this.invalidate("drawStrengthenLevel");
	}
	public get strengthenLevel():number
	{
		return this._strengthenLevel;
	}

	private drawStrengthenLevel():void
	{
		if(this._strengthenLevel < 1)
		{
			this._strengthenLevelTxt.text = "";
			if(this._count<1) this._countkunImg.visible = false;
		}
		else
		{
			if(this._isStrengthen)
				this._strengthenLevelTxt.text = "+" + this._strengthenLevel;
			else
				this._strengthenLevelTxt.text = "" + this._strengthenLevel;
			this._countkunImg.visible = true;
		}
	}

	public itemAmount(value1:number, value2:number)
	{
		if(this._totalAmount == value1 && this._curAmount == value2) return;
		this._totalAmount = value1;
		this._curAmount = value2;
		this.invalidate("drawItemAmout");
	}
	public drawItemAmout():void
	{
		if(this._curAmount > 0)
		{
			if(this._totalAmount >= this._curAmount)
				HtmlUtil.setTextFlow(this._amountTxt, HtmlUtil.addColorTag(String(this._totalAmount), "#ffffff") + "/" + HtmlUtil.addColorTag(String(this._curAmount), "#ffffff"));
			else
				HtmlUtil.setTextFlow(this._amountTxt, HtmlUtil.addColorTag(String(this._totalAmount), "#ff0000") + "/" + HtmlUtil.addColorTag(String(this._curAmount), "#ffffff"));
			this._countkunImg.visible = true;
		}
		else 
		{
			this._amountTxt.text = "";
			this._countkunImg.visible = false;
		}
	}

	public get curAmount():number
	{
		return this._curAmount;
	}

	public get totalAmount():number
	{
		return this._totalAmount;
	}

	public set amount(value:string)
	{
		this._amountTxt.text = value;
	}

	public set bind(boo:boolean)
	{
		this._bind = boo;
	}
	public get bind():boolean
	{
		return this._bind;
	}
	private initItemImg():void
	{
		if(!this._cvo) return;
		if(this._path != null)Manager.loader.remove(this._path,this.onLoadComplete,this);
		this._path = Manager.path.getIconPath(this._cvo.imgId);
		Manager.loader.load(this._path,this.onLoadComplete,this,ResourceGCType.COMMON);
	}

	private onLoadComplete(loader:Loader):void
	{
		this._itemImg.texture = loader.data;
		if(this._callback)
		{
			this._callback.call(this._thisObj, this._equipLocation);
		}
		
	}
	private initBackBgImg():void
	{
		if(this._cvo.quality>1)
		{
			this._backbgImg.source = "common_item_"+this._cvo.quality+"_png";
		}
		else
		{
			this._backbgImg.source="";
		}
		
		this.qualtyEff();
	}

	private qualtyEff():void
	{
		if(!this._cvo) return;
		if(this._cvo.quality == 5)
		{
			this.setEffect("itemOrange2Eff");
		}
		else if(this._cvo.quality == 6)
		{
			this.setEffect("itemRedEff");//itemRedEff
		}
		else
		{
			if(!this._lossVo || this._lossVo.effect == "" || !this._lossVo.effect)
			{
				this.setEffect();
			}
		}
	}


	public callback(func:Function, thisObj:any, local:number)
	{
		this._callback = func;
		this._thisObj = thisObj;
		this._equipLocation = local;
	}

	public get itemImgTexture():egret.Texture
	{
		return this._itemImg.texture;
	}

	public get itemImgBitmapData():egret.BitmapData
	{
		return this._itemImg.bitmapData;
	}

	public get bgImg():eui.Image
	{
		return this._bgImg;
	}

	public set selected(value:boolean)
	{
		// this._itemSelect.visible = value;

		if(value)
			if(!this._itemSelect.parent) this.addChildAt(this._itemSelect, 1);
		else
			if(this._itemSelect.parent) this.removeChild(this._itemSelect);
	}

	public setGainLossVO(value:GainLossVO):void
	{
		this._lossVo = value;
		this.count = this._lossVo.num;
		if(this._lossVo.effect)
		this.setEffect(this._lossVo.effect);
		if(this._baseId == this._lossVo.baseId)
		{
			return;
		}
		this._cvo = ItemsCVO.getCvo(this._baseId);
		this.baseId = this._lossVo.baseId;
		this.bind = this._lossVo.bind;
		//this.invalidate("drawLossVo");
	}

    /**设置星星 */
	public setStar(value:number):void
	{
		this._star = value;
		if(this._loadComplete)
		{
			this.showStar();
		}
	}

	private showStar():void
	{
		for(let i:number = 1;i<4;i++)
		{
			this["_star"+ i].visible = i<=this._star;
		}
	}

	protected showjie():void
	{
		let leve:number = this._cvo.needLevel;
		if(this._cvo.group==1 && leve>1000)
		{
			this._jieTxt.visible = this._jieImg.visible=true;
			this._jieTxt.text = String(leve).substr(2,1)+LangCVO.getContent("common18");
		}
		else
		{
			this._jieTxt.visible = this._jieImg.visible=false;
		}
	}
	/**物品特效 */
	public setEffect(path:string=""):void
	{
		
		if(path == "")
		{
			this._pathEff = "";
			if(this._itemAni) 
			{
				Manager.pool.push(this._itemAni);
				this._itemAni = null;
			}
			return;
		}
		if(this._pathEff == path)
		{
			return;
		}
		if(this._itemAni)
		{
			Manager.pool.push(this._itemAni);
			this._itemAni = null;
		}
		
		this._itemAni = Manager.animation.createEffectAnimation(path);
		this.addChild(this._itemAni);
		this._itemAni.x = -57;
		this._itemAni.y =-51;
				
		this._pathEff = path;
	}
	/**
	 * color2 是否带物品的颜色 默认否
	 */
	public getName(color2:boolean=false):string
	{
		if(this._cvo)
		{
			if(color2) 
			{
				return HtmlUtil.addColorTag(this._cvo.name,this._cvo.colorStr);
			}
			return this._cvo.name;
		}
		return null;
	}

	public clear():void
	{
		if(this._path != null)Manager.loader.remove(this._path,this.onLoadComplete,this);
		this._path = null;
	
		this.baseId = 0;
		this._itemImg.texture = null;
		this.setStrengthenLevel(0);
		this.amount = "";
		this._lossVo =null;
		this._cvo = null;
		this._backbgImg.source = "";
		this._countTxt.text = "";
		this._strengthenLevelTxt.text = "";
		this._amountTxt.text = "";
	    this._bind = false;
		this._equipLocation=0;
		this._callback=null;
		this._thisObj=null;
		this._strengthenLevel=0;
	    this._curAmount=0;
		this._totalAmount=0;
		this._loadComplete = true;
		this._count = 0;
		this._countkunImg.visible = false;

		this._star1.visible = false;
		this._star2.visible = false;
		this._star3.visible = false;
		this._star = 0;
		this._jieTxt.visible = this._jieImg.visible=false;
		this._isStrengthen = false;
		this._pathEff = "";
		if(this._itemAni)
		{
			Manager.pool.push(this._itemAni);
			this._itemAni=null;
		}
		this._isBgShow = true;
		this.visible = true;
	}
	public setBgHied(value:boolean):void
	{
		this._isBgShow = value;
		this.invalidate("drawBgHide");
	}
	private drawBgHide():void
	{
		this._bgImg.visible = this._isBgShow;
	}
	public dispose():void
	{
		super.dispose();
		if(this._loadComplete)
		{
			if(this._path != null)Manager.loader.remove(this._path,this.onLoadComplete,this);
			this._path = null;	
		
			ObjectUtil.remove(this._bgImg);
			this._bgImg = null;
		
			ObjectUtil.remove(this._itemSelect);
			this._itemSelect= null;
		
			ObjectUtil.remove(this._itemImg);
			this._itemImg= null;
		
			ObjectUtil.remove(this._countkunImg);
			this._countkunImg= null;

			ObjectUtil.remove(this._backbgImg);
			this._backbgImg=null;
			this._countTxt.dispose();
			this._countTxt= null;
			this._strengthenLevelTxt.dispose();
			this._strengthenLevelTxt= null;
			this._amountTxt.dispose();
			this._amountTxt= null;
			ObjectUtil.remove(this._star1);
			ObjectUtil.remove(this._star2);
			ObjectUtil.remove(this._star3);
			this._star1 = null;
			this._star2 = null;
			this._star3 = null;
			ObjectUtil.remove(this._jieImg);
			this._jieImg= null;
			this._jieTxt.dispose();
			this._jieTxt= null;
			this.setEffect();
		}
		
		this._cvo= null;
		this._lossVo = null;
		
	}
	
}