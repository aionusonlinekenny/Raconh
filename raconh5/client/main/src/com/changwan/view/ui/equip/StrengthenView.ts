class StrengthenView extends UIComponent
{
	private _thisParent:EquipPanel;
    /** 强化 */
	private _strengthen:eui.Group;
	private _equipImg:eui.Image;
	private _goodsItem:BaseGoods;
	private _descTxt:Label;
	private _btn:Button;
	private _btnImg:eui.Image;
	private _attrValue1:Label;
	private _attrValue2:Label;
	private _nextAttrValue1:Label;
	private _nextAttrValue2:Label;

	private _curAttrList:Array<Label>;
	private _nextAttrList:Array<Label>;
	private _curItemInfo:ItemsModelInfo;
	private _curCvoInfo:EquipStrengthenCVO;
	private _nextCvoInfo:EquipStrengthenCVO;
	private _equipDataList:Dictionary<number,ItemsModelInfo>;

	private _bgImg:BitmapRemote;
	private _bgImg2:BitmapRemote;

    public constructor(thisParent:EquipPanel)
    {
        super();
		this.touchChildren = true;
		this._thisParent = thisParent;
		this.skinName = Manager.path.getSkinName("equip", "StrengthenViewSkin");
    }

    protected configUI():void
    {
        super.configUI();

		if(!this._bgImg)
        {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._bgImg.x = 49;
            this._bgImg.y = 217;
            this._thisParent.addChildAt(this._bgImg, 5);
            this._bgImg.load(PathInfo.getPath("res/equip/equip_strengthen_centerImg1.png", LoaderType.IMAGE), 623, 588);
        }

		if(!this._bgImg2)
        {
            this._bgImg2 = Manager.pool.create(BitmapRemote);
            this._bgImg2.x = 49 + 34;
            this._bgImg2.y = 314;
            this._thisParent.addChildAt(this._bgImg2, 6);
            this._bgImg2.load(PathInfo.getPath("res/equip/equip_strengthen_centerImg2.png", LoaderType.IMAGE), 555, 279);
        }

		Manager.control.getEquip().equipStrengthenQuery();

		this._strengthen.touchEnabled = false;
		this._equipImg.touchEnabled = true;
		this._curAttrList = [this._attrValue1, this._attrValue2];
		this._nextAttrList = [this._nextAttrValue1, this._nextAttrValue2];
		this._goodsItem.clear();
		this._btnImg.touchEnabled = false;

		this.initData();

		//引导
		if(Manager.model.getGuide().curID == GuideID.STRENTHEN)
		{
			let pos:egret.Point = this._btn.parent.localToGlobal(this._btn.x,this._btn.y);
			Manager.control.getTask().showGuide(pos, this._btn.width>>1, this._btn.height>>1, this.guideCB, this, false);
		}
    }

	public initData():void
	{
		this._thisParent._titleImg.source = "equip_strengthen_titleImg_png";
		// this._thisParent._topBtn.icon = "equip_strengthen_chuizi_png";

		this.updateRoleInfo();
	}

	protected drawAll():void
	{
		super.drawAll();
		
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("onUpdateStrengthenInfo")) this.onUpdateStrengthenInfo();
		if(this.isInvalid("onUpdateItemInfo")) this.onUpdateItemInfo();
	}

	private cleanItemInfo():void
	{
		this._thisParent._equipName.text = "";
		for(let i:number=0; i<this._thisParent._itemList.length; i++)
		{
			this._thisParent._itemList[i].clear();
			this._thisParent._itemList[i].selected = false;
		}
		
		for (let i: number = 0; i < this._curAttrList.length; i++)
		{
			this._curAttrList[i].text = "";
			this._nextAttrList[i].text = "";
		}
		
		this._thisParent._fighting.setValue(0, "nums_fighting_", 25);

		this._equipImg.texture = null;
		this._equipImg.bitmapData = null;
		this._goodsItem.clear();
	}

	public updateRoleInfo():void
	{
		this.cleanItemInfo();
		this._thisParent.curRoleInfo = Manager.model.self;
		if(!this._thisParent.curRoleInfo) return;
		this._equipDataList = Manager.model.getItems().equipList;
		for(let i:number=0; i<this._thisParent._itemList.length; i++)
		{
			this._thisParent._itemList[i].clear();
			let itemInfo:ItemsModelInfo = this._equipDataList.get(i + 1);
			if(itemInfo)
			{
				this._thisParent._itemList[i].callback(this.loadImgCallBack, this, i);
				// this._thisParent._itemList[i].baseId = itemInfo.base_id;
				this._thisParent._itemList[i].data = itemInfo;
			}
		}
	}

	private loadImgCallBack(local:number):void
	{
		this._thisParent.baseIconList[local].visible = false;
		if(this._thisParent._curItemIndex == local)
		{
			this._equipImg.texture = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgTexture;
			if(this._equipImg.texture == null)
				this._equipImg.bitmapData = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgBitmapData;
		}
	}

	public updateStrengthenInfo():void
	{
		if(!this._thisParent.curRoleInfo) return;
		let itemInfo:ItemsModelInfo;
		let selectIndex:number = 0;
		for(var i:number=0; i<this._thisParent._itemList.length; i++)
		{
			let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(i + 1);
			if(info)
			{
				if(info.level == 0)
				{
					selectIndex = i;
					if(this._equipDataList)
						itemInfo = this._equipDataList.get(i + 1);
					break;
				}
				else
				{
					this._thisParent._itemList[i].setStrengthenLevel(info.level, true);
					if(this._thisParent._itemList[i].strengthenLevel < this._thisParent._itemList[selectIndex].strengthenLevel)
					{
						selectIndex = i;
						itemInfo = this._equipDataList.get(i + 1);
					}
				}
			}
			else
			{
				selectIndex = i;
				itemInfo = this._equipDataList.get(i + 1);
				break;
			}
		}
		this._thisParent._curItemIndex = selectIndex;
		for(let i:number=0; i<this._thisParent._itemList.length; i++)
		{
			if(i == this._thisParent._curItemIndex)
				this._thisParent._itemList[i].selected = true;
			else
				this._thisParent._itemList[i].selected = false;
		}
		this._curItemInfo = itemInfo;
		this.updateSelectItem();
		this.updateFighting();
	}

	private updateSelectItem():void
	{
		this._equipImg.texture = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgTexture;
		if(this._equipImg.texture == null)
				this._equipImg.bitmapData = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgBitmapData;

		let curLevel:number = 0;
		let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(this._thisParent._curItemIndex + 1);
		if(info)
			curLevel = info.level;

		let equipName:string;
		if(this._curItemInfo)
		{
			this._curCvoInfo = EquipStrengthenCVO.getInfo(this._curItemInfo.pos, curLevel);
			this._nextCvoInfo = EquipStrengthenCVO.getInfo(this._curItemInfo.pos, curLevel + 1);
			equipName = this._curItemInfo.cvo.name;
		}
		else
		{
			this._curCvoInfo = EquipStrengthenCVO.getInfo(this._thisParent._curItemIndex + 1, curLevel);
			this._nextCvoInfo = EquipStrengthenCVO.getInfo(this._thisParent._curItemIndex + 1, curLevel + 1);
			let itemInfo:ItemsCVO = this._thisParent._itemList[this._thisParent._curItemIndex].cvo;
			if(itemInfo)
				equipName = itemInfo.name;
			else
				equipName = LangCVO.getContent("equip" + (this._thisParent._curItemIndex + 1));
		}

		if (this._curCvoInfo)
		{
			if(curLevel >= 1)
				this._thisParent._equipName.text = equipName + "+" + curLevel;
			else
				this._thisParent._equipName.text = equipName;
			this._goodsItem.baseId = this._curCvoInfo.itemId;
			this._goodsItem.itemAmount(Manager.model.getItems().getCountItemById(this._curCvoInfo.itemId), this._curCvoInfo.amount);
			for (let i: number = 0; i < this._curCvoInfo.attr.length; i++) {
				this._curAttrList[i].text = AttrDescTypeEx.getAttrName(this._curCvoInfo.attr[i][0]) + "+" + this._curCvoInfo.attr[i][1];
			}
		}
		if (this._nextCvoInfo)
		{
			for (let i: number = 0; i < this._nextCvoInfo.attr.length; i++) {
				this._nextAttrList[i].text = AttrDescTypeEx.getAttrName(this._nextCvoInfo.attr[i][0]) + "+" + this._nextCvoInfo.attr[i][1];
			}
		}
	}

	private updateFighting():void
	{
		let fightingValue:number = 0;
		for(let i:number=0; i<this._thisParent._itemList.length; i++)
		{
			let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(i + 1);
			if(info)
				fightingValue += info.fighting;
		}

		this._thisParent._fighting.setValue(fightingValue, "nums_fighting_", 25);
	}

	protected addEvent():void
	{
		super.addEvent();

		this._equipImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEquipImgHandler, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateStrengthenInfoHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.onUpdateStrengthenInfoHandler, this);
	}

	protected removeEvent():void
	{
		this._equipImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEquipImgHandler, this);
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateStrengthenInfoHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.onUpdateStrengthenInfoHandler, this);

		super.removeEvent();
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		if(e != null && Manager.model.getGuide().curID == GuideID.STRENTHEN) return;
		if(this._thisParent.curRoleInfo)
		{
			if(this._goodsItem.curAmount > this._goodsItem.totalAmount)
			{
				// FloatTips.addTips(LangCVO.getContent("equip9"), Color.RED);
				// Manager.view.show(ViewID.ItemsTips, ItemsCVO.getCvo(this._goodsItem.baseId));
				let shopCvo = ShopCVO.getbaseIdCvo(this._goodsItem.baseId);
                Manager.view.show(ViewID.ShopBuyView,shopCvo);
			}
			else
			{
				let hasCanUpgrade:boolean = false;
				for(var i:number=0; i<this._thisParent._itemList.length; i++)
				{
					let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(i + 1);
					if(info && info.level < this._thisParent.curRoleInfo.attrInfo.level)
					{
						hasCanUpgrade = true;
						break;
					}
				}
				if(hasCanUpgrade)
				{
					Manager.control.getEquip().equipStrengthen();
					this._thisParent.showCgEffect();
				}
				else
					FloatTips.addTips(LangCVO.getContent("equip10"), Color.RED);
			}
		}
	}

	private onUpdateItemInfoHandler(e:ItemsEvent):void
	{
		this.invalidate("onUpdateItemInfo");
	}

	private onUpdateItemInfo():void
	{
		this.updateRoleInfo();
	}

	private onUpdateStrengthenInfoHandler(e:ItemsEvent):void
	{
		this.invalidate("onUpdateStrengthenInfo");
	}

	private onUpdateStrengthenInfo():void
	{
		if(this._thisParent.curView == this)
		{
			this.updateStrengthenInfo();
			let list:Array<number> = Manager.model.getItems().equipOldStrengthenLevel;
			if(list && list.length > 0)
			{
				for(let i:number=0; i<list.length; i++)
				{
					let effect:Animation = this._thisParent.strengthenEffectList[list[i]];
					if(!effect)
					{
						effect = Manager.animation.createEffectAnimation("Qianghua", 0, true, false);
						effect.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onPlayCompleteHandler, this);
						effect.x = -63;
						effect.y = -57;
						effect.touchEnabled = false;
						this._thisParent.strengthenEffectList[list[i]] = effect;
					}
					effect.play();
					if(!effect.parent)
						this._thisParent._itemList[list[i] - 1].addChild(effect);
				}
			}
			list = [];
		}
	}

	private onPlayCompleteHandler(e:GlobalEvent):void
	{
		if((e.currentTarget as Animation).parent)
			(e.currentTarget as Animation).parent.removeChild(e.currentTarget as Animation);
	}

	private onClickEquipImgHandler(e:egret.TouchEvent):void
	{
		this._thisParent._itemList[this._thisParent._curItemIndex].dispatchEventWith(egret.TouchEvent.TOUCH_TAP, false, true);
	}

	private guideCB():void
	{
		this.onClickHandler(null);
		Manager.control.getTask().hideGuide();
	}

	public showAttrTips():void
	{
		
	}

	public reuse(thisParent:EquipPanel):void
	{
		super.reuse();
		this._thisParent = thisParent;
	}

	public dispose():void
	{
		for(let i:number=0; i<8; i++)
		{
			if(this._thisParent.strengthenEffectList[i+1])
			{
				(this._thisParent.strengthenEffectList[i+1] as Animation).removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onPlayCompleteHandler, this);
			}
		}

		if(Manager.model.getGuide().curID == GuideID.STRENTHEN) Manager.control.getTask().hideGuide();
		super.dispose();

		this._thisParent = null;
		this._strengthen = null;
		this._equipImg = null;
		if(this._goodsItem)
			Manager.pool.push(this._goodsItem);
		this._goodsItem = null;
		if(this._descTxt)
			this._descTxt.dispose();
		this._descTxt = null;
		if(this._btn)
			this._btn.dispose();
		this._btn = null;
		this._btnImg = null;
		if(this._attrValue1)
			this._attrValue1.dispose();
		this._attrValue1 = null;
		if(this._attrValue2)
			this._attrValue2.dispose();
		this._attrValue2 = null;
		if(this._nextAttrValue1)
			this._nextAttrValue1.dispose();
		this._nextAttrValue1 = null;
		if(this._nextAttrValue2)
			this._nextAttrValue2.dispose();
		this._nextAttrValue2 = null;
		this._curAttrList = null;
		this._nextAttrList = null;
		this._curItemInfo = null;
		this._curCvoInfo = null;
		this._nextCvoInfo = null;
		this._equipDataList = null;
		if(this._bgImg)
			Manager.pool.push(this._bgImg);
		this._bgImg = null;
		if(this._bgImg2)
			Manager.pool.push(this._bgImg2);
		this._bgImg2 = null;
	}
}