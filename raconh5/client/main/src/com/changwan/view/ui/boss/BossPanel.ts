/**
 * BOSS面板
 * luzhihong
 * create 2017-12-23
 */
 class BossPanel extends Panel
{
    private _index:number;
	private _curView:UIComponent;

	private _bitimg:BitmapRemote;

    public constructor()
    {
        super(false);
    }
    
    protected configUI():void
    {
		super.configUI();

		this.basePanel.setBottomBackTop(1200);

		let btnDatas = [
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "boss_btn_0_png", imgClick: "boss_btn_0_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "boss_btn_1_png", imgClick: "boss_btn_1_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "devil_btn_png", imgClick: "devil_btn_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "boss_diaoluo_png", imgClick: "boss_diaoluo_png"}
		];
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
    
		Manager.render.add(this.renderInvalid, this);
    }

	protected renderInvalid(interval:number):void
	{
		Manager.render.remove(this.renderInvalid, this);
		this.updateRedIcon();
	}

	protected addEvent():void
	{
		super.addEvent();
		Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.updateRedIcon, this);
		Manager.model.self.addEventListener(GameObjectAttrEvent.TURN_LIVE, this.updateRedIcon, this);
		Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.updateRedIcon, this);
		Manager.model.getBoss().addEventListener(BossEvent.CHALLENGE_TIMES, this.updateRedIcon, this);
	}

	protected removeEvent():void
	{
		super.removeEvent();
		Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.updateRedIcon, this);
		Manager.model.self.removeEventListener(GameObjectAttrEvent.TURN_LIVE, this.updateRedIcon, this);
		Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.updateRedIcon, this);
		Manager.model.getBoss().removeEventListener(BossEvent.CHALLENGE_TIMES, this.updateRedIcon, this);
	}

	private updateRedIcon(e?:egret.Event):void
	{
		if(e == null || e instanceof GameObjectAttrEvent || e.type == CopyEvent.UPDATE_SINGLE)
		{
			this.setBtnRedIcon(0, Manager.model.getBoss().privateChallenge)
		}
		if(e == null || e instanceof GameObjectAttrEvent || e.type == BossEvent.CHALLENGE_TIMES)
		{
			this.setBtnRedIcon(1, OpenCVO.isOpen(OpenConst.ID_PUBLIC_BOSS) && Manager.model.getBoss().publicChallenge)
		}
	}
	private setBtnRedIcon(index:number, isShow:boolean):void
	{
		let btn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(index) as BaseFuncBtn;
        if(btn) btn.setIconShow(isShow);
	}

	protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.BossPanel);
				break;
		}
	}

	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		let isBack:boolean = false;
		switch(index)
		{
			case 1:
				isBack = !OpenCVO.isOpen(OpenConst.ID_PUBLIC_BOSS, true);
				break;
		}
		if(isBack)
		{
			if(this._index == undefined || this._index < 0) this._index = 0;
			this.basePanel.scrollerList.itemList.selectedIndex = this._index;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
			return;
		}

		this._index = index;

		if(this._curView != null)
		{
			this._curView.dispose();
			this.basePanel.backImg.visible = true;
			if(this._bitimg) Manager.pool.push(this._bitimg);
            this._bitimg = null;
		}

		switch(index)
		{
			case 0:
				this.basePanel.title = "boss_title_0_png";
				this.basePanel.setBottomBackTop(1280);
				this._curView = new BossPrivateView()
				break;
			case 1:
				this.basePanel.title = "boss_title_1_png";
				this.basePanel.setBottomBackTop(1280);
				this._curView = new BossPublicView()
				break;
			case 2:
				Manager.control.getDevil().askInfo();
                this.basePanel.title = "devil_title_png";
				this.basePanel.backImg.visible = false;
                this.basePanel.setBottomBackTop(980);
				this._curView = new DevilView();
				if(this._bitimg == null)
				{
                    let path = Manager.path.getDevilPath("back", Extension.JPG);
					this._bitimg = Manager.pool.create(BitmapRemote, path);
                    this._bitimg.x = 6;
                    this._bitimg.y = 110;
					this.basePanel.addChildAt(this._bitimg, 0);
				}
				this._curView = new DevilView();
				break;
			case 3:
				this.basePanel.title = "boss_title_3_png";
				this.basePanel.setBottomBackTop(1280);
				this._curView = new RareDropView();
				break;
		}
		this.addChild(this._curView);
	}


	public show(tabindex:number = 1)
	{
		super.show(tabindex);
	}

    public dispose():void
    {
		Manager.render.remove(this.renderInvalid, this);
        super.dispose();
		if(this._curView != null)
		{
			this._curView.dispose();
			this._curView = null;
		}
		if(this._bitimg) Manager.pool.push(this._bitimg);
        this._bitimg = null;
    }
}