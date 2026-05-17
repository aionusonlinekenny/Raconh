/**
 * pzx 
 * 福利
 * 2018.1.18
 */
class CashCowPanel extends Panel{
	private _view:UIComponent;
	private _bitimg:BitmapRemote;
	private _sevenDayModel:SevenDaysModel;
	private _btnDatas:any[];
	private _curIndex:number = 0;

	public constructor()
    {
        super(false);
    }
    protected configUI():void
    {
        super.configUI();
		let boo:boolean = Manager.model.getcashCow().checkRewardCd();
		let levBoo:boolean = Manager.model.getcashCow().levItemModel.checkReward();
		this._btnDatas = [
			{tap_type:CashCowType.TAP_CASHCOW,bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "ashCow_jubaochan_png", imgClick: "ashCow_jubaochan_png",showRedIcon:boo},
		];
		
		this._sevenDayModel = Manager.model.getcashCow().sevenDaysModel;
		this.hideSevenDayTab();
		//drq add
		this._btnDatas.push({tap_type:CashCowType.TAP_QIANDAO,bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "qiandao_tab_png", imgClick: "qiandao_tab_png",showRedIcon:Manager.model.getQiandao().getTodayCanGet()})
		this._btnDatas.push({tap_type:CashCowType.TAP_UPD_NOTICE,bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "cashCow_gonggao_png", imgClick: "cashCow_gonggao_png",showRedIcon:!UpdNoticCVO.cvo().isReward})
		if(this._bitimg == null)
		{
			this._bitimg = Manager.pool.create(BitmapRemote);
			this._bitimg.y = 116;
			this.basePanel.addChildAt(this._bitimg,3);
		}
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._btnDatas,true);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = -10;
    }
	private hideSevenDayTab():void
	{
		if(this._sevenDayModel.checkSevenDaysHide())
		{
			this.removetTab(CashCowType.TAP_SEVENDAY);
		}
		else
		{
			let levBoo:boolean = this._sevenDayModel.checkSeverDaysReward();
			this._btnDatas.push({tap_type:CashCowType.TAP_SEVENDAY,bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "ashCow_dengluli_png", imgClick: "ashCow_dengluli_png",showRedIcon:levBoo})
		}
	}

	private removetTab(type:number):void
	{
		for(let i:number = this._btnDatas.length-1;i>-1;i--)
		{
			let info:any = this._btnDatas[i];
			if(info.tap_type == type)
			{
				this._btnDatas.splice(i,1);
			}
		}
		this.basePanel.scrollerList.dataProvider(this._btnDatas);
	}

    protected addEvent():void
    {
		Manager.model.getcashCow().addEventListener(CashCowEvent.CASHCOW_UPDATE_EVENT,this.onIconShowHandler,this);
		Manager.model.getcashCow().sevenDaysModel.addEventListener(CashCowEvent.SEVENDAYS_REWARD_EVENT,this.onIconShowHandler,this);
		Manager.model.getSysnotice().addEventListener(SysnoticeEvent.UPD_NOTICE_EVENT,this.onIconShowHandler,this);
        super.addEvent();
    }

    protected removeEvent():void
    {
        super.removeEvent();
		Manager.model.getcashCow().removeEventListener(CashCowEvent.CASHCOW_UPDATE_EVENT,this.onIconShowHandler,this);
		Manager.model.getcashCow().sevenDaysModel.removeEventListener(CashCowEvent.SEVENDAYS_REWARD_EVENT,this.onIconShowHandler,this);
		Manager.model.getSysnotice().removeEventListener(SysnoticeEvent.UPD_NOTICE_EVENT,this.onIconShowHandler,this);
    }
	private setPromptSign(index:number):BaseFuncBtn
	{
		if(this.basePanel)
		{
			let dis:egret.DisplayObject = this.basePanel.scrollerList.itemList.getElementAt(index);
			return (<BaseFuncBtn>dis);
		}
		return null;
	}

	private onIconShowHandler(e:BaseEvent):void
	{
		let btn:BaseFuncBtn;
		if(e.type == CashCowEvent.CASHCOW_UPDATE_EVENT)
		{
			btn = this.setPromptSign(0);
			let boo:boolean = Manager.model.getcashCow().checkRewardCd();
			if(btn) btn.setIconShow(boo);
		}
		// if(e.type == GameObjectAttrEvent.LEVEL || e.type == CashCowEvent.LEVITEM_UPDATE_EVENT)
		// {
		// 	if(Manager.model.getcashCow().levItemModel.checkTotalRaward())
		// 	{
		// 		this.removetTab(CashCowType.TAP_LEVITEM);
		// 		return;
		// 	}
		// 	btn = this.setPromptSign(1);
		// 	let boo:boolean = Manager.model.getcashCow().levItemModel.checkReward();
		// 	if(btn) btn.setIconShow(boo);
		// }
		if(e.type == CashCowEvent.SEVENDAYS_REWARD_EVENT)
		{
			if(this._sevenDayModel.checkSevenDaysHide())
			{
				this.removetTab(CashCowType.TAP_SEVENDAY);
			}
			else
			{
				let index:number=this.getTabIndex(CashCowType.TAP_SEVENDAY);
				btn = this.setPromptSign(index);
				let levBoo:boolean = this._sevenDayModel.checkSeverDaysReward();
				if(btn) btn.setIconShow(levBoo);
			}
		}
		if(e.type == SysnoticeEvent.UPD_NOTICE_EVENT)
		{
			let tap:number = this.getTabIndex(CashCowType.TAP_UPD_NOTICE);
			btn = this.setPromptSign(tap);
			if(btn) btn.setIconShow(!UpdNoticCVO.cvo().isReward);
		}
	}
	private getTabIndex(type:number):number
	{
		for(let i:number = this._btnDatas.length-1;i>-1;i--)
		{
			let info:any = this._btnDatas[i];
			if(info.tap_type == type)
			{
				return i;
			}
		}
	}
	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;

		let isback:boolean = false;
		switch(index)
		{
			case 1:
				if(!OpenCVO.isOpen(OpenConst.ID_LEVEL_AWARD, true)) isback = true;
				break;
			case 2:
				if(!OpenCVO.isOpen(OpenConst.ID_SEVEN_AWARD, true)) isback = true;
				break;
		}
		if(isback)
		{
			this.basePanel.scrollerList.itemList.selectedIndex = this._curIndex;
			this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
			return;
		}

		if(this._view)
		{
			this._view.dispose();
			this._view = null;
		}
		let type:number = this._btnDatas[index].tap_type;

		switch(type)
		{
			case CashCowType.TAP_CASHCOW:
				this._bitimg.visible = true;
				this._bitimg.x = 0;
                this.basePanel.title = "ashCow_jincanjubao_png";
				this._view = new CashCowView();
				this._bitimg.load(Manager.path.getPanelCashCowPath("cashCow_di"));
				this.basePanel.setBottomBackTop(998);
				break;
			// case CashCowType.TAP_LEVITEM:
			// 	this._bitimg.visible = false;
            //     this.basePanel.title = "ashCow_chongjihaoli_png";
			// 	this._view = new LevItemView();
			// 	this.basePanel.setBottomBackTop(1280);
			// 	break;
			case CashCowType.TAP_SEVENDAY:
				this._bitimg.visible = true;
				this._bitimg.load(Manager.path.getPanelCashCowPath("sevenDay_di"));
				this._bitimg.x = 5;
				this.basePanel.title = "ashCow_qitiandenglu_png";
				this._view = new SevenDaysView();
				this.basePanel.setBottomBackTop(994);
				break;
			case CashCowType.TAP_UPD_NOTICE:
				this.basePanel.title = "updNotice_youxigonggao_png";
				this._bitimg.visible = false;
				this._view = new UpdNoticeView();
				this.basePanel.setBottomBackTop(998);
				break;
			case CashCowType.TAP_QIANDAO://drq add
				this.basePanel.title = "qiandao_title_png";
				this._bitimg.visible = false;
				this._view = new QiandaoView();
				this.basePanel.setBottomBackTop(1280);
				break;
		}
		if(this._view && !this._view.parent) this.addChild(this._view);
		this._curIndex = index;
	}

    protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.CashCowPanel);
				break;
		}
	}
	//drq add
	public delQiandaoRedIcon():void
	{
		let index:number=this.getTabIndex(CashCowType.TAP_QIANDAO);
		let btn = this.setPromptSign(index);
		if(btn) btn.setIconShow(false);
	}

	public dispose():void
    {
        super.dispose();
        ObjectUtil.remove(this._view);
        if(this._view) this._view.dispose();
        this._view = null;
		if(this._bitimg)
		{
			Manager.pool.push(this._bitimg)
			this._bitimg = null;
		}
    }
}