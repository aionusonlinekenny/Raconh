/**
 *author Anydo
 *create 2017-12-28
 *description 
*/
class ArenaLogView extends UIComponent
{
    private _title:eui.Image;
    private _list:BaseVScrollerList;
	private _popupView:BasePopUpView;

    public constructor()
    {
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("arena", "ArenaLogViewSkin");
	}

	protected configUI():void
	{
		super.configUI();
        this._title.y = 145;
		this._popupView.viewY = 167;
		this._popupView.bgHeight = 939;
        this._popupView.diImgVisible = false;
        (<eui.VerticalLayout>this._list.itemList.layout).gap = 5;
	}

	protected initData():void
	{
		Manager.socket.sendOnlyProtocol(Protocol.ARENA_PK_LOG);
    }

	protected addEvent():void
	{
		super.addEvent();
		this._popupView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        Manager.model.getArena().addEventListener(ArenaEvent.UPDATE_PK_LOG, this.updateLogData, this);
	}

	protected removeEvent():void
	{
		this._popupView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        Manager.model.getArena().removeEventListener(ArenaEvent.UPDATE_PK_LOG, this.updateLogData, this);
		super.removeEvent();
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onCloseHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.ArenaLogView);
	}

    private updateLogData(e:ArenaEvent):void
    {
		let logs:ArenaLogInfo[] = e.params as ArenaLogInfo[];
        this._list.initBtnListData(ArenaLogListItem, logs, true);
    }

	public show(...args:any[]):void
	{
		if(this.parent == null)
		{
			this.onResizeHandler(null);
			Manager.layer.tipsLayer.addChild(this);
		}
	}

	public hide():void
	{
		this.dispose();
	}

	public dispose()
	{
		super.dispose();
		if(this._loadComplete)
		{
			this._list.dispose();
			this._list = null;
			this._popupView.dispose();
			this._popupView = null;
		}
	}
}