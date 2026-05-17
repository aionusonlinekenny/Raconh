/**
 * 选择服务器界面
 * luzhihong
 * create 2017-12-14
 */
class ServerSelectView extends UIComponent implements IViewManager
{
    private _groupList:BaseVScrollerList;
    private _itemList:BaseVScrollerList;
    private _btnClose:eui.Image;
    private _selectedGItem:ServerGroupItem;
    private _parent:LoginView;
    
    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("login", "ServerSelectViewSkin");
    }

    protected configUI():void
    {
        super.configUI();
        let listData:Array<any> = this._parent.serverList as Array<any>

		this._groupList.initBtnListData(ServerGroupItem, listData, true);
		// (<eui.VerticalLayout>this._list.itemList.layout).gap = -5;
		this._itemList.initBtnListData(ServerItem, null, true);

        this._groupList.itemList.selectedIndex = listData[0].list.length > 0 ? 0 : 1;
        this._groupList.itemList.scrollH
        this.onGroupListChange(null);
        this.onResizeHandler(null);
    }
    
    /** 
	 * @param id 副本ID
    */
    public show(parentView:LoginView):void
    {
        this._parent = parentView;
        if(this.parent == null) Manager.layer.tipsLayer.addChild(this);
    }

    public hide():void
    {
        this.dispose();
    }

    protected addEvent():void
    {
        super.addEvent();

        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._groupList.itemList.addEventListener(eui.UIEvent.CHANGE, this.onGroupListChange, this);
		this._itemList.itemList.addEventListener(eui.UIEvent.CHANGE, this.onItemListChange, this);
		this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();

        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._groupList.itemList.removeEventListener(eui.UIEvent.CHANGE, this.onGroupListChange, this);
		this._itemList.itemList.removeEventListener(eui.UIEvent.CHANGE, this.onItemListChange, this);
		this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.config.gameWidth - this.width) / 2;
	}

    private onGroupListChange(e:eui.UIEvent):void
    {
		let item:ServerGroupItem = this._groupList.itemList.selectedItem;
        if(this._selectedGItem == item) return;
        if(this._selectedGItem) this._selectedGItem.selected = false;
        this._selectedGItem = item;
        this._selectedGItem.selected = true;

		this._itemList.dataProvider(this._selectedGItem.list);
    }

    private onItemListChange(e:eui.UIEvent):void
    {
        this._parent.setServer(this._itemList.itemList.selectedItem);
        Manager.view.hide(ViewID.ServerSelectView);
    }

	private onClickHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.ServerSelectView);
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.disposes(this._groupList, this._itemList);
		ObjectUtil.remove(this._btnClose);
    	this._groupList = null;
    	this._itemList = null;
    	this._btnClose = null;
        this._selectedGItem = null;
        this._parent = null;
	}
}