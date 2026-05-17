/**
 * Simon
 * 2018-4-24
 */
class Panel2 extends eui.Component implements IViewManager
{
    public uiContainer:egret.DisplayObjectContainer;
    public imageContainer:egret.DisplayObjectContainer;
    public topContainer:egret.DisplayObjectContainer;
    public backImg:BitmapRes;
	private bottomBackImg:BitmapRemote;
    private titleBg1:BitmapRes;
	private titleBg2:BitmapRes;
	public closeBtn:BitmapRes;
    private _kuangBg:BitmapRes; 
	public downFrameImg:BitmapRes;
	public backBtn:BitmapRes;
    private _titleImg:BitmapRes;
	private _backCoin:BitmapRes;
	private _backGold:BitmapRes;
	public iconCoin:BitmapRes;
	private _iconGold:BitmapRes;
	private _payBtn:BitmapRes; 
	public txtName:TextField;
	public txtCoin:TextField;
	public txtGold:TextField;

    private _bottomImgTopValue:number = -1;
    private _isAddBottomImg:boolean = true;

    private resType:string;



    public constructor()
    {
        super();
        this.configUI();
        this.addEvent();
        this.initData();
    }

    protected configUI():void
    {
        this.uiContainer = ObjectUtil.createConainer();
        this.uiContainer.width = 720;
        this.uiContainer.height = 1280;
        this.imageContainer = ObjectUtil.createConainer();
        this.uiContainer.addChild(this.imageContainer);
        this.topContainer = ObjectUtil.createConainer();
        this.uiContainer.addChild(this.topContainer);
        this.onResizeHandler();

        this.backImg = BitmapRes.create("common_panelBg_png", 0, 57, 720, 1223);
		this.backImg.scale9Grid = new egret.Rectangle(4,4,8,6);
		this.imageContainer.addChild(this.backImg);
		
		this.bottomBackImg = Manager.pool.create(BitmapRemote);
		this.bottomBackImg.x = 0;
		this.bottomBackImg.y = 982;
		this.bottomBackImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 720, 298);
		this.imageContainer.addChild(this.bottomBackImg);

		this.titleBg1 = Manager.pool.create(BitmapRes, "panel_topBg_png", null, null, 720, 120);
		this.titleBg1.scale9Grid = new egret.Rectangle(7,19,46,4);
		this.imageContainer.addChild(this.titleBg1);

		this.titleBg2 = Manager.pool.create(BitmapRes, "common_titleBg2_png", null, null, 720, 79);
		this.titleBg2.y = 57;
		this.imageContainer.addChild(this.titleBg2);
		
		this.closeBtn = Manager.pool.create(BitmapRes, "common_closeImg_png");
		this.closeBtn.x = 618;
		this.closeBtn.y = 45;
		this.closeBtn.touchEnabled = true;
		this.imageContainer.addChild(this.closeBtn);

		this._kuangBg = Manager.pool.create(BitmapRes, "panel_bgKuang2_png", null, null, 720, 1280);
		this._kuangBg.scale9Grid = new egret.Rectangle(15,15,25,25);
		this.imageContainer.addChild(this._kuangBg);

		this.downFrameImg = Manager.pool.create(BitmapRes, "panel_bgKuang_png", null, null, 720, 1280);
		this.downFrameImg.scale9Grid = new egret.Rectangle(74,30,100,48);
		this.imageContainer.addChild(this.downFrameImg);
		
		this.backBtn = Manager.pool.create(BitmapRes, "panel_backBtn2_normal_png");
		this.backBtn.x = 572;
		this.backBtn.y = 1162;
		this.backBtn.touchEnabled = true;
		this.imageContainer.addChild(this.backBtn);
		
		this._titleImg = Manager.pool.create(BitmapRes);
		this._titleImg.x = 230;
		this._titleImg.y = 70;
		this.imageContainer.addChild(this._titleImg);

		this._backCoin = Manager.pool.create(BitmapRes, "panel_top_itemBg_png", null, null, 105, 30);
		this._backCoin.x = 382;
		this._backCoin.y = 14;
		this.imageContainer.addChild(this._backCoin);

		this._backGold = Manager.pool.create(BitmapRes, "panel_top_itemBg_png", null, null, 105, 30);
		this._backGold.x = 524;
		this._backGold.y = 14;
		this.imageContainer.addChild(this._backGold);

