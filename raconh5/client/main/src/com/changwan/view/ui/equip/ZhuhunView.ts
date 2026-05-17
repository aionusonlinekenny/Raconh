/**
 * 铸魂
 * Simon 2017.11.16
 */
class ZhuhunView extends UIComponent
{
	private _thisParent:EquipPanel;
	private _equipImg:eui.Image;
	private _btn:Button;
	private _btnImg:eui.Image;
	private _attrValue1:Label;
	private _attrValue2:Label;
	private _nextAttrValue1:Label;
	private _nextAttrValue2:Label;
	private _ball1:eui.Image;
	private _ball2:eui.Image;
	private _ball3:eui.Image;
	private _ball4:eui.Image;
	private _ball5:eui.Image;
	private _ballList:Array<eui.Image>;
	private _rateImg:eui.Image;
	private _percentImg:eui.Image;

	private _goodsSp:egret.DisplayObjectContainer;
	private _goodsList:Array<BaseGoods>;

	private _curAttrList:Array<Label>;
	private _nextAttrList:Array<Label>;
	private _curItemInfo:ItemsModelInfo;
	private _curCvoInfo:EquipZhuhunCVO;
	private _nextCvoInfo:EquipZhuhunCVO;
	private _equipDataList:Dictionary<number,ItemsModelInfo>;
	private _curSuitMinLevel:number;
	private _rate:NumImgView2;
	private _bgImg:BitmapRemote;
	private _bgImg2:BitmapRemote;

	/**
	 * 铸魂属性tips
	 */
	private _zhuhunAttrTips:ZhuhunAttrTips;

	public constructor(thisParent:EquipPanel)
	{
		super();
		this.touchChildren = true;
		this._thisParent = thisParent;
		this.skinName = Manager.path.getSkinName("equip", "ZhuhunViewSkin");
	}

	protected configUI():void
	{
		super.configUI();

		Manager.control.getEquip().equipStrengthenQuery();

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
            this._bgImg2.y = 234;
            this._thisParent.addChildAt(this._bgImg2, 6);
            this._bgImg2.load(PathInfo.getPath("res/equip/equip_strengthen_centerImg2.png", LoaderType.IMAGE), 555, 279);
        }

		this._equipImg.touchEnabled = true;
		this._curAttrList = [this._attrValue1, this._attrValue2];
		this._nextAttrList = [this._nextAttrValue1, this._nextAttrValue2];
		this._ballList = [this._ball1, this._ball2, this._ball3, this._ball4, this._ball5];
		this._btnImg.touchEnabled = false;
		this._goodsList = [];
		this._goodsSp = Manager.pool.create(egret.DisplayObjectContainer);
		this.addChild(this._goodsSp);

		if(!this._rate)
		{
			this._rate = Manager.pool.create(NumImgView2);
			this._rate.x = this._rateImg.x + 145;
			this._rate.y = this._rateImg.y + 3;
			this.addChild(this._rate);
		}
		this._rate.setValue(0, "equip_zhuhun", 25);
		this._percentImg.x = this._rate.x + 25 + 10;

