/**
 * pzx 
 * 特权卡
 * 2018.1.10
 */
class SysPrivilegePane extends Panel{
	private _view:SysPrivilegeView;
	private _bitimg:BitmapRemote;
	private _model:SysPrivilegeModel;
	private _index:number=0;
	private _investView:SysInvestView;
	public constructor()
    {
        super(false);
    }
    protected configUI():void
    {
        super.configUI();
		let boo1:boolean = Manager.model.getSysInvest().checkReward(SysInvestType.SYSINVEST_MONTH_TYPE);
		let boo2:boolean = Manager.model.getSysInvest().checkReward(SysInvestType.SYSINVEST_EXTREME_TYPE);
		let btnDatas = [
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "sysprivilege_huangjin1_png", imgClick: "sysprivilege_huangjin1_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "sysprivilege_zuanshi1_png", imgClick: "sysprivilege_zuanshi1_png"},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "sysInvest_banyueka_png", imgClick: "sysInvest_banyueka_png",showRedIcon:boo1},
			{bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "sysInvest_zhizunka_png", imgClick: "sysInvest_zhizunka_png",showRedIcon:boo2}
		];
		
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
		if(this._bitimg == null)
		{
			this._bitimg = Manager.pool.create(BitmapRemote);
			this._bitimg.x = 5;
			this._bitimg.y = 116;
			this.basePanel.addChildAt(this._bitimg,3);
		}
		if(this._view==null)
		{
			this._view = new SysPrivilegeView();
			this.addChild(this._view);
		}
		this._model = Manager.model.getSysPrivilege();
		
    }
	protected initData():void
	{
		super.initData();
		Manager.control.getSysPrivilege().query();
	}

    protected addEvent():void
    {
        super.addEvent();
		this._model.addEventListener(SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT,this.updateData,this);
		Manager.model.getSysInvest().addEventListener(SysInvestEvent.SYSINVEST_UPDATE_EVENT,this.onIconShowHandler,this);
    }
	private updateData(e:BaseEvent):void
	{
		this._view.setData(this._model.getdata(this._index));
		this.onIconShowHandler(e);
	}

    protected removeEvent():void
    {
        super.removeEvent();
		this._model.removeEventListener(SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT,this.updateData,this);
		Manager.model.getSysInvest().removeEventListener(SysInvestEvent.SYSINVEST_UPDATE_EVENT,this.onIconShowHandler,this);
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

		if(e.type == SysPrivilegeEvent.SYSPRIVILEGE_UPDATE_EVENT)
		{
			let boo3:boolean = this._model.getdata(0).isActive && !this._model.getdata(0).isreward;
			let boo4:boolean = this._model.getdata(1).isActive && !this._model.getdata(1).isreward;
			btn = this.setPromptSign(0);
			if(btn) btn.setIconShow(boo3);
			btn = this.setPromptSign(1);
			if(btn) btn.setIconShow(boo4);
			return;
		}

		let boo1:boolean = Manager.model.getSysInvest().checkReward(SysInvestType.SYSINVEST_MONTH_TYPE);
		let boo2:boolean = Manager.model.getSysInvest().checkReward(SysInvestType.SYSINVEST_EXTREME_TYPE);
		btn = this.setPromptSign(2);
		if(btn) btn.setIconShow(boo1);
		btn = this.setPromptSign(3);
		if(btn) btn.setIconShow(boo2);
	}
	protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		switch(index)
		{
			case 0:
                this.basePanel.title = "sysprivilege_huangjintequan_png";
				this._view.setData(this._model.getdata(index));
				this._bitimg.load(Manager.path.getPanelSysPrivilegePath("sysprivilege_beijing"));
				this.basePanel.setBottomBackTop(1040);
				this._view.visible = true;
				if(this._investView) this._investView.visible = false;
				break;
			case 1:
				this.basePanel.title = "sysprivilege_zuanshitequan_png";
				this._view.setData(this._model.getdata(index));
				this._bitimg.load(Manager.path.getPanelSysPrivilegePath("sysprivilege_beijing"));
				this.basePanel.setBottomBackTop(1040);
				this._view.visible = true;
				if(this._investView) this._investView.visible = false;
				break;
			case 2:
				this.basePanel.title = "sysInvest_banyue_png";
				this.basePanel.setBottomBackTop(1280);
				this._bitimg.load(Manager.path.getPanelSysPrivilegePath("sysInvest_10bei"));
				if(this._investView == null)
				{
					this.createInvest();
				}
				this._view.visible = false;
				this._investView.visible = true;
				this._investView.setData(SysInvestType.SYSINVEST_MONTH_TYPE);
				break;
			case 3:
				this.basePanel.title = "sysInvest_dengjitouzi_png";
				this.basePanel.setBottomBackTop(1280);
				this._bitimg.load(Manager.path.getPanelSysPrivilegePath("sysInvest_100bei"));
				if(this._investView == null)
				{
					this.createInvest();
				}
				this._view.visible = false;
				this._investView.visible = true;
				this._investView.setData(SysInvestType.SYSINVEST_EXTREME_TYPE);
				break;
		}
		this._index = index;
	}
	private createInvest():void
	{
		this._investView = new SysInvestView();
		this.addChild(this._investView);
	}

    protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.SysPrivilegePane);
				break;
		}
	}
	public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._view,this._bitimg);
        if(this._view) this._view.dispose();
        this._view = null;
		Manager.pool.push(this._bitimg);
		this._bitimg = null;
		this._model = null;
    }
}