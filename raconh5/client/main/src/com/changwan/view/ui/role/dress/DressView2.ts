/**
 * 装扮主界面
 * liangyan
 * create 2017-11-27
*/
class DressView2 extends RenderSprite
{
    private _funList:BaseHScrollerList;
    private _menuBtnContent:Array<any>;

    private _curView:RenderSprite;
	private _showArgs:any[]

    private _bgImg:BitmapRemote;

    public constructor(args:any[])
    {
        super();
        this.touchChildren = true;
        this._showArgs = args;
        this.start();
        this.addEvent();
        this.initData();
    }

    protected start():void
    {
        super.start();

        this.width = 720;
        this.height = 1280;

		this._bgImg = Manager.pool.create(BitmapRemote);
		this._bgImg.x = 5;
		this._bgImg.y = 118;
		this._bgImg.load(PathInfo.getPath("res/common/common_back4.png", LoaderType.IMAGE), 710, 180);
		this.addChild(this._bgImg);

        this._funList = new BaseHScrollerList();
        this._funList.width = 615;
        this._funList.height = 144;
        this._funList.x = 54;
        this._funList.y = 126;
        this._funList.skinName = "BaseHScrollerListSkin";
        this.addChild(this._funList);

        this._menuBtnContent = [];
        if(OpenCVO.isOpen(OpenConst.ID_TITLE))
            this._menuBtnContent.push({typeImg:"title_btn_png"});
        if(OpenCVO.isOpen(OpenConst.ID_CLOAK))
            this._menuBtnContent.push({typeImg:"clothes_btn_png"});
		this._funList.initBtnListData(DressTypeBtn, this._menuBtnContent);
		(<eui.HorizontalLayout>this._funList.itemList.layout).gap = 13;
        this._funList.validateNow();
    }

    private initData():void
    {
        if(this._showArgs != null && this._showArgs.length > 0) 
        {
            this._funList.itemList.selectedIndex = parseInt(this._showArgs.shift());
        }
        else this._funList.itemList.selectedIndex = DressType.TITLE;
        this._funList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
    }

    protected addEvent():void
    {
        super.addEvent();
        this._funList.itemList.addEventListener(eui.UIEvent.CHANGE, this.onFunSelectHandler, this);
        Manager.model.getDress().fashionModel.addEventListener(FashionEvent.UPDATE, this.onFashionUpdate, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdate, this);
    }

    protected removeEvent():void
    {
        this._funList.itemList.removeEventListener(eui.UIEvent.CHANGE, this.onFunSelectHandler, this);
        Manager.model.getDress().fashionModel.removeEventListener(FashionEvent.UPDATE, this.onFashionUpdate, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdate, this);
        super.removeEvent();
    }

    private onItemUpdate(e:ItemsEvent):void
    {
        if(e.params != ItemsType.BAG) return;
        this.invalidate("drawItem");
    }

    private onFashionUpdate(e:FashionEvent):void
    {
        this.invalidate("drawFashion");
    }

    private drawFashion():void
    {
        let btn = this._funList.itemList.getElementAt(DressType.CLOTHES) as DressTypeBtn;
        if(btn) btn.showRedIcon(Manager.model.getDress().fashionModel.hasCanActive);
    }

    private drawTitle():void
    {
        let btn = this._funList.itemList.getElementAt(DressType.TITLE) as DressTypeBtn;
        if(btn) btn.showRedIcon(Manager.model.getDress().titleModel.hasCanActive);
    }

    protected drawAll():void
	{
		super.drawAll();
        this.drawFashion();
        this.drawTitle();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid("drawFashion", "drawItem")) this.drawFashion();
        if(this.isInvalid("drawItem")) this.drawTitle();
	}

    private onFunSelectHandler(e:eui.UIEvent):void
    {
        let index:number = this._funList.itemList.selectedIndex;
		if(index == -1) return;

        let isBack:boolean = false;
		switch(index)
		{
            case DressType.TITLE:
				isBack = !OpenCVO.isOpen(OpenConst.ID_TITLE, true);
				break;
			case DressType.CLOTHES:
				isBack = !OpenCVO.isOpen(OpenConst.ID_CLOAK, true);
				break;
		}
		if(isBack) this._funList.itemList.selectedIndex = index = 0;
        
		if(this._curView)
        {
            this._curView.dispose();
            this._curView = null;
        }
		switch(index)
		{
			case DressType.CLOTHES:
                this._curView = new FashionView2(this._showArgs ? parseInt(this._showArgs[0]): null);
				break;
			case DressType.TITLE:	
				this._curView = new TitleView2(this._showArgs ? parseInt(this._showArgs[0]): null);
				break;
		}
		if(this._curView && !this._curView.parent) this.addChild(this._curView);
    }

    public reuse(args:any[]):void
    {
        this._showArgs = args;
        super.reuse();
        // if(this._funList.itemList.selectedIndex != index) 
        // {
        //     this._funList.itemList.selectedIndex = index;
        //     this._funList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
        // }
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
        ObjectUtil.removes(this._bgImg, this._funList);
        if(this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        this._funList.dispose();
        this._funList = null;
        this._menuBtnContent.length = 0;
        this._menuBtnContent = null;
        if(this._curView)
        {
            this._curView.dispose();
            this._curView = null;
        }
    }
}