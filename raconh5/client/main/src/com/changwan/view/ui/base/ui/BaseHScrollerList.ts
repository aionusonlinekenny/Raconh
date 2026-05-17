class BaseHScrollerList extends UIComponent
{
	public scroller:Scroller;
	public itemList:List;
	public isInit:boolean = false;

	public constructor()
	{
		super();

		this.skinName = Manager.path.getSkinName("common", "BaseHScrollerListSkin");
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
		this.scroller.stopAnimation();
		if(this.scroller)
			this.scroller.dispose();
		this.scroller = null;

		if(this.itemList)
			this.itemList.dispose();
		this.itemList = null;
		
		super.dispose();
	}
}