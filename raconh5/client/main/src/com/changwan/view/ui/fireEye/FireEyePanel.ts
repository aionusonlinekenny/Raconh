/**
 * 火眼金睛panel
 * liangyan
 * create 2017-03-23
*/
class FireEyePanel extends Panel
{
    private _view:UIComponent;
    private _menuBtnContent:Array<any>;

    private _bg0:BitmapRemote;
    private _bg1:BitmapRemote;

    public constructor()
    {
        super(false);
    }

    protected configUI():void
    {
        super.configUI();
        // this.basePanel.backBtn.selected = false;
        this._menuBtnContent = [
			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "fireEye_btn_png", imgClick: "fireEye_btn_png"},
		];
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
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

    protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
		super.onFuncBtnChangeHandler(e);
		if(this._view)
		{
			this._view.dispose();
			this._view = null;
            if(this._bg0) Manager.pool.push(this._bg0);
            this._bg0 = null;
            if(this._bg1) Manager.pool.push(this._bg1);
            this._bg1 = null;
		}
        this.basePanel.title = "fireEye_label_title_png";
        this.basePanel.backImg.visible = false;
		switch(index)
		{
			case 0:
                this.basePanel.scrollerList.itemList.visible = this.basePanel.backBtn.visible = true;
                this.basePanel.setBottomBackTop(970);
                if(this._bg0 == null) this._bg0 = Manager.pool.create(BitmapRemote);
                this._bg0.load(Manager.path.getFireEyePath("back1", Extension.JPG));
                this._bg0.x = 2;
                this._bg0.y = 95;
                this.basePanel.addChildAt(this._bg0, 0);
				this._view = Manager.pool.create(FireEyeView);
				break;
            case 1:
                this.basePanel.scrollerList.itemList.visible = this.basePanel.backBtn.visible = false;
                this.basePanel.setBottomBackTop(1280);
                if(this._bg0 == null) this._bg0 = Manager.pool.create(BitmapRemote);
                this._bg0.load(Manager.path.getFireEyePath("back_0", Extension.JPG));
                this._bg0.x = 3;
                this._bg0.y = 102;
                this.basePanel.addChildAt(this._bg0, 0);
                if(this._bg1 == null) this._bg1 = Manager.pool.create(BitmapRemote);
                this._bg1.load(Manager.path.getFireEyePath("back_1", Extension.JPG));
                this._bg1.x = 3;
                this._bg1.y = 682;
                this.basePanel.addChildAt(this._bg1, 0);
                this._view = Manager.pool.create(FireEyeLevelInfoView);
                break;
            case 2:
                this.basePanel.scrollerList.itemList.visible = this.basePanel.backBtn.visible = false;
                this.basePanel.setBottomBackTop(1280);
                if(this._bg0 == null) this._bg0 = Manager.pool.create(BitmapRemote);
                this._bg0.load(Manager.path.getFireEyePath("back_0", Extension.JPG));
                this._bg0.x = 3;
                this._bg0.y = 102;
                this.basePanel.addChildAt(this._bg0, 0);
                if(this._bg1 == null) this._bg1 = Manager.pool.create(BitmapRemote);
                this._bg1.load(Manager.path.getFireEyePath("back_1", Extension.JPG));
                this._bg1.x = 3;
                this._bg1.y = 682;
                this.basePanel.addChildAt(this._bg1, 0);
                this._view = Manager.pool.create(FireEyeGameView);
                break;
            case 3:
                this.basePanel.scrollerList.itemList.visible = this.basePanel.backBtn.visible = false;
                this.basePanel.setBottomBackTop(1280);
                if(this._bg0 == null) this._bg0 = Manager.pool.create(BitmapRemote);
                this._bg0.load(Manager.path.getFireEyePath("back_0", Extension.JPG));
                this._bg0.x = 3;
                this._bg0.y = 102;
                this.basePanel.addChildAt(this._bg0, 0);
                if(this._bg1 == null) this._bg1 = Manager.pool.create(BitmapRemote);
                this._bg1.load(Manager.path.getFireEyePath("back_1", Extension.JPG));
                this._bg1.x = 3;
                this._bg1.y = 682;
                this.basePanel.addChildAt(this._bg1, 0);
                this._view = Manager.pool.create(FireEyeResultView);
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
                if(this._view instanceof FireEyeView || this._view instanceof FireEyeResultView) Manager.view.hide(ViewID.FireEyePanel);
                else if(this._view instanceof FireEyeLevelInfoView || this._view instanceof FireEyeGameView)
                {
                    let ok:CallBackInfo = Manager.pool.create(CallBackInfo,Manager.view.hide,Manager.view,ViewID.FireEyePanel);
                    let cancel:CallBackInfo = Manager.pool.create(CallBackInfo,Manager.view.hide,Manager.view,ViewID.TipsView);
                    Manager.view.show(ViewID.TipsView,LangCVO.getContent("fireEye11"),ok,true,cancel);
                }
				break;
		}
	}

    public showView(value:number):void
	{
		this.basePanel.scrollerList.itemList.selectedIndex = value;
		this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
	}

    /**根据选中的结果画勾画叉 */
    public drawStatus(id:number, newData:FireEyeGoodsData):void
    {
        if(this._view instanceof FireEyeGameView) this._view.drawStatus(id, newData);
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.remove(this._view);
        if(this._view) this._view.dispose();
        this._view = null;
        if(this._bg0) Manager.pool.push(this._bg0);
        this._bg0 = null;
        if(this._bg1) Manager.pool.push(this._bg1);
        this._bg1 = null;

        this._menuBtnContent.length = 0;
    }
}