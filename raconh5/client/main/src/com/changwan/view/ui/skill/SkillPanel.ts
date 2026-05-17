/**
 * 技能主界面
 * liangyan
 * create 2017-11-18
*/
class SkillPanel extends Panel
{
    private _view:UIComponent;
    private _menuBtnContent:Array<any>;
    private _oldIndex:number;
    private _bitimg:BitmapRemote;

    private _event:BaseEvent;

    public constructor()
    {
        super(false);
    }

    protected configUI():void
    {
        super.configUI();
        // this.basePanel.backBtn.selected = false;
        let skillboo:boolean = Manager.model.getSkill().checkTipsShow();
        this._menuBtnContent = [
			{ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "skill_tab_btn_normal_png", imgClick: "skill_tab_btn_normal_png", showRedIcon:skillboo},
		];
        if(OpenCVO.isOpen(OpenConst.ID_JUEXUE))
		{
            let jxboo:boolean=Manager.model.getjuexue().checkUpgrade(null) || Manager.model.getjuexue().checkAmbitLv();
			this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "juexue_bouttmIcon_png", imgClick: "juexue_bouttmIcon_png" ,showRedIcon:jxboo});
		}
        if(OpenCVO.isOpen(OpenConst.ID_LIEFGRID))
		{
            let lefiboo:boolean =  Manager.model.getLifeGrid().checkSeparate() || 
                Manager.model.getItems().checkLifeGridBagAmple() || 
                Manager.model.getLifeGrid().isUpgrade() || 
                Manager.model.getLifeGrid().getIsAware() || 
                Manager.model.getLifeGrid().getIsSenior() || 
                Manager.model.getLifeGrid().isFree();
			this._menuBtnContent.push({ bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "lifeGrid_mingge_png", imgClick: "lifeGrid_mingge_png",showRedIcon:lefiboo});
		}
		this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
		(<eui.HorizontalLayout>this.basePanel.scrollerList.itemList.layout).gap = 0;
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.getCopy().towerModel.addEventListener(CopyEvent.UPDATE_TOWER_INFO,this.onIconShowHandler,this);
        Manager.model.getLifeGrid().addEventListener(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT,this.onIconShowHandler,this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.SOUL, this.onIconShowHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onIconShowHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onIconShowHandler, this);
        Manager.model.getjuexue().addEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT,this.onIconShowHandler,this);
        Manager.model.getjuexue().addEventListener(JuexueEvent.JUEXUE_AMBIT_EVENT,this.onIconShowHandler,this);
        Manager.model.getSkill().addEventListener(SkillEvent.SKILL_SINGLE_UPDATE,this.onIconShowHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.getCopy().towerModel.removeEventListener(CopyEvent.UPDATE_TOWER_INFO,this.onIconShowHandler,this);
        Manager.model.getLifeGrid().removeEventListener(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT,this.onIconShowHandler,this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.SOUL, this.onIconShowHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onIconShowHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.onIconShowHandler, this);
        Manager.model.getjuexue().removeEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT,this.onIconShowHandler,this);
        Manager.model.getjuexue().removeEventListener(JuexueEvent.JUEXUE_AMBIT_EVENT,this.onIconShowHandler,this);
        Manager.model.getSkill().removeEventListener(SkillEvent.SKILL_SINGLE_UPDATE,this.onIconShowHandler,this);
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
        this._event = e;
        Manager.render.add(this.delayCheck, this, 300, 1, null, true);
	}

    private delayCheck():void
    {
        let btn:BaseFuncBtn;
        let boo:boolean;
        if(this._event.type == GameObjectAttrEvent.COIN || this._event.type == GameObjectAttrEvent.LEVEL 
        || this._event.type == SkillEvent.SKILL_SINGLE_UPDATE)
        {
            btn = this.setPromptSign(0);
            boo = Manager.model.getSkill().checkTipsShow();
			if(btn) btn.setIconShow(boo);
        }
		if(this._event.type == GameObjectAttrEvent.SOUL || this._event.type == ItemsEvent.ITEM_UPDATE_EVENT 
        || this._event.type == CopyEvent.UPDATE_TOWER_INFO|| this._event.type == LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT)
		{
			btn = this.setPromptSign(2);
            boo = Manager.model.getLifeGrid().checkSeparate()||Manager.model.getItems().checkLifeGridBagAmple() 
            || Manager.model.getLifeGrid().isUpgrade() ||Manager.model.getLifeGrid().getIsAware() 
            || Manager.model.getLifeGrid().getIsSenior()|| Manager.model.getLifeGrid().isFree();;
			if(btn) btn.setIconShow(boo);
		}
        if(this._event.type == JuexueEvent.JUEXUE_UPGRADE_EVENT || this._event.type == JuexueEvent.JUEXUE_AMBIT_EVENT)
        {
            btn = this.setPromptSign(1);
            boo = Manager.model.getjuexue().checkUpgrade(null) || Manager.model.getjuexue().checkAmbitLv();
			if(btn) btn.setIconShow(boo);
        }
    }

    protected onFuncBtnChangeHandler(e:eui.UIEvent):void
	{
		let index:number = this.basePanel.scrollerList.itemList.selectedIndex;
		if(index == -1) return;
        // if(index == 1 && !OpenCVO.isOpen(OpenConst.ID_LIEFGRID, true))
        // {
        //     this.basePanel.scrollerList.itemList.selectedIndex = this._oldIndex;
        //     return;
        // } 
        let isBack:boolean = false;
        switch(index)
        {
            case 2:
                isBack = !OpenCVO.isOpen(OpenConst.ID_LIEFGRID, true);
                break;
            case 1:
                isBack = !OpenCVO.isOpen(OpenConst.ID_JUEXUE, true);
                break;
        }
        if(isBack)
        {
            if(this._oldIndex == undefined || this._oldIndex < 0) this._oldIndex = 0;
            this.basePanel.scrollerList.itemList.selectedIndex = this._oldIndex;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
            return;
        }
		super.onFuncBtnChangeHandler(e);
		if(this._view)
		{
			this._view.dispose();
			this._view = null;
		}
		switch(index)
		{
			case 0:
                this.basePanel.title = "skill_title_png";
                this.basePanel.setBottomBackTop(982);
				this._view = Manager.pool.create(SkillView);
                if(this._bitimg) this._bitimg.visible = false;
				break;
            case 2:
				this._view = Manager.pool.create(LifeGridView,this.basePanel);
                if(this._bitimg) this._bitimg.visible = false;
				break;
            case 1:
                this.basePanel.title = "juexue_title_png";
                if(this._bitimg == null)
                {
                    this._bitimg = Manager.pool.create(BitmapRemote);
                    this._bitimg.y = 116;
                    this._bitimg.x = 5;
                    this.basePanel.addChildAt(this._bitimg,3);
                    this._bitimg.load(Manager.path.getPanelUiImgPath("juexue/juexue_beijing1"));
                }
                this._view = Manager.pool.create(JuexueView);
                this._bitimg.visible = true;
                this.basePanel.setBottomBackTop(982);
                break;
		}
		if(this._view && !this._view.parent) 
        {
            if(this._view instanceof LifeGridView)
            {
                this.basePanel.addChildAt(this._view,4);
            }
            else
            {
                this.addChild(this._view);
            }
            this._oldIndex = index;
        }
	}

    protected onClickHandler(e:egret.TouchEvent):void
	{
		super.onClickHandler(e);

		switch(e.currentTarget)
		{
			case this.basePanel.closeBtn:
			case this.basePanel.backBtn:
				Manager.view.hide(ViewID.SkillPanel);
				break;
		}
	}

    public dispose():void
    {
        if(Manager.render.contains(this.delayCheck, this)) Manager.render.remove(this.delayCheck, this);
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

        this._event = null;
    }
}