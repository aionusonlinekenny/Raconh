/**
 * update devil 2017-11-27
 */
class Panel extends eui.Component implements IViewManager
{
	//功能按钮间距离
	private static BUTTON_OFFSET:number = 120;
	private isLoadComplete:boolean = false;
	private _scrollH:number = 0;
    protected basePanel:BasePanel;
    private _needSkin:boolean;
    private _loadComplete:boolean = false;
    private resType:string;

    public constructor(needSkin:boolean=true)
    {
        super();
        this._needSkin = needSkin;
        this.basePanel = ObjectUtil.createObj(BasePanel);
		this.addChild(this.basePanel);
        if(needSkin)
        {
            this.addEventListener(eui.UIEvent.COMPLETE, this.onCompleteHandler, this);
        }
        else
        {
            this.onCompleteHandler();
        }
    }

    public get closeBtn():BitmapRes
    {
        return this.basePanel.closeBtn;
    }

    private onCompleteHandler(e?:eui.UIEvent):void
    {
        if(this.hasEventListener(eui.UIEvent.COMPLETE))
        {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.onCompleteHandler, this);
        }
        this._loadComplete = true;
        this.configUI();
        this.addEvent();
        this.initData();
    }

    protected configUI():void
    {
        if(this._needSkin) this.addChildAt(this.basePanel, 0);
    }

    protected addEvent():void
    {
		GameDispatcher.getInstance().addEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.NICKNAME, this.onNameLevelUpdateHandler, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onNameLevelUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.TURN_LIVE, this.onNameLevelUpdateHandler, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onCoinUpdateHandler, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.onGoldUpdateHandler, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.GUILDCONTRI, this.onCoinUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.HONOR, this.onCoinUpdateHandler, this);
        this.basePanel.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.basePanel.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.basePanel.scrollerList.itemList.addEventListener(eui.UIEvent.CHANGE, this.onFuncBtnChangeHandler, this);
    }

    protected initData():void
    {
        this.resType = GainLossVO.COIN;
		this.onNameLevelUpdateHandler();
		this.onCoinUpdateHandler();
		this.onGoldUpdateHandler();
    }

    protected removeEvent():void
    {
		GameDispatcher.getInstance().removeEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.NICKNAME, this.onNameLevelUpdateHandler, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.onNameLevelUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.TURN_LIVE, this.onNameLevelUpdateHandler, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onCoinUpdateHandler, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.onGoldUpdateHandler, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.GUILDCONTRI, this.onCoinUpdateHandler, this);
        this.basePanel.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.basePanel.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.basePanel.scrollerList.itemList.removeEventListener(eui.UIEvent.CHANGE, this.onFuncBtnChangeHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.HONOR, this.onCoinUpdateHandler, this);
    }

	private onFuncBtnLoadComplete(e:BaseUIEvent):void
	{
		if(!this.isLoadComplete && e.data == BaseFuncBtn)
		{
			this.isLoadComplete = true;
            if(this._scrollH != 0)
            {
                this.basePanel.scrollerList.scroller.viewport.scrollH = this._scrollH;
                this._scrollH = 0;
            }
            this.funcBtnLoadCompleteCallback();
		}
	}

    protected funcBtnLoadCompleteCallback():void
    {

    }

    private onNameLevelUpdateHandler(e?:GameObjectAttrEvent):void
	{
		// this.basePanel.topInfoView.nameValue.text = Manager.model.self.getName() + " Lv:" + Manager.model.self.attrInfo.level;
        let nick:string = Manager.model.self.getName();
		let arr:Array<string> = nick.split(".");
		let nickName:string = "";
		if(arr.length == 2)
			nickName = arr[1];
		else
			nickName = nick;
		if(Manager.model.self.attrInfo.zhuanshu != 0)
		{
			// this._nickName.text = nickName + "   " + Manager.model.self.attrInfo.zhuanshu + "转" + Manager.model.self.attrInfo.level + "级";
			this.basePanel.txtName.text = LangCVO.getContent("common57", nickName, Manager.model.self.attrInfo.zhuanshu, Manager.model.self.attrInfo.level);
		}
		else
		{
			// this._nickName.text = nickName + "   " + Manager.model.self.attrInfo.level + "级";
			this.basePanel.txtName.text = LangCVO.getContent("common58", nickName, Manager.model.self.attrInfo.level);
		}
	}

	private onCoinUpdateHandler(e?:GameObjectAttrEvent):void
	{
		switch(this.resType)
		{
			case GainLossVO.COIN:
				this.basePanel.iconCoin.source = "playRes_coin_54_png";
				this.basePanel.txtCoin.text = StringUtils.getBigNum(Manager.model.self.attrInfo.coin);
				break;
			case GainLossVO.GUILD_DONATE:
				this.basePanel.iconCoin.source = "playRes_donate_54_png";
				this.basePanel.txtCoin.text = StringUtils.getBigNum(Manager.model.self.attrInfo.guildContri);
				break;
            case GainLossVO.HONOR:
                this.basePanel.iconCoin.source = "playRes_honor_54_png";
				this.basePanel.txtCoin.text = StringUtils.getBigNum(Manager.model.self.attrInfo.honor);
                break;
            case GainLossVO.YUPEIXIAO_ITEM:
                this.basePanel.iconCoin.source = "playRes_yupeixiao_54_png";
                this.basePanel.txtCoin.text = ""+Manager.model.getItems().getCountItemById(ItemsType.ITEM_40000306);
                break;
		}
	}

	private onGoldUpdateHandler(e?:GameObjectAttrEvent):void
	{
		this.basePanel.txtGold.text = StringUtils.getBigNum(Manager.model.self.attrInfo.gold);
	}

		/** 设置人物金钱 */
	public setTopGameMoney(type:string):void
	{
		this.resType = type;
		this.onCoinUpdateHandler();
	}

    protected onClickHandler(e:egret.TouchEvent):void
	{
	}

    protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
        if(!this.basePanel.scrollerList.itemList.dataProvider) return;
        let len:number = this.basePanel.scrollerList.itemList.dataProvider.length;
        let isSelected:boolean;
        let item:BaseFuncBtn;
        for(let i:number=0; i<len; i++)
        {
            isSelected = this.basePanel.scrollerList.itemList.selectedIndex == i;
            item = this.basePanel.scrollerList.itemList.getElementAt(i) as BaseFuncBtn;
            if(item) item.isSelected =  isSelected;
            else (this.basePanel.scrollerList.itemList.dataProvider as eui.ArrayCollection).source[i].isSelected = isSelected;
        }
    }

	public show(tabIndex:number = 0):void
	{
        if(!this.parent) Manager.layer.uiLayer.addChild(this);

        let roleInfo:SelfGameObjectInfo = Manager.model.self;
		// if(roleInfo) this.basePanel.topInfoView.nameValue.text = roleInfo.getName() + " Lv:" + roleInfo.attrInfo.level;
        this.onNameLevelUpdateHandler();

        if(this.basePanel.scrollerList.itemList.selectedIndex != tabIndex) 
        {
            if(tabIndex > 3) this._scrollH = Panel.BUTTON_OFFSET * (tabIndex-3);
            this.basePanel.scrollerList.itemList.selectedIndex = tabIndex;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
        }
	}

    public hide():void
    {
        this.dispose();
    }

    public dispose():void
    {
        this.removeEvent();
        if(this.basePanel)
        {
            this.basePanel.dispose();
            this.basePanel = null;
        }
        if(this.parent != null)this.parent.removeChild(this);
    }
}