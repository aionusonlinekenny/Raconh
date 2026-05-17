/**
 * 宝石
 */
class GemView extends UIComponent
{
	private _thisParent:EquipPanel;
	private _item1:GemItemView;
	private _item2:GemItemView;
	private _item3:GemItemView;
	private _equipImg:eui.Image;
	private _gemImg1:eui.Image;
	private _gemImg2:eui.Image;
	private _gemImg3:eui.Image;
	private _name1:Label;
	private _name2:Label;
	private _name3:Label;
	private _attrValue1:Label;
	private _attrValue2:Label;
	private _attrValue3:Label;
	private _btn:Button;
	private _btnImg:eui.Image;
	private _bgImg:BitmapRemote;
	private _bgImg2:BitmapRemote;

	private _gemItemList:Array<GemItemView>;
	private _gemImgList:Array<eui.Image>;
	private _gemNameList:Array<Label>;
	private _gemAttrList:Array<Label>;

	private _gemIconList:Array<string>;
	private _equipDataList:Dictionary<number,ItemsModelInfo>;
	private _itemTypeList:Array<number>;
	private _autoAddItemList:Array<number>;
	private _isAutoSetting:boolean = false;
	private _curSettingIndex:number;
	private _isSend:boolean = false;

	private _gemAttrTips:GemAttrTips;

	private _flyItem:BitmapRes;
	private _showFly:boolean = false;
	private _autoSceLocal:number = -1;

	private _sysPriImg:eui.Image;

	public constructor(thisParent:EquipPanel)
	{
		super();
		this.touchChildren = true;
		this._thisParent = thisParent;
		this.skinName = Manager.path.getSkinName("equip", "GemViewSkin");
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
            this._bgImg2.x = 116;
            this._bgImg2.y = 262;
            this._thisParent.addChildAt(this._bgImg2, 6);
            this._bgImg2.load(PathInfo.getPath("res/equip/equip_gem_di.png", LoaderType.IMAGE), 488, 442);
        }

		this._equipImg.touchEnabled = true;
		this._btnImg.touchEnabled = false;

		this._thisParent._titleImg.source = "equip_gem_titleImg_png";
		this._thisParent._topBtn.source = "equip_strengthen_chuizi_png";

		this._gemItemList = [this._item1, this._item2, this._item3];
		this._gemImgList = [this._gemImg1, this._gemImg2, this._gemImg3];
		this._gemNameList = [this._name1, this._name2, this._name3];
		this._gemAttrList = [this._attrValue1, this._attrValue2, this._attrValue3];
		this._gemIconList = ["equip_gem_gray_png", "equip_gem_red_png", "equip_gem_green_png", "equip_gem_blue_png"];
		this._itemTypeList = [ItemsConst.ATTACK_GEM, ItemsConst.HP_GEM, ItemsConst.DEFENSE_GEM];