		this.iconCoin = Manager.pool.create(BitmapRes, "panel_coin_54_png");
		this.iconCoin.x = 345;
		this.iconCoin.y = 1;
		this.imageContainer.addChild(this.iconCoin);

		this._iconGold = Manager.pool.create(BitmapRes, "panel_gold_54_png");
		this._iconGold.x = 488;
		this._iconGold.y = 0;
		this.imageContainer.addChild(this._iconGold);
		
		this._payBtn = Manager.pool.create(BitmapRes, "panel_topPay_png");
		this._payBtn.touchEnabled = true;
		this._payBtn.x = 637;
		this._payBtn.y = 12;
		this.imageContainer.addChild(this._payBtn);

		this.txtName = TextField.create(280, 24);
        this.txtName.move(7,15);
        this.txtName.textColor = 0xd1ccc8;
        this.txtName.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.txtName.textAlign = egret.HorizontalAlign.LEFT;
        this.txtName.fontFamily = "Microsoft YaHei";
        this.txtName.size = 24;
        this.topContainer.addChild(this.txtName);

        this.txtCoin = TextField.create(100, 24);
        this.txtCoin.move(393,16);
        this.txtCoin.textColor = Color.WHITE;
        this.txtCoin.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.txtCoin.textAlign = egret.HorizontalAlign.LEFT;
        this.txtCoin.fontFamily = "Microsoft YaHei";
        this.txtCoin.size = 24;
        this.topContainer.addChild(this.txtCoin);

        this.txtGold = TextField.create(100, 24);
        this.txtGold.move(535,16);
        this.txtGold.textColor = Color.WHITE;
        this.txtGold.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.txtGold.textAlign = egret.HorizontalAlign.LEFT;
        this.txtGold.fontFamily = "Microsoft YaHei";
        this.txtGold.size = 24;
        this.topContainer.addChild(this.txtGold);

