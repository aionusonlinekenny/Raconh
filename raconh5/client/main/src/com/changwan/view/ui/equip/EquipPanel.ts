class EquipPanel extends Panel
{
	public _titleImg:eui.Image;
	public _equipName:Label;
	public _topBtn:eui.Image;
	public _fightImg:eui.Image;
	public _fightImg2:eui.Image;
	public _titleBg:eui.Image;

	private _func:eui.Group;
	public _equipItemList:eui.Group;
	private _equipItem1:EquipItem;
	private _equipItem2:EquipItem;
	private _equipItem3:EquipItem;
	private _equipItem4:EquipItem;
	private _equipItem5:EquipItem;
	private _equipItem6:EquipItem;
	private _equipItem7:EquipItem;
	private _equipItem8:EquipItem;
	private _baseIcon1:eui.Image;
	private _baseIcon2:eui.Image;
	private _baseIcon3:eui.Image;
	private _baseIcon4:eui.Image;
	private _baseIcon5:eui.Image;
	private _baseIcon6:eui.Image;
	private _baseIcon7:eui.Image;
	private _baseIcon8:eui.Image;
	public redImgList:Array<eui.Image>;

	/**装备默认图片 */
	public baseIconList:Array<eui.Image>;
	private _menuBtnContent:Array<any>;
	private _curFuncIndex:number;
	public curRoleInfo:SelfGameObjectInfo;
	public _itemList:Array<EquipItem>;
	public _curItemIndex:number;
	public _fighting:NumImgView2;
	private _chenggongEffect:Animation;
	public strengthenEffectList = {};

	/** 当前功能界面 */
	public curView:any;
	
	public constructor()
	{
		super();

		this.skinName = Manager.path.getSkinName("equip", "EquipPanelSkin");
	}

	protected configUI():void
	{
		super.configUI();

		Manager.control.getEquip().equipPanel = this;

		this._func.touchEnabled = false;
		this._equipItemList.touchEnabled = false;
		

		this.baseIconList = [this._baseIcon1, this._baseIcon2, this._baseIcon3, this._baseIcon4, this._baseIcon5, this._baseIcon6, this._baseIcon7, this._baseIcon8];
		for(let i:number=0; i<this.baseIconList.length; i++)
		{
			this.baseIconList[i].touchEnabled = false;
		}
		this._itemList = [this._equipItem1, this._equipItem2, this._equipItem3, this._equipItem4, this._equipItem5, this._equipItem6, this._equipItem7, this._equipItem8];
		for(var i:number=0; i<this._itemList.length; i++)
		{
			this._itemList[i].count = 0;
			this._itemList[i].setStrengthenLevel(0);
		}

		this.redImgList = [];
		for(let i:number=1; i<=8; i++)
			this.redImgList.push(this["_redImg" + i]);

		if(!this._fighting)
		{
			this._fighting = Manager.pool.create(NumImgView2);
			this._fighting.x = this._fightImg.x + 330;
			this._fighting.y = this._fightImg.y + 15;
			this.addChild(this._fighting);
		}
		this._fighting.setValue(0, "nums_fighting_", 25);

		this._menuBtnContent = [
			// { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon1_png", imgClick: "equip_btnIcon1_png" },
			// { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon2_png", imgClick: "equip_btnIcon2_png" },
			// { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon3_png", imgClick: "equip_btnIcon3_png" },
			// { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon4_png", imgClick: "equip_btnIcon4_png" }
		];

		if(OpenCVO.isOpen(OpenConst.ID_STRENGTHEN))
			this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon1_png", imgClick: "equip_btnIcon1_png" });
		if(OpenCVO.isOpen(OpenConst.ID_GEM))
			this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon2_png", imgClick: "equip_btnIcon2_png" });
		if(OpenCVO.isOpen(OpenConst.ID_ZHUHUN))
			this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon3_png", imgClick: "equip_btnIcon3_png" });
		if(OpenCVO.isOpen(OpenConst.ID_SUIT))
			this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon4_png", imgClick: "equip_btnIcon4_png" });
		if(OpenCVO.isOpen(OpenConst.ID_STARUP))
			this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "starUp_icon_png", imgClick: "starUp_icon_png" });

		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent,true);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = -10;
	}

	protected initData():void
	{
		super.initData();

		this._curItemIndex = 0;

		//Manager.control.getItems().itemsQuery(ItemsType.BAG);
	}

	protected addEvent():void
	{
		super.addEvent();

		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onEquipUpdateHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.onEquipUpdateHandler, this);
		this._topBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		if(this._itemList)
		{
			for(let i:number=0; i<this._itemList.length; i++)
			{
				this._itemList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
			}
		}
	}

	protected removeEvent():void
	{
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onEquipUpdateHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_STRENGTHEN_UPDATE_EVENT, this.onEquipUpdateHandler, this);
		this._topBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		if(this._itemList)
		{
			for(let i:number=0; i<this._itemList.length; i++)
			{
				this._itemList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItemHandler, this);
			}
		}

		super.removeEvent();
	}

	private onEquipUpdateHandler(e:ItemsEvent):void
	{
		this.checkCanStrengthenTenTime();
		this.checkCanUpgradeGem();
		this.checkCanZhuhun();
		this.checkCanSuitUpgrade();
		this.checkCanStarUp();
	}

	private checkCanStrengthenTenTime():void
	{
		let strengthenBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(0) as BaseFuncBtn;
		if(strengthenBtn)
			strengthenBtn.setIconShow(Manager.model.getEquip().checkCanStrengthen());
	}

	private checkCanUpgradeGem():void
	{
		let gemBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(1) as BaseFuncBtn;
		if(gemBtn)
			gemBtn.setIconShow(Manager.model.getEquip().checkGemCanPuton());
	}

	private checkCanZhuhun():void
	{
		let zhuhunBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(2) as BaseFuncBtn;
		if(zhuhunBtn)
			zhuhunBtn.setIconShow(Manager.model.getEquip().checkCanZhuhun());
	}

	private checkCanStarUp():void
	{
		let starUpBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(4) as BaseFuncBtn;
		if(starUpBtn)
			starUpBtn.setIconShow(Manager.model.getStarUp().checkCoin());
	}
	private checkCanSuitUpgrade():void
	{
		let suitBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(3) as BaseFuncBtn;
		if(suitBtn)
			suitBtn.setIconShow(Manager.model.getEquip().checkCanSuitUpgrade());
	}

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				// Manager.panel.hide(this);
				Manager.view.hide(ViewID.EquipPanel);
			break;

			case this._topBtn:
				this.curView.showAttrTips();
			break;
		}
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		let isBack:boolean = false;
		switch(this.basePanel.scrollerList.itemList.selectedIndex)
		{
			case 1:
				isBack = !OpenCVO.isOpen(OpenConst.ID_GEM, true);
				break;
			case 2:
				isBack = !OpenCVO.isOpen(OpenConst.ID_ZHUHUN, true);
				break;
			case 3:
				isBack = !OpenCVO.isOpen(OpenConst.ID_SUIT, true);
				break;
			case 4:
				isBack = !OpenCVO.isOpen(OpenConst.ID_STARUP,true);
		}
		if(isBack)
		{
			if(this._curFuncIndex == undefined || this._curFuncIndex < 0) this._curFuncIndex = 0
			this.basePanel.scrollerList.itemList.selectedIndex = this._curFuncIndex;
			this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
			return;
		}

		super.onFuncBtnChangeHandler(e);

		if(this.curView)
		{
			if(this.curView.parent)
				this.curView.parent.removeChild(this.curView);
			this.curView.dispose();
		}
		for(let i:number=0; i<this._itemList.length; i++)
		{
			this._itemList[i].setStrengthenLevel(0);
			this.redImgList[i].visible = false;
		}
		this._curFuncIndex = this.basePanel.scrollerList.itemList.selectedIndex;
		if(this._curFuncIndex == 0)
			this._topBtn.visible = false;
		else
			this._topBtn.visible = true;
		switch(this._curFuncIndex)
		{
			case 0:
				this.curView = new StrengthenView(this);
				this._func.addChild(this.curView);
				break;
			case 1:
				this.curView = new GemView(this);
				this._func.addChild(this.curView);
				break;
			case 2:
				this.curView = new ZhuhunView(this);
				this._func.addChild(this.curView);
				break;
			case 3:
				this.curView = new SuitView(this);
				this.addChild(this.curView);
				break;
			case 4:
				//this._equipItemList.visible = false;
				this.curView = new StarUpView(this);
				this._func.addChild(this.curView);
				break;
		}
	}

	private onClickItemHandler(e:egret.TouchEvent):void
	{
		let index = this._itemList.indexOf(e.currentTarget);
		if(index == -1) return;

		let isShowTips:boolean = e.data ? true : false;
		if(this._itemList[index]) this._itemList[index].isShowTips = isShowTips;
		if(this.curView instanceof GemView || this.curView instanceof ZhuhunView)
		{
			// if(index == this._curItemIndex) return;
			if(this._itemList[this._curItemIndex])
				this._itemList[this._curItemIndex].selected = false;
			this._curItemIndex = index;
			if(this._itemList[this._curItemIndex])
			{
				this._itemList[this._curItemIndex].isShowTips = isShowTips;
				this._itemList[this._curItemIndex].selected = true;
				this.curView.updateSelectItem();
			}
		}
		
	}

	public setGemBack(value:number):void
	{
		if(this.curView instanceof GemView)
		{
			this.showCgEffect();
			this.curView.setGemBack(value);
		}
	}

	public getEquipItemList():eui.Group
	{
		return this._equipItemList;
	}

	public showCgEffect():void
	{
		this._chenggongEffect = Manager.animation.createEffectAnimation("suc");
		this._chenggongEffect.x = Math.round((this.width - 512) / 2);
		this._chenggongEffect.y = Math.round((this.height - 258) / 2) + 150;
		this._chenggongEffect.touchEnabled = false;
		this._chenggongEffect.play();
		if(!this._chenggongEffect.parent)
			this.addChild(this._chenggongEffect);
	}

	public dispose():void
	{
		super.dispose();

		if(this.curView)
			this.curView.dispose();
		this.curView = null;

		if(this.basePanel)
		{
			this.basePanel.dispose();
			this.basePanel = null;
		}
		this._titleImg = null;
		if(this._equipName)
			this._equipName.dispose();
		this._equipName = null;
		this._topBtn = null;
		this._fightImg = null;
		this._func = null;
		this._equipItemList = null;
		if(this._itemList)
		{
			for(let i:number=0; i<this._itemList.length; i++)
			{
				Manager.pool.push(this._itemList[i]);
				this._itemList[i] = null;
			}
		}
		this._itemList = null;
		this._menuBtnContent = null;
		this.curRoleInfo = null;
		if(this._fighting)
			Manager.pool.push(this._fighting);
		this._fighting = null;
		if(this._chenggongEffect)
			Manager.pool.push(this._chenggongEffect);
		this._chenggongEffect = null;
		if(this.strengthenEffectList)
		{
			for(let i:number=1; i<=8; i++)
			{
				if(this.strengthenEffectList[i])
					Manager.pool.push(this.strengthenEffectList[i]);
				this.strengthenEffectList[i] = null;
			}
			this.strengthenEffectList = null;
		}
	}
}