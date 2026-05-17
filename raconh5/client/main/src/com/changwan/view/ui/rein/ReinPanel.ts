/**
 * 转生主界面
 * liangyan
 * create 2017-12-14
*/
class ReinPanel extends Panel
{
    private _view:UIComponent;
    private _menuBtnContent:Array<any>;
	private _oldIndex:number;
	private _bitimg:BitmapRemote;

    public constructor()
    {
        super(false);
    }

    protected configUI():void
    {
        super.configUI();
        // this.basePanel.backBtn.selected = false;
        let boo:boolean = Manager.model.getrelicstuff().checkActivity();
        this._menuBtnContent = [];
		if(OpenCVO.isOpen(OpenConst.ID_RELICSTUFF))
			this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "relicStuff_shenbingxiao_png", imgClick: "relicStuff_shenbingxiao_png",showRedIcon:boo });
		if(OpenCVO.isOpen(OpenConst.ID_REIN))
			this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rein_btn_normal_png", imgClick: "rein_btn_normal_png" });
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
        (<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
        this.basePanel.setBottomBackTop(980);
		
		Manager.render.add(this.renderInvalid, this);
    }

	protected renderInvalid(interval:number):void
	{
		Manager.render.remove(this.renderInvalid, this);
		this.updateRelic();
		this.updateRein();
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

    protected addEvent():void
    {
        super.addEvent();
		Manager.model.getrelicstuff().addEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT,this.updateRelic,this);
		Manager.model.getTask().addEventListener(TaskEvent.TASK_UPDATE_EVENT,this.updateRelic,this);
		Manager.model.getTask().addEventListener(TaskEvent.TASK_INIT_EVENT,this.updateRelic,this);

        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateRein, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.updateRein, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.updateRein, this);
        Manager.model.getRein().addEventListener(ReinEvent.REIN_BOSS_UPDATE, this.updateRein, this);
    }

    protected removeEvent():void
    {
		Manager.model.getrelicstuff().removeEventListener(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT,this.updateRelic,this);
		Manager.model.getTask().removeEventListener(TaskEvent.TASK_UPDATE_EVENT,this.updateRelic,this);
		Manager.model.getTask().removeEventListener(TaskEvent.TASK_INIT_EVENT,this.updateRelic,this);

		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.updateRein, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.updateRein, this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.updateRein, this);
        Manager.model.getRein().removeEventListener(ReinEvent.REIN_BOSS_UPDATE, this.updateRein, this);
        super.removeEvent();
    }

    protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;

        let isBack:boolean = false;
		switch(index)
		{
			case 1:
				isBack = !OpenCVO.isOpen(OpenConst.ID_REIN, true);
				break;
		}
		if(isBack)
		{
			this.basePanel.scrollerList.itemList.selectedIndex = this._oldIndex;
			this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
			return;
		}
		super.onFuncBtnChangeHandler(e);

		if(this._view)
		{
			this._view.dispose();
			this._view = null;
            if(this._bitimg) Manager.pool.push(this._bitimg);
            this._bitimg = null;
		}
		switch(index)
		{
			case 1:
                this.basePanel.backImg.source = "";
				if(this._bitimg == null) this._bitimg = Manager.pool.create(BitmapRemote);
                this._bitimg.load(Manager.path.getReinPath("rein_back", Extension.JPG));
                this.basePanel.addChildAt(this._bitimg, 0);
				this._view = Manager.pool.create(ReinView);
				break;
			case 0:
                this.basePanel.backImg.source = "common_panelBg_png";
				this._view = Manager.pool.create(RelicStuffView);
				if(this._bitimg == null)
				{
					this._bitimg = Manager.pool.create(BitmapRemote);
					this._bitimg.y = 116;
					this._bitimg.x = 0;
					this.basePanel.addChildAt(this._bitimg,3);
					this._bitimg.load(Manager.path.getRelicStuffPath("relicStuffdi",Extension.JPG))
				}
				this._bitimg.visible = true;
				break;

		}
        this.basePanel.title = "rein_title"+index+"_png";
		if(this._view && !this._view.parent)
		{
			this.addChild(this._view);
			this._oldIndex = index;
		}
	}

	public get curView():UIComponent
	{
		return this._view;
	}

    protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.ReinPanel);
				break;
		}
	}

	private updateRelic(e:egret.Event = null):void
	{
		if(!OpenCVO.isOpen(OpenConst.ID_RELICSTUFF)) return;
		let btn = this.setPromptSign(0);
		if(btn) btn.setIconShow(Manager.model.getrelicstuff().checkActivity());
	}

	private updateRein(e:egret.Event = null):void
	{
		if(!OpenCVO.isOpen(OpenConst.ID_REIN)) return;
		let btn = this.setPromptSign(1);
		if(btn) btn.setIconShow(Manager.model.getRein().getCheckCanRein());
	}

    public dispose():void
    {
        super.dispose();
        ObjectUtil.remove(this._view);
        if(this._view) this._view.dispose();
        this._view = null;

        this._menuBtnContent.length = 0;
		if(this._bitimg)
		{
			Manager.pool.push(this._bitimg)
			this._bitimg = null;
		}
    }
}