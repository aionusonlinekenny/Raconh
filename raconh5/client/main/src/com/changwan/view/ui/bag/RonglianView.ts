/**
 * 装备熔炼
 * Simon 2017.12.1
 */
class RonglianView extends UIComponent
{
	private _thisPanel:BagPanel;
	private _monsterImgs:eui.Group;
	private _diGroup:eui.Group;
	private _mouth:eui.Image;
	private _scrollerList:BaseHScrollerList;
	private _btn:Button;
	private _fuGroup:eui.Group;
	private _eye1:eui.Image;
	private _eye2:eui.Image;
	private _diImg:BitmapRemote;
	private _imageBg1:BitmapRemote;

	private _openMouth:number = 244;
	private _closeMouth:number = 218;
	private _pointList1:Array<egret.Point>;
	private _pointList2:Array<egret.Point>;
	private _changeState:boolean = false;
	private _pointLocal:number;
	private _itemList:Array<ItemsModelInfo>;
	private _isShowEffect:boolean = false;

	private _blast:Animation;
	private _itemEffectList1:Array<Animation>;
	private _itemEffectList2:Array<Animation>;

	private _curItemCount:number;
	private _isAutoRonglian:boolean;

	private _thisTime:number = 0;

	public constructor()
	{
		super();

		this.skinName = Manager.path.getSkinName("bag", "RonglianViewSkin");
	}
	
    protected configUI():void
    {
        super.configUI();

		this._fuGroup.alpha = 0;

		this._diImg = Manager.pool.create(BitmapRemote);
		this._diImg.x = 0;
		this._diImg.y = 0;
		this._diGroup.addChild(this._diImg);
		this._diImg.load(Manager.path.getRonglianPath("ronglian_di", "png"), 714, 756);

		this._imageBg1.load(Manager.path.getCommonPath("diwenBack1.png"));

		this._itemList = [];
		//Manager.control.getItems().itemsQuery(ItemsType.EQUIE);
		// this.onUpdateItemInfoHandler();
		this.initPoint();

		//引导
		if(Manager.model.getGuide().curID == GuideID.RONG_LIAN)
		{
			let pos:egret.Point = this._btn.parent.localToGlobal(this._btn.x,this._btn.y);
			Manager.control.getTask().showGuide(pos, this._btn.width>>1, this._btn.height>>1, this.guideCB, this, false);
		}
    }

	private hidePnl():void
	{
		Manager.view.hide(ViewID.BagPanel);
	}

	private initPoint():void
	{
		this._pointList1 = [];
		this._pointList2 = [];
		for(let i:number=0; i<360; i+=72)
		{
			let radian1:number = i * Math.PI / 180;
			let tmpX1:number = 65 + Math.cos(radian1) * 1;
			let tmpY1:number = 184 + Math.sin(radian1) * 1;
			this._pointList1.push(new egret.Point(tmpX1, tmpY1));

			let radian2:number = (i - 180) * Math.PI / 180;
			let tmpX2:number = 65 + Math.cos(radian2) * 1;
			let tmpY2:number = 184 + Math.sin(radian2) * 1;
			this._pointList2.push(new egret.Point(tmpX2, tmpY2));
		}
	}

