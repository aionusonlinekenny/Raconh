/**
 * 背包
 * pzx
 * 2018.4.9
 */
class BagView2 extends UIComponent
{
    private readonly PAGE_SIZE:number = 30;
    private readonly COL:number = 5;
    private readonly SPACING:number = -20;

	private _contentTxt:Label;
	private _pageGroup:UiPageGroup;

	//格子容器
	private _container:Sprite;
    private _itemContainer:Sprite;
    private _itemObject1:ItemObject;
    private _itemObject2:ItemObject;
	private _curItem:ItemObject;
	private _curnum:number=1;

	private _model:ItemsModel;
    private _curPage:number = 0;
    private _beginPoint:number;
	private _curLocal:number = 0;

	private _rongLianBtn:Button;
	private _diuHuanBtn:Button;
	private _thisParent:BagPanel;

	public constructor(thisParent:BagPanel)
	{
		super();
		this._thisParent = thisParent;
		this.skinName = Manager.path.getSkinName("bag", "BagViewSkin");
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
		this._model.sortBagList();

		if(this._pageGroup==null)
		{
			this._pageGroup = new UiPageGroup(5);
			this._pageGroup.touchEnabled = false;
			this._pageGroup.touchChildren = false;
			this.addChild(this._pageGroup);
			this._pageGroup.x = 260;
			this._pageGroup.y = 910;
		}
		this._pageGroup.onSelection(0);
		
	}

	// public reuse(thisParent:BagPanel):void
	// {
	// 	super.reuse();
	// 	this._thisParent = thisParent;
	// }

	// public unuse():void
	// {
	// 	super.unuse();
	// 	this._thisParent = null;
	// 	this._model = null;
	// 	this._contentTxt.text="";
	// }
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
		this._rongLianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._diuHuanBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
	}

    protected removeEvent():void
    {
		this._model.removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.updateView,this);
		this._container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouchHandler,this);
		this._container.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
		this._rongLianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._diuHuanBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
	}
	private onClickHandler(e:egret.TouchEvent):void
	{
		if(e.target == this._rongLianBtn)
		{
			this._thisParent.show(2);
				return;
		}
		if(e.target == this._diuHuanBtn)
		{
			if(Manager.model.getMap().getId() == MapConst.ID_HOME || Manager.model.getMap().mapCVO.isFieldMap)
			{
				if(OpenCVO.isOpen(OpenConst.ID_MARKET,true))
				{
					Manager.link.link(2,10003)
				}
			}
			else
			{
				FloatTips.addTips(LangCVO.getContent("bag2"),Color.RED);//此地图不能摆摊
			}
			return;
		}
	}

	private updateView(e:ItemsEvent=null):void
	{
		if(!e || e.params == ItemsType.BAG)
			this.invalidate("drawView");
	}

	private drawView():void
	{
		if(this._curItem)
		{
			let arr:Array<ItemsModelInfo> = this._model.bagList;
			let infoList:Array<ItemsModelInfo> = [];
			for(let i:number=this._curPage * this.PAGE_SIZE; i<(this._curPage + 1) * this.PAGE_SIZE; i++)
			{
				infoList.push(arr[i]);
			}
			
			this._curItem.updateItemInfo(infoList);
		}
        else
		{
			let arr:Array<ItemsModelInfo> = this._model.bagList;
			let infoList:Array<ItemsModelInfo> = [];
			for(let i:number=this._curPage * this.PAGE_SIZE; i<(this._curPage + 1) * this.PAGE_SIZE; i++)
			{
				infoList.push(arr[i]);
			}
			
			this._itemObject1 = Manager.pool.create(ItemObject, infoList, this.COL, this.SPACING);
			this._itemObject1.touchChildren = true;
			this._itemObject2 = Manager.pool.create(ItemObject,[],this.COL,this.SPACING);
			this._itemObject2.touchChildren = true;
			this._itemObject1.x = 50;
			this._itemObject2.x = 50 + (141 + this.SPACING) * 5 + 30;
			this._itemObject2.y=this._itemObject1.y = 130;
			this._itemContainer.addChild(this._itemObject1);
			this._itemContainer.addChild(this._itemObject2);
			this._curItem = this._itemObject1;
		}

		this._contentTxt.text = this._model.bagList.length + "/" + this._model.bagTotal;
	}

	private onBeginTouchHandler(e:egret.TouchEvent):void
	{
		this._beginPoint = e.stageX;
		this._container.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
	}

	private onMoveHandler(e:egret.TouchEvent):void
	{
		let offset = this._beginPoint - e.stageX;
		if(Math.abs(offset)>80)
		{
			if(this._curPage >= this._pageGroup.totalpage-1 && offset > 0) return;
			if(this._curPage == 0 && offset < 0) return;
			this._container.touchChildren = false;
			this.handlerMove(offset);
			this._container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouchHandler,this);
			this._container.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this)
		}
	}

    private handlerMove(offset:number):void
	{
		let arr:Array<ItemsModelInfo> = this._model.bagList;
		let infoList:Array<ItemsModelInfo> = [];
		let item:ItemObject;
		let item2:ItemObject;
		if(this._curnum != 1)
		{
			item = this._itemObject1;
			item2 = this._itemObject2;
		}
		else
		{
			item = this._itemObject2;
			item2 = this._itemObject1;
		}

        //向左
        if(offset > 70)
		{
          
				this._curPage = this._pageGroup.page + 1;
				for(let i:number=this._curPage * this.PAGE_SIZE; i<(this._curPage + 1) * this.PAGE_SIZE; i++)
				{
					infoList.push(arr[i]);
				}
				item.updateItemInfo(infoList);
                item.x = item2.x + ((141 + this.SPACING) * 5 + 30);
				egret.Tween.get(this._itemContainer,{loop:false}).to({x:-((141 + this.SPACING) * 5 + 30) * this._curPage}, 500).call(this.moveComplete, this);
            
        }

        //向右
        if(offset < -70)
		{
				this._curPage = this._pageGroup.page-1;
				for(let i:number=this._curPage * this.PAGE_SIZE; i<(this._curPage + 1) * this.PAGE_SIZE; i++)
				{
					infoList.push(arr[i]);
				}
                
               item.updateItemInfo(infoList);
               item.x = item2.x - ((141 + this.SPACING) * 5 + 30);
               egret.Tween.get(this._itemContainer,{loop:false}).to({x:-((141 + this.SPACING) * 5 + 30)* this._curPage}, 500).call(this.moveComplete, this);
        }
		this._curItem = item;
    }

    private moveComplete():void
    {
		if(this._curnum != 1)
		{
			this._curnum = 1;
		}
		else
		{
			this._curnum = 2;
		}
		this._pageGroup.onSelection(this._curPage);
		this._container.touchChildren = true;
		this._container.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouchHandler,this);
    }

	public dispose():void
	{
		super.dispose();

		egret.Tween.removeTweens(this._itemContainer);
		this._container.mask = null;
		ObjectUtil.removes(this._contentTxt, this._pageGroup, this._itemObject1, this._itemObject2, this._itemContainer, this._container, this._rongLianBtn, this._diuHuanBtn, this._curItem);
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
		if(this._curItem)
			this._curItem.dispose();
		this._curItem = null;
		if(this._itemContainer)
			Manager.pool.push(this._itemContainer);
		this._itemContainer = null;
		if(this._container)
			Manager.pool.push(this._container);
		this._container = null;
		if(this._rongLianBtn)
			this._rongLianBtn.dispose();
		this._rongLianBtn = null;
		if(this._diuHuanBtn)
			this._diuHuanBtn.dispose();
		this._diuHuanBtn = null;
		this._model = null;
	}
}