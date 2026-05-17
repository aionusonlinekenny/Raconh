/**
 * 道具tips皮肤
 */
class BaseTips extends BaseItemsTips{
	private _group:eui.Group;
	private _nameTxt:Label;
	private _porpTxt1:Label;
	private _porpTxt2:Label;
	private _porpTxt3:Label;
	private _desc:Label;
	public _close:Button;

	private _items:BaseGoods;
	/**底图 */
	private _itemsBgImg:eui.Image;

	private _cvo:ItemsCVO;
	private _count:number;
/** 获得途径 Group*/
	private _huoqutujGroup:eui.Group;

	private _list:PutOutItem[];

	private _bin:boolean;

	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("tips", "BaseTipsSkin");

	}
	protected configUI():void
	{
		this.touchEnabled = false;
		this.touchChildren = true;
		this._group.touchEnabled = false;
		this._items.touchEnabled = false;
		this._porpTxt3.text = "";
		this._desc.lineSpacing = 10;
		this._huoqutujGroup.touchChildren  = true;
	}
	protected addEvent():void
	{
		super.addEvent();
		this._close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseHandler,this);

	}
	protected removeEvent():void
	{
		super.removeEvent();
		this._close.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseHandler,this);
	}
	private onCloseHandler(e:egret.TouchEvent):void
	{
		this.dispatchEvent(new egret.Event("closeView"));
	}

	public setData(value:ItemsCVO,count:number=1,bin:boolean=false):void
	{
		this._cvo = value;
		this._count = count;
		this._bin = bin;
		super.setData(value);
	}

	protected drawData():void
	{
		
		this._items.setCvo(this._cvo);
		this._items.count = this._count;
		this._nameTxt.text = this._cvo.name;
		this._porpTxt1.text = LangCVO.getContent("common5")+ this._cvo.needLevelStr;
		this._porpTxt2.text = LangCVO.getContent("common9")+LangCVO.getContent("item"+this._cvo.type);
		if(this._bin) this._porpTxt3.text = LangCVO.getContent("item93");
		else this._porpTxt3.text = "";
	
		HtmlUtil.setTextFlow(this._desc,this._cvo.desc);
		if(this._desc.textHeight<65)
		{
			this._desc.height = 65;
		}
		else
		{
			this._desc.height = this._desc.textHeight;
		}
		var bgH:number = this._desc.y + this._desc.height+ 15;
	
		if(this._cvo.desc_output !="" && !Manager.view.isOpening(ViewID.BagPanel) && !Manager.view.isOpening(ViewID.ShopPanel)
		 && !Manager.view.isOpening(ViewID.ShopPanelMulte))
		{
			this._huoqutujGroup.visible = true;
			this._huoqutujGroup.y = bgH;
			var arr:Array<string> = this._cvo.desc_output.split("|");
			let ln:number = arr.length;
			this._list = [];
			let starlife:number = 134;
			if(ln==2)
			{
				starlife = 72;
			}
			else if(ln==3)
			{
				starlife = 0;
			}
			for(let i:number = 0;i<ln;i++)
			{
				let item:PutOutItem = Manager.pool.create(PutOutItem);
				this._huoqutujGroup.addChild(item);
				item.setData(arr[i]);
				item.viewId = ViewID.ItemsTips;
				item.x = starlife + i * 134;
				item.y = 44;
				this._list.push(item);
			}
			bgH=this._huoqutujGroup.y + this._huoqutujGroup.height+10;
		}
		else
		{
			this._huoqutujGroup.visible = false;
		}
		this._itemsBgImg.height = bgH; 
		super.drawData();
		
	}

	public unuse():void
	{
		super.unuse();
		this._items.unuse();
		this._cvo = null;
		this._count = 1;
		this._porpTxt1.text = "";
		this._porpTxt2.text = "";
		this._porpTxt3.text = "";
		this._nameTxt.text = "";
		this._desc.text = "";

		if(this._list)
		{
			this._list.forEach((item,i)=>
			{
				Manager.pool.push(item);
			})
			this._list = null;
		}
	}

	public  dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._itemsBgImg,this._huoqutujGroup);
		this._items.touchEnabled = true;
		Manager.pool.push(this._items);
		this._items = null;
		this._cvo = null;

		this._nameTxt.dispose();
		this._nameTxt = null;
		this._porpTxt1.dispose();
		this._porpTxt1 = null;
		this._porpTxt2.dispose();
		this._porpTxt2 = null;
		this._porpTxt3.dispose();
		this._porpTxt3 = null;
		this._desc.dispose();
		this._desc = null;
		this._close.dispose();
		this._close = null;
		this._itemsBgImg = null;
		this._huoqutujGroup = null;
		if(this._list)
		{
			this._list.forEach((item,i)=>
			{
				Manager.pool.push(item);
			})
			this._list = null;
		}
	}
	
}