/**
 * pzx 
 * create 18.3.6
 */
class ShopView extends egret.DisplayObjectContainer 
{
	private _vScroller:egret.ScrollView;
	private _currentView:egret.DisplayObjectContainer;
	private _sp:egret.Shape;
	private _itemArr:Array<ShopItem>;
	private _mode:ShopModel;
	/**商城类型1、元宝；2、神秘商城；3、荣誉商城；4、VIP商城 */
	private _type:number;
	private _list:Dictionary<number,number>;
	public constructor() 
	{
		super();
		this.configUI();
		this.addEvent();
	}
	protected configUI():void
	{
		this._sp = Manager.pool.create(egret.Shape);
		this._sp.x = 11;
		this._sp.y = 120;
		this.addChild(this._sp);
		this._sp.graphics.beginFill(0,0.2);
		this._sp.graphics.drawRect(0,0,700,1019);
		this._sp.graphics.endFill();
		this._mode = Manager.model.getShop();

		this._currentView = Manager.pool.create(egret.DisplayObjectContainer);

		this._vScroller = new egret.ScrollView();
		this._vScroller.x = 10;
		this._vScroller.y =120;
		this._vScroller.width = 700;
		this._vScroller.height = 1015;
		this._vScroller.horizontalScrollPolicy = "off"
		this._vScroller.setContent(this._currentView);
		this.addChild(this._vScroller);
		this._vScroller.scrollSpeed = 0.01;
		this._itemArr=[];
		this.touchChildren = true;
	}
	protected addEvent():void
	{
		this._mode.addEventListener(ShopEvent.SHOP_UPDATE_EVENT,this.updateView,this);
		this._mode.addEventListener(ShopEvent.SHOP_BUY_EVENT,this.breakBuyFun,this);
	}


	protected removeEvent():void
	{
		this._mode.removeEventListener(ShopEvent.SHOP_UPDATE_EVENT,this.updateView,this);
		this._mode.removeEventListener(ShopEvent.SHOP_BUY_EVENT,this.breakBuyFun,this);
	}
	/**购买成功返回 */
	private breakBuyFun():void
	{
		FloatTips.addTips(LangCVO.getContent("shop1"));
		this._list = this._mode.getList(this._type);
		this.updateView();
	}

	private updateView():void
	{
		if(this._list == null)
		{
			this._list = this._mode.getList(this._type);
		}
		let arr:ShopCVO[] = ShopCVO.getShopTypeLists(this._type);
		let ln:number = arr.length>this._itemArr.length ? arr.length:this._itemArr.length;
		let h:number =Math.floor(arr.length/3)+1;
		for(let i:number = 0;i<ln;i++)
		{
			let item:ShopItem;
			if(this._itemArr[i]===undefined)
			{
				item = Manager.pool.create(ShopItem);
				item.x = i%3 * 235;
				item.y = Math.floor(i/3) * 335;
				this._currentView.addChild(item);
				this._itemArr.push(item);
			}
			else
			{
				item = this._itemArr[i];
			}
			if(arr[i])
			{
				let vo:ShopCVO = arr[i];
				let j:number =  this._list.get(vo.id);
				if(j)
				{
					vo.setCount(j);
				}
				else
				{
					vo.setCount(0);
				}

				item.visible = true;
				item.setData(vo);
			}
			else
			{
				item.visible = false;
			}
		}
		this._currentView.height = h*335;
	}

	public onFuncBtnChangeHandler(value:number):void
	{
		this._type = value;
		this._list = this._mode.getList(this._type);
		this._vScroller.scrollTop = 0;
		if(this._list)
		{
			this.updateView();
		}
	}
	
	public dispose()
	{
		this.removeEvent();
		if(this._vScroller)
		{
			this._vScroller.removeContent();
			this.removeChild(this._vScroller);
			this._vScroller = null;
		}
		if(this._sp)
		{
			Manager.pool.push(this._sp)
			this._sp = null;
		}
		if(this._currentView)
		{
			Manager.pool.push(this._currentView)
			this._currentView = null;
		}
		
		if(this._itemArr)
		{
			this._itemArr.forEach((item,i)=>
			{
				Manager.pool.push(item);
			})
			this._itemArr = null;
		}
		this._list = null;
		this._mode = null;
		if(this.parent)this.parent.removeChild(this);
	}
}