	protected drawAll():void
	{
		super.drawAll();
		this.onUpdateItemInfo();
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("onUpdateItemInfo")) this.onUpdateItemInfo();
	}

	protected addEvent():void
	{
		super.addEvent();

		this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_RONGLIAN_UPDATE_EVENT, this.onRonglianInfoUpdateHandler, this);
	}

	protected removeEvent():void
	{
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateItemInfoHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_RONGLIAN_UPDATE_EVENT, this.onRonglianInfoUpdateHandler, this);

		super.removeEvent();
	}

	private onUpdateItemInfoHandler(e?:ItemsEvent):void
	{
		this.invalidate("onUpdateItemInfo");
	}

	private onUpdateItemInfo():void
	{
		this.updateData();

		if(this._isAutoRonglian)
		{
			this._isAutoRonglian = false;
			this.onClickHandler(null);
		}
	}

	private updateData():void
	{
		this._itemList = Manager.model.getEquip().getCanRonglianItems(50);

		this._curItemCount = this._itemList.length;
		if(this._itemList.length < 10)
		{
			for(let i:number=0; i<10 - this._curItemCount; i++)
			{
				let info:ItemsModelInfo = new ItemsModelInfo();
				info.base_id = 0;
				info.quantity = 0;
				this._itemList.push(info);
			}
		}

		this._scrollerList.initBtnListData(RongLianItem, this._itemList, true);
		(<eui.VerticalLayout>this._scrollerList.itemList.layout).gap = -8;
	}

	private onRonglianInfoUpdateHandler(e:ItemsEvent):void
	{
		Manager.control.getDrop().showAlert(e.data as Array<ItemsModelInfo>);
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		if(e != null && Manager.model.getGuide().curID == GuideID.RONG_LIAN) return;
		if(this._isShowEffect == false && this._itemList.length > 0 && this._curItemCount > 0)
			this.startEffect();
	}

	private startEffect():void
	{
		this._isShowEffect = true;
		this._thisPanel.cantClick = this._isShowEffect;
		this._changeState = false;
		this._pointLocal = 0;
		this.showItemEffect();
	}

	private clearItemEffect():void
	{
		if(this._itemEffectList1)
		{
			for(let i:number=0; i<this._itemEffectList1.length; i++)
			{
				if(this._itemEffectList1[i])
				{
					Manager.pool.push(this._itemEffectList1[i]);
					this._itemEffectList1[i] = null;
				}
			}
		}
	}

	private showItemEffect():void
	{
		this.clearItemEffect();
		this._itemEffectList1 = [];
		let addEvent:boolean = false;
		for(let i:number=0; i<this._itemList.length; i++)
		{
			if(this._itemList[i].base_id == 0) continue;
			let item:RongLianItem = this._scrollerList.itemList.getElementAt(i) as RongLianItem;
			if(item)
			{
				let itemEffect:Animation = Manager.animation.createEffectAnimation("ronglian_kuang");
				itemEffect.x = item.x - 138 - this._scrollerList.scroller.viewport.scrollH;
				itemEffect.y = item.y - 165;
				this._scrollerList.addChild(itemEffect);
				if(itemEffect.x >= -138 && itemEffect.x <= -138 + 110 * 5)
					itemEffect.visible = true;
				else
					itemEffect.visible = false;
				this._itemEffectList1.push(itemEffect);
			}
		}
		egret.Tween.get(this._mouth, {loop:false}).wait(200).call(this.onItemEffectCompleteHandler, this);
	}

	private clearItemLzEffect():void
	{
		if(this._itemEffectList2)
		{
			for(let i:number=0; i<this._itemEffectList2.length; i++)
			{
				if(this._itemEffectList2[i])
				{
					Manager.pool.push(this._itemEffectList2[i]);
					this._itemEffectList2[i] = null;
				}
			}
		}
	}

	private onItemEffectCompleteHandler(e:GlobalEvent):void
	{
		this.clearItemLzEffect();
		this._itemEffectList2 = [];
		let centerPoint:egret.Point = new egret.Point(300, 505);
		for(let i:number=0; i<this._itemList.length; i++)
		{
			if(this._itemList[i].base_id == 0) continue;
			let item:RongLianItem = this._scrollerList.itemList.getElementAt(i) as RongLianItem;
			if(item)
			{
				let itemEffect:Animation = Manager.animation.createEffectAnimation("ronglian_lz");
				itemEffect.x = this._scrollerList.x + item.x + 80 - this._scrollerList.scroller.viewport.scrollH - i * 20;
				itemEffect.y = this._scrollerList.y + item.y - 40;
				itemEffect.anchorOffsetX = 50;
				itemEffect.anchorOffsetY = 0;
				this.addChild(itemEffect);
				egret.Tween.get(itemEffect).to({x:360, y:480}, 500);
				if(itemEffect.x >= this._scrollerList.x + 80 && itemEffect.x <= this._scrollerList.x + 80 + 110 * 5)
					itemEffect.visible = true;
				else
					itemEffect.visible = false;
				this._itemEffectList2.push(itemEffect);
				let angle:number = Math.atan2(itemEffect.y - centerPoint.y, itemEffect.x - centerPoint.x) * (180/Math.PI) - 90;
				itemEffect.rotation = angle;
			}
		}
		egret.Tween.get(this._mouth, {loop:false}).wait(550).call(this.onItemLzEffectCompleteHandler, this);
	}

	private onItemLzEffectCompleteHandler():void
	{
		this.clearItemEffect();
		this.clearItemLzEffect();
		this.showBlastEffect();
	}

	private showBlastEffect():void
	{
		this.poolPushBlastAni();
		this._blast = Manager.animation.createEffectAnimation("ronglian_blast");
        this._blast.addEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.poolPushBlastAni, this);
		this._blast.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.poolPushBlastAni, this);
		this._blast.x = 0;
		this._blast.y = 130;
		this.addChild(this._blast);

		egret.Tween.get(this._blast, {loop: false}).wait(550).call(this.closeMouth, this);
	}

	private poolPushBlastAni(e?:GlobalEvent):void
	{
		if(this._blast == null) return;
        this._blast.removeEventListener(GlobalEvent.ANIMATION_LOAD_ERROR, this.poolPushBlastAni, this);
		this._blast.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.poolPushBlastAni, this);
		Manager.pool.push(this._blast);
		this._blast = null;
	}

	private closeMouth():void
	{
		egret.Tween.get(this._mouth, {loop: false}).to({y:this._closeMouth}, 10).call(this.showFlash, this);
	}

	private openMouth():void
	{
		egret.Tween.get(this._mouth, {loop: false}).to({y:this._openMouth}, 10).call(this.effectComplete, this);
	}

	private showFlash():void
	{
		egret.Tween.get(this._fuGroup, {loop:false}).to({alpha:1}, 100);
		this.showShakeEffect();
	}

	private showShakeEffect():void
	{
		if(this._pointLocal < this._pointList1.length)
		{
			let point:egret.Point = (this._changeState == false ? this._pointList1[this._pointLocal] : this._pointList2[this._pointLocal]);
			egret.Tween.get(this._monsterImgs, {loop: false}).to({x:point.x, y:point.y}, 50).call(this.showShakeEffect, this);
			if(this._changeState)
				this._pointLocal += 1;
			this._changeState = !this._changeState;
		}
		else
		{
			egret.Tween.get(this._monsterImgs).wait(500).call(this.shakeEffectComplete, this);
		}
	}

	private shakeEffectComplete():void
	{
		this.openMouth();
	}

	private effectComplete():void
	{
		egret.Tween.get(this._fuGroup, {loop:false}).to({alpha:0}, 100);
		this._isShowEffect = false;
		this._thisPanel.cantClick = this._isShowEffect;
		let list:Array<ItemsModelInfo> = [];
		for(let i:number=0; i<this._itemList.length; i++)
		{
			if(this._itemList[i] && this._itemList[i].base_id != 0)
			{
				list.push(this._itemList[i]);
			}
		}
		if(list.length > 0)
			Manager.control.getEquip().equipRonglian(list);
	}

	private guideCB():void
	{
		this.onClickHandler(null);
		Manager.control.getTask().hideGuide();
		Manager.render.add(this.hidePnl, this, 3000, 1, null, true);
	}

	public reuse(value:BagPanel, isAutoRonglian:boolean):void
	{
		super.reuse(value);
		this.touchChildren = true;
		this._thisPanel = value;
		this._isAutoRonglian = isAutoRonglian;
	}

	public unuse():void
	{
		super.unuse();
		if(Manager.model.getGuide().curID == GuideID.RONG_LIAN) Manager.control.getTask().hideGuide();
		if(Manager.render.contains(this.hidePnl, this)) Manager.render.remove(this.hidePnl, this);
	}

	public dispose():void
	{
		if(Manager.model.getGuide().curID == GuideID.RONG_LIAN) Manager.control.getTask().hideGuide();
		if(Manager.render.contains(this.hidePnl, this)) Manager.render.remove(this.hidePnl, this);
		super.dispose();

		ObjectUtil.removes(this, this._monsterImgs, this._mouth, this._fuGroup, this._eye1, this._eye2);

		if(this._diImg)
			this._diImg.dispose();
		this._diImg = null;

		if(this._imageBg1)
		{
			this._imageBg1.dispose();
			this._imageBg1 = null;
		}
		if(this._scrollerList)
			this._scrollerList.dispose();
		this._scrollerList = null;

		if(this._btn)
			this._btn.dispose();
		this._btn = null;

		this._pointList1 = null;
		this._pointList2 = null;
		this._itemList = null;

		this.poolPushBlastAni();
		this.clearItemEffect();
		this.clearItemLzEffect();
		this._itemEffectList1 = null;
		this._itemEffectList2 = null;
		this._isShowEffect = false;
		this._thisPanel.cantClick = this._isShowEffect;
	}
}