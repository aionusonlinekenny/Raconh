/**
 * vip面板
 * liangyan
 * create 2017-12-20
*/
class VipPanel extends Panel
{
    private _view:UIComponent;
    private _menuBtnContent:Array<any>;

    public constructor()
    {
        super(false);
    }

    protected configUI():void
    {
        super.configUI();
        // this.basePanel.backBtn.selected = false;
        this._menuBtnContent = [
			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "vip_btn_png", imgClick: "vip_btn_png" }
		];
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
        (<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
        
		Manager.render.add(this.renderInvalid, this);
    }

	protected renderInvalid(interval:number):void
	{
		Manager.render.remove(this.renderInvalid, this);
		this.vipUpdate();
	}

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.self.addEventListener(GameObjectAttrEvent.VIP_LEVEL, this.vipUpdate, this);
        Manager.model.getVip().addEventListener(VipEvent.REWARDS_UPDATE, this.vipUpdate, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        Manager.model.self.removeEventListener(GameObjectAttrEvent.VIP_LEVEL, this.vipUpdate, this);
        Manager.model.getVip().removeEventListener(VipEvent.REWARDS_UPDATE, this.vipUpdate, this);
    }

    private vipUpdate(e:egret.Event = null):void
    {
		let btn:BaseFuncBtn = this.basePanel.scrollerList.itemList.getElementAt(0) as BaseFuncBtn;
        if(btn) 
		{
			btn.setIconShow(Manager.model.getVip().hasCanFatch);
		}
    }
		
    protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		super.onFuncBtnChangeHandler(e);

		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		if(this._view)
		{
			this._view.dispose();
			this._view = null;
		}
		switch(index)
		{
			case 0:
                this.basePanel.title = "vip_title_png";
                this.basePanel.setBottomBackTop(1280);
				this._view = Manager.pool.create(VipView);
				break;
		}
		if(this._view && !this._view.parent) this.addChild(this._view);
	}

    protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.VipPanel);
				break;
		}
	}
    /** 设置vip特权翻页 */
    public setVipPage(value:number):void
    {
        if(this._view instanceof VipView)
        {
            let vipview:VipView = this._view as VipView;
            vipview.setPage(value);
        }
    }

    public dispose():void
    {
		Manager.render.remove(this.renderInvalid, this);
        super.dispose();
        ObjectUtil.remove(this._view);
        if(this._view) this._view.dispose();
        this._view = null;

        this._menuBtnContent.length = 0;
    }
}