		//引导
		if(Manager.model.getGuide().curID == GuideID.GEM_INLAY)
		{
			let pos:egret.Point = this._btn.parent.localToGlobal(this._btn.x,this._btn.y);
			Manager.control.getTask().showGuide(pos, this._btn.width>>1, this._btn.height>>1, this.guideCB, this, false);
		}
		if(!Manager.model.getSysPrivilege().getdata2(SysprivilegeType.GOLD_CARD).isActive)
		{
			FilterUtil.setGrayFilter(this._sysPriImg);
		}
	}

	protected initData():void
	{
		super.initData();

		// this.onUpdateEquipInfoHandler(null);
		this.onUpdateEquipInfo();
		Manager.control.getEquip().equipStrengthenQuery();
	}

	protected drawAll():void
	{
		super.drawAll();
		
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("onUpdateItemInfo")) this.onUpdateItemInfo();
		if(this.isInvalid("onUpdateEquipInfo")) this.onUpdateEquipInfo();
		if(this.isInvalid("onUpdateGemInfo")) this.onUpdateGemInfo();
	}

	protected addEvent():void
	{
		super.addEvent();

		this._equipImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEquipImgHandler, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateEquipInfoHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.onUpdateGemInfoHandler, this);
		if(this._gemItemList)
		{
			for(let i:number=0; i<this._gemItemList.length; i++)
			{
				this._gemItemList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGemItemHandler, this);
			}
		}
	}

	protected removeEvent():void
	{
		this._equipImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEquipImgHandler, this);
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateEquipInfoHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.onUpdateGemInfoHandler, this);
		if(this._gemItemList)
		{
			for(let i:number=0; i<this._gemItemList.length; i++)
			{
				this._gemItemList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGemItemHandler, this);
			}
		}

		super.removeEvent();
	}

	/**
	 * 显示某装备tips
	 */
	private onClickEquipImgHandler(e:egret.TouchEvent):void
	{
		this._thisParent._itemList[this._thisParent._curItemIndex].dispatchEventWith(egret.TouchEvent.TOUCH_TAP, false, true);
	}

	/**
	 * 一键镶嵌
	 */
	private onClickHandler(e:egret.TouchEvent):void
	{
		if(e != null && Manager.model.getGuide().curID == GuideID.GEM_INLAY) return;
		this._autoAddItemList = [];
		if(!this._isAutoSetting)
		{
			this._isAutoSetting = true;
			this._curSettingIndex = 0;
			this.autoSetHandler();
		}
	}

	/**
	 * 物品更新
	 */
	private onUpdateItemInfoHandler(e:ItemsEvent):void
	{
		this.invalidate("onUpdateItemInfo");
	}

	private onUpdateItemInfo():void
	{
		this.updateSelectItem();
		this.equipItemLocal();
	}

	/**
	 * 装备更新
	 */
	private onUpdateEquipInfoHandler(e:ItemsEvent):void
	{
		this.invalidate("onUpdateEquipInfo");
	}

	private onUpdateEquipInfo():void
	{
		this.updateEquipInfo();
		this.updateSelectItem();
		this.equipItemLocal();
	}

	/**
	 * 宝石信息更新
	 */
	private onUpdateGemInfoHandler(e:ItemsEvent):void
	{
		this.invalidate("onUpdateGemInfo");
	}

	private onUpdateGemInfo():void
	{
		if(this._thisParent.curView == this)
		{
			this.equipItemLocal(this._showFly);
			this.updateGemInfo();
		}
	}

	/**
	 * 宝石操作
	 */
	private onClickGemItemHandler(e:egret.TouchEvent):void
	{
		if(this._thisParent._itemList[this._thisParent._curItemIndex].baseId == 0)
		{
			FloatTips.addTips(LangCVO.getContent("equip19"), Color.RED);
			return;
		}

		let index:number = this._gemItemList.indexOf(e.currentTarget);
		if(index == -1) return;
		let item:GemItemView = this._gemItemList[index];
		if(item)
		{
			if(item.itemId != 0 || item.canUseItemId != 0)
			{
				if(item.upgradeType == 1 || item.upgradeType == 3)
					Manager.control.getEquip().equipGem(this._thisParent._curItemIndex + 1, [item.canUseItemId]);
				else if(item.upgradeType == 2)
				{
					Manager.control.getEquip().equipGemUpgrade(this._thisParent._curItemIndex + 1, index + 1);
					this._thisParent.showCgEffect();
				}
				else if(item.upgradeType == 0)
					Manager.control.getEquip().equipGemPickOff(this._thisParent._curItemIndex + 1, index + 1);
			}
			else
			{
				let info:EquipStoneCVO = EquipStoneCVO.getGemInfoByTypeLevel(this._itemTypeList[index], 1);
				if(info)
				{
					let itemTips:ItemsTips = Manager.view.show(ViewID.ItemsTips);
					let itemInfo:ItemsCVO = ItemsCVO.getCvo(info.id);
					itemTips.setData(itemInfo);
				}
			}
		}
	}

	/**
	 * 清除某装备宝石信息
	 */
	private cleanGemItemInfo():void
	{
		for(let i:number=0; i<this._gemItemList.length; i++)
		{
			this._gemItemList[i].clean();
			this._gemImgList[i].source = this._gemIconList[0];
			HtmlUtil.setTextFlow(this._gemNameList[i], HtmlUtil.addColorTag(LangCVO.getContent("equip16"), "#6f6f6f"))
			HtmlUtil.setTextFlow(this._gemAttrList[i], HtmlUtil.addColorTag(LangCVO.getContent("equip17"), "#6f6f6f"))
		}
	}

	private cleanItemInfo():void
	{
		this._thisParent._equipName.text = "";
		for(let i:number=0; i<this._thisParent._itemList.length; i++)
		{
			this._thisParent._itemList[i].clear();
			this._thisParent._itemList[i].selected = false;
		}
		this.cleanGemItemInfo();
		this._thisParent._fighting.setValue(0, "nums_fighting_", 25);
		this._equipImg.texture = null;
		this._equipImg.bitmapData = null;
	}

	/**
	 * 装备物品信息更新
	 */
	private updateEquipInfo():void
	{
		this.cleanItemInfo();
		this._thisParent.curRoleInfo = Manager.model.self;
		if(!this._thisParent.curRoleInfo) return;
		this._equipDataList = Manager.model.getItems().equipList;
		for(let i:number=0; i<this._thisParent._itemList.length; i++)
		{
			let itemInfo:ItemsModelInfo = this._equipDataList.get(i + 1);
			if(itemInfo)
			{
				this._thisParent._itemList[i].callback(this.loadImgCallBack, this, i);
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

	public updateGemInfo():void
	{
		if(!this._thisParent.curRoleInfo) return;
		let itemInfo:ItemsModelInfo;
		let selectIndex:number = 0;
		let countFighting:number = 0;
		for(var i:number=0; i<this._thisParent._itemList.length; i++)
		{
			let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(i + 1);
			if(info)
			{
				countFighting += info.gemFighting;
			}
			if(i == this._thisParent._curItemIndex)
			{
				this._thisParent._itemList[i].selected = true;
				this.updateSelectItem();
			}
			else
				this._thisParent._itemList[i].selected = false;
		}
		this._thisParent._fighting.setValue(countFighting + Manager.model.getEquip().gemOtherFight, "nums_fighting_", 25);
	}

	/**
	 * 更新选中装备和宝石信息
	 */
	public updateSelectItem():void
	{
		if(!this._thisParent.curRoleInfo) return;
		this.cleanGemItemInfo();
		this._equipImg.texture = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgTexture;
		if(this._equipImg.texture == null)
				this._equipImg.bitmapData = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgBitmapData;
		let itemInfo:ItemsCVO = this._thisParent._itemList[this._thisParent._curItemIndex].cvo;
		if(itemInfo)
			this._thisParent._equipName.text = itemInfo.name;
		else
			this._thisParent._equipName.text = LangCVO.getContent("equip" + (this._thisParent._curItemIndex + 1));

		let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(this._thisParent._curItemIndex + 1);
		if(info && itemInfo)
		{
			let localList:Array<number> = [];
			for(let i:number=0; i<info.gemList.length; i++)
			{
				let itemInfo:ItemsCVO = ItemsCVO.getCvo(info.gemList[i].gemId);
				let local:number = Number(String(itemInfo.id).substr(5,1)) - 1;
				localList.push(local + 1);
				this._gemItemList[local].setInfo(local, itemInfo);
				this._gemImgList[local].source = this._gemIconList[local + 1];
				this._gemNameList[local].text = itemInfo.name;
				this._gemAttrList[local].text = AttrDescTypeEx.getAttrName(itemInfo.attrList[0][0]) + "+" + itemInfo.attrList[0][1];
			}
			this._autoAddItemList = [];
			if(this._thisParent._itemList[this._thisParent._curItemIndex].baseId != 0)
			{
				for(let i:number=0; i<this._gemItemList.length; i++)
				{
					let ret:Array<number> = Manager.model.getEquip().getBestItemId(this._itemTypeList[i], (this._gemItemList[i].itemId == 0 ? 1 : 2), this._gemItemList[i].itemId);
					let itemId:number = ret[0];
					let type:number = ret[1];
					if(itemId != 0 && type != 0)
					{
						if(Number(String(itemId).substr(String(itemId).length - 2, 2)) < 10 && this._gemItemList[i].itemId <= itemId)
						{
							this._gemItemList[i].canUseItemId = itemId;
							this._gemItemList[i].upgradeType = type;
						}
					}

					if(localList.indexOf(i + 1) == -1)
					{
						let itemList:Array<ItemsModelInfo> = Manager.model.getItems().getBagItemByList(this._itemTypeList[i]);
						itemList = ArrayUtil.sortOn(itemList, ["base_id"], [1]);
						if(itemList.length > 0)
						{
							this._autoAddItemList.push(itemList[0].base_id);
						}
					}
				}
			}
		}

		if(this._isAutoSetting && !this._isSend)
		{
			if(this._autoAddItemList && this._autoAddItemList.length > 0)
			{
				Manager.control.getEquip().equipGem(this._curSettingIndex + 1, this._autoAddItemList);
				this._isSend = true;
				this._autoSceLocal = this._curSettingIndex;
				this._autoAddItemList = [];
			}
			else
				this.setGemBack(1);
		}
	}

	private autoSetHandler():void
	{
		this._thisParent._itemList[this._curSettingIndex].dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
	}

	public setGemBack(value:number):void
	{
		this._isSend = false;
		if(value == 1 && this._isAutoSetting && this._curSettingIndex < 7)
		{
			this._curSettingIndex += 1;
			this.autoSetHandler();
		}
		else
		{
			this._isAutoSetting = false;
			if(this._curSettingIndex != this._autoSceLocal && this._autoSceLocal != -1)
			{
				this._thisParent._itemList[this._autoSceLocal].dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
				this._autoSceLocal = -1;
				this.itemFlyHandler();
			}
		}
	}

	/**
	 * 初始化定位可镶嵌宝石最低等级装备
	 */
	private equipItemLocal(showFly:boolean = false):void
	{
		let list:Array<any> = [];
		for(let i:number=1; i<=8; i++)
		{
			let equipInfo:ItemsModelInfo = Manager.model.getItems().equipList.get(i);
			if(equipInfo)
			{
				let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(i);
				if(info)
				{
					let tmpList:Array<number> = [1,2,3];
					let min:number = -1;
					let pos:number;
					let index:number;
					for(let j:number=0; j<info.gemList.length; j++)
					{
						pos = info.gemList[j].gemPos;
						index = tmpList.indexOf(pos);
						if(index != -1)
						{
							tmpList.splice(index, 1);

							let num:number = Number(String(info.gemList[j].gemId).substr(String(info.gemList[j].gemId).length - 2, 2));
							//查找可替换
							if(Manager.model.getItems().getCountBagItemByType(this._itemTypeList[pos - 1], num) > 0)
							{
								if(min == -1)
									min = num;
								else
									if(num < min) min = num;
							}
							else
							{
								//查找可升级
								if(Manager.model.getItems().getCountUpgradeByType(this._itemTypeList[pos - 1], num) >= 2)
								{
									if(min == -1)
										min = num;
									else
										if(num < min) min = num;
								}
							}
						}
					}
					if(tmpList.length > 0)
					{
						for(let j:number=0; j<tmpList.length; j++)
						{
							if(Manager.model.getItems().getCountBagItemByType(this._itemTypeList[tmpList[j] - 1]) > 0)
							{
								min = 0;
								break;
							}
						}
					}
					if(min != -1)
						list.push({pos:i, num:min});
				}
				else
				{
					//当前装备有材料并没有镶嵌情况下优化选择
					let has:boolean = false;
					for(let j:number=0; j<this._itemTypeList.length; j++)
					{
						if(Manager.model.getItems().getCountBagItemByType(this._itemTypeList[j]) > 0)
						{
							has = true;
							break;
						}
					}
					if(!this._isAutoSetting && has)
					{
						this._thisParent._curItemIndex = i - 1;
						this._showFly = true;
						this._thisParent._itemList[this._thisParent._curItemIndex].dispatchEventWith(egret.TouchEvent.TOUCH_TAP, false, false);
						return;
					}
				}
			}
		}
		this.clearItemRedIcon();
		if(!this._isAutoSetting && list.length > 0)
		{
			this.setItemRedIcon(list);
			list.sort(this.sortByGemLevel);
			this._thisParent._curItemIndex = list[0].pos - 1;
			this._showFly = true;
			this._thisParent._itemList[this._thisParent._curItemIndex].dispatchEventWith(egret.TouchEvent.TOUCH_TAP, false, false);
		}
		if(showFly)
		{
			this.itemFlyHandler();
			this._showFly = false;
		}
	}

	private itemFlyHandler():void
	{
		if(!this._flyItem)
			this._flyItem = Manager.pool.create(BitmapRes);
		this._flyItem.texture = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgTexture;
		if(this._flyItem.texture == null)
		{
			this._flyItem.bitmapData = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgBitmapData;
			if(this._flyItem.bitmapData)
			{
				this._flyItem.width = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgBitmapData.width;
				this._flyItem.height = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgBitmapData.height;
			}
		}
		else
		{
			this._flyItem.width = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgTexture.textureHeight;
			this._flyItem.height = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgTexture.textureHeight;
		}
		this._flyItem.x = this._thisParent.getEquipItemList().x + this._thisParent._itemList[this._thisParent._curItemIndex].x + 30;
		this._flyItem.y = this._thisParent.getEquipItemList().y + this._thisParent._itemList[this._thisParent._curItemIndex].y + 30;
		
		if(this._flyItem.parent == null)
			this._thisParent.addChild(this._flyItem);
		egret.Tween.get(this._flyItem).to({x:this._equipImg.x, y:this._equipImg.y}, 500).call(this.tweenRender,this);
	}

	private tweenRender():void
	{
		if(this._flyItem && this._flyItem.parent)
			this._flyItem.parent.removeChild(this._flyItem);
	}

	private clearItemRedIcon():void
	{
		for(let i:number=0; i<this._thisParent.redImgList.length; i++)
			this._thisParent.redImgList[i].visible = false;
	}

	private setItemRedIcon(list:Array<any>):void
	{
		for(let i:number=0; i<list.length; i++)
			this._thisParent.redImgList[list[i].pos - 1].visible = true;
	}

	private sortByGemLevel(value1:any, value2:any):number
	{
		if(value1.num > value2.num)
			return 1;
		else if(value1.num < value2.num)
			return -1;
		else
			return 0;
	}

	private guideCB():void
	{
		this.onClickHandler(null);
		Manager.control.getTask().hideGuide();
	}

	public showAttrTips():void
	{
		let minLevel:number = -1;
		for(let i:number=0; i<this._thisParent._itemList.length; i++)
		{
			let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(i + 1);
			if(info)
			{
				if(info.gemList.length < 3)
				{
					minLevel = 0;
				}
				else
				{
					for(let j:number=0; j<info.gemList.length; j++)
					{
						if(info.gemList[j])
						{
							let tmpLevel:number = Number(String(info.gemList[j].gemId).substr(String(info.gemList[j].gemId).length - 2, 2));
							if(minLevel == -1)
								minLevel = tmpLevel;
							else
							{
								if(minLevel > tmpLevel)
									minLevel = tmpLevel;
							}
						}
						else
							minLevel = 0;
					}
				}
			}
		}

		this._gemAttrTips = Manager.view.show(ViewID.GemAttrTips);
		this._gemAttrTips.setInfo(minLevel);
	}

	public reuse(thisParent:EquipPanel):void
	{
		super.reuse();
		this._thisParent = thisParent;
	}

	public unuse():void
	{
		egret.Tween.removeTweens(this);
		super.unuse();
	}

	public dispose():void
	{
		egret.Tween.removeTweens(this);
		if(Manager.model.getGuide().curID == GuideID.GEM_INLAY) Manager.control.getTask().hideGuide();
		super.dispose();

		this._thisParent = null;
		if(this._gemItemList)
		{
			for(let i:number=0; i<this._gemItemList.length; i++)
			{
				this._gemItemList[i].dispose();
				this._gemItemList[i] = null;
			}
			this._gemItemList = null;
		}
		this._equipImg = null;
		this._gemImgList = null;
		if(this._gemNameList)
		{
			for(let i:number=0; i<this._gemNameList.length; i++)
			{
				this._gemNameList[i].dispose();
				this._gemNameList[i] = null;
			}
			this._gemNameList = null;
		}
		if(this._gemAttrList)
		{
			for(let i:number=0; i<this._gemAttrList.length; i++)
			{
				this._gemAttrList[i].dispose();
				this._gemAttrList[i] = null;
			}
			this._gemAttrList = null;
		}
		if(this._btn)
			this._btn.dispose();
		this._btn = null;
		this._btnImg = null;
		this._gemIconList = null;
		this._equipDataList = null;
		this._itemTypeList = null;
		this._autoAddItemList = null;
		if(this._gemAttrTips)
			this._gemAttrTips.dispose();
		this._gemAttrTips = null;
		if(this._flyItem)
			Manager.pool.push(this._flyItem);
		this._flyItem = null;
		if(this._bgImg)
			Manager.pool.push(this._bgImg);
		this._bgImg = null;
		if(this._bgImg2)
			Manager.pool.push(this._bgImg2);
		this._bgImg2 = null;
		if(this._sysPriImg)
		{
			this.removeChild(this._sysPriImg)
			this._sysPriImg = null;
		}
	}
}