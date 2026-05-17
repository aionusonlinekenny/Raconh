/**
 * pzx 
 * 17.11.27
 * 商城购买界面
 */
class ShopBuyView extends PopUpView{
	private _res1:PlayerResItems;
	/** 限制 */
	private _placeTxt:Label;
	private _goods:Goods;
	private _nameTxt:Label;
	private _jina10Btn:Button;
	private _jia10Btn:Button;
	private _jianBtn:Button;
	private _jiaBtn:Button;
	private _buyBtn:Button;
	private _numTxt:Label;
	private _count:number;
	private _price:number;

	private _cvo:ShopCVO;

	/** 获得途径 Group*/
	private _huoqutujGroup:eui.Group;
	private _list:PutOutItem[];

	private _titlePath:string = "shop_goumai_png";
	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("shop", "ShopBuyViewSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this.touchEnabled  = true;
		this._res1.iconSize = PlayerResItems.ICON_54;
		this._res1.sign = "";
		this._res1.color = "#7C6E62";
		this._res1.fontSize(26);
		this._goods.touchEnabled = false;
		this._goods.clear();
		this._nameTxt.stroke = 2;
		this._nameTxt.strokeColor=0x7C6E62;
	}

	protected drawAll():void
	{
		super.drawAll();
		if(this._cvo)
		{
			this.updateView();
		}
	}
	protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.updateView();
    }
	public setData(value:ShopCVO):void
	{
		this._cvo = value;
		this._count = 1;
		this._price = 0;
		this.invalidate(InvalidationType.DATA);
	}
	private updateView():void
	{
		this._popupView.titleImg.source = this._titlePath;

		this._res1.type = this._cvo.label;
		this.setPrice();
		if(this._cvo.limit>0)
		{
			this._placeTxt.text = "限购："+ this._cvo.count + "/" + this._cvo.limit;
		}
		else if(this._cvo.limit_p>0)
		{
			this._placeTxt.text = "限购："+ this._cvo.count + "/" + this._cvo.limit_p;
		}
		else
		{
			this._placeTxt.text="";
		}
		this._goods.baseId = this._cvo.base_id;
		this._goods.count = this._cvo.num;

		let itemCvo:ItemsCVO = ItemsCVO.getCvo(this._cvo.base_id);
		let str:string = HtmlUtil.addColorTag(itemCvo.name,itemCvo.colorStr); 
		this._nameTxt.textFlow = new egret.HtmlTextParser().parse(str);
		this._popupView.diImgVisible = true;
	
		if(itemCvo.desc_output !="" && !Manager.view.isOpening(ViewID.ShopPanel) && !Manager.view.isOpening(ViewID.ShopPanelMulte))
		{
			var arr:Array<string> = itemCvo.desc_output.split("|");
			let ln:number = arr.length;
			if(ln == 1)
			{
				if(arr[0].indexOf("" + LinkType.PANEL_SHOP_MULTE)>-1)
				{
					this._huoqutujGroup.visible = false;
					return;
				}
			}
			this._list = [];
			let starlife:number = 290;
			if(ln==2)
			{
				starlife = 182;
			}
			else if(ln==3)
			{
				starlife = 80;
			}
			for(let i:number = 0;i<ln;i++)
			{
				let item:PutOutItem = Manager.pool.create(PutOutItem);
				this._huoqutujGroup.addChild(item);
				item.setData(arr[i]);
				item.viewId = ViewID.ShopBuyView;
				item.x = starlife + i * 210;
				item.y = 44;
				this._list.push(item);
			}
			this._popupView.bgHeight= 630;
			this._popupView.diImgVisible = false;
		}
		else
		{
			this._huoqutujGroup.visible = false;
		}
	}

	private setPrice()
	{
		this._price = this._cvo.price * this._count
		this._res1.count = this._price;
		if(this._cvo.limit>0)
		{
			this._numTxt.text = this._count + "/" + (this._cvo.limit - this._cvo.count);
		}
		else if(this._cvo.limit_p>0)
		{
			this._numTxt.text = this._count + "/" + (this._cvo.limit_p - this._cvo.count);
		}
		else
		{
			this._numTxt.text = "" + this._count;
		}
	}

	protected addEvent():void
	{
		super.addEvent();
		this._jina10Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._jia10Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._jianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this. _jiaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
	}

	protected removeEvent():void
	{
		this._jina10Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._jia10Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._jianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this. _jiaBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
		super.removeEvent();
	}

	private onclickHandler(e:egret.TouchEvent):void
	{
		switch(e.target)
		{
			case this._jina10Btn:
				if(this._count>10)
				{
					this._count = this._count - 10;
				}
				else
				{
					this._count = 1;
				}
				break;
			case this._jia10Btn:
				this.jianCount(10);
				break;
			case this._jianBtn:
				this._count--;
				if(this._count<1)
				{
					this._count = 1;
				}
				break;
			case this._jiaBtn:
				this.jianCount(1);
				break;
			case this._buyBtn:
				this.sendBuy();
				return;
		}
		this.setPrice();
	}
