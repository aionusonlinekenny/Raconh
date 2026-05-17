class ItemsTips extends BaseItemsTips
{	
	private _group:eui.Group;
	private _useBtn:Button;
	private _fangruckBtn:Button;
	private _quchuBtn:Button;
	private _bgImg:eui.Image;

	private _tipspanel:BaseTips;
	private _info:ItemsModelInfo;
/**'存储空间 0只显示，2背包，3仓库*/
	public storagetype:number;

	private _marketBtn:Button;


	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("tips", "ItemsTipsSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this._group.touchEnabled = false;
		this.onResizeHandler(null);
	}
	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._tipspanel.addEventListener("closeView",this.closefun,this);
		this._useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.useFun,this);
		this._fangruckBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.moveFun,this);
		this._quchuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.quchuFun,this);
		this._marketBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMarketHandler,this);
	}
	protected removeEvent():void
	{
		super.removeEvent();
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._tipspanel.removeEventListener("closeView",this.closefun,this);
		this._useBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.useFun,this);
		this._fangruckBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.moveFun,this);
		this._quchuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.quchuFun,this);
		this._marketBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onMarketHandler,this);
	}
	private onMarketHandler():void
	{
		if(OpenCVO.isOpen(OpenConst.ID_MARKET,true))
		{
			if(this._info)
			{
				Manager.view.show(ViewID.MarketSaleTipsView,this._info);
				this.closefun(null);
			}
		}
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
	}

	private closefun(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.ItemsTips);
	}
	private useFun(e:egret.TouchEvent):void
	{
		if(this._info)
		{
			let cvo:ItemsCVO = this._info.cvo;
			let i:number = cvo.openView;
			if(i == 1)
			{
				Manager.view.show(ViewID.UseItemsTips,this._info);
			}
			else if(i>1)
			{
				let str:string = "" + i;
				let viewId:number = Math.round(i/10);
				let tap:number = Number(str.substr(str.length-1,1));
				Manager.link.link(viewId,tap);
			}
			Manager.view.hide(ViewID.ItemsTips);
		}
	}
	private moveFun(e:egret.TouchEvent):void
	{
		Manager.control.getItems().moveItems(2,3,this._info.pos);
		Manager.view.hide(ViewID.ItemsTips);
	}
	private quchuFun(e:egret.TouchEvent):void
	{
		Manager.control.getItems().moveItems(3,2,this._info.pos);
		Manager.view.hide(ViewID.ItemsTips);
	}
	public setData(value:ItemsModelInfo|ItemsCVO):void
	{
		super.setData(value);
	}
	protected drawData():void
	{
		let value = this._data;
		let cvo:ItemsCVO;
		this._marketBtn.visible = false;
		if(value instanceof ItemsModelInfo)
		{
			this._info = value as ItemsModelInfo;
			cvo = this._info.cvo;
			this._tipspanel.setData(cvo,this._info.quantity,this._info.bind);

			this._bgImg.visible = true;
			this._bgImg.height = 236;
			this._tipspanel.x=0;
			this._tipspanel.y=0;
			if(this._info.storagetype==0)
			{
				this._bgImg.visible = false;
				this._useBtn.visible = false;
				this._fangruckBtn.visible = false;
				this._quchuBtn.visible = false;
				this._tipspanel.horizontalCenter="0";
				this._tipspanel.verticalCenter="0";
			}
			else if(this._info.storagetype==ItemsType.BAG)
			{
				this._fangruckBtn.visible = true;
				this._quchuBtn.visible = false;
				if(cvo.openView == 0)
				{
					this._useBtn.visible = false;
					this._fangruckBtn.y = 26;
					this._bgImg.height = 135;
				}
				else
				{
					this._useBtn.visible = true;
					this._fangruckBtn.y = 125;
				}
				if(!this._info.bind && cvo.market>0)
				{
					this._marketBtn.y = this._fangruckBtn.y + 90;
					this._bgImg.height = this._marketBtn.y + 110;
					this._marketBtn.visible = true;
				}

			}
			else if(this._info.storagetype==ItemsType.DEPOT)
			{
				this._useBtn.visible = false;
				this._fangruckBtn.visible = false;
				this._quchuBtn.visible = true;
				this._bgImg.height = 135;
			}
			
		}
		else if(value instanceof ItemsCVO)
		{
			this._tipspanel.setData(value,1);
			this._bgImg.visible = false;
			this._useBtn.visible = false;
			this._fangruckBtn.visible = false;
			this._quchuBtn.visible = false;
			this._tipspanel.horizontalCenter="0";
			this._tipspanel.verticalCenter="0";
		}
		super.drawData();

	}
	
	public dispose():void
	{
		super.dispose();

		this._tipspanel.dispose();
		this._tipspanel = null;
		if(this._info) this._info = null;
		this._useBtn.dispose();
		this._useBtn= null;
		this._fangruckBtn.dispose();
		this._fangruckBtn= null;
		this._quchuBtn.dispose();
		this._quchuBtn= null;
		this._bgImg= null;

	}
}