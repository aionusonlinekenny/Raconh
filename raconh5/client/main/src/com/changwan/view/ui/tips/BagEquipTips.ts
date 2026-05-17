class BagEquipTips extends BaseItemsTips{
	private _group:eui.Group;
	private _useBtn:Button;
	private _fangruckBtn:Button;
	private _quchuBtn:Button;
	private _bgImg:eui.Image;

	private _equipTips:EquipTips;
	private _info:ItemsModelInfo;
/**'存储空间 0只显示，2背包，3仓库*/
	public storagetype:number;

	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("tips", "BagEquipTipsSkin");
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
		this._equipTips._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closefun,this);
		this._useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.useFun,this);
		this._fangruckBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.moveFun,this);
		this._quchuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.quchuFun,this);
	}
	protected removeEvent():void
	{
		super.removeEvent();
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._equipTips._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closefun,this);
		this._useBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.useFun,this);
		this._fangruckBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.moveFun,this);
		this._quchuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.quchuFun,this);
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
	}

	private closefun(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.BagEquipTips);
	}
	private useFun(e:egret.TouchEvent):void
	{
		Manager.control.getItems().moveItems(this._info.storagetype, ItemsType.EQUIE, this._info.pos);
		Manager.view.hide(ViewID.BagEquipTips);
	}
	private moveFun(e:egret.TouchEvent):void
	{
		Manager.control.getItems().moveItems(2,3,this._info.pos);
		Manager.view.hide(ViewID.BagEquipTips);
	}
	private quchuFun(e:egret.TouchEvent):void
	{
		Manager.control.getItems().moveItems(3,2,this._info.pos);
		Manager.view.hide(ViewID.BagEquipTips);
	}
	public setData(value:ItemsModelInfo|ItemsCVO):void
	{
		super.setData(value);
	}

	protected drawData():void
	{
		
		let value = this._data;
		if(value instanceof ItemsModelInfo)
		{
			this._info = value as ItemsModelInfo;
			this._equipTips.setData(this._info.cvo, value);

			this._bgImg.visible = true;
			this._bgImg.height = 236;
			this._equipTips.x=0;
			this._equipTips.y=0;
			if(this._info.storagetype==0)
			{
				this._bgImg.visible = false;
				this._useBtn.visible = false;
				this._fangruckBtn.visible = false;
				this._quchuBtn.visible = false;
				this._equipTips.horizontalCenter="0";
				this._equipTips.verticalCenter="0";
			}
			else if(this._info.storagetype==ItemsType.BAG)
			{
				this._useBtn.visible = true;
				this._fangruckBtn.visible = true;
				this._quchuBtn.visible = false;
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
			this._equipTips.setData(value);
			this._bgImg.visible = false;
			this._useBtn.visible = false;
			this._fangruckBtn.visible = false;
			this._quchuBtn.visible = false;
			this._equipTips.horizontalCenter="0";
			this._equipTips.verticalCenter="0";
		}
		super.drawData();
	}

	public dispose():void
	{
		super.dispose();
		this._equipTips.dispose();
		if(this._info) this._info = null;
		this._bgImg.parent.removeChild(this._bgImg);
		this._bgImg= null;
		ObjectUtil.disposes(this._useBtn,this._fangruckBtn,this._quchuBtn);
		this._useBtn = null;
		this._fangruckBtn= null;
		this._quchuBtn= null;

	}
	
}