class EquipPanel2 extends Panel2
{
    public titleImg:BitmapRes;
    private _titleBg:BitmapRes;
    private _topBtn:BitmapRes;
    private _fightImg:BitmapRes;
    private _fightImg2:BitmapRes;
    public equipName:TextField;
    private _viewLayer:egret.DisplayObjectContainer;
    private _itemLayer:egret.DisplayObjectContainer;

    public _itemList:Array<EquipItem>;
    /**装备默认图片 */
	public baseIconList:Array<BitmapRes>;
    public redImgList:Array<BitmapRes>;

    public _fighting:NumImgView2;
    public _curItemIndex:number;
    private _curFuncIndex:number;
    /** 当前功能界面 */
	public curView:any;

    public curRoleInfo:SelfGameObjectInfo;
    private _chenggongEffect:Animation;
    public strengthenEffectList = {};
	private _btnList:Array<BaseFuncBtn2>;

    public constructor()
    {
        super();
    }

    protected configUI():void
    {
        super.configUI();

        Manager.control.getEquip().equipPanel2 = this;

        this.titleImg = Manager.pool.create(BitmapRes);
        this.titleImg.x = 270;
        this.titleImg.y = 72;
        this.titleImg.width = 181;
        this.titleImg.height = 52;

        this._titleBg = BitmapRes.create("common_title_wordBg_png", 256, 166, 209, 36);
        this.imageContainer.addChild(this._titleBg);

        this._topBtn = Manager.pool.create(BitmapRes);
        this._topBtn.x = 471;
        this._topBtn.y = 160;
        this._topBtn.width = 49;
        this._topBtn.height = 48;

        this._fightImg = BitmapRes.create("common_fighting_png", 175, 836, 441, 65);
        this.imageContainer.addChild(this._fightImg);

        this._fightImg2 = BitmapRes.create("common_zhanli_png", 222, 843, 102, 57);
        this.imageContainer.addChild(this._fightImg2);

        this.equipName = TextField.create(200, 30);
        this.equipName.move(260,167);
        this.equipName.textColor = Color.DEF;
        this.equipName.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.equipName.textAlign = egret.HorizontalAlign.CENTER;
        this.equipName.fontFamily = "Microsoft YaHei";
        this.equipName.size = 32;
        this.equipName.text = "";
        this.topContainer.addChild(this.equipName);

        this._viewLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this.imageContainer.addChild(this._viewLayer);

        this._itemLayer = Manager.pool.create(egret.DisplayObjectContainer);
        this._itemLayer.y = 237;
        this._itemLayer.width = 720;
        this._itemLayer.height = 950;
        this.imageContainer.addChild(this._itemLayer);

        this._itemList = [];
		for(var i:number=0; i<8; i++)
		{
            let tmpX:number = 12 + Math.floor(i / 4) * 558;
            let tmpY:number = 165 * i - (Math.floor(i / 4) * 4 * 165);
            let item:EquipItem = Manager.pool.create(EquipItem);
            item.x = tmpX;
            item.y = tmpY;
            item.count = 0;
            item.setStrengthenLevel(0);
            this._itemLayer.addChild(item);
			this._itemList.push(item);
		}

        this.baseIconList = [];
		for(let i:number=0; i<8; i++)
		{
            let tmpX:number = 52 + Math.floor(i / 4) * 558;
            let tmpY:number = 35 + 165 * i - (Math.floor(i / 4) * 4 * 165);
            let img:BitmapRes = BitmapRes.create("equip_baseIcon"+ (i + 1) +"_png", tmpX, tmpY, 63, 70);
            this._itemLayer.addChild(img);
			this.baseIconList.push(img);
		}

        this.redImgList = [];
		for(let i:number=0; i<8; i++)
        {
            let tmpX:number = 117 + Math.floor(i / 4) * 558;
            let tmpY:number = 12 + 165 * i - (Math.floor(i / 4) * 4 * 165);
            let img:BitmapRes = BitmapRes.create("common_red_icon_png", tmpX, tmpY, 23, 23);
            this.redImgList.push(img);
        }

		this._fighting = Manager.pool.create(NumImgView2);
		this._fighting.x = this._fightImg.x + 150;
		this._fighting.y = this._fightImg.y + 15;
		this.imageContainer.addChild(this._fighting);
		this._fighting.setValue(0, "nums_fighting_", 25);

		let menuBtnContent:Array<any> = [];
        if(OpenCVO.isOpen(OpenConst.ID_STRENGTHEN))
			menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon1_png"});
		if(OpenCVO.isOpen(OpenConst.ID_GEM))
			menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon2_png"});
		if(OpenCVO.isOpen(OpenConst.ID_ZHUHUN))
			menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon3_png"});
		if(OpenCVO.isOpen(OpenConst.ID_SUIT))
			menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", imgNormal: "equip_btnIcon4_png"});
		if(OpenCVO.isOpen(OpenConst.ID_STARUP))
			menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", imgNormal: "starUp_icon_png"});

		this._btnList = [];
		for(let i:number=0; i<menuBtnContent.length; i++)
		{
			let btnItem:BaseFuncBtn2 = new BaseFuncBtn2(menuBtnContent[i], this.imageContainer);
			this._btnList.push(btnItem);
		}
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
		// let strengthenBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(0) as BaseFuncBtn;
		// if(strengthenBtn)
		// 	strengthenBtn.setIconShow(Manager.model.getEquip().checkCanStrengthen());
	}

