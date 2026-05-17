/**
 * 强化
 * Simon
 */
class StrengthenView2 extends RenderSprite
{
    private _thisParent:EquipPanel2;
    private _bgImg:BitmapRemote;
	private _bgImg2:BitmapRemote;
    private _bottomImg:BitmapRemote;
    private _equipImg:BitmapRes;
    private _jiantouImg:BitmapRes;
    private _btn:Button;
    private _btnImg:BitmapRes;
    private _needTxt:TextField;
    private _tipTxt:TextField;
    private _attrValue1:TextField;
    private _attrValue2:TextField;
    private _nextAttrValue1:TextField;
    private _nextAttrValue2:TextField;
    private _goodsItem:BaseGoods;

    private _curAttrList:Array<TextField>;
	private _nextAttrList:Array<TextField>;

    private _equipDataList:Dictionary<number,ItemsModelInfo>;
    private _curItemInfo:ItemsModelInfo;
    private _curCvoInfo:EquipStrengthenCVO;
	private _nextCvoInfo:EquipStrengthenCVO;

    public constructor(thisParent:EquipPanel2)
    {
        super();
        this._thisParent = thisParent;
        this.touchChildren = true;
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        super.start();

        this._bgImg = Manager.pool.create(BitmapRemote);
        this._bgImg.x = 49;
        this._bgImg.y = 217;
        this.addChild(this._bgImg);
        this._bgImg.load(PathInfo.getPath("res/equip/equip_strengthen_centerImg1.png", LoaderType.IMAGE), 623, 588);

        this._bgImg2 = Manager.pool.create(BitmapRemote);
        this._bgImg2.x = 83;
        this._bgImg2.y = 314;
        this.addChild(this._bgImg2);
        this._bgImg2.load(PathInfo.getPath("res/equip/equip_strengthen_centerImg2.png", LoaderType.IMAGE), 555, 279);

        this._bottomImg = Manager.pool.create(BitmapRemote);
        this._bottomImg.x = 0;
        this._bottomImg.y = 855;
        this.addChild(this._bottomImg);
        this._bottomImg.load(PathInfo.getPath("res/equip/equip_strengthen_bottomBg.png", LoaderType.IMAGE));

		this._btn = new Button();
        this._btn.skinName = "Button2Skin";
        this._btn.move(241, 1019);
        this.addChild(this._btn);

        this._btnImg = BitmapRes.create("equip_strengthen_btnWord_png", 270, 1046, 181, 52);
        this.addChild(this._btnImg);

		this._equipImg = Manager.pool.create(BitmapRes);
		this._equipImg.x = 312;
		this._equipImg.y = 345;
		this._equipImg.width = 105;
		this._equipImg.height = 105;
        this._equipImg.touchEnabled = true;
        this.addChild(this._equipImg);

        this._jiantouImg = BitmapRes.create("common_strengthen_jiantou_png", 332, 497, 56, 70);
        this.addChild(this._jiantouImg);

        this._needTxt = TextField.create(96, 24);
        this._needTxt.move(310,608);
        this._needTxt.textColor = Color.DEF;
        this._needTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._needTxt.textAlign = egret.HorizontalAlign.CENTER;
        this._needTxt.fontFamily = "Microsoft YaHei";
        this._needTxt.size = 24;
        this._needTxt.text = LangCVO.getContent("equip51");
        this.addChild(this._needTxt);

        this._tipTxt = TextField.create(317, 24);
        this._tipTxt.move(200,994);
        this._tipTxt.textColor = 0xDFCCBE;
        this._tipTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        this._tipTxt.fontFamily = "Microsoft YaHei";
        this._tipTxt.size = 24;
        this._tipTxt.text = LangCVO.getContent("equip52");
        this.addChild(this._tipTxt);

        this._attrValue1 = TextField.create(200, 24);
        this._attrValue1.move(183,492);
        this._attrValue1.textColor = Color.DEF;
        this._attrValue1.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._attrValue1.textAlign = egret.HorizontalAlign.LEFT;
        this._attrValue1.fontFamily = "Microsoft YaHei";
        this._attrValue1.size = 24;
        this.addChild(this._attrValue1);

        this._attrValue2 = TextField.create(200, 24);
        this._attrValue2.move(183,550);
        this._attrValue2.textColor = Color.DEF;
        this._attrValue2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._attrValue2.textAlign = egret.HorizontalAlign.LEFT;
        this._attrValue2.fontFamily = "Microsoft YaHei";
        this._attrValue2.size = 24;
        this.addChild(this._attrValue2);

        this._nextAttrValue1 = TextField.create(200, 24);
        this._nextAttrValue1.move(408,492);
        this._nextAttrValue1.textColor = Color.DEF;
        this._nextAttrValue1.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._nextAttrValue1.textAlign = egret.HorizontalAlign.LEFT;
        this._nextAttrValue1.fontFamily = "Microsoft YaHei";
        this._nextAttrValue1.size = 24;
        this.addChild(this._nextAttrValue1);

        this._nextAttrValue2 = TextField.create(200, 24);
        this._nextAttrValue2.move(408,550);
        this._nextAttrValue2.textColor = Color.DEF;
        this._nextAttrValue2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._nextAttrValue2.textAlign = egret.HorizontalAlign.LEFT;
        this._nextAttrValue2.fontFamily = "Microsoft YaHei";
        this._nextAttrValue2.size = 24;
        this.addChild(this._nextAttrValue2);

        this._goodsItem = Manager.pool.create(BaseGoods);
        this._goodsItem.x = 290;
        this._goodsItem.y = 632;
        this.addChild(this._goodsItem);

        this._curAttrList = [this._attrValue1, this._attrValue2];
		this._nextAttrList = [this._nextAttrValue1, this._nextAttrValue2];

        //引导
		if(Manager.model.getGuide().curID == GuideID.STRENTHEN)
		{
			let pos:egret.Point = this._btn.parent.localToGlobal(this._btn.x,this._btn.y);
			Manager.control.getTask().showGuide(pos, this._btn.width>>1, this._btn.height>>1, this.guideCB, this, false);
		}
    }

