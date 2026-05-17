class ShopItem extends UIComponent
{
	private _nameTxt:Label;
	private _goods:BaseGoods;
	/**r推荐img */
	private _tuijianImg:eui.Image;
	private _res1:PlayerResItems;
	private _res2:PlayerResItems;
	private _buyBtn:Button;
	/**已购买img */
	private _noStockImg:eui.Image;
	/** d原价 */
	private _priceTxt:Label;
	/**现价 */
	private _currentPriceTxt:Label;
/**红线 */
	private _hongImg:eui.Image;

	private _vipImg:eui.Image;

	private _vipNum:NumImgView2;

	private _cvo:ShopCVO;

	private _gro1:eui.Group;
	private _gro2:eui.Group;

	private _agioTxt:Label;

	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("shop", "ShopItemSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this._res1.iconSize = PlayerResItems.ICON_54;
		this._res2.iconSize = PlayerResItems.ICON_54;
		this._res1.color = "#7C6E62";
		this._res2.color = "#7C6E62";
		this._res1.sign = "";
		this._res2.sign = "";
		this._res1.fontSize(24);
		this._res2.fontSize(24);
		this._nameTxt.stroke = 2;
		this._nameTxt.strokeColor=0x7C6E62;
		this.touchChildren = true;
		this._buyBtn.touchEnabled = true;
	}

	protected addEvent():void
	{
		super.addEvent();
		this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.buyClickFun,this);
	}
	protected removeEvent():void
	{
		super.removeEvent();
		this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.buyClickFun,this);
	}
	private buyClickFun(e:egret.TouchEvent):void
	{
		if(ShopPanel.shopbuyView== null)
		{
			ShopPanel.shopbuyView = Manager.view.show(ViewID.ShopBuyView);
		}
		ShopPanel.shopbuyView.setData(this._cvo);
	}
	public clear():void
	{
		this._nameTxt.text = "";
		this._goods.clear();
		this._tuijianImg.visible = false;
	}

	public drawAll():void{
		super.drawAll();
		this.updateView();
	}
	protected draw():void
	{
		super.draw();
		if(this.isInvalid(InvalidationType.DATA)) this.updateView();
	}

	public setData(info:ShopCVO):void
	{
		// if(this._cvo && this._cvo.id == info.id && this._cvo.count == info.count)
		// {
		// 	return;
		// }
		this._cvo = info;
		this.invalidate(InvalidationType.DATA);
	}

	private updateView():void
	{
		if(!this._cvo) return;
		let itemCvo:ItemsCVO = ItemsCVO.getCvo(this._cvo.base_id);
		let str:string = HtmlUtil.addColorTag(itemCvo.name,itemCvo.colorStr); 
		this._nameTxt.textFlow = new egret.HtmlTextParser().parse(str);
		//this._nameTxt.text = itemCvo.name;

		this._goods.setCvo(itemCvo);
		this._goods.count = this._cvo.num;
		if(this._cvo.goods_tips==10)
		{
			this._tuijianImg.visible = true;
			this._tuijianImg.source = "common_itemRecommend_png";
			this._agioTxt.text = "热卖";

		}
		else if(this._cvo.goods_tips==11)
		{
			this._tuijianImg.visible = true;
			this._tuijianImg.source = "common_itemRecommend_png";
			this._agioTxt.text = "珍品";
		}
		else if(this._cvo.goods_tips == 0)
		{
			this._tuijianImg.visible = false;
			this._agioTxt.text="";
		}
		else
		{
			this._tuijianImg.visible = true;
			this._tuijianImg.source = "common_itemRecommend2_png";
			this._agioTxt.text = this._cvo.goods_tips + "折";
		}

		if(this._cvo.oldPrice>0)
		{
			this._priceTxt.visible = true;
			this._currentPriceTxt.visible = true;
			this._hongImg.visible = true;
			this._res1.visible = true;
			this._res1.type = this._cvo.label;
			this._res1.count = this._cvo.oldPrice;
			this._res2.type = this._cvo.label;
			this._res2.count = this._cvo.price;
			// this._gro1.x =Math.round((this.width - (54 + this._res1.width))/2);
			this._gro2.x =34;
			this._gro2.y = 187;
		}
		else
		{
			this._priceTxt.visible = false;
			this._currentPriceTxt.visible = false;
			this._hongImg.visible = false;
			this._res1.visible = false;
			this._res2.type = this._cvo.label;
			this._res2.count = this._cvo.price;
			this._gro2.x =5;//Math.round((this.width - (108 + this._res2.width))/2)+15;
			this._gro2.y = 172;
		}
		if(this._cvo.limit > 0 && this._cvo.count>=this._cvo.limit)
		{

			this._noStockImg.visible = true;
		}
		else if(this._cvo.limit_p > 0 && this._cvo.count>=this._cvo.limit_p)
		{

			this._noStockImg.visible = true;
		}
		else
		{
			this._noStockImg.visible = false;
		}

		this._buyBtn.visible = !this._noStockImg.visible;

		//_vip
		var condition:ConditionVO = new ConditionVO(this._cvo.show_cond);
		if(!this._vipNum)
		{
			this._vipNum = Manager.pool.create(NumImgView2)
			this._vipNum.x = 69;
			this._vipNum.y = 255;
			this.addChild(this._vipNum)
		}
		if(condition.isSatisfy())
		{
			this._vipImg.visible = false;
			this._vipNum.visible = false;
		}
		else
		{
			this._vipImg.visible = true;
			this._vipNum.visible = true;
			this._vipNum.setValue(condition.value, "nums_vip_", 14);
			this._buyBtn.visible = false;
			if(condition.value>9)
			{
				this._vipNum.x = 70;
			}
			else
			{
				this._vipNum.x = 80;
			}
		}

		
	}

	public unuse():void
	{
		super.unuse();
		this.clear();
	}

	public reuse():void
	{
		super.reuse();
	}
	
	public dispose():void
	{
		super.dispose();
		if(this._loadComplete)
		{

			this._nameTxt.dispose();
			this._nameTxt = null;
			this._goods.dispose();
			this._goods = null;
			this.removeChild(this._tuijianImg);
			this._tuijianImg = null;
			this._res1.dispose();
			this._res1 = null;
			this._res2.dispose();
			this._res2 = null;
			this._buyBtn.dispose();
			this._buyBtn = null;
			this.removeChild(this._noStockImg);
			this._noStockImg = null;
			this._priceTxt.dispose();
			this._priceTxt = null;
			this._currentPriceTxt.dispose();
			this._currentPriceTxt = null;
			this.removeChild(this._hongImg);
			this._hongImg = null;

			if(this._vipNum)
				Manager.pool.push(this._vipNum);
			this._vipNum = null;
			this.removeChild(this._vipImg)
			this._vipImg = null;

			this._cvo = null;
			this.removeChild(this._gro1);
			this._gro1 = null;
			this.removeChild(this._gro2);
			this._gro2 = null;
			this._agioTxt.dispose();
			this._agioTxt = null;
		}
	}

}