	private checkCanUpgradeGem():void
	{
		// let gemBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(1) as BaseFuncBtn;
		// if(gemBtn)
		// 	gemBtn.setIconShow(Manager.model.getEquip().checkGemCanPuton());
	}

	private checkCanZhuhun():void
	{
		// let zhuhunBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(2) as BaseFuncBtn;
		// if(zhuhunBtn)
		// 	zhuhunBtn.setIconShow(Manager.model.getEquip().checkCanZhuhun());
	}

	private checkCanSuitUpgrade():void
	{
		// let suitBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(3) as BaseFuncBtn;
		// if(suitBtn)
		// 	suitBtn.setIconShow(Manager.model.getEquip().checkCanSuitUpgrade());
	}

    private checkCanStarUp():void
	{
		// let starUpBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(4) as BaseFuncBtn;
		// if(starUpBtn)
		// 	starUpBtn.setIconShow(Manager.model.getStarUp().checkCoin());
	}

    protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.closeBtn:
			case this.backBtn:
				Manager.view.hide(ViewID.EquipPanel);
			break;
			case this._topBtn:
				this.curView.showAttrTips();
			break;
		}
	}

	public show(tabIndex:number = 0):void
	{
        super.show();

		if(tabIndex == this._curFuncIndex) return;

		let isBack:boolean = false;
		switch(tabIndex)
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
		}
		else
			this._curFuncIndex = tabIndex;

		if(this.curView)
		{
			if(this.curView.parent)
				this.curView.parent.removeChild(this.curView);
			this.curView.dispose();
		}
		for(let i:number=0; i<this._itemList.length; i++)
		{
			this._itemList[i].setStrengthenLevel(0);
			if(this.redImgList[i].parent)
				this.redImgList[i].parent.removeChild(this.redImgList[i]);
		}
		if(this._curFuncIndex == 0)
		{
			if(this._topBtn.parent)
				this.imageContainer.removeChild(this._topBtn);
		}
		else
		{
			if(!this._topBtn.parent)
				this.imageContainer.addChild(this._topBtn);
		}
		switch(this._curFuncIndex)
		{
			case 0:
				this.titleImg.source = "equip_strengthen_titleImg_png";
				this.imageContainer.addChild(this.titleImg);
				this.curView = new StrengthenView2(this);
				this._viewLayer.addChild(this.curView);
				break;
			// case 1:
			// 	this.curView = new GemView(this);
			// 	this._viewLayer.addChild(this.curView);
			// 	break;
			// case 2:
			// 	this.curView = new ZhuhunView(this);
			// 	this._viewLayer.addChild(this.curView);
			// 	break;
			// case 3:
			// 	this.curView = new SuitView(this);
			// 	this.addChild(this.curView);
			// 	break;
			// case 4:
			// 	this._equipItemList.visible = false;
			// 	this.curView = new StarUpView(this);
			// 	this.addChild(this.curView);
			// 	break;
		}
	}

    // protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	// {
	// 	let isBack:boolean = false;
	// 	switch(this.scrollerList.itemList.selectedIndex)
	// 	{
	// 		case 1:
	// 			isBack = !OpenCVO.isOpen(OpenConst.ID_GEM, true);
	// 			break;
	// 		case 2:
	// 			isBack = !OpenCVO.isOpen(OpenConst.ID_ZHUHUN, true);
	// 			break;
	// 		case 3:
	// 			isBack = !OpenCVO.isOpen(OpenConst.ID_SUIT, true);
	// 			break;
	// 		case 4:
	// 			isBack = !OpenCVO.isOpen(OpenConst.ID_STARUP,true);
	// 	}
	// 	if(isBack)
	// 	{
	// 		if(this._curFuncIndex == undefined || this._curFuncIndex < 0) this._curFuncIndex = 0
	// 		this.basePanel.scrollerList.itemList.selectedIndex = this._curFuncIndex;
	// 		this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
	// 		return;
	// 	}

	// 	super.onFuncBtnChangeHandler(e);

	// 	if(this.curView)
	// 	{
	// 		if(this.curView.parent)
	// 			this.curView.parent.removeChild(this.curView);
	// 		this.curView.dispose();
	// 	}
	// 	for(let i:number=0; i<this._itemList.length; i++)
	// 	{
	// 		this._itemList[i].setStrengthenLevel(0);
	// 		this.redImgList[i].visible = false;
	// 	}
	// 	this._curFuncIndex = this.basePanel.scrollerList.itemList.selectedIndex;
	// 	if(this._curFuncIndex == 0)
	// 		this._topBtn.visible = false;
	// 	else
	// 		this._topBtn.visible = true;
	// 	switch(this._curFuncIndex)
	// 	{
	// 		// case 0:
	// 		// 	this.curView = new StrengthenView2(this);
	// 		// 	this._viewLayer.addChild(this.curView);
	// 		// 	break;
	// 		// case 1:
	// 		// 	this.curView = new GemView(this);
	// 		// 	this._viewLayer.addChild(this.curView);
	// 		// 	break;
	// 		// case 2:
	// 		// 	this.curView = new ZhuhunView(this);
	// 		// 	this._viewLayer.addChild(this.curView);
	// 		// 	break;
	// 		// case 3:
	// 		// 	this.curView = new SuitView(this);
	// 		// 	this.addChild(this.curView);
	// 		// 	break;
	// 		// case 4:
	// 		// 	this._equipItemList.visible = false;
	// 		// 	this.curView = new StarUpView(this);
	// 		// 	this.addChild(this.curView);
	// 		// 	break;
	// 	}
	// }

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

    public showCgEffect():void
	{
		this._chenggongEffect = Manager.animation.createEffectAnimation("suc");
		this._chenggongEffect.x = Math.round((this.uiContainer.width - 512) / 2);
		this._chenggongEffect.y = Math.round((this.uiContainer.height - 258) / 2) + 150;
		this._chenggongEffect.touchEnabled = false;
		this._chenggongEffect.play();
		if(!this._chenggongEffect.parent)
			this.topContainer.addChild(this._chenggongEffect);
	}

    public dispose():void
    {
        super.dispose();

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