		if(this._bottomImgTopValue != -1)
		{
			this.bottomBackImg.y = this._bottomImgTopValue;
			this._bottomImgTopValue = -1;
		}
		this.showBottomBackHandler();
    }

    public set showBottomBack(value:boolean)
	{
		if(this._isAddBottomImg == value) return;
		this._isAddBottomImg = value;
		this.showBottomBackHandler();
	}

    private showBottomBackHandler():void
	{
		if(this._isAddBottomImg)
		{
			if(!this.bottomBackImg.parent)
				this.addChildAt(this.bottomBackImg, 1);
		}
		else
		{
			if(this.bottomBackImg.parent)
				this.bottomBackImg.parent.removeChild(this.bottomBackImg);
		}
	}

    protected initData():void
    {
        this.resType = GainLossVO.COIN;
		this.onNameLevelUpdateHandler();
		this.onCoinUpdateHandler();
		this.onGoldUpdateHandler();
    }

    protected addEvent():void
    {
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.NICKNAME, this.onNameLevelUpdateHandler, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onNameLevelUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.TURN_LIVE, this.onNameLevelUpdateHandler, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onCoinUpdateHandler, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.onGoldUpdateHandler, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.GUILDCONTRI, this.onCoinUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.HONOR, this.onCoinUpdateHandler, this);
        this._payBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    protected removeEvent():void
    {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.NICKNAME, this.onNameLevelUpdateHandler, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.onNameLevelUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.TURN_LIVE, this.onNameLevelUpdateHandler, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onCoinUpdateHandler, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.onGoldUpdateHandler, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.GUILDCONTRI, this.onCoinUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.HONOR, this.onCoinUpdateHandler, this);
        this._payBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    private onResizeHandler(e?:GlobalEvent):void
	{
		this.uiContainer.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.uiContainer.width) >> 1);
	}

    private onNameLevelUpdateHandler(e?:GameObjectAttrEvent):void
	{
        let nick:string = Manager.model.self.getName();
		let arr:Array<string> = nick.split(".");
		let nickName:string = "";
		if(arr.length == 2)
			nickName = arr[1];
		else
			nickName = nick;
		if(Manager.model.self.attrInfo.zhuanshu != 0)
			this.txtName.text = LangCVO.getContent("common57", nickName, Manager.model.self.attrInfo.zhuanshu, Manager.model.self.attrInfo.level);
		else
			this.txtName.text = LangCVO.getContent("common58", nickName, Manager.model.self.attrInfo.level);
	}

	private onCoinUpdateHandler(e?:GameObjectAttrEvent):void
	{
		switch(this.resType)
		{
			case GainLossVO.COIN:
				this.iconCoin.source = "playRes_coin_54_png";
				this.txtCoin.text = StringUtils.getBigNum(Manager.model.self.attrInfo.coin);
				break;
			case GainLossVO.GUILD_DONATE:
				this.iconCoin.source = "playRes_donate_54_png";
				this.txtCoin.text = StringUtils.getBigNum(Manager.model.self.attrInfo.guildContri);
				break;
            case GainLossVO.HONOR:
                this.iconCoin.source = "playRes_honor_54_png";
				this.txtCoin.text = StringUtils.getBigNum(Manager.model.self.attrInfo.honor);
                break;
            case GainLossVO.YUPEIXIAO_ITEM:
                this.iconCoin.source = "playRes_yupeixiao_54_png";
                this.txtCoin.text = ""+Manager.model.getItems().getCountItemById(ItemsType.ITEM_40000306);
                break;
		}
	}

	private onGoldUpdateHandler(e?:GameObjectAttrEvent):void
	{
		this.txtGold.text = StringUtils.getBigNum(Manager.model.self.attrInfo.gold);
	}

	/** 设置人物金钱 */
	public setTopGameMoney(type:string):void
	{
		this.resType = type;
		this.onCoinUpdateHandler();
	}

    protected onClickHandler(e:egret.TouchEvent):void
	{
        switch(e.currentTarget)
        {
            case this._payBtn:
                Manager.link.link(LinkType.PANEL_RECHARGE);
                break;
        }
	}

	public show():void
	{
        Manager.layer.uiImageLayer.addChild(this.uiContainer);

        // if(this.basePanel.scrollerList.itemList.selectedIndex != tabIndex) 
        // {
        //     if(tabIndex > 3) this._scrollH = Panel2.BUTTON_OFFSET * (tabIndex-3);
        //     this.basePanel.scrollerList.itemList.selectedIndex = tabIndex;
        //     this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
        // }
	}

    public hide():void
    {
        this.dispose();
    }

    public dispose():void
    {
        this.removeEvent();
        if(this.parent != null)this.parent.removeChild(this);
        ObjectUtil.removes(this.backImg, this.bottomBackImg, this.titleBg1, this.titleBg2, this.closeBtn, this._kuangBg, this.downFrameImg,
            this.backBtn, this._titleImg, this._backCoin, this._backGold, this.iconCoin, this._iconGold, this._payBtn, 
            this.imageContainer, this.topContainer, this.uiContainer);
        if(this.backImg)
            Manager.pool.push(this.backImg);
        this.backImg = null;
        if(this.bottomBackImg)
            Manager.pool.push(this.bottomBackImg);
        this.bottomBackImg = null;
        if(this.titleBg1)
            Manager.pool.push(this.titleBg1);
        this.titleBg1 = null;
        if(this.titleBg2)
            Manager.pool.push(this.titleBg2);
        this.titleBg2 = null;
        if(this.closeBtn)
            Manager.pool.push(this.closeBtn);
        this.closeBtn = null;
        if(this._kuangBg)
            Manager.pool.push(this._kuangBg);
        this._kuangBg = null;
        if(this.downFrameImg)
            Manager.pool.push(this.downFrameImg);
        this.downFrameImg = null;
        if(this.backBtn)
            Manager.pool.push(this.backBtn);
        this.backBtn = null;
        if(this._titleImg)
            Manager.pool.push(this._titleImg);
        this._titleImg = null;
        if(this._backCoin)
            Manager.pool.push(this._backCoin);
        this._backCoin = null;
        if(this._backGold)
            Manager.pool.push(this._backGold);
        this._backGold = null;
        if(this.iconCoin)
            Manager.pool.push(this.iconCoin);
        this.iconCoin = null;
        if(this._iconGold)
            Manager.pool.push(this._iconGold);
        this._iconGold = null;
        if(this._payBtn)
            Manager.pool.push(this._payBtn);
        this._payBtn = null;
        if(this.txtName)
            Manager.pool.push(this.txtName);
        this.txtName = null;
        if(this.txtCoin)
            Manager.pool.push(this.txtCoin);
        this.txtCoin = null;
        if(this.txtGold)
            Manager.pool.push(this.txtGold);
        this.txtGold = null;

        this.imageContainer = null;
        this.topContainer = null;
        this.uiContainer = null;
    }
}