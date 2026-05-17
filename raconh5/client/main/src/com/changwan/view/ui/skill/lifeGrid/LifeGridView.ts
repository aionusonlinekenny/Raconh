/**
 * 命格界面
 * pzx
 * create 2017-12-21
*/
class LifeGridView extends UIComponent
{
    private _bgImg:BitmapRemote;
    private _funList:BaseHScrollerList;
    private _menuBtnContent:Array<any>;
    private _curView:UIComponent;
    private _panel:BasePanel;
    public static view:LifeGridView;
    private _bodydzAni:Animation;
    private _dazuoAni:Animation;
    private _bg:BitmapRemote;

   public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("lifeGrid", "LifeGridViewSkin");
    }

    protected configUI():void
    {
        super.configUI();

        if(!this._bg)
		{
			this._bg = Manager.pool.create(BitmapRemote);
			this._bg.x = 5;
			this._bg.y = 118;
			this._bg.load(PathInfo.getPath("res/common/common_back4.png", LoaderType.IMAGE), 710, 223);
			this.addChildAt(this._bg, 0);
		}

        LifeGridView.view = this;
        this._bgImg.load(Manager.path.getPanelLifeGridPath("lifeGrid_ditu.jpg","",LoaderType.IMAGE));
    }

    protected addEvent():void
    {
        super.addEvent();
        this._funList.itemList.addEventListener(eui.UIEvent.CHANGE, this.onFunSelectHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.getCopy().towerModel.addEventListener(CopyEvent.UPDATE_TOWER_INFO,this.onIconShowHandler,this);
        Manager.model.getLifeGrid().addEventListener(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT,this.onIconShowHandler,this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.SOUL, this.onIconShowHandler, this);
    }

    protected removeEvent():void
    {
        this._funList.itemList.removeEventListener(eui.UIEvent.CHANGE, this.onFunSelectHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.getCopy().towerModel.removeEventListener(CopyEvent.UPDATE_TOWER_INFO,this.onIconShowHandler,this);
        Manager.model.getLifeGrid().removeEventListener(LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT,this.onIconShowHandler,this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.SOUL, this.onIconShowHandler, this);
        super.removeEvent();
    }
    private setPromptSign(index:number):DressTypeBtn
	{
		if(this._funList)
		{
			let dis:egret.DisplayObject = this._funList.itemList.getElementAt(index);
			return (<DressTypeBtn>dis);
		}
		return null;
	}

	public  onIconShowHandler(e:BaseEvent):void
	{
		let btn:DressTypeBtn;
		if(e.type == GameObjectAttrEvent.SOUL || e.type == ItemsEvent.ITEM_UPDATE_EVENT || e.type == CopyEvent.UPDATE_TOWER_INFO)
		{
			btn = this.setPromptSign(0);
            let boo:boolean = Manager.model.getLifeGrid().isUpgrade() || Manager.model.getLifeGrid().getIsAware() || Manager.model.getLifeGrid().getIsSenior();
			if(btn) btn.showRedIcon(boo);

            let fejjieBoo:boolean = Manager.model.getItems().checkLifeGridBagAmple()||Manager.model.getLifeGrid().checkSeparate();
            btn = this.setPromptSign(1);
            if(btn) btn.showRedIcon(fejjieBoo);
		}
        if(e.type == LifeGridEvent.LIFEGRID_UPDATE_FREECD_EVENT)
        {
            btn = this.setPromptSign(3);
            if(btn) btn.showRedIcon(Manager.model.getLifeGrid().isFree());
        }
	}

    protected initData():void
    {
        super.initData();
    }

    protected drawAll():void
	{
		super.drawAll();
        this.drawLayout();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.LAYOUT)) this.drawLayout();
	}

    private drawLayout():void
    {
        let boo1:boolean = Manager.model.getLifeGrid().isUpgrade() ||Manager.model.getLifeGrid().getIsAware()|| Manager.model.getLifeGrid().getIsSenior();
        let lieming:boolean = Manager.model.getLifeGrid().isFree();
        let fejjieBoo:boolean = Manager.model.getLifeGrid().checkSeparate()||Manager.model.getItems().checkLifeGridBagAmple();
        if(!this._menuBtnContent)
		{
			this._menuBtnContent = [
                {typeImg:"lifeGrid_mingge1_png",redShow:boo1},
			    {typeImg:"lifeGrid_fenjie_png",redShow:fejjieBoo},
			    {typeImg:"lifeGrid_duihuan_png"},  
                {typeImg:"lifeGrid_lieming_png",redShow:lieming}
			];
		}
		this._funList.initBtnListData(DressTypeBtn, this._menuBtnContent);
		(<eui.HorizontalLayout>this._funList.itemList.layout).gap = 13;
    }

    private onFunSelectHandler(e:eui.UIEvent):void
    {
        let index:number = this._funList.itemList.selectedIndex;
		if(index == -1) return;
		if(this._curView)
        {
            this._curView.dispose();
            this._curView = null;
        }
		switch(index)
		{
			case LifeGridType.LIFEGRID:
                this._panel.title="lifeGrid_mg_png";
                this._panel.setBottomBackTop(1280);
                this._curView = Manager.pool.create(LifeGridContainer);
                this._bgImg.visible = true;
                let str:string ="bodydz" + Manager.model.self.attrInfo.career+"001";
                if(this._bodydzAni== null)
                {
                    this._bodydzAni = Manager.animation.createPanelLifeGridAnimation(str);
                    this.addChild(this._bodydzAni);
                    this._bodydzAni.x = -35;
                    this._bodydzAni.y = 330;

                    this._dazuoAni = Manager.animation.createPanelLifeGridAnimation("lifeGriddazuo");
                    this.addChild(this._dazuoAni);
                    this._dazuoAni.x = 215;
                    this._dazuoAni.y = 650;
                }
                this._bodydzAni.visible = true;
                this._bodydzAni.play();
                this._dazuoAni.visible = true;
                this._dazuoAni.play();
				break;
			case LifeGridType.RESOLVE:
                this._panel.title="lifeGrid_fj_png";
                this._panel.setBottomBackTop(982);	
                this._bgImg.visible = false;
                this._bodydzAni.visible = false;
                this._bodydzAni.stop();
                this._curView = Manager.pool.create(LifeGridSeparate);
                this._dazuoAni.visible = false;
                this._dazuoAni.stop();
				break;
			case LifeGridType.BUY:
                this._panel.title="common_dh_png";
                this._panel.setBottomBackTop(982);
                this._bgImg.visible = false;
                this._bodydzAni.visible = false;
                this._bodydzAni.stop();
                this._curView = Manager.pool.create(LifeGridBuy,this);
                this._dazuoAni.visible = false;
                this._dazuoAni.stop();
				break;
            case LifeGridType.HUNT:
                this._panel.title="lifeGrid_lm_png";
                this._panel.setBottomBackTop(1280);
                this._bgImg.visible = true;
                this._bodydzAni.visible = true;
                this._bodydzAni.play();
                this._curView = Manager.pool.create(LifeGridHunt);
                this._dazuoAni.visible = true;
                this._dazuoAni.play();
				break;
		}
		if(this._curView && !this._curView.parent) this.addChild(this._curView);
    }
    public setTap(index:number):void
    {
        this._funList.itemList.selectedIndex = index;
        this.onFunSelectHandler(null);
    }

    public reuse(baePanel:BasePanel):void
    {
        super.reuse();
        this._panel = baePanel;
        this._funList.itemList.selectedIndex = LifeGridType.LIFEGRID;
        this.onFunSelectHandler(null);
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
        super.dispose();
        LifeGridView.view = null;

        ObjectUtil.removes(this._bg);
        if(this._bg)
            Manager.pool.push(this._bg);
        this._bg = null;
        Manager.pool.push(this._bgImg);
        this._bgImg = null;
        this._funList.dispose();
        this._funList = null;
        this._menuBtnContent.length = 0;
        this._menuBtnContent = null;
        this._panel = null;
        if(this._curView)
        {
            this._curView.dispose();
            this._curView = null;
        }
        if(this._bodydzAni) {
            this.removeChild(this._bodydzAni)
            Manager.pool.push(this._bodydzAni);
            this._bodydzAni = null;
        }
        if(this._dazuoAni) {
            this.removeChild(this._dazuoAni)
            Manager.pool.push(this._dazuoAni);
            this._dazuoAni = null;
        }

    }
}