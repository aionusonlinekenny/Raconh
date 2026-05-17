class BaseHScrollerList2 extends UIComponent
{
	public scroller:Scroller;
	public itemList:List;
	public isInit:boolean = false;

	public constructor()
	{
		super();

		this.skinName = '<?xml version="1.0" encoding="utf-8"?>'
			+ '<e:Skin class="BaseHScrollerListSkin" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" xmlns:ns1="*" >'
			+ '<w:Config id="15f5cb7188c" ></w:Config>'
			+ '<ns1:Scroller id="scroller" x="0" anchorOffsetX="0" anchorOffsetY="0" y="0">'
			+ '<ns1:List id="itemList" x="0" y="0">'
			+ '<e:layout>'
			+ '<e:HorizontalLayout horizontalAlign="center" verticalAlign="middle"/>'
			+ '</e:layout>'
			+ '</ns1:List>'
			+ '</ns1:Scroller>'
			+ '</e:Skin>';
		this.touchChildren = true;
	}

	/**
	 * clz:对象类
	 * data:对象数据
	 * canMove:是否允许滚动
	 */
	public initBtnListData(clz:any, data:Array<any>, canMove:boolean = false):void
	{
		if(this.itemList)
		{
			if(data)
			{
				for(let i:number=0; i<data.length; i++)
				{
					if(i == 0)
						data[i].isSelected = true;
					else
						data[i].isSelected = false;
				}
			}
			this.itemList.dataProvider = new eui.ArrayCollection(data);
			this.itemList.itemRenderer = clz;
			this.itemList.allowMultipleSelection = false;
			this.itemList.width = this.width;
			this.itemList.height = this.height;
		}
		if(this.scroller)
		{
			this.scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
			if(canMove)
				this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
			else
				this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
		}
		this.isInit = true;
	}

	public dataProvider(data:Array<any>)
	{
		this.itemList.dataProvider = new eui.ArrayCollection(data);
	}

	public dispose():void
	{
		if(this.scroller)
        {
		    this.scroller.stopAnimation();
			this.scroller.dispose();
		    this.scroller = null;
        }
		if(this.itemList)
        {
			let len = this.itemList.numChildren;
			for(let i = 0; i < len; i++)
			{
				ObjectUtil.dispose(this.itemList.getChildAt(0));
			}
			this.itemList.dispose();
		    this.itemList = null;
        }
		super.dispose();
	}
}