/**
 * 活动面板
 * luzhihong
 * create 2017-11-22
 */
 class ActivityPanel extends Panel
{
	private _index:number = -1;
	private _curView:egret.DisplayObjectContainer;

    public constructor()
    {
        super(false);
    }
    
	protected configUI():void
    {
		super.configUI();
		this.basePanel.setBottomBackTop(1280);
		this.basePanel.title = "activity_title_0_png";
		let btnDatas = [
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "activity_btn_0_png", imgClick: "activity_btn_0_png", index:0},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "activity_btn_1_png", imgClick: "activity_btn_1_png", index:1}
			// {bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "activity_copy_tower_btn_png", imgClick: "activity_copy_tower_btn_png"}
			// { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "arenaBtnPic_png", imgClick: "arenaBtnPic_png" },
			// { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "landlord_btn_png", imgClick: "landlord_btn_png"}
		];

		if(OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA))
			btnDatas.push( {bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "activity_copy_tower_btn_png", imgClick: "activity_copy_tower_btn_png", index:2} );
		// if(OpenCVO.isOpen(OpenConst.ID_STORM))
		// 	btnDatas.push( {bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "storm_btn_png", imgClick: "storm_btn_png", index:3} );
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
		
		Manager.render.add(this.renderInvalid, this);
    }

	protected renderInvalid(interval:number):void
	{
		Manager.render.remove(this.renderInvalid, this);
		
		this.updateDaily();
		this.updateTower();
        // this.delayCheckShowRedIcon();
        // this.delayCheckShowRedIcon3();
	}

	protected addEvent():void
	{
		super.addEvent();
        Manager.model.getActivity().addEventListener(ActivityEvent.DAILY_SCHEDULE_UPDATE, this.updateDaily, this);
        Manager.model.getActivity().addEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
        // Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_PK_COUNT, this.delayCheckShowRedIcon, this);
        // Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.delayCheckShowRedIcon, this);
        // Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
		// Manager.model.getLaird().addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        // Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
	}

	protected removeEvent():void
	{
		super.removeEvent();
        Manager.model.getActivity().removeEventListener(ActivityEvent.DAILY_SCHEDULE_UPDATE, this.updateDaily, this);
        Manager.model.getActivity().removeEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
        // Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_PK_COUNT, this.delayCheckShowRedIcon, this);
        // Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.delayCheckShowRedIcon, this);
        // Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
		// Manager.model.getLaird().removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        // Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
	}

	// private delayCheckShowRedIcon(e?:ArenaEvent):void
    // {
    //     Manager.render.add(this.checkShowRedIcon2, this, 500);
    // }

    // private delayCheckShowRedIcon3(e?:LairdEvent):void
    // {
    //     Manager.render.add(this.checkShowRedIcon3, this, 500);
    // }

    // private checkShowRedIcon2():void
    // {
    //     Manager.render.remove(this.checkShowRedIcon2, this);

    //     let lairdBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(2) as BaseFuncBtn;
	// 	if(lairdBtn)
    //     {
    //         let bol:boolean = OpenCVO.isOpen(OpenConst.ID_ARENA_PK) && (Manager.model.getArena().hasMaxAwardCanGet || Manager.model.getArena().hasPkCount);
	// 		lairdBtn.setIconShow(bol);
    //     }
    // }

    // private checkShowRedIcon3():void
    // {
    //     Manager.render.remove(this.checkShowRedIcon3, this);
	// 	if(!this.basePanel) return;

    //     let lairdBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(3) as BaseFuncBtn;
	// 	if(lairdBtn)
	// 		lairdBtn.setIconShow(Manager.model.getLaird().checkRedIcon());
    // }

    private updateDaily(e:egret.Event = null):void
    {
		let btn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(0) as BaseFuncBtn;
        if(btn) 
		{
			btn.setIconShow(ActivityCVO.hasCanget(0) || ActivityScheduleCVO.hasCanget());
		}
		btn = this.basePanel.scrollerList.itemList.getElementAt(1) as BaseFuncBtn;
        if(btn) 
		{
			btn.setIconShow(ActivityCVO.hasCanget(1) || ActivityScheduleCVO.hasCanget());
		}
    }

	private updateTower(e:GameObjectAttrEvent = null):void
    {
		if(!OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA)) return;
		let btn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(2) as BaseFuncBtn;
        if(btn) 
		{
			let model = Manager.model.getCopy().towerModel;
			btn.setIconShow(OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA) && (model.canSaodang || model.canChallenge()));
		}
    }

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.ActivityPanel);
				break;
		}
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		let selectedindex:number = this.basePanel.scrollerList.itemList.selectedIndex;
		let btn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(selectedindex) as BaseFuncBtn;
		this._index = selectedindex;
		//this._index = btn ? btn.data.index : 0;

		super.onFuncBtnChangeHandler(e);

		if(this._curView)
		{
			ObjectUtil.dispose(this._curView);
			// this._curView.dispose();
			this._curView = null;
		}
		switch(this._index)
		{
			case 0:
				this.basePanel.title = "activity_title_0_png";
				this.basePanel.setBottomBackTop(1280);
				this._curView = ObjectUtil.createObj(DailyView);
				break;
			case 1:
                this.basePanel.title = "activity_title_act_png";
                this.basePanel.setBottomBackTop(1280);
				this._curView = ObjectUtil.createObj(DailyViewII);
				break;
			case 2:
                this.basePanel.title = "activity_title_1_png";
                this.basePanel.setBottomBackTop(900);
				this._curView = ObjectUtil.createObj(TowerCopyView);
                break;
            case 3:
				this.basePanel.title = "storm_title_png";
				this.basePanel.setBottomBackTop(1280);
				this._curView = ObjectUtil.createObj(StormView);
		}
		this.basePanel.addChildAt(this._curView, 2);
	}

    public changeMenuItem(index:number):void
    {
        this.basePanel.scrollerList.itemList.selectedIndex = index;
		this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
    }

	public dispose():void
	{
		Manager.render.remove(this.renderInvalid, this);
		super.dispose();
		ObjectUtil.dispose(this._curView);
		this._curView = null;
	}
}