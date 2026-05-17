/**
 * 缥缈录二级界面
 * Simon
 * 2018.3.15
 */
class MaterialSecondView extends UIComponent
{
	//当前球体位置
	private static BALL_ITEM_BASE_LOCAL1:number = 76;
	//后面球体位置
	private static BALL_ITEM_BASE_LOCAL2:number = 300;
	private _baseView:BasePopUpView;
	private _bgGroup:eui.Group;
	private _ballGroup:eui.Group;
	private _nandu:eui.Image;
	private _starList:Array<eui.Image>;
	private _btn:Button;
	private _redIcon:eui.Image;
	private _needLevel:Label;

	private _bgImg:BitmapRemote;

	private _ballList:Array<MaterialBallItem>;
	private _beginPoint:number;
	private _curIndex:number;

	private _model:MaterialCopyModel;
	private _type:number;
	private _nextInfo:MaterialCopyCVO;
	private _inited:boolean = false;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("material", "MaterialSecondViewSkin");
		this.visible = false;
	}

	protected configUI():void
	{
		super.configUI();
		this.visible = true;
		this._bgGroup.touchEnabled = false;
		this._ballGroup.touchEnabled = false;

		this._baseView.titleImg.source = "material_award_png";
		this._baseView.diImgVisible = false;
		this._baseView.bgHeight = 744;

		if(this._bgImg == null)
		{
			this._bgImg = Manager.pool.create(BitmapRemote);
			this._bgImg.x = 0;
			this._bgImg.y = 344;
			this._baseView.addChildAt(this._bgImg, 2);
			this._bgImg.load(Manager.path.getPanelMaterialPath("material_di2", "jpg"));
		}

		this._starList = [];
		for(let i:number=0; i<5; i++)
		{
			this._starList.push(this["_star" + (i + 1)]);
		}

		this._ballGroup.mask = new egret.Rectangle(0, -20, this._ballGroup.width, this._ballGroup.height);

		this.onResizeHandler();
	}

	protected initData():void
	{
		super.initData();

		this._model = Manager.model.getMaterialCopy();
		this._nextInfo = MaterialCopyCVO.getCellInfo(this._model.getPassCellByType(this._type) + 1);

		this._curIndex = 0;

		this._ballList = [];
		for(let i:number=4; i>=0; i--)
		{
			let ballItem:MaterialBallItem = Manager.pool.create(MaterialBallItem, this);
			ballItem.anchorOffsetX = Math.round(ballItem.width / 2);
			ballItem.anchorOffsetY = Math.round(ballItem.height / 2);
			if(i == 0)
			{
				ballItem.x = MaterialSecondView.BALL_ITEM_BASE_LOCAL1 + Math.round(ballItem.width / 2);
				ballItem.y = Math.round(ballItem.height / 2) - 20;
			}
			else
			{
				ballItem.x = MaterialSecondView.BALL_ITEM_BASE_LOCAL2 + Math.round(ballItem.width / 2);
				ballItem.y = Math.round(ballItem.height / 2) - 20;
				ballItem.scaleX = ballItem.scaleY = 0.6;
			}
			ballItem.addEventListener(MaterialEvent.MATERIAL_CHECK_CAN_FIGHT, this.checkCanFightHandler, this);
			this._ballGroup.addChild(ballItem);
			this._ballList.push(ballItem);
		}
		this._ballList.reverse();

		for(let i:number=0; i<this._ballList.length; i++)
		{
			let cellId:number = ((this._type - 1) * MaterialCopyModel.CELL_MAX_COUNT) + (i * 3) + 1;
			let nextId:number = cellId;
			let has:boolean = false;
			if(this._model.getPassCellByType(this._type) != 0)
			{
				for(let j:number=0; j<3; j++)
				{
					if(this._model.getPassCellByType(this._type) < cellId + j)
					{
						nextId = cellId + j;
						has = true;
						break;
					}
					else if(this._model.getPassCellByType(this._type) == cellId + j)
					{
						nextId = cellId + j + 1;
						has = true;
						break;
					}
				}
			}
			if(!has) nextId = cellId + 2;
			if(nextId > cellId + 2) nextId = cellId + 2;
			if(Math.ceil(this._model.getPassCellByType(this._type) / MaterialCopyModel.CELL_MAX_COUNT) != this._type) nextId = cellId;
			let info:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(nextId);
			if(info)
			{
				this._ballList[i].type = info.type1;
				this._ballList[i].firstCellId = cellId;
				this._ballList[i].targetId = nextId;
				this._ballList[i].updateFight(info.fight);
			}

			this._ballList[i].showFightAndItem = i == this._curIndex;
		}

		if(Math.ceil(this._model.getPassCellByType(this._type) / MaterialCopyModel.CELL_MAX_COUNT) == this._type 
			&& this._nextInfo && this._nextInfo.type2 - 1 != this._curIndex)
			this.initMove();
		else
		{
			this._inited = true;
			this.updateInfo();
			this.updateEnterLevel();
		}

		//引导
		if(Manager.model.getGuide().curID == GuideID.MATERIAL)
		{
			let pos:egret.Point = this._btn.parent.localToGlobal(this._btn.x,this._btn.y);
			Manager.control.getTask().showGuide(pos, 119, 53, this.guideCB, this, false);
		}
	}

	private initMove():void
	{
		if(this._nextInfo && this._nextInfo.type2 - 1 != this._curIndex)
			this.handlerMove(30);
		else
			this._inited = true;
	}

	private updateInfo():void
	{
		this._nandu.source = "material_difficulty" + (this._curIndex + 1) + "_png";
		let id:number = ((this._type - 1) * MaterialCopyModel.CELL_MAX_COUNT) + (this._curIndex * 3) + 1;
		let info:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(id);
		if(info)
		{
			for(let i:number=0; i<this._starList.length; i++)
			{
				this._starList[i].visible = i + 1 <= info.type2 ? true: false;
			}
		}
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._baseView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._ballGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
	}

	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._baseView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		if(this._ballList)
		{
			for(let i:number=0; i<this._ballList.length; i++)
				this._ballList[i].removeEventListener(MaterialEvent.MATERIAL_CHECK_CAN_FIGHT, this.checkCanFightHandler, this);
		}
		super.removeEvent();
	}

	private checkCanFightHandler(e:MaterialEvent):void
	{
		let index:number = this._ballList.indexOf(e.currentTarget);
		if(index == -1) return;
		if(index == this._curIndex)
		{
			let info:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(this._ballList[this._curIndex].targetId);
			if(info && Manager.model.self.attrInfo.level >= info.conds.value)
				this._redIcon.visible = Manager.model.self.attrInfo.fight >= this._ballList[this._curIndex].curFight && !this._ballList[this._curIndex].isKillAll;
		}
	}

	private onResizeHandler(e?:GlobalEvent):void
	{
		this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
		this.y = -50;
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._baseView.closeBtn:
				Manager.view.hide(ViewID.MaterialSecondView);
				Manager.view.show(ViewID.MaterialPanel, 0, false);
				break;
			case this._btn:
				this.clickBtn(e);
				break;
		}
	}

	private clickBtn(e:egret.TouchEvent):void
	{
		if(e != null && Manager.model.getGuide().curID == GuideID.MATERIAL) return;
		let cell:number = 0;
		let list:Array<number> = this._model.passList[this._type];
		if(list.length > 0)
			cell = list[list.length - 1] + 1;
		else
			cell = (this._type - 1) * MaterialCopyModel.CELL_MAX_COUNT + 1;

		if(cell != 0)
		{
			let info:MaterialCopyCVO = MaterialCopyCVO.getCellInfo(cell);
			if(info)
			{
				if(Manager.model.self.attrInfo.level < info.conds.value)
				{
					FloatTips.addTips(LangCVO.getContent("material3", info.conds.value), Color.RED);
					return;
				}
			}
			Manager.control.getCopy().enter(CopyConst.ID_MATERIAL, cell);
			Manager.view.hide(ViewID.MaterialSecondView);
			Manager.view.hide(ViewID.MaterialPanel);
		}
	}

	private onBeginTouchHandler(e:egret.TouchEvent):void
	{
		this._beginPoint = e.stageX;

		this._ballGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
		this._ballGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
		this._ballGroup.addEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouchHandler,this);
		this._ballGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);
	}

	private onMoveHandler(e:egret.TouchEvent):void
	{
		let offset = this._beginPoint - e.stageX;
		this.handlerMove(offset);
	}

	private tweenCallBack(i:number):void
	{
		egret.Tween.removeTweens(this._ballList[i]);
		this.onEndTouchHandler();
	}

	private handlerMove(offset:number):void
	{
		for(let i:number=0; i<this._ballList.length; i++)
		{
			if(i == this._curIndex)
			{
				if(offset > 0 && this._curIndex < this._ballList.length - 1 || offset < 0 && this._curIndex > 0)
					this._ballList[i].x = MaterialSecondView.BALL_ITEM_BASE_LOCAL1 + Math.round(this._ballList[i].width / 2) - offset;
			}
		}

		let needCallEndTouch:boolean = false;
		
		if(offset > 20)
		{
			if(this._curIndex < this._ballList.length - 1)
			{
				this._ballGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
				this._ballGroup.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouchHandler,this);
				this._ballGroup.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);

				for(let i:number=0; i<this._ballList.length; i++)
				{
					if(i <= this._curIndex)
					{
						if(i == this._curIndex)
						{
							if(!this._inited)
							{
								this._ballList[i].x -= 568;
								this._ballList[i].scaleX = 0.6;
								this._ballList[i].scaleY = 0.6;
								needCallEndTouch = true;
							}
							else
							{
								egret.Tween.get(this._ballList[i]).to({x:this._ballList[i].x - 568, scaleX:0.6, scaleY:0.6}, 500).call(this.tweenCallBack,this,[i]);
							}
						}
						else
						{
							if(!this._inited)
							{
								this._ballList[i].x -= 568;
								this._ballList[i].scaleX = 0.6;
								this._ballList[i].scaleY = 0.6;
							}
							else
							{
								egret.Tween.get(this._ballList[i]).to({x:this._ballList[i].x - 568, scaleX:0.6, scaleY:0.6}, 500).call(egret.Tween.removeTweens,egret.Tween,[this._ballList[i]]);
							}
						}
					}
					else if(i == this._curIndex + 1)
					{
						if(!this._inited)
						{
							this._ballList[i].x = MaterialSecondView.BALL_ITEM_BASE_LOCAL1 + Math.round(this._ballList[i].width / 2);
							this._ballList[i].scaleX = 1;
							this._ballList[i].scaleY = 1;
						}
						else
						{
							egret.Tween.get(this._ballList[i]).to({x:MaterialSecondView.BALL_ITEM_BASE_LOCAL1 + Math.round(this._ballList[i].width / 2), scaleX:1, scaleY:1}, 500).call(egret.Tween.removeTweens,egret.Tween,[this._ballList[i]]);
						}
					}
				}

				this._curIndex +=1;
			}
		}
		
		if(offset < -20)
		{
			if(this._curIndex > 0)
			{
				this._ballGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
				this._ballGroup.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouchHandler,this);
				this._ballGroup.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);

				for(let i:number=0; i<this._ballList.length; i++)
				{
					if(i < this._curIndex - 1)
					{
						if(!this._inited)
						{
							this._ballList[i].x += 568;
							this._ballList[i].scaleX = 0.6;
							this._ballList[i].scaleY = 0.6;
						}
						else
						{
							egret.Tween.get(this._ballList[i]).to({x:this._ballList[i].x + 568, scaleX:0.6, scaleY:0.6}, 500).call(egret.Tween.removeTweens,egret.Tween,[this._ballList[i]]);
						}
					}
					else if(i == this._curIndex - 1)
					{
						if(!this._inited)
						{
							this._ballList[i].x = MaterialSecondView.BALL_ITEM_BASE_LOCAL1 + Math.round(this._ballList[i].width / 2);
							this._ballList[i].scaleX = 1;
							this._ballList[i].scaleY = 1;
						}
						egret.Tween.get(this._ballList[i]).to({x:MaterialSecondView.BALL_ITEM_BASE_LOCAL1 + Math.round(this._ballList[i].width / 2), scaleX:1, scaleY:1}, 500).call(egret.Tween.removeTweens,egret.Tween,[this._ballList[i]]);
					}
					else if(i == this._curIndex)
					{
						if(!this._inited)
						{
							this._ballList[i].x = MaterialSecondView.BALL_ITEM_BASE_LOCAL2 + Math.round(this._ballList[i].width / 2);
							this._ballList[i].scaleX = 0.6;
							this._ballList[i].scaleY = 0.6;
							needCallEndTouch = true;
						}
						else
						{
							egret.Tween.get(this._ballList[i]).to({x:MaterialSecondView.BALL_ITEM_BASE_LOCAL2 + Math.round(this._ballList[i].width / 2), scaleX:0.6, scaleY:0.6}, 500).call(this.tweenCallBack,this,[i]);
						}
					}
				}

				this._curIndex -=1;
			}
		}

		this.updateInfo();

		if(needCallEndTouch) this.onEndTouchHandler();
	}

	private onEndTouchHandler(e?:egret.TouchEvent):void
	{
		this._ballGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouchHandler, this);
		this._ballGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveHandler,this);
		this._ballGroup.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouchHandler,this);
		this._ballGroup.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouchHandler, this);

		for(let i:number=0; i<this._ballList.length; i++)
		{
			this._ballList[i].showFightAndItem = i == this._curIndex;
		}

		this._redIcon.visible = Manager.model.self.attrInfo.fight >= this._ballList[this._curIndex].curFight && !this._ballList[this._curIndex].isKillAll;

		this.updateEnterLevel();

		if(!this._inited) this.initMove();

		//引导
		if(Manager.model.getGuide().curID == GuideID.MATERIAL) Manager.control.getTask().hideGuide();
	}

	private updateEnterLevel():void
	{
		let list:Array<number> = this._model.passList[this._type];
		let cellId:number = (this._type - 1) * MaterialCopyModel.CELL_MAX_COUNT + this._curIndex * 3 + 1;
		let info:MaterialCopyCVO;
		for(let i:number=0; i<3; i++)
		{
			if(list.indexOf(cellId + i) == -1)
			{
				info = MaterialCopyCVO.getCellInfo(cellId + i);
				break;
			}
			else
			{
				if(i == 2)
					info = MaterialCopyCVO.getCellInfo(cellId + i);
			}
		}
		if(info)
		{
			let color:string = Color.WHITE_STR;
			if(Manager.model.self.attrInfo.level < info.conds.value)
				color = Color.RED_STR;
			HtmlUtil.setTextFlow(this._needLevel, "<font color='"+ color +"'>" + LangCVO.getContent("material2", info.conds.value) + "</font>");
		}
	}

	private guideCB():void
	{
		this.clickBtn(null);
		Manager.control.getTask().hideGuide();
	}

	public show(type:number):void
	{
		this._type = type;
		Manager.layer.tipsLayer.addChild(this);
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose():void
	{
		if(Manager.model.getGuide().curID == GuideID.MATERIAL) Manager.control.getTask().hideGuide();
		super.dispose();
		ObjectUtil.removes(this._baseView, this._bgGroup, this._ballGroup, this._nandu, this._btn, this._bgImg, this._needLevel);
		if(this._baseView)
			this._baseView.dispose();
		this._baseView = null;
		if(this._ballList)
		{
			for(let i:number=0; i<this._ballList.length; i++)
			{
				egret.Tween.removeTweens(this._ballList[i]);
				this._ballList[i].dispose();
				this._ballList[i] = null;
			}
			this._ballList = null;
		}
		this._bgGroup = null;
		this._ballGroup = null;
		this._nandu = null;
		if(this._starList)
		{
			for(let i:number=0; i<this._starList.length; i++)
			{
				if(this._starList[i] && this._starList[i].parent)
					this._starList[i].parent.removeChild(this._starList[i]);
				this._starList[i] = null;
			}
			this._starList = null;
		}
		if(this._needLevel)
			this._needLevel.dispose();
		this._needLevel = null;
		if(this._btn)
			this._btn.dispose();
		this._btn = null;
		if(this._bgImg)
			Manager.pool.push(this._bgImg);
		this._bgImg = null;
		if(this._ballList)
		{
			for(let i:number=0; i<this._ballList.length; i++)
			{
				if(this._ballList[i])
				{
					Manager.pool.push(this._ballList[i]);
					this._ballList[i] = null;
				}
			}
			this._ballList = null;
		}
		this._model = null;
		this._nextInfo = null;
	}
}