    private guideCB():void
	{
		this.onClickHandler(null);
		Manager.control.getTask().hideGuide();
	}

	protected drawAll():void
	{
		super.drawAll();
		this.updateRoleInfo();
        this.onUpdateStrengthenInfo();
	}

    protected draw():void
    {
        super.draw();
        if(this.isInvalid("onUpdateStrengthenInfo")) this.onUpdateStrengthenInfo();
        if(this.isInvalid("onUpdateItemInfo")) this.onUpdateItemInfo();
    }

    private cleanItemInfo():void
	{
		this._thisParent.equipName.text = "";
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

    private onClickEquipImgHandler(e:egret.TouchEvent):void
	{
		this._thisParent._itemList[this._thisParent._curItemIndex].dispatchEventWith(egret.TouchEvent.TOUCH_TAP, false, true);
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
				this._thisParent.equipName.text = equipName + "+" + curLevel;
			else
				this._thisParent.equipName.text = equipName;
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

    private onUpdateItemInfoHandler(e:ItemsEvent):void
	{
		this.invalidate("onUpdateItemInfo");
	}

	private onUpdateItemInfo():void
	{
		this.updateRoleInfo();
	}

    public disposeSelf():void
    {
        super.disposeSelf();
        ObjectUtil.removes(this._bgImg, this._bgImg2, this._bottomImg, this._equipImg, this._jiantouImg, this._btn, this._btnImg,
            this._needTxt, this._tipTxt, this._attrValue1, this._attrValue2, this._nextAttrValue1, this._nextAttrValue2, this._goodsItem
        );
        this._thisParent = null;
        if(this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        if(this._bgImg2)
            Manager.pool.push(this._bgImg2);
        this._bgImg2 = null;
        if(this._bottomImg)
            Manager.pool.push(this._bottomImg);
        this._bottomImg = null;
        if(this._equipImg)
            Manager.pool.push(this._equipImg);
        this._equipImg = null;
        if(this._jiantouImg)
            Manager.pool.push(this._jiantouImg);
        this._jiantouImg = null;
        if(this._btn)
            this._btn.dispose();
        this._btn = null;
        if(this._btnImg)
            Manager.pool.push(this._btnImg);
        this._btnImg = null;
        if(this._needTxt)
            Manager.pool.push(this._needTxt);
        this._needTxt = null;
        if(this._tipTxt)
            Manager.pool.push(this._tipTxt);
        this._tipTxt = null;
        if(this._attrValue1)
            Manager.pool.push(this._attrValue1);
        this._attrValue1 = null;
        if(this._attrValue2)
            Manager.pool.push(this._attrValue2);
        this._attrValue2 = null;
        if(this._nextAttrValue1)
            Manager.pool.push(this._nextAttrValue1);
        this._nextAttrValue1 = null;
        if(this._nextAttrValue2)
            Manager.pool.push(this._nextAttrValue2);
        this._nextAttrValue2 = null;
        if(this._goodsItem)
            Manager.pool.push(this._goodsItem);
        this._goodsItem = null;
        this._curAttrList = null;
        this._nextAttrList = null;
        this._equipDataList = null;
        this._curItemInfo = null;
        this._curCvoInfo = null;
        this._nextCvoInfo = null;
    }
}