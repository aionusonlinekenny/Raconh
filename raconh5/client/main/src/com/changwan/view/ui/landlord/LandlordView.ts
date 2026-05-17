/**
 * 斗地主
 * Simon
 * 2018.1.19
 */
class LandlordView extends UIComponent
{
	private _funList:BaseHScrollerList;
	private _historyList:BaseVScrollerList;

	private _catchInfo:LairdCVO;
	private _rescueInfo:LairdCVO;
	private _interactInfo:LairdCVO;
	private _seekHelpInfo:LairdCVO;

	private _model:LairdModel;
	private _menuBtnContent:Array<any>;
	private _curView:UIComponent;
	private _oldIndex:number;
	private _dataList:Array<string>;
	private _bgImg:BitmapRemote;
	private _leftBgImg:BitmapRemote;
	
	private _thisParent:ClubLunjiantaiPanel;

	private isLoadComplete:boolean = false;
	private _showMsgRedIcon:boolean = false;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("landlord", "LandlordViewSkin");
	}

	protected configUI():void
	{
		super.configUI();

		this._model = Manager.model.getLaird();
		this._model.lairdView = this;

		if(!this._bgImg)
		{
			this._bgImg = Manager.pool.create(BitmapRemote);
			this._bgImg.x = 5;
			this._bgImg.y = 118;
			this._bgImg.load(PathInfo.getPath("res/common/common_back4.png", LoaderType.IMAGE), 710, 180);
			this.addChildAt(this._bgImg, 0);
		}

		if(!this._leftBgImg)
        {
            this._leftBgImg = Manager.pool.create(BitmapRemote);
            this._leftBgImg.x = 5;
            this._leftBgImg.y = 296;
            this.addChildAt(this._leftBgImg, 2);
            this._leftBgImg.load(PathInfo.getPath("res/common/common_pnl_back2.png", LoaderType.IMAGE), 248, 845);
        }

		if(!this._menuBtnContent)
		{
			this._menuBtnContent = [];
			for(let i:number=0; i<4; i++)
			{
				this._menuBtnContent.push({typeImg:"landlord_funcIcon" + (i+1) + "_png"});
			}

			this._funList.initBtnListData(DressTypeBtn, this._menuBtnContent);
			(<eui.HorizontalLayout>this._funList.itemList.layout).gap = 13;
		}
	}

	private getBtn(index:number):DressTypeBtn
	{
		if(this._funList)
		{
			let dis:egret.DisplayObject = this._funList.itemList.getElementAt(index);
			return (<DressTypeBtn>dis);
		}
		return null;
	}

	protected initData():void
	{
		this._catchInfo = LairdCVO.getInfo(1);
		this._rescueInfo = LairdCVO.getInfo(2);
		this._interactInfo = LairdCVO.getInfo(3);
		this._seekHelpInfo = LairdCVO.getInfo(4);

		this._funList.itemList.selectedIndex = LandlordType.IDENTITY;
		this._funList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);

		Manager.control.getLaird().lairdUpdate();
		Manager.control.getLaird().lairdInteractRec();
		Manager.control.getLaird().lairdGuildInfo();
	}

	private delayCheck():void
	{
		Manager.render.add(this.checkShowRedIcon, this, 500);
	}

	private checkShowRedIcon():void
	{
		Manager.render.remove(this.checkShowRedIcon, this);
		
		if(this._model)
		{
			if(this._model.coolyInfoList.length > 0)
				if(this.getBtn(1)) this.getBtn(1).showRedIcon(this._model.checkInteractIcon() || this._model.checkCanGetExp());
			if(this.getBtn(2)) this.getBtn(2).showRedIcon(this._model.checkCatchIcon());
		}
	}

	public get catchInfo():LairdCVO
	{
		return this._catchInfo;
	}

	public get rescueInfo():LairdCVO
	{
		return this._rescueInfo;
	}

	public get interactInfo():LairdCVO
	{
		return this._interactInfo;
	}

	public get seekHelpInfo():LairdCVO
	{
		return this._seekHelpInfo;
	}

	protected addEvent():void
    {
        super.addEvent();
		GameDispatcher.getInstance().addEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
        this._funList.itemList.addEventListener(eui.UIEvent.CHANGE, this.onFunSelectHandler, this);
		this._model.addEventListener(LairdEvent.LAIRD_INTERACTREC_LIST_UPDATE, this.onInteractListUpdateHandler, this);
		// this._model.addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.onInfoUpdateHandler, this);
		this._model.addEventListener(LairdEvent.LAIRD_CLUB_MEMBER_INFO_UPDATE, this.onClubMemberUpdateHandler, this);
		Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.checkShowRedIcon, this);
		Manager.model.getLaird().addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.checkShowRedIcon, this);
		Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_PICK_EXP_UPDATE, this.checkShowRedIcon, this);
    }

    protected removeEvent():void
    {
		GameDispatcher.getInstance().removeEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
        this._funList.itemList.removeEventListener(eui.UIEvent.CHANGE, this.onFunSelectHandler, this);
		this._model.removeEventListener(LairdEvent.LAIRD_INTERACTREC_LIST_UPDATE, this.onInteractListUpdateHandler, this);
		// this._model.removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.onInfoUpdateHandler, this);
		this._model.removeEventListener(LairdEvent.LAIRD_CLUB_MEMBER_INFO_UPDATE, this.onClubMemberUpdateHandler, this);
		Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.checkShowRedIcon, this);
		Manager.model.getLaird().removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.checkShowRedIcon, this);
		Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_PICK_EXP_UPDATE, this.checkShowRedIcon, this);
        super.removeEvent();
    }

	private onFuncBtnLoadComplete(e:BaseUIEvent):void
	{
		if(!this.isLoadComplete && e.data == DressTypeBtn)
		{
			this.isLoadComplete = true;
            this.delayCheck();
		}
	}

	private onFunSelectHandler(e?:eui.UIEvent):void
    {
        let index:number = this._funList.itemList.selectedIndex;
		if(index == -1) return;
		// if(index == this._oldIndex) return;
		if(this._curView)
		{
			this._curView.dispose();
			this._curView = null;
		}
		switch(index)
		{
			case LandlordType.IDENTITY:
				this._curView = new LandlordInfoView(this);
				break;
			case LandlordType.INTERACTION:
				if(this._model.curStatus == 1)
					this._curView = new LandlordInteractView1(this);
				else if(this._model.curStatus == 2)
					this._curView = new LandlordInteractView2(this);
				else
				{
					FloatTips.addTips(LangCVO.getContent("laird14"), Color.RED);
					this.changeItem(this._oldIndex);
					return;
				}
				break;
			case LandlordType.ARREST:
				if(this._model.curStatus == 2)
				{
					let cbi:CallBackInfo = Manager.pool.create(CallBackInfo, this.changeItem, this, 0);
					Manager.tips.showTips(LangCVO.getContent("laird21", Color.RED), cbi);
				}
				else
					this._curView = new LandlordCatchView(this._thisParent, this);
				break;
			case LandlordType.MESSAGE:
				this._curView = new LandlordMsgView(this);
				break;
		}
		this._oldIndex = index;
		if(this._curView && !this._curView.parent) this.addChild(this._curView);
    }

	public get curPage():number
	{
		return this._oldIndex;
	}

	private onInteractListUpdateHandler(e:LairdEvent):void
	{
		let list:Array<string> = e.params;
		if(!list || list.length == 0) return;

		if(!this._dataList)
		{
			this._dataList = list.reverse();
			this._historyList.initBtnListData(LandlordHistoryItem, this._dataList, true);
			(<eui.HorizontalLayout>this._historyList.itemList.layout).gap = 5;
		}
		else
		{
			this._dataList.splice(0, 0, list[0]);
			this._historyList.dataProvider(this._dataList);
		}
	}

	private onInfoUpdateHandler(e:LairdEvent):void
	{
		// if(this._oldIndex == 1 && this._model.lordInfoList.length == 0 && this._model.coolyInfoList.length == 0)
		// {
		// 	this.changeItem(0);
		// }

		// this.checkShowRedIcon();
	}

	private onClubMemberUpdateHandler(e:LairdEvent):void
	{
		this._showMsgRedIcon = false;
		let list:Array<LairdClubMemberInfo> = e.params;
		if(list)
		{
			for(let i:number=0; i<list.length; i++)
			{
				if(list[i].isSeekHelp == 1)
				{
					this._showMsgRedIcon = true;
					break;
				}
			}
		}
		
		Manager.render.add(this.updateIcon, this, 500);
	}

	private updateIcon():void
	{
		Manager.render.remove(this.updateIcon, this);
		this.getBtn(3).showRedIcon(this._showMsgRedIcon);
	}

	public reuse(thisParent:ClubLunjiantaiPanel):void
	{
		super.reuse();

		this._thisParent = thisParent;
	}

	public changeMenuItem(index:number):void
	{
		if(this._thisParent)
			this._thisParent.changeMenuItem(index);
	}

	public changeItem(index:number):void
	{
		this._funList.itemList.selectedIndex = index;
		this._funList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
	}

	public unuse():void
    {
        super.unuse();
        this._funList.dispose();
        this._funList = null;
        this._menuBtnContent.length = 0;
        this._menuBtnContent = null;
		this._curView.dispose();
        this._curView = null;
    }

	public dispose():void
	{
		Manager.render.remove(this.checkShowRedIcon, this);
		Manager.render.remove(this.updateIcon, this);
		super.dispose();
		ObjectUtil.removes(this._funList, this._historyList, this._bgImg, this._leftBgImg);
		if(this._bgImg)
			Manager.pool.push(this._bgImg);
		this._bgImg = null;
		if(this._leftBgImg)
			Manager.pool.push(this._leftBgImg);
		this._leftBgImg = null;
		if(this._funList)
        	this._funList.dispose();
        this._funList = null;
		if(this._historyList)
			this._historyList.dispose();
		this._historyList = null;
		this._catchInfo = null;
		this._rescueInfo = null;
		this._interactInfo = null;
		this._seekHelpInfo = null;
		this._model.lairdView = null;
		this._model = null;
		if(this._menuBtnContent)
        	this._menuBtnContent.length = 0;
        this._menuBtnContent = null;
		if(this._curView)
            this._curView.dispose();
        this._curView = null;
		this._dataList = null;
		this._thisParent = null;
	}
}