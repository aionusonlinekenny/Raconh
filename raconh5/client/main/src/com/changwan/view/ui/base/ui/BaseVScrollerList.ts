class BaseVScrollerList extends UIComponent
{
	public scroller:Scroller;
	public itemList:List;
	public isInit:boolean = false;

	public constructor()
	{
		super();

		this.skinName = Manager.path.getSkinName("common", "BaseVScrollerListSkin");
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
			this.itemList.dataProvider = new eui.ArrayCollection(data);
			this.itemList.itemRenderer = clz;
			this.itemList.allowMultipleSelection = false;
			this.itemList.width = this.width;
			this.itemList.height = this.height;
		}
		if(this.scroller)
		{
			this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
			if(canMove)
				this.scroller.scrollPolicyV = eui.ScrollPolicy.ON;
			else
				this.scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
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
		}
		this.scroller = null;

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