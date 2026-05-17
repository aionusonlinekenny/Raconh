/**
 * 缥缈录
 * Simon
 * 2018.3.14
 */
class MaterialPanel extends Panel
{
	/**每页显示大关数 */
	private static ITEM_COUNT:number = 13;
	
	private static ITEMS_LOCAL_LIST1:Array<egret.Point> = [
		new egret.Point(50, 280), new egret.Point(270, 370), new egret.Point(500, 250), 
		new egret.Point(110, 500), new egret.Point(410, 470), new egret.Point(540, 520),
		new egret.Point(60, 700), new egret.Point(300, 740), new egret.Point(480, 720), 
		new egret.Point(70, 1000), new egret.Point(230, 950), new egret.Point(410, 1000), new egret.Point(600, 900)
	];
	private static ITEMS_LOCAL_LIST2:Array<egret.Point> = [
		new egret.Point(110, 280), new egret.Point(410, 370), new egret.Point(540, 250), 
		new egret.Point(50, 500), new egret.Point(270, 470), new egret.Point(500, 520),
		new egret.Point(70, 700), new egret.Point(230, 740), new egret.Point(410, 720), 
		new egret.Point(60, 1000), new egret.Point(300, 950), new egret.Point(480, 1000), new egret.Point(600, 970)
	];

	private _mapGroup:eui.Group;
	private _mapView:MaterialMapView;
	private _itemGroup:eui.Group;
	private _box:eui.Image;
	private _star:Label;
	private _getAll:eui.Image;
	private _redIcon:eui.Image;

	private _beginPoint:number;
	private _curRotation:number;
	private _isMoving:boolean = false;

	private _curIndex:number;
	private _itemList:Array<MaterialCheckPointItem>;
	private _itemLocalList:Array<Array<egret.Point>>;
	private _isRemoveItem:boolean = false;
	private _noUseItemList:Array<MaterialCheckPointItem>;

	private _model:MaterialCopyModel;
	private _isMove:boolean;
	/**推荐项索引 */
	private _suggestInex:number;
	/**不移除引导 */
	private _notRemoveGuide:boolean;


	public constructor()
	{
		super();
		this.skinName = Manager.path.getSkinName("material", "MaterialPanelSkin");
	}

    protected configUI():void
    {
        super.configUI();

		this._model = Manager.model.getMaterialCopy();

		this._mapGroup.touchEnabled = false;
		this._itemGroup.touchEnabled = false;

		this.basePanel.title = "material_title_png";

		if(!this._mapView)
		{
			this._mapView = new MaterialMapView(this);
			this._mapView.anchorOffsetX = Math.round(MaterialMapView.MAPIMG_WIDTH / 2);
			this._mapView.anchorOffsetY = MaterialMapView.MAPIMG_HEIGHT + 700;
			this._mapView.x = Math.round(this.width / 2);
			this._mapView.y = MaterialMapView.MAPIMG_HEIGHT + 780;
			this._mapGroup.addChild(this._mapView);
		}

		this._mapGroup.mask = new egret.Rectangle(5, 118, 712, 1157);
		this._itemGroup.mask = new egret.Rectangle(5, 118, 712, 1157);

		this._itemLocalList = [
			MaterialPanel.ITEMS_LOCAL_LIST1, 
			MaterialPanel.ITEMS_LOCAL_LIST2, 
			MaterialPanel.ITEMS_LOCAL_LIST1, 
			MaterialPanel.ITEMS_LOCAL_LIST2
		];

		this._noUseItemList = [];
		for(let i:number=0; i<2; i++)
		{
			let item:MaterialCheckPointItem = new MaterialCheckPointItem();
			item.x = 670;
			item.y = 380 + i * 300;
			this._noUseItemList.push(item);
		}

		let value:string = "<font color='"+ Color.RED_STR +"'>0/0</font>";
		HtmlUtil.setTextFlow(this._star, value);
	}

	protected initData():void
	{
		super.initData();
		Manager.control.getMaterialCopy().getAwardCell();
	}

	public onMapLoadComplete():void
	{
		this.initItem();
		this.playInitAnimation();
		this.updateItemInfo();
	}

	/**初始化大关卡项 */
	private initItem():void
	{
		this._itemList = [];
		let list:Array<egret.Point> = this._itemLocalList[0];
		for(let i:number=0; i<list.length; i++)
		{
			let item:MaterialCheckPointItem = new MaterialCheckPointItem();
			item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
			this._itemList.push(item);
		}
	}

	/**播放初始化动画 */
	private playInitAnimation():void
	{
		this._isRemoveItem = true;

		let recommendCell:number = this._model.getRecommendCell();
		if(recommendCell != 0)
		{
			let localPage:number = Math.ceil(recommendCell / MaterialPanel.ITEM_COUNT);
			this._curRotation = 24 - (localPage - 1) * 12;
			this._curIndex = localPage - 1;
		}
		else
		{
			this._curRotation = 24;
			this._curIndex = 0;
		}

		this._mapView.rotation = this._curRotation - 12;
		if(this._mapView.rotation < -12) this._mapView.rotation = -12;

		this._isMoving = true;
		if(this._isMove && this._mapView.rotation != this._curRotation)
			egret.Tween.get(this._mapView).to({rotation:this._curRotation}, 1000).call(this.onTouchComplete,this);
		else
		{
			this._mapView.rotation = this._curRotation;
			this.onTouchComplete();
		}
	}