		this.initData();
	}

	public initData():void
	{
		this._thisParent._titleImg.source = "equip_sure_png";
		this._thisParent._topBtn.source = "equip_shitou_png";

		this.onUpdateEquipInfoHandler(null);
		this.equipItemLocal();
	}

	private cleanItemInfo():void
	{
		this._thisParent._equipName.text = "";
		for(let i:number=0; i<this._thisParent._itemList.length; i++)
		{
			this._thisParent._itemList[i].clear();
		}
		
		for (let i: number = 0; i < this._curAttrList.length; i++)
		{
			this._curAttrList[i].text = "";
			this._nextAttrList[i].text = "";
		}
		
		this._thisParent._fighting.setValue(0, "nums_fighting_", 25);

		this._equipImg.texture = null;
		this._equipImg.bitmapData = null;
		for(let i:number=0; i<this._goodsList.length; i++)
		{
			if(this._goodsList[i])
			{
				if(this._goodsList[i].parent)
					this._goodsList[i].parent.removeChild(this._goodsList[i]);
				this._goodsList[i].dispose();
				this._goodsList[i] = null;
			}
		}
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
				this._thisParent._itemList[i].data = itemInfo;
			}
		}
		this._curSuitMinLevel = -1;
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

	public updateZhuhunInfo():void
	{
		if(!this._thisParent.curRoleInfo) return;
		let itemInfo:ItemsModelInfo;
		let selectIndex:number = 0;
		let countFighting:number = 0;
		let curSuitMinLevel:number = -1;
		for(var i:number=0; i<this._thisParent._itemList.length; i++)
		{
			let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(i + 1);
			if(info)
			{
				if(curSuitMinLevel == -1)
					curSuitMinLevel = info.zhuhunLevel;
				else
				{
					if(curSuitMinLevel > info.zhuhunLevel)
						curSuitMinLevel = info.zhuhunLevel;
				}
				this._thisParent._itemList[i].setStrengthenLevel(info.zhuhunLevel);
				countFighting += info.zhuhunFighting;
				if(i == this._thisParent._curItemIndex)
				{
					this.updateSelectItem();
				}
			}
			else
				curSuitMinLevel = 0;
		}
		if(this._curSuitMinLevel != -1 && this._curSuitMinLevel != curSuitMinLevel)
		{
			Manager.view.show(ViewID.ZhuhunUpgrade, this._thisParent.curRoleInfo.attrInfo.career, curSuitMinLevel);
		}
		this._curSuitMinLevel = curSuitMinLevel;
		this._thisParent._fighting.setValue(countFighting + Manager.model.getEquip().zhuhuanOtherFight, "nums_fighting_", 25);

		for(let i:number=0; i<this._thisParent._itemList.length; i++)
		{
			if(i == this._thisParent._curItemIndex)
				this._thisParent._itemList[i].selected = true;
			else
				this._thisParent._itemList[i].selected = false;
		}
	}

	protected addEvent():void
	{
		super.addEvent();

		this._equipImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEquipImgHandler, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateEquipInfoHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.onUpdateZhuhunInfoHandler, this);
	}

	protected removeEvent():void
	{
		this._equipImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEquipImgHandler, this);
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateEquipInfoHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.onUpdateZhuhunInfoHandler, this);

		super.removeEvent();
	}

	private onClickEquipImgHandler(e:egret.TouchEvent):void
	{
		this._thisParent._itemList[this._thisParent._curItemIndex].dispatchEventWith(egret.TouchEvent.TOUCH_TAP, false, true);
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._btn:
				let len:number = this._curCvoInfo.itemList.length;
				for(let i:number=0; i<len; i++)
				{
					if(Manager.model.getItems().getCountItemById(this._curCvoInfo.itemList[i].baseId) < this._curCvoInfo.itemList[i].num)
					{
						Manager.view.show(ViewID.ItemsTips, ItemsCVO.getCvo(this._curCvoInfo.itemList[i].baseId));
						// let shopCvo = ShopCVO.getbaseIdCvo(this._curCvoInfo.itemList[i].baseId);
                		// Manager.view.show(ViewID.ShopBuyView,shopCvo);
						return;
					}
				}
				Manager.control.getEquip().equipZhuhun(this._thisParent._curItemIndex + 1);
			break;
		}
	}

	private onUpdateItemInfoHandler(e:ItemsEvent):void
	{
		this.updateSelectItem();
	}

	private onUpdateEquipInfoHandler(e:ItemsEvent):void
	{
		this.updateRoleInfo();
		this.updateSelectItem();
	}

	private onUpdateZhuhunInfoHandler(e:ItemsEvent):void
	{
		if(this._thisParent.curView == this)
			this.updateZhuhunInfo();
	}

	private updateBall():void
	{
		for(let i:number=0; i<this._ballList.length; i++)
		{
			this._ballList[i].source = "equip_zhuhun_ball1_png";
		}
		//这里指铸魂等级
		let curSelectEquipLevel:number = this._thisParent._itemList[this._thisParent._curItemIndex].strengthenLevel;
		let curLevel:number = (curSelectEquipLevel == 0 ? 0 : Math.floor(curSelectEquipLevel / 5) + 1);
		if(curLevel > 0)
		{
			let showCount:number = curSelectEquipLevel - Math.floor(curSelectEquipLevel / 5) * 5;
			if(showCount == 0)
			{
				showCount = 5;
				curLevel -= 1;
			}
			for(let i:number=0; i<showCount; i++)
			{
				this._ballList[i].source = "equip_zhuhun_ball"+ (curLevel + 1) +"_png";
			}
			for(let i:number=showCount; i<5; i++)
			{
				this._ballList[i].source = "equip_zhuhun_ball"+ curLevel +"_png";
			}
		}
	}

	public updateSelectItem():void
	{
		if(!this._thisParent.curRoleInfo) return;
		this._equipImg.texture = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgTexture;
		if(this._equipImg.texture == null)
				this._equipImg.bitmapData = this._thisParent._itemList[this._thisParent._curItemIndex].itemImgBitmapData;

		this.updateBall();
		
		let curLevel:number = 0;
		let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(this._thisParent._curItemIndex + 1);
		if(info)
			curLevel = info.zhuhunLevel;

		if(this._equipDataList)
			this._curItemInfo = this._equipDataList.get(this._thisParent._curItemIndex + 1);
		if(this._curItemInfo)
		{
			this._curCvoInfo = EquipZhuhunCVO.getInfo(this._curItemInfo.career, this._curItemInfo.pos, curLevel);
			this._nextCvoInfo = EquipZhuhunCVO.getInfo(this._curItemInfo.career, this._curItemInfo.pos, curLevel + 1);
			this._thisParent._equipName.text = this._curItemInfo.cvo.name;
		}
		else
		{
			this._curCvoInfo = EquipZhuhunCVO.getInfo(this._thisParent.curRoleInfo.attrInfo.career, this._thisParent._curItemIndex + 1, curLevel);
			this._nextCvoInfo = EquipZhuhunCVO.getInfo(this._thisParent.curRoleInfo.attrInfo.career, this._thisParent._curItemIndex + 1, curLevel + 1);
			let itemInfo:ItemsCVO = this._thisParent._itemList[this._thisParent._curItemIndex].cvo;
			if(itemInfo)
				this._thisParent._equipName.text = itemInfo.name;
			else
				this._thisParent._equipName.text = LangCVO.getContent("equip" + (this._thisParent._curItemIndex + 1));
		}

		for (let i: number = 0; i < this._curAttrList.length; i++)
		{
			this._curAttrList[i].text = "";
			this._nextAttrList[i].text = "";
		}

		if (this._curCvoInfo)
		{
			for(let i:number=0; i<this._goodsList.length; i++)
			{
				if(this._goodsList[i])
				{
					if(this._goodsList[i].parent)
						this._goodsList[i].parent.removeChild(this._goodsList[i]);
					this._goodsList[i].dispose();
					this._goodsList[i] = null;
				}
			}
			this._goodsList = [];
			let len:number = this._curCvoInfo.itemList.length;
			if(this._goodsList.length != len)
			{
				for(let i:number=0; i<len; i++)
				{
					let goodsItem:BaseGoods = new BaseGoods();
					goodsItem.x = i * 160;
					this._goodsSp.addChild(goodsItem);
					this._goodsList.push(goodsItem);
				}
				this._goodsSp.x = Math.round((this.width - this._goodsSp.width) / 2) - 25;
				this._goodsSp.y = 650;
			}

			for(let i:number=0; i<this._goodsList.length; i++)
			{
				if(this._curCvoInfo.itemList[i])
				{
					this._goodsList[i].baseId = this._curCvoInfo.itemList[i].baseId;
					this._goodsList[i].itemAmount(Manager.model.getItems().getCountItemById(this._curCvoInfo.itemList[i].baseId), this._curCvoInfo.itemList[i].num);
					// this._goodsList[i].drawItemAmout();
				}
			}
			for (let i: number = 0; i < this._curCvoInfo.zhuhunAttrList.length; i++) {
				let attrInfo:AttrCVO = AttrCVO.getInfo(this._curCvoInfo.zhuhunAttrList[i][0]);
				if(attrInfo && attrInfo.format == 1)
				{
					let value:string = (this._curCvoInfo.zhuhunAttrList[i][1] * 0.1).toFixed(1);
					this._curAttrList[i].text = AttrDescTypeEx.getAttrName(this._curCvoInfo.zhuhunAttrList[i][0]) + "+" + value + "%";
				}
				else
					this._curAttrList[i].text = AttrDescTypeEx.getAttrName(this._curCvoInfo.zhuhunAttrList[i][0]) + "+" + this._curCvoInfo.zhuhunAttrList[i][1];
			}

			let value:number = Math.round(this._curCvoInfo.rate / 100);
			this._rate.setValue(value, "equip_zhuhun", 25);
			this._percentImg.x = this._rate.x + String(value).length * 25 + 10;
		}
		if (this._nextCvoInfo)
		{
			for (let i: number = 0; i < this._nextCvoInfo.zhuhunAttrList.length; i++)
			{
				let attrInfo:AttrCVO = AttrCVO.getInfo(this._nextCvoInfo.zhuhunAttrList[i][0]);
				let value:string = "";
				if(attrInfo && attrInfo.format == 1)
					value = (Number(this._nextCvoInfo.zhuhunAttrList[i][1]) * 0.1).toFixed(1);
				else
					value = this._nextCvoInfo.zhuhunAttrList[i][1] + "";
				this._nextAttrList[i].text = AttrDescTypeEx.getAttrName(this._nextCvoInfo.zhuhunAttrList[i][0]) + "+" + value;
				if(attrInfo && attrInfo.format == 1)
					this._nextAttrList[i].text += "%";
			}
		}
	}

	private equipItemLocal():void
	{
		let list:Array<any> = [];
		for(let i:number=1; i<=8; i++)
		{
			let equipInfo:ItemsModelInfo = Manager.model.getItems().equipList.get(i);
			if(equipInfo)
			{
				let zhuhunLevel:number = 0;
				let info:EquipStrengthenInfo = Manager.model.getItems().equipStrengthenData.get(i);
				if(info) zhuhunLevel = info.zhuhunLevel;
				list.push({pos:i, level:zhuhunLevel});
			}
		}
		if(list.length > 0)
		{
			list.sort(this.sortByZhuhunLevel);
			this._thisParent._curItemIndex = list[0].pos - 1;
			this._thisParent._itemList[this._thisParent._curItemIndex].dispatchEventWith(egret.TouchEvent.TOUCH_TAP, false, false);
		}
	}

	private sortByZhuhunLevel(value1:any, value2:any):number
	{
		if(value1.level > value2.level)
			return 1;
		else if(value1.level < value2.level)
			return -1;
		else
			return 0;
	}

	public showAttrTips():void
	{
		this._zhuhunAttrTips = Manager.view.show(ViewID.ZhuhunAttrTips);
		
		if(this._thisParent.curRoleInfo)
		{
			this._zhuhunAttrTips.setInfo(this._thisParent.curRoleInfo.attrInfo.career, this._curSuitMinLevel);
		}
	}

	public reuse(thisParent:EquipPanel):void
	{
		super.reuse();
		this._thisParent = thisParent;
	}

	public dispose():void
	{
		super.dispose();

		this._thisParent = null;
		this._equipImg = null;
		if(this._btn)
			this._btn.dispose();
		this._btn = null;
		this._btnImg = null;
		if(this._curAttrList)
		{
			for(let i:number=0; i<this._curAttrList.length; i++)
			{
				this._curAttrList[i].dispose();
				this._curAttrList[i] = null;
			}
			this._curAttrList = null;
		}
		if(this._nextAttrList)
		{
			for(let i:number=0; i<this._nextAttrList.length; i++)
			{
				this._nextAttrList[i].dispose();
				this._nextAttrList[i] = null;
			}
			this._nextAttrList = null;
		}
		this._ballList = null;
		if(this._goodsSp && this._goodsSp.parent)
			this._goodsSp.parent.removeChild(this._goodsSp);
		this._goodsSp = null;
		if(this._goodsList)
		{
			for(let i:number=0; i<this._goodsList.length; i++)
			{
				Manager.pool.push(this._goodsList[i]);
				this._goodsList[i] = null;
			}
			this._goodsList = null;
		}
		this._curItemInfo = null;
		this._curCvoInfo = null;
		this._nextCvoInfo = null;
		this._equipDataList = null;
		if(this._zhuhunAttrTips)
			this._zhuhunAttrTips.dispose();
		this._zhuhunAttrTips = null;
		if(this._rate)
			Manager.pool.push(this._rate);
		this._rate = null;
		if(this._bgImg)
			Manager.pool.push(this._bgImg);
		this._bgImg = null;
		if(this._bgImg2)
			Manager.pool.push(this._bgImg2);
		this._bgImg2 = null;
	}
}