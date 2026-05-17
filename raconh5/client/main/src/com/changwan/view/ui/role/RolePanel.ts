/**
 * 人物
 */
class RolePanel extends Panel
{
	private _menuBtnContent:Array<any>;
	private _view:UIComponent;
	private _view2:RenderSprite;

	private _oldIndex:number;

	private _bgImg:BitmapRemote;

	private _showArgs:any[];

	private _roleBottomImg:BitmapRemote;

	public constructor()
	{
		super(false);
		// this.skinName = Manager.path.getSkinName("role", "RolePanelSkin");
	}

	protected configUI():void
	{
		super.configUI();

		// let jingboo:boolean = Manager.model.getJingMai().checkCoin();
		
		this._menuBtnContent = [
			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "role_jiaose_normal_png", imgClick: "role_jiaose_normal_png" }
			// { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "role_pifeng1_png", imgClick: "role_pifeng2_png" }
		];
		if(OpenCVO.isOpen(OpenConst.ID_PET))
			this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "role_pet_normal_png", imgClick: "role_pet_normal_png"});
		if(OpenCVO.isOpen(OpenConst.ID_DRESS))
			this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "role_dress_normal_png", imgClick: "role_dress_normal_png"});
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
		
		Manager.render.add(this.renderInvalid, this);
	}

	protected renderInvalid(interval:number):void
	{
		Manager.render.remove(this.renderInvalid, this);
		this.updateRole();
		this.updatePet();
		this.updateFashion();
	}

	protected addEvent():void
	{
		super.addEvent();
		Manager.model.getJingMai().addEventListener(JingMaiEvent.JINGMAI_CHECK_ICON_EVENT,this.updateJingMai,this);
		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.updateItem,this);
		Manager.model.getItems().addEventListener(ItemsEvent.ONEKEY_UPGRADE_EQUIP_LIST,this.updateRole,this);
        Manager.model.getDress().fashionModel.addEventListener(FashionEvent.UPDATE, this.updateFashion, this);
	}
	protected removeEvent():void
	{
		Manager.model.getJingMai().removeEventListener(JingMaiEvent.JINGMAI_CHECK_ICON_EVENT,this.updateJingMai,this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.updateItem,this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ONEKEY_UPGRADE_EQUIP_LIST,this.updateRole,this);
        Manager.model.getDress().fashionModel.removeEventListener(FashionEvent.UPDATE, this.updateFashion, this);
		super.removeEvent();
	}

	private updateItem(e:ItemsEvent):void
	{
		if(e.params != ItemsType.BAG) return;
		this.updateRole();
		this.updatePet();
		this.updateFashion();
	}

	private updateRole(e?:ItemsEvent):void
	{
		if(!OpenCVO.isOpen(OpenConst.ID_ONE_KEY_EQUIP)) return;
		let btn:BaseFuncBtn = this.setPromptSign(0);
		if(btn)
		{
			btn.setIconShow(Manager.model.getItems().oneKeyUpgradeEquipList.length >= 2 
				|| Manager.model.getSoldier().checkCanUpgrade()
				|| Manager.model.getCloak().checkActiveCloak()
			);
		}
	}

    private updatePet(e:egret.Event = null):void
    {
		let btn:BaseFuncBtn = this.setPromptSign(1);
		if(btn) btn.setIconShow(Manager.model.getPet().checkCanOperate);
    }

    private updateFashion(e:egret.Event = null):void
    {
		let btn:BaseFuncBtn = this.setPromptSign(2);
		if(btn) btn.setIconShow(Manager.model.getDress().fashionModel.hasCanActive || Manager.model.getDress().titleModel.hasCanActive);
    }

    private updateJingMai(e:JingMaiEvent):void
    {
		let btn:BaseFuncBtn = this.setPromptSign(3);
		if(btn) btn.setIconShow(e.params);
    }

	protected initData():void
	{
		super.initData();

		//Manager.control.getItems().itemsQuery(ItemsType.EQUIE);
		Manager.control.getEquip().equipStrengthenQuery();
	}

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				if(this._view)
				{
					if((this._view instanceof CloakView) || (this._view instanceof SoldierView))
					{
						this._view.dispose();
						this._view = null;
						this.basePanel.scrollerList.itemList.selectedIndex = 0;
						this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
					}
					else
						Manager.view.hide(ViewID.RolePanel);
				}
				else
					Manager.view.hide(ViewID.RolePanel);
				break;
		}
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		var index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		// if(index == RoleIndex.JINGMAI && !OpenCVO.isOpen(OpenConst.ID_JINGMAI, true))
		// {
		// 	this.basePanel.scrollerList.itemList.selectedIndex = this._oldIndex;
		// 	return;
		// }

		let isBack:boolean = false;
		switch(index)
		{
			case RoleIndex.PET:
				isBack = !OpenCVO.isOpen(OpenConst.ID_PET, true);
				break;
			case RoleIndex.DRESS:
				isBack = !OpenCVO.isOpen(OpenConst.ID_DRESS, true);
				break;
		}
		if(isBack)
		{
			this.basePanel.scrollerList.itemList.selectedIndex = this._oldIndex;
			this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
			return;
		}

		super.onFuncBtnChangeHandler(e);

		this.basePanel.title = "role_title" + (index + 1) + "_png";
		if(this._view)
		{
			if(this._view.parent) this._view.parent.removeChild(this._view);
			this._view.dispose();
			this._view = null;
			this.basePanel.backImg.y = 57;
			this.basePanel.backImg.height = 1223;
		}
		if(this._view2 != null)
		{
			this._view2.dispose();
			this._view2 = null;
			this.basePanel.backImg.y = 57;
			this.basePanel.backImg.height = 1223;
		}
		if(this._bgImg)
		{
			if(this._bgImg.parent) this._bgImg.parent.removeChild(this._bgImg);
			Manager.pool.push(this._bgImg);
			this._bgImg = null;
		}
		// this._bgImg;
		if(index != RoleIndex.ROLE)
		{
			if(this._roleBottomImg && this._roleBottomImg.parent)
				this._roleBottomImg.parent.removeChild(this._roleBottomImg);
		}
		switch(index)
		{
			case RoleIndex.ROLE:
				if(!this._roleBottomImg)
				{
					this._roleBottomImg = Manager.pool.create(BitmapRemote);
					this._roleBottomImg.x = 0;
					this._roleBottomImg.y = Manager.config.gameHeight - 460;
					this._roleBottomImg.load(PathInfo.getPath("res/role/role_bottom.png", LoaderType.IMAGE), 720, 450);
				}
				if(!this._roleBottomImg.parent)
					this.basePanel.addChildAt(this._roleBottomImg, 1);
				// this.basePanel.bottomBackImg.source = "role_bottom_png";
				// this.basePanel.bottomBackImg.source = "";
				this.basePanel.showBottomBack = false;
				// this.basePanel.bottomBackImg.width = 720;
				// this.basePanel.setBottomBackTop(Manager.config.gameHeight - 460);
				// this.basePanel.backBtn.selected = false;

				this.basePanel.backImg.source = "";
				this._bgImg = Manager.pool.create(BitmapRemote);
				this._bgImg.load(PathInfo.getPath("res/role/role_bg.jpg", LoaderType.IMAGE));
				this._bgImg.x = this.basePanel.backImg.x;
				this._bgImg.y = this.basePanel.backImg.y + 30;
				this.basePanel.addChildAt(this._bgImg, 1);
				
				// this._view = Manager.pool.create(RoleView, this, this._showArgs);
				if(this._showArgs instanceof Array)
				{
					if(this._showArgs.length > 0)this._view2 = new RoleView2(this, Number(this._showArgs[0]), Number(this._showArgs[1]));
					else this._view2 = new RoleView2(this);
				}
				else this._view2= new RoleView2(this);
				break;
			case RoleIndex.PET:
				this.basePanel.backImg.source = "";
				this._bgImg = Manager.pool.create(BitmapRemote);
				this._bgImg.load(Manager.path.getPetPath("back", Extension.JPG));
				this._bgImg.y = 93;
				this.basePanel.addChildAt(this._bgImg, 1);
				this._view2 = new PetView2();
				break;
			case RoleIndex.DRESS:
				this.basePanel.backImg.source = "common_panelBg_png";
				this.basePanel.setBottomBackTop(Manager.config.gameHeight);
				this._view2 = new DressView2(this._showArgs);
				break;
			case RoleIndex.SOLDIER:
				this.basePanel.backImg.source = "common_panelBg_png";
				this.basePanel.showBottomBack = true;
				this.basePanel.setBottomBackTop(982);
				if(this._showArgs.length > 0)
					this._view = Manager.pool.create(SoldierView, Number(this._showArgs[0]));
				else
					this._view = Manager.pool.create(SoldierView);
				break;
			case RoleIndex.CLOAK:
				this.basePanel.backImg.source = "common_panelBg_png";
				this.basePanel.showBottomBack = true;
				this.basePanel.setBottomBackTop(982);
				this._view = Manager.pool.create(CloakView);
				break;

		}
		if(this._view && !this._view.parent)
		{
			this.addChild(this._view);
			this._oldIndex = index;
		}
		if(this._view2 && !this._view2.parent)
		{
			this.addChild(this._view2);
			this._oldIndex = index;
		}
		this._showArgs = null;
	}

	public showView(clz:any, value:number = -1):void
	{
		if(!this.basePanel) return;
		if(this._view)
		{
			this._view.dispose();
			this._view = null;
		}
		if(this._view2)
		{
			if(this._view2 instanceof RoleView2)
			{
				if(this._roleBottomImg && this._roleBottomImg.parent)
					this._roleBottomImg.parent.removeChild(this._roleBottomImg);
			}
			this._view2.dispose();
			this._view2 = null;
		}
		if(clz == CloakView)
		{
			this.basePanel.title = "role_title7_png";
			this.basePanel.backImg.source = "common_panelBg_png";
			this.basePanel.showBottomBack = true;
		}
		if(clz == SoldierView)
		{
			this.basePanel.title = "soldier_title_png";
			this.basePanel.backImg.source = "common_panelBg_png";
			this.basePanel.showBottomBack = true;
		}
		// if(clz == PetView)
		// 	this.basePanel.title = "role_title2_png";
		// else
		// {
			this.basePanel.backImg.source = "common_panelBg_png";
			// this.basePanel.bottomBackImg.source ="panel_bg2_png";
			this.basePanel.showBottomBack = true;
		// }
		this.basePanel.setBottomBackTop(982);
		this._view = Manager.pool.create(clz, value);
		if(this._view && !this._view.parent) this.addChild(this._view);
		this.basePanel.scrollerList.itemList.selectedIndex = -1;
		this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
	}

	public setPromptSign(index:number):BaseFuncBtn
	{
		if(this.basePanel)
		{
			let dis:egret.DisplayObject = this.basePanel.scrollerList.itemList.getElementAt(index);
			return (<BaseFuncBtn>dis);
		}
		return null;
	}

	public show(args:any = 0):void
	{
		let tabIndex:number = 0;
		if(args instanceof Array) 
		{
			if(args.length > 0)tabIndex = parseInt(args.shift());
			this._showArgs = args;
		} 
		else 
		{
			tabIndex = args;//为数字
			this._showArgs = null;
		}
		super.show(tabIndex);
	}

	public dispose():void
	{
		Manager.render.remove(this.renderInvalid, this);
		super.dispose();

		ObjectUtil.removes(this._roleBottomImg);
		if(this._roleBottomImg)
			Manager.pool.push(this._roleBottomImg);
		this._roleBottomImg = null;
		if(this._view)
			this._view.dispose();
		this._view = null;
		if(this._view2)
			this._view2.dispose();
		this._view2 = null;
		this._menuBtnContent = null;
		if(this._bgImg)
			Manager.pool.push(this._bgImg);
		this._bgImg = null;
	}
}