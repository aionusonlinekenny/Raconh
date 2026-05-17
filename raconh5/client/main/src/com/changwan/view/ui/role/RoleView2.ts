class RoleView2 extends RenderSprite
{
    private _skillItems:RoleSkillItem2[];
    private _equipItems:RoleEquipItem2[];
    private _fightingImg:BitmapRes;
    private _zhanliImg:BitmapRes;
	private _checkAttrBtn:Button;
	private _checkAttrImg:BitmapRes;
	private _onekeyEquipBtn:Button;
	private _onekeyEquipImg:BitmapRes;
	private _onekeyRed:BitmapRes;
	private _worldImg:BitmapRes;
	private _owner:RolePanel;
	private _animation:RoleAnimation;
	private _fighting:NumImgView2;
	private _oneKeyUpgradeEquipList:Array<ItemsModelInfo>;
	private _upgradeEffectList = {};


    public constructor(owner:RolePanel,index:number = -1, value:number = -1)
    {
        super();
		this.touchChildren = true;
		this._owner = owner;
        this.start();
        this.addEvent();
		if(index != -1)this.showOtherView(index,value);
    }

	private createSkillItem(x:number,y:number,btnName:string = ""):RoleSkillItem2
	{
		let result:RoleSkillItem2 = new RoleSkillItem2();
		result.move(x,y);
        if(btnName != "")result.btnName = btnName;
		this.addChild(result);
		return result;
	}

	private createEquipItem(pos:number):RoleEquipItem2
	{
		let result:RoleEquipItem2 = new RoleEquipItem2(pos + 1);
		if(pos == 0)result.y = 170;
		else if(pos == 1)result.y = 335;
		else if(pos == 2)result.y = 500;
		else if(pos == 3)result.y = 665;
		else if(pos == 4)
		{
			result.x = 579;
			result.y = 170;
		}
		else if(pos == 5)
		{
			result.x = 579;
			result.y = 335;
		}
		else if(pos == 6)
		{
			result.x = 579;
			result.y = 500;
		}
		else if(pos == 7)
		{
			result.x = 579;
			result.y = 665;
		}
		this.addChild(result);
		return result;
	}

    protected start():void
    {
        super.start();

        this._fightingImg = BitmapRes.create("common_fighting_png",173,774);
		this._fightingImg.touchEnabled = true;
        this.addChild(this._fightingImg);
		this._fighting = Manager.pool.create(NumImgView2);
		this._fighting.x = this._fightingImg.x + 150;
		this._fighting.y = this._fightingImg.y + 15;
		this.addChild(this._fighting);
        this._zhanliImg = BitmapRes.create("common_zhanli_png",215,780,102,57);
		this.addChild(this._zhanliImg);
		this._checkAttrBtn = new Button();
		this._checkAttrBtn.x = 148;
		this._checkAttrBtn.y = 854;
		this._checkAttrBtn.width = 200;
		this._checkAttrBtn.height = 80;
		this._checkAttrBtn.skinName = "Button1Skin";
		this.addChild(this._checkAttrBtn);
		this._checkAttrImg = BitmapRes.create("role_checkAttr_png",157,867,181,52);
		this.addChild(this._checkAttrImg);

		this._onekeyEquipBtn = new Button();
		this._onekeyEquipBtn.x = 372;
		this._onekeyEquipBtn.y = 855;
		this._onekeyEquipBtn.width = 200;
		this._onekeyEquipBtn.height = 80;
		this._onekeyEquipBtn.label = "";
		this._onekeyEquipBtn.skinName = "Button2Skin";
		this.addChild(this._onekeyEquipBtn);
		this._onekeyEquipImg = BitmapRes.create("role_onkeyEquip_png",381,869,181,52);
		this.addChild(this._onekeyEquipImg);

		this._worldImg = BitmapRes.create("role_shijie_png",30,53);
		this._worldImg.touchEnabled = true;
		this.addChild(this._worldImg);

        this._skillItems = [];
        for(let i:number = 0; i < 4; i ++)
        {
            if(i == 0)this._skillItems[i] = this.createSkillItem(37,878,"role_skillImg1_png");
            else if(i == 1)this._skillItems[i] = this.createSkillItem(188,951,"role_skillImg2_png");
            else if(i == 2)this._skillItems[i] = this.createSkillItem(421,951);
            else if(i == 3)this._skillItems[i] = this.createSkillItem(569,878);
        }
		this._skillItems[0].showLock = !OpenCVO.isOpen(OpenConst.ID_SHENBING);
		this._skillItems[1].showLock = !OpenCVO.isOpen(OpenConst.ID_CLOAK);
		// this._skillItems[1].showIcon = Manager.model.getCloak().checkActiveCloak();

        this._equipItems = [];
        for(let i:number = 0 ; i < 8; i ++)
        {
			this._equipItems[i] = this.createEquipItem(i);
        }
		// Manager.control.getEquip().equipStrengthenQuery();
		// Manager.control.getSoldier().query();

		this.showAnimation();
    }

	protected addEvent():void
	{
		super.addEvent();
		Manager.model.getItems().addEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateEquipInfoHandler, this);
		this._checkAttrBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._onekeyEquipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getSoldier().addEventListener(SoldierEvent.SOLDIER_INFO_UPDATE,this.onUpdateSoldierInfoHandler,this);
		for(let i:number = 0; i < 4; i ++)
		{
			this._skillItems[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSkillItemHandler,this);
		}
		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
		Manager.model.getItems().addEventListener(ItemsEvent.ONEKEY_UPGRADE_EQUIP_LIST,this.updateOneKeyRED,this);
		this._fightingImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._worldImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
	}

	protected removeEvent():void
	{
		super.removeEvent();
		Manager.model.getItems().removeEventListener(ItemsEvent.EQUIP_UPDATE_EVENT, this.onUpdateEquipInfoHandler, this);
		this._checkAttrBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._onekeyEquipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getSoldier().removeEventListener(SoldierEvent.SOLDIER_INFO_UPDATE,this.onUpdateSoldierInfoHandler,this);
		for(let i:number = 0; i < 4; i ++)
		{
			this._skillItems[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSkillItemHandler,this);
		}
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ONEKEY_UPGRADE_EQUIP_LIST,this.updateOneKeyRED,this);
		this._fightingImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		this._worldImg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
	}

	private onUpdateEquipInfoHandler(e?:ItemsEvent):void
	{
		this.drawRoleInfo();
	}

	private onItemUpdateHandler(e:ItemsEvent):void
	{
		if(e.params == 2)
		{
			this.invalidate("drawEquipRed");
		}
	}

	private updateOneKeyRED(e:ItemsEvent):void
	{
		this.invalidate("drawOneKeyRED");
	}

	private onUpdateSoldierInfoHandler(e:SoldierEvent):void
	{
		this.invalidate("drawSoldRed");
	}

	private onSkillItemHandler(e:egret.TouchEvent):void
	{
		let index:number = this._skillItems.indexOf(e.currentTarget);
		if(index == -1) return;
		this.showOtherView(index);
	}

	private onClickHandler(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			case this._fightingImg:
			case this._checkAttrBtn:
				Manager.view.show(ViewID.RoleAttrView);
				break;
			case this._onekeyEquipBtn:
				this.clickOneKeyWear(e);
				break;
			case this._worldImg:
				Manager.view.show(ViewID.WorldLevelView);
				break;
		}
	}

	private clickOneKeyWear(e:egret.TouchEvent):void
	{
		if(e != null && Manager.model.getGuide().curID == GuideID.WEAR_EQUIP) return;
		if(!OpenCVO.isOpen(OpenConst.ID_ONE_KEY_EQUIP, true)) return;
		let list:Array<ItemsModelInfo> = Manager.model.getItems().oneKeyUpgradeEquipList;
		if(list.length > 0)
		{
			this._oneKeyUpgradeEquipList = list;
			Manager.control.getEquip().equipOneKey(list);
		}
	}

	protected drawAll():void
	{
		super.drawAll();
		this.drawEquipRed();
		this.drawOneKeyRED();
		this.drawSoldRed();
		this.drawRoleInfo();
		//引导(放在start会导致视图没添加到panel，获取parent为空)
		if(Manager.model.getGuide().curID == GuideID.PET_UPGRADE) 
		{
			let pos = this.parent.localToGlobal(this.x,this.y);
			Manager.control.getTask().showGuide(pos, 245, 1205, this.petGuideCB, this, false);
		}
		if(Manager.model.getGuide().curID == GuideID.WEAR_EQUIP) 
		{
			let pos = this._onekeyEquipBtn.parent.localToGlobal(this._onekeyEquipBtn.x,this._onekeyEquipBtn.y);
			Manager.control.getTask().showGuide(pos, this._onekeyEquipBtn.width>>1, this._onekeyEquipBtn.height>>1,
												this.wearGuideCB, this, false);
		}
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawEquipRed"))this.drawEquipRed();
		if(this.isInvalid("drawOneKeyRED"))this.drawOneKeyRED();
		if(this.isInvalid("drawSoldRed"))this.drawSoldRed();
		if(this.isInvalid("drawRoleInfo"))this.drawRoleInfo();
	}

	private drawOneKeyRED():void
	{
		if(!OpenCVO.isOpen(OpenConst.ID_ONE_KEY_EQUIP)) return;
		let show:boolean = Manager.model.getItems().oneKeyUpgradeEquipList.length >= 2;
		if(show)
		{
			if(this._onekeyRed == null)this._onekeyRed = BitmapRes.create("common_red_icon_png",539,849,35,35);
			this.addChild(this._onekeyRed);
		}
		else
		{
			if(this._onekeyRed != null && this._onekeyRed.parent)this.removeChild(this._onekeyRed);
		}
	}

	private drawEquipRed():void
	{
		this._skillItems[1].showIcon = Manager.model.getCloak().checkActiveCloak();
	}

	private drawSoldRed():void
	{
		this._skillItems[0].showIcon = Manager.model.getSoldier().checkCanUpgrade();
	}


    protected disposeSelf():void
    {
        super.disposeSelf();
		if(Manager.model.getGuide().curID == GuideID.WEAR_EQUIP) Manager.control.getTask().hideGuide();
		if(Manager.render.contains(this.hidePnl, this)) Manager.render.remove(this.hidePnl, this);
		if(this._zhanliImg)
		{
			Manager.pool.push(this._zhanliImg);
			this._zhanliImg = null;
		}
		if(this._fightingImg)
		{
			Manager.pool.push(this._fightingImg);
			this._fightingImg = null;
		}
		if(this._checkAttrImg)
		{
			Manager.pool.push(this._checkAttrImg);
			this._checkAttrImg = null;
		}
		if(this._onekeyEquipImg)
		{
			Manager.pool.push(this._onekeyEquipImg);
			this._onekeyEquipImg = null;
		}
		if(this._onekeyRed)
		{
			Manager.pool.push(this._onekeyRed);
			this._onekeyRed = null;
		}
		if(this._worldImg)
		{
			Manager.pool.push(this._worldImg);
			this._worldImg = null;
		}
		if(this._checkAttrBtn != null)
		{
			this._checkAttrBtn.dispose();
			this._checkAttrBtn = null;
		}
		if(this._onekeyEquipBtn != null)
		{
			this._onekeyEquipBtn.dispose();
			this._onekeyEquipBtn = null;
		}
		if(this._fighting)
		{
			Manager.pool.push(this._fighting);
			this._fighting = null;
		}

		for(let i:number = 0 ; i < 8; i ++)
		{
			this._equipItems[i].dispose();
		}
		this._equipItems = null;

		for(let i:number = 0 ; i < 4; i ++)
		{
			this._skillItems[i].dispose();
		}
		this._skillItems = null;
		if(this._animation)
		{
			this._animation.dispose();
			this._animation = null;
		}

		this._owner = null;
		if(this._upgradeEffectList)
		{
			for(let i:number=1; i<=8; i++)
			{
				if(this._upgradeEffectList[i])
				{
					Manager.pool.push(this._upgradeEffectList[i]);
					this._upgradeEffectList[i] = null;
					delete  this._upgradeEffectList[i];
				}


			}
			this._upgradeEffectList = null;
		}
	}

	private showOtherView(index:number, value:number = -1):void
	{
		switch(index)
		{
			case 0:
				if(OpenCVO.isOpen(OpenConst.ID_SHENBING, true))
					this._owner.showView(SoldierView, value);
				break;
			case 1:
				if(OpenCVO.isOpen(OpenConst.ID_CLOAK, true))
					this._owner.showView(CloakView, value);
				break;
		}
	}

	private showAnimation():void
	{
		this._animation = new RoleAnimation();
		this._animation.reuse(Manager.model.self.attrInfo.clothes, Manager.model.self.attrInfo.weapon, Manager.model.self.attrInfo.wing);
		this.addChild(this._animation);
		this._animation.x = -280;
		this._animation.y = -140;
	}

	private drawRoleInfo():void
	{
		for(let i:number=0; i<8; i++)
		{
			this._equipItems[i].clear();
		}
		let equips:Dictionary<number,ItemsModelInfo> = Manager.model.getItems().equipList;
		let itemInfo:ItemsModelInfo;
		for(let i:number=0; i < 8; i++)
		{
			itemInfo = equips.get(i + 1);
			if(itemInfo)this._equipItems[i].updateRoleInfo(itemInfo);
		}
		// this._fighting.setValue(Manager.model.self.attrInfo.fight, "nums_fighting_");
		this._fighting.setValue(Manager.model.self.attrInfo.fight, "nums_fighting_", 25);
		if(this._oneKeyUpgradeEquipList && this._oneKeyUpgradeEquipList.length > 0)
		{
			for(let i:number=0; i<this._oneKeyUpgradeEquipList.length; i++)
			{
				let effect:Animation = this._upgradeEffectList[this._oneKeyUpgradeEquipList[i].cvo.pos];
				if(!effect) 
				{
					effect = Manager.animation.createEffectAnimation("Qianghua");
					effect.x = -63;
					effect.y = -57;
					effect.touchEnabled = false;
				}
				effect.play();
				this._equipItems[this._oneKeyUpgradeEquipList[i].cvo.pos - 1].addChild(effect);
			}
			this._oneKeyUpgradeEquipList = null;
		}
	}

	private wearGuideCB():void
	{
		this.clickOneKeyWear(null);
		Manager.control.getTask().hideGuide();
		Manager.render.add(this.hidePnl, this, 3000, 1, null, true);
	}

	private hidePnl():void
	{
		Manager.view.hide(ViewID.RolePanel);
	}

	private petGuideCB():void
	{
		Manager.link.link(LinkType.PANEL_ROLE, RoleIndex.PET);
	}
}