//增加物品限制
	private jianCount(value:number)
	{
		this._count += value;
		let maxCount:number;
		if(this._cvo.limit>0)
		{
			maxCount = this._cvo.limit - this._cvo.count;
			if(maxCount<this._count)
			{
				this._count = maxCount;
			}
			return;
		}
		if(this._cvo.limit_p>0)
		{
			maxCount = this._cvo.limit_p - this._cvo.count;
			if(maxCount<this._count)
			{
				this._count = maxCount;
			}
			return;
		}
	}
	//购买
	private sendBuy():void
	{
		//{loss,drop,num}
		let str :string = "{loss,"+this._cvo.label+","+this._cvo.price+"}";
		let gai:GainLossVO = new GainLossVO(str);
		if(!gai.isEnough())
		{
			if(gai.type == GainLossVO.COIN)
			{
				let item = ItemsCVO.getCvo(ItemsConst.COIN);
				Manager.view.show(ViewID.ItemsTips, item);
				return;
			}
			let dsc:string ;
			let cbi:CallBackInfo ;
			if(gai.type == GainLossVO.GOLD)
			{

				dsc= gai.name +"不足,是否充值？"
				cbi= Manager.pool.create(CallBackInfo, this.sendBuyCallback, this);
			}
			else
			{
				dsc= gai.name +"不足";
			}
			Manager.tips.showTips(dsc, cbi);
			return;
		}
		Manager.control.getShop().buy(this._cvo.id,this._cvo.shop_type,this._count);
		this.onTouchCloseHandler();
	}
	private sendBuyCallback():void
	{
		this.onTouchCloseHandler();
		Manager.view.show(ViewID.SysChargePanel);
	}
	protected onTouchCloseHandler():void
	{
		Manager.view.hide(ViewID.ShopBuyView);
		ShopPanel.shopbuyView = null;
	}
	public clear():void
	{
		this._goods.clear();
		this._count = 1;
		this._price = 0;
		this.setPrice();
		this._numTxt.text = "";
		this._cvo = null;
		this._nameTxt.text = "";
		this._placeTxt.text = "";
	}

	public show(value:ShopCVO=null):void
	{
		if(value)
		{
			this.setData(value);
			this._titlePath = "shop_huoquwuping_png";
		}
		Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose()
	{
		super.dispose();
		if(this._loadComplete)
		{
			if(this._list)
			{
				this._list.forEach((item,i)=>
				{
					Manager.pool.push(item);
				})
				this._list = null;
			}
			ObjectUtil.removes(this._huoqutujGroup);
			this._res1.dispose();
			this._res1= null;
			this._placeTxt.dispose();
			this._placeTxt= null;
			this._goods.dispose();
			this._goods = null;
			this._nameTxt.dispose();
			this._nameTxt = null;
			this._jina10Btn.dispose();
			this._jina10Btn= null;
			this._jia10Btn.dispose();
			this._jia10Btn = null;
			this._jianBtn.dispose();
			this._jianBtn = null;
			this._jiaBtn.dispose();
			this._jiaBtn = null;
			this._buyBtn.dispose();
			this._buyBtn =null;
			this._numTxt.dispose();
			this._numTxt = null;
			this._huoqutujGroup = null;
		}
		this._cvo = null;
	}
}