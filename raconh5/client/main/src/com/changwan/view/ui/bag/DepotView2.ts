/**
 * 仓库
 * Simon
 * 2018.4.9
 */
class DepotView2 extends UIComponent
{
    private readonly PAGE_SIZE:number = 35;
    private readonly COL:number = 5;
    private readonly SPACING:number = -20;

	private _contentTxt:Label;
	private _pageGroup:UiPageGroup;

	//格子容器
	private _container:Sprite;
    private _itemContainer:Sprite;
    private _itemObject1:ItemObject;
    private _itemObject2:ItemObject;

	private _model:ItemsModel;
    private _curPage:number = 0;
    private _beginPoint:number;
	private _curLocal:number = 0;

	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("bag", "depotViewSkin");
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();

		this._container = Manager.pool.create(Sprite);
        this._container.touchEnabled = true;
		this._container.touchChildren = true;
		this.addChild(this._container);

        this._itemContainer = Manager.pool.create(Sprite);
		this._itemContainer.touchChildren = true;
        this._container.addChild(this._itemContainer);

		this._container.mask = new egret.Rectangle(50,140,640,900);

		this._model = Manager.model.getItems();
		this._model.sortDepotList();

		if(!this._pageGroup)
		{
			this._pageGroup = new UiPageGroup(2);
			this._pageGroup.touchEnabled = false;
			this._pageGroup.touchChildren = false;
			this.addChild(this._pageGroup);
			this._pageGroup.x = 320;
			this._pageGroup.y = 1040;
		}
		this._pageGroup.onSelection(0);
	}

    protected drawAll():void
	{
		super.drawAll();
		this.drawView();
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawView"))this.drawView();
	}

	protected addEvent():void
    {
		this._model.addEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.updateView,this);
		this._container.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouchHandler,this)
	}

    protected removeEvent():void
    {
		this._model.removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.updateView,this);
		this._container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouchHandler,this);
		this._container.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
		this._container.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouchHandler,this);
		this._container.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);
	}

	private updateView(e:ItemsEvent=null):void
	{
		if(!e || e.params == ItemsType.DEPOT)
			this.invalidate("drawView");
	}

	private drawView():void
	{
        let arr:Array<ItemsModelInfo> = this._model.depotList;
        let infoList:Array<ItemsModelInfo> = [];
        for(let i:number=this._curPage * this.PAGE_SIZE; i<(this._curPage + 1) * this.PAGE_SIZE; i++)
        {
            infoList.push(arr[i]);
        }
        if(this._itemObject1)
        {
			this._itemObject1.updateItemInfo(infoList);
		}
		else
		{
			this._itemObject1 = Manager.pool.create(ItemObject, infoList, this.COL, this.SPACING);
		}
		
		this._itemObject1.touchChildren = true;
		if(this._curPage == 0)
        	this._itemObject1.x = 50;
		else if(this._curPage == 1)
			this._itemObject1.x = 50 + (141 + this.SPACING) * 5 + 30;
        this._itemObject1.y = 130;
		this._itemContainer.addChild(this._itemObject1);

		this._contentTxt.text = this._model.depotList.length + "/" + this._model.deoptTotal;
	}

	private onBeginTouchHandler(e:egret.TouchEvent):void
	{
		this._beginPoint = e.stageX;
		this._container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouchHandler,this)
		this._container.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
		this._container.addEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouchHandler,this);
		this._container.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);
	}

	private onMoveHandler(e:egret.TouchEvent):void
	{
        this._container.touchChildren = false;
		let offset = this._beginPoint - e.stageX;
		if(Math.abs(offset)>80)
		{
			this._container.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
			this.handlerMove(offset);
		}
	}

    private handlerMove(offset:number):void
	{
		if(this._curPage == 1 && offset > 0) offset = 0;
		if(this._curPage == 0 && offset < 0) offset = 0;
        this._itemContainer.x = this._curLocal - offset;
		if(this._itemContainer.x < -((141 + this.SPACING) * 5 + 30))
			this._itemContainer.x = -((141 + this.SPACING) * 5 + 30);
		else if(this._itemContainer.x > 0)
			this._itemContainer.x = 0;

		let arr:Array<ItemsModelInfo> = this._model.depotList;
		let infoList:Array<ItemsModelInfo> = [];

        //向左
        if(offset > 20)
		{
            if(!this._itemObject2)
            {
				this._curPage = 1;
				for(let i:number=this._curPage * this.PAGE_SIZE; i<(this._curPage + 1) * this.PAGE_SIZE; i++)
				{
					infoList.push(arr[i]);
				}

                this._itemObject2 = Manager.pool.create(ItemObject, infoList, this.COL, this.SPACING);
				this._itemObject2.touchChildren = true;
                this._itemObject2.x = 50 + (141 + this.SPACING) * 5 + 30;
                this._itemObject2.y = 130;
                this._itemContainer.addChild(this._itemObject2);

                egret.Tween.get(this._itemContainer).to({x:-((141 + this.SPACING) * 5 + 30)}, 500).call(this.moveComplete, this);
            }
        }

        //向右
        if(offset < -20)
		{
            if(!this._itemObject2)
            {
				this._curPage = 0;
				for(let i:number=this._curPage * this.PAGE_SIZE; i<(this._curPage + 1) * this.PAGE_SIZE; i++)
				{
					infoList.push(arr[i]);
				}
                
                this._itemObject2 = Manager.pool.create(ItemObject, infoList, this.COL, this.SPACING);
                this._itemObject2.x = 50;
                this._itemObject2.y = 130;
                this._itemContainer.addChild(this._itemObject2);

                egret.Tween.get(this._itemContainer).to({x:0}, 500).call(this.moveComplete, this);
            }
        }
    }

    private moveComplete():void
    {
		this._curLocal = this._itemContainer.x;
		this._itemObject1.updateItemInfo(this._itemObject2.getItemInfo());
		this._itemObject1.x = this._itemObject2.x;
		this._itemObject1.y = this._itemObject2.y;
		Manager.pool.push(this._itemObject2);
		this._itemObject2 = null;

		this._pageGroup.onSelection(this._curPage);
    }

	private onEndTouchHandler(e:egret.TouchEvent = null):void
	{
		this._container.touchChildren = true;
		this._container.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouchHandler,this)
		this._container.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
		this._container.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouchHandler,this);
		this._container.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);
	}

	public dispose():void
	{
		super.dispose();

		egret.Tween.removeTweens(this._itemContainer);
		this._container.mask = null;
		ObjectUtil.removes(this._contentTxt, this._pageGroup, this._itemObject1, this._itemObject2, this._itemContainer, this._container);
		if(this._contentTxt)
			this._contentTxt.dispose();
		this._contentTxt = null;
		if(this._pageGroup)
			this._pageGroup.dispose();
		this._pageGroup = null;
		if(this._itemObject1)
			this._itemObject1.dispose();
		this._itemObject1 = null;
		if(this._itemObject2)
			this._itemObject2.dispose();
		this._itemObject2 = null;
		if(this._itemContainer)
			Manager.pool.push(this._itemContainer);
		this._itemContainer = null;
		if(this._container)
			Manager.pool.push(this._container);
		this._container = null;
		this._model = null;
		
	}
}