	protected addEvent():void
	{
		super.addEvent();
		this._box.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._mapView.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
		this._model.addEventListener(MaterialEvent.MATERIAL_GET_AWARD_CELL, this.onGetAwardCellUpdateHandler, this);
	}

	protected removeEvent():void
	{
		this._box.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._mapView.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
		this._mapView.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
		this._mapView.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouchHandler,this);
		this._mapView.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);
		this._model.removeEventListener(MaterialEvent.MATERIAL_GET_AWARD_CELL, this.onGetAwardCellUpdateHandler, this);

		if(this._itemList)
		{
			for(let i:number=0; i<this._itemList.length; i++)
			{
				this._itemList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
			}
		}

		super.removeEvent();
	}

	protected onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this.basePanel.backBtn:
				break;
			case this.basePanel.closeBtn:
				Manager.view.hide(ViewID.MaterialPanel);
				break;
			case this._box:
				if(this._model.getAwardId != MaterialCopyDataCVO.MAX_ID)
					Manager.view.show(ViewID.MaterialGetBoxView);
				break;
		}
	}

	private onClickItemHandler(e:egret.TouchEvent):void
	{
		let index:number = this._itemList.indexOf(e.currentTarget);
		if(index == -1) return;
		//正在缥缈录引导中
		if(Manager.model.getGuide().curID == GuideID.MATERIAL)
		{
			if(this._suggestInex != index) Manager.control.getTask().hideGuide();
			else this._notRemoveGuide = true;
		}

		Manager.view.show(ViewID.MaterialSecondView, (index + 1) + this._curIndex * MaterialPanel.ITEM_COUNT);
		Manager.view.hide(ViewID.MaterialPanel);
	}

	private onBeginTouchHandler(e:egret.TouchEvent):void
	{
		if(this._isMoving) return;
		this._beginPoint = e.stageX;

		this._mapView.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
		this._mapView.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
		this._mapView.addEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouchHandler,this);
		this._mapView.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);
	}

	private onMoveHandler(e:egret.TouchEvent):void
	{
		let offset = this._beginPoint - e.stageX;
		let tmpRotation:number = this._curRotation - (offset / 720 * 16);
		if(tmpRotation < -24)
			tmpRotation = -24;
		else if(tmpRotation > 24)
			tmpRotation = 24;

		if(Math.abs(tmpRotation - this._curRotation) > 0.8 && !this._isRemoveItem)
		{
			this._isRemoveItem = true;
			this.removeItems();
		}
		this._mapView.rotation = tmpRotation;
	}

	private onEndTouchHandler(e:egret.TouchEvent):void
	{
		this._mapView.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
		this._mapView.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
		this._mapView.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouchHandler,this);
		this._mapView.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);

		if(this._mapView.rotation >= 16)
		{
			this._curRotation = 24;
			this._curIndex = 0;
		}
		else if(this._mapView.rotation < 16 && this._mapView.rotation >= 0)
		{
			this._curRotation = 8;
			this._curIndex = 1;
		}
		else if(this._mapView.rotation < 0 && this._mapView.rotation >= -16)
		{
			this._curRotation = -8;
			this._curIndex = 2;
		}
		else if(this._mapView.rotation < -16)
		{
			this._curRotation = -24
			this._curIndex = 3;
		}

		if(this._mapView.rotation != this._curRotation)
		{
			this._isMoving = true;
			egret.Tween.get(this._mapView).to({rotation:this._curRotation}, 200).call(this.onTouchComplete,this);
		}
	}

	private onTouchComplete():void
	{
		egret.Tween.removeTweens(this._mapView);
		this._isMoving = false;

		if(this._isRemoveItem)
		{
			this._isRemoveItem = false;
			this.showItems();
			this.updateItemInfo();
		}
	}

	private showItems():void
	{
		for(let i:number=0; i<this._itemList.length; i++)
		{
			if(this._itemList[i])
			{
				this._itemList[i].x = this._itemLocalList[this._curIndex][i].x;
				this._itemList[i].y = this._itemLocalList[this._curIndex][i].y;
				this._itemList[i].redIcon.visible = false;
				this._itemGroup.addChild(this._itemList[i]);
			}
		}
		if(this._curIndex < 3)
		{
			for(let i:number=0; i<this._noUseItemList.length; i++)
			{
				if(this._noUseItemList[i])
					this._itemGroup.addChild(this._noUseItemList[i]);
			}
		}

		let isShowRedIcon:boolean = false;
		for(let i:number=0; i<this._itemList.length; i++)
		{
			let id:number = (i * MaterialCopyModel.CELL_MAX_COUNT + 1) + this._curIndex * MaterialPanel.ITEM_COUNT * MaterialCopyModel.CELL_MAX_COUNT;
			let cvo:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(id);
			if(cvo)
			{
				this._itemList[i].name = cvo.name;
				this._itemList[i].star = 0;

				if(!isShowRedIcon)
				{
					let list:Array<number> = this._model.passList[cvo.type1];
					for(let j:number=id; j<id + 3; j++)
					{
						if(list.indexOf(j) == -1)
						{
							let info:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(j);
							if(info)
							{
								isShowRedIcon = Manager.model.self.attrInfo.fight >= info.fight && Manager.model.self.attrInfo.level >= info.conds.value;
								this._itemList[i].redIcon.visible = isShowRedIcon;
								break;
							}
						}
					}
				}
				else
					this._itemList[i].redIcon.visible = false;
				
				if(this._model.getPassCellByType(cvo.type1) > 0)
				{
					for(let j=id + 14; j>=id; j--)
					{
						if(j <= this._model.getPassCellByType(cvo.type1))
						{
							let info:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(j);
							if(info)
								this._itemList[i].star = info.star;
							break;
						}
					}
				}
			}
			else
			{
				if(this._itemList[i] && this._itemList[i].parent)
					this._itemList[i].parent.removeChild(this._itemList[i]);
			}
		}
	}

	private removeItems():void
	{
		for(let i:number=0; i<this._itemList.length; i++)
		{
			if(this._itemList[i] && this._itemList[i].parent)
				this._itemList[i].parent.removeChild(this._itemList[i]);
		}

		for(let i:number=0; i<this._noUseItemList.length; i++)
		{
			if(this._noUseItemList[i] && this._noUseItemList[i].parent)
				this._noUseItemList[i].parent.removeChild(this._noUseItemList[i]);
		}
	}

	private updateItemInfo():void
	{
		let type:number = this._model.getCommendItem();
		if(type != 0)
		{
			for(let i:number=0; i<this._itemList.length; i++)
			{
				let id:number = (i + 1) + this._curIndex * MaterialPanel.ITEM_COUNT;
				if(type == id)
				{
					this._itemList[i].showTuijian = true;
					//引导
					if(Manager.model.getGuide().curID == GuideID.MATERIAL && this._itemList[i].parent != null)
					{
						this._suggestInex = i;
						let pos:egret.Point = this._itemList[i].parent.localToGlobal(this._itemList[i].x,this._itemList[i].y);
						Manager.control.getTask().showGuide(pos, this._itemList[i].width>>1, this._itemList[i].height>>1,
															this.guideCB, this, false);
					}
				}
				else
					this._itemList[i].showTuijian = false;
			}
		}
	}

	private onGetAwardCellUpdateHandler(e:MaterialEvent):void
	{
		let color:string;
		let value:string;
		let nextInfo:MaterialCopyDataCVO = MaterialCopyDataCVO.getInfo(this._model.getAwardId + 1);
		this._redIcon.visible = false;
		if(nextInfo)
		{
			if(this._model.curStar >= nextInfo.star)
			{
				color = Color.WHITE_STR;
				this._redIcon.visible = true;
			}
			else
				color = Color.RED_STR;
			value = "<font color='"+ color +"'>" + this._model.curStar + "/" + nextInfo.star + "</font>";
			this._getAll.visible = false;
		}
		else
		{
			color = Color.WHITE_STR;
			value = "<font color='"+ color +"'>" + this._model.curStar + "/" + this._model.curStar + "</font>";
			this._getAll.visible = true;
		}

		HtmlUtil.setTextFlow(this._star, value);
	}

	private guideCB():void
	{
		this._notRemoveGuide = true;
		Manager.view.show(ViewID.MaterialSecondView, (this._suggestInex + 1) + this._curIndex * MaterialPanel.ITEM_COUNT);
		Manager.view.hide(ViewID.MaterialPanel);
	}

	public show(tabIndex:number = 0, isMove:boolean = true):void
	{
		this._isMove = isMove;
		super.show(tabIndex);
	}

	public dispose():void
	{
		egret.Tween.removeTweens(this._mapView);
		if(!this._notRemoveGuide && Manager.model.getGuide().curID == GuideID.MATERIAL) Manager.control.getTask().hideGuide();
		super.dispose();
		ObjectUtil.removes(this._mapGroup, this._mapView, this._itemGroup, this._box, this._star, this._getAll, this._redIcon);
		this._mapGroup = null;
		if(this._mapView)
			this._mapView.dispose();
		this._mapView = null;
		this._itemGroup = null;
		this._box = null;
		if(this._star)
			this._star.dispose();
		this._star = null;
		this._getAll = null;
		this._redIcon = null;
		if(this._itemList)
		{
			for(let i:number=0; i<this._itemList.length; i++)
			{
				this._itemList[i].dispose();
				this._itemList[i] = null;
			}
			this._itemList = null;
		}
		this._itemLocalList = null;
		if(this._noUseItemList)
		{
			for(let i:number=0; i<this._noUseItemList.length; i++)
			{
				this._noUseItemList[i].dispose();
				this._noUseItemList[i] = null;
			}
			this._noUseItemList = null;
		}
		this._model = null;
		this._suggestInex = -1;
		this._notRemoveGuide = false;
	}
}