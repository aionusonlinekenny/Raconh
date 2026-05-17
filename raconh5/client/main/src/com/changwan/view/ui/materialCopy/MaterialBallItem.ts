/**
 * 缥缈录怪物球体
 * Simon
 * 2018.3.14
 */
class MaterialBallItem extends UIComponent
{
	private _monsterGroup:eui.Group;
	private _quanImg:BitmapRemote;
	private _kill1:eui.Image;
	private _kill2:eui.Image;
	private _kill3:eui.Image;
	private _killImgList:Array<eui.Image>;
	private _fightImg:eui.Image;

	private _monster1:BitmapRemote;
	private _monster2:BitmapRemote;
	private _monster3:BitmapRemote;
	private _monsterImgList:Array<BitmapRemote>;

	private _fightView:NumImgView2;

	private _model:MaterialCopyModel;
	private _fight:number;
	private _firstCellId:number;
	private _targetId:number;
	private _type:number;
	private _passCellId:number;

	private _itemList:Array<BaseGoods>;
	private _awardSp:Sprite;

	private _isInited:boolean = false;
	private _isShowFightAndItem:boolean = true;

	private _thisParent:MaterialSecondView;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("material", "MaterialBallItemSkin");
	}

	protected configUI():void
	{
		super.configUI();
		this.touchEnabled = true;
		this.touchChildren = false;
		this._monsterGroup.touchEnabled = false;
		this._kill1.touchEnabled = false;
		this._kill2.touchEnabled = false;
		this._kill3.touchEnabled = false;
		this._killImgList = [this._kill1, this._kill2, this._kill3];

		if(this._quanImg == null)
		{
			this._quanImg = Manager.pool.create(BitmapRemote);
			this._quanImg.y = -20;
			this.addChildAt(this._quanImg, 0);
			this._quanImg.load(Manager.path.getPanelMaterialPath("material_quan", "png"));
		}

		this._monsterImgList = [];
		if(this._monster1 == null)
		{
			this._monster1 = Manager.pool.create(BitmapRemote);
			this._monster1.touchEnabled = true;
			this._monster1.x = 142;
			this._monster1.y = 127;
			this._monsterGroup.addChild(this._monster1);
			FilterUtil.setGrayFilter(this._monster1);
			this._monsterImgList.push(this._monster1);
		}
		if(this._monster2 == null)
		{
			this._monster2 = Manager.pool.create(BitmapRemote);
			this._monster2.touchEnabled = true;
			this._monster2.x = 280;
			this._monster2.y = 123;
			this._monsterGroup.addChild(this._monster2);
			FilterUtil.setGrayFilter(this._monster2);
			this._monsterImgList.push(this._monster2);
		}
		if(this._monster3 == null)
		{
			this._monster3 = Manager.pool.create(BitmapRemote);
			this._monster3.touchEnabled = true;
			this._monster3.x = 165;
			this._monster3.y = 283;
			this._monsterGroup.addChild(this._monster3);
			FilterUtil.setGrayFilter(this._monster3);
			this._monsterImgList.push(this._monster3);
		}

		if(!this._fightView)
		{
			this._fightView = Manager.pool.create(NumImgView2);
			this._fightView.x = 280;
			this._fightView.y = 477;
			this.addChild(this._fightView);
		}

		if(!this._awardSp)
		{
			this._awardSp = Manager.pool.create(Sprite);
			this.addChild(this._awardSp);
		}
	}

	protected initData():void
	{
		this._model = Manager.model.getMaterialCopy();

		this._passCellId = this._model.getPassCellByType(this._type);
		let passCellId:number = 0;
		let info:MaterialCopyCVO;
		if(this._passCellId == 0)
		{
			info = MaterialCopyCVO.getFirstCell(this._type);
			if(info)
				passCellId = info.cell;
		}

		this.setInfo();

		for(let i:number=0; i<3; i++)
		{
			if(this._passCellId >= this._firstCellId + i)
			{
				this._monsterImgList[i].filters = [];
				this._killImgList[i].visible = true;
			}
			else if(this._passCellId + 1 == this._firstCellId + i || info && passCellId == this._firstCellId + i && Manager.model.self.attrInfo.fight >= info.fight)
			{
				this._monsterImgList[i].filters = [];
				this._killImgList[i].visible = false;
			}
			else
			{
				FilterUtil.setGrayFilter(this._monsterImgList[i]);
				this._killImgList[i].visible = false;
			}
		}
		this.dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_CHECK_CAN_FIGHT));

		this._fightView.setValue(this._fight, "nums_lifegrid_", 20);

		info = MaterialCopyCVO.getCellInfo(this._firstCellId + 2);
		if(info)
		{
			this._itemList = [];
			for(let i:number=0; i<info.passAward.length; i++)
			{
				let item:BaseGoods = Manager.pool.create(BaseGoods);
				item.setGainLossVO(info.passAward[i]);
            	item.x = i * 120;
				item.y = 500;
				this._awardSp.addChild(item);
            	this._itemList.push(item);
			}
			this._awardSp.width = info.passAward.length * 120;
			this._awardSp.x = Math.round((this.width - this._awardSp.width) / 2) - 15;
		}

		this._isInited = true;
		
		this.showFightAndItemHandler();
	}

	protected addEvent():void
	{
		super.addEvent();
		this._monster1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._monster2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._monster3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
	}

	protected removeEvent():void
	{
		this._monster1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._monster2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._monster3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		super.removeEvent();
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._monster1:
				break;
			case this._monster2:
				break;
			case this._monster3:
				break;
		}
	}

	public setInfo():void
	{
		this._monster1.load(Manager.path.getPanelMaterialPath("boss/1", "png"));
		this._monster2.load(Manager.path.getPanelMaterialPath("boss/2", "png"));
		this._monster3.load(Manager.path.getPanelMaterialPath("boss/3", "png"));
	}

	public set type(value:number)
	{
		this._type = value;
	}

	public set firstCellId(value:number)
	{
		this._firstCellId = value;
	}

	public set targetId(value:number)
	{
		this._targetId = value;
	}

	public get targetId():number
	{
		return this._targetId;
	}

	public updateFight(value:number):void
	{
		this._fight = value;
	}

	public get curFight():number
	{
		return this._fight;
	}

	public get isKillAll():boolean
	{
		let ret:boolean = true;
		for(let i:number=0; i<this._killImgList.length; i++)
		{
			ret = ret && this._killImgList[i].visible;
		}
		return ret;
	}

	public set showFightAndItem(value:boolean)
	{
		this._isShowFightAndItem = value;
		this.showFightAndItemHandler();
	}

	private showFightAndItemHandler():void
	{
		if(this._isInited)
		{
			this._fightImg.visible = this._fightView.visible = this._isShowFightAndItem;
			if(this._itemList && this._itemList.length > 0)
			{
				for(let i:number=0; i<this._itemList.length; i++)
				{
					this._itemList[i].visible = this._isShowFightAndItem;
				}
			}
		}
	}

	public reuse(thisParent):void
	{
		this._thisParent = thisParent;
		super.reuse();
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.removes(this._monsterGroup, this._quanImg, this._awardSp);
		this._monsterGroup = null;
		if(this._quanImg)
			Manager.pool.push(this._quanImg);
		this._quanImg = null;
		if(this._killImgList)
		{
			for(let i:number=0; i<this._killImgList.length; i++)
			{
				if(this._killImgList[i] && this._killImgList[i].parent)
					this._killImgList[i].parent.removeChild(this._killImgList[i]);
				this._killImgList[i] = null;
			}
			this._killImgList = null;
		}
		this._fightImg = null;
		if(this._monsterImgList)
		{
			for(let i:number=0; i<this._monsterImgList.length; i++)
			{
				if(this._monsterImgList[i])
					Manager.pool.push(this._monsterImgList[i]);
				this._monsterImgList[i] = null;
			}
			this._monsterImgList = null;
		}
		if(this._fightView)
			Manager.pool.push(this._fightView);
		this._fightView = null;
		this._model = null;
		if(this._itemList)
		{
			for(let i:number=0; i<this._itemList.length; i++)
			{
				if(this._itemList[i])
					Manager.pool.push(this._itemList[i]);
				this._itemList[i] = null;
			}
			this._itemList = null;
		}
		if(this._awardSp)
			Manager.pool.push(this._awardSp);
		this._awardSp = null;
	}
}