/**
 * 论剑台主界面
 * Simon
 * create 2018-3-30
 */
 class ClubLunjiantaiPanel extends Panel
{
	private _index:number = -1;
	private _curView:UIComponent;
    // private _bg:BitmapRemote;

    public constructor()
    {
        super(false);
    }

	protected configUI():void
    {
		super.configUI();
		this.basePanel.setBottomBackTop(1280);
		this.basePanel.title = "arenaTitle1_png";
		let btnDatas = [
			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "arenaBtnPic_png", imgClick: "arenaBtnPic_png" },
			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "landlord_btn_png", imgClick: "landlord_btn_png"}
            // {bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "activity_copy_tower_btn_png", imgClick: "activity_copy_tower_btn_png"}
		];
		
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
		
		Manager.render.add(this.renderInvalid, this);
    }

    protected renderInvalid(interval:number):void
	{
		Manager.render.remove(this.renderInvalid, this);
		
        this.delayCheckShowRedIcon();
        this.delayCheckShowRedIcon3();
        // this.updateTower();
	}

    protected addEvent():void
	{
		super.addEvent();
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_PK_COUNT, this.delayCheckShowRedIcon, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.delayCheckShowRedIcon, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
		Manager.model.getLaird().addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        // Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        // Manager.model.self.addEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
	}

	protected removeEvent():void
	{
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_PK_COUNT, this.delayCheckShowRedIcon, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_MAX_RANK_AWARD, this.delayCheckShowRedIcon, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
		Manager.model.getLaird().removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.delayCheckShowRedIcon3, this);
        // Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.updateTower, this);
        // Manager.model.self.removeEventListener(GameObjectAttrEvent.FIGHT, this.updateTower, this);
        super.removeEvent();
	}

    private delayCheckShowRedIcon(e?:ArenaEvent):void
    {
        Manager.render.add(this.checkShowRedIcon2, this, 500);
    }

    private delayCheckShowRedIcon3(e?:LairdEvent):void
    {
        Manager.render.add(this.checkShowRedIcon3, this, 500);
    }

    private checkShowRedIcon2():void
    {
        Manager.render.remove(this.checkShowRedIcon2, this);
        if(!this.basePanel) return;

        let arenaBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(0) as BaseFuncBtn;
		if(arenaBtn)
        {
            let bol:boolean = OpenCVO.isOpen(OpenConst.ID_ARENA_PK) && (Manager.model.getArena().hasMaxAwardCanGet || Manager.model.getArena().hasPkCount);
			arenaBtn.setIconShow(bol);
        }
    }

    private checkShowRedIcon3():void
    {
        Manager.render.remove(this.checkShowRedIcon3, this);
		if(!this.basePanel) return;

        let lairdBtn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(1) as BaseFuncBtn;
		if(lairdBtn)
			lairdBtn.setIconShow(Manager.model.getLaird().checkRedIcon());
    }

    // private updateTower(e:GameObjectAttrEvent = null):void
    // {
	// 	let btn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(2) as BaseFuncBtn;
    //     if(btn) 
	// 	{
	// 		let model = Manager.model.getCopy().towerModel;
	// 		btn.setIconShow(OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA) && (model.canSaodang || model.canChallenge()));
	// 	}
    // }

    protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.ClubLunjiantaiPanel);
				break;
		}
	}

    protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1 || index == this._index) return;

		let isBack:boolean = false;
        switch(index)
        {
            case 1:
                isBack = !OpenCVO.isOpen(OpenConst.ID_LAIRD, true);
                break;
            // case 2:
            //     isBack = !OpenCVO.isOpen(OpenConst.ID_JIUXIAOTA, true);
            //     break;
        }
        if(isBack)
        {
            if(this._index == undefined || this._index < 0) this._index = 0;
            this.basePanel.scrollerList.itemList.selectedIndex = this._index;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
            return;
        }

		super.onFuncBtnChangeHandler(e);

		this._index = index;
		if(this._curView)
		{
			this._curView.dispose();
			this._curView = null;
		}
        // if(index != 2)
        // {
        //     if(this._bg && this._bg.parent)
        //         this._bg.parent.removeChild(this._bg);
        // }
		switch(index)
		{
			case 0:
                this.basePanel.title = "arenaTitle1_png";
                this.basePanel.setBottomBackTop(982);
                this.basePanel.backImg.source = "common_panelBg_png";
				this._curView = Manager.pool.create(ArenaView);
				break;
            case 1:
                this.basePanel.title = "landlord_title_png";
                this.basePanel.setBottomBackTop(1182);
                this.basePanel.backImg.source = "common_panelBg_png";
                this._curView = Manager.pool.create(LandlordView, this);
                break;
            // case 2:
            //     this.basePanel.title = "activity_title_1_png";
            //     this.basePanel.setBottomBackTop(1182);
            //     this.basePanel.backImg.source = "";
			// 	if(this._bg == null)
            //     {
            //         this._bg = Manager.pool.create(BitmapRemote);
			// 	    this._bg.load(Manager.path.getActivityPath("activity_copy_tower_bg.jpg"));
            //     }
			// 	this.basePanel.addChildAt(this._bg, this.basePanel.getChildIndex(this.basePanel.backImg) - 1);
            //     this._curView = new TowerCopyView();
            //     break;
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
		Manager.render.remove(this.checkShowRedIcon2, this);
        Manager.render.remove(this.delayCheckShowRedIcon3, this);
		super.dispose();
		if(this._curView != null)
		{
			this._curView.dispose();
			this._curView = null;
		}
        // if(this._bg) Manager.pool.push(this._bg);
		// this._bg = null;
	}
}