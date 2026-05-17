/**
 *author Anydo
 *create 2018-1-11
 *description 
*/
class ArenaMaxAwardView extends UIComponent implements IViewManager
{
	private _btnOk:Button;
	private _txtTitle:Label;
    private _group:eui.Group;
    private _btnPic:eui.Image;
    private _redIcon:eui.Image;
    private _btnClose:eui.Image;
    private _itemBox:eui.Group;

	private _goodItems:Array<Goods> = [];

	private _enabled:boolean;
    private _vos:Array<GainLossVO>;
	private _callBack:CallBackInfo;

    public constructor()
    {
		super();
		this.skinName = Manager.path.getSkinName("arena", "ArenaMaxAwardViewSkin");
		this.touchChildren = true;
	}

	protected configUI():void
	{
		super.configUI();

        this.disposeItems();
        this._goodItems = [];
		var len:number = this._vos.length;
		var item:Goods;
        for(var i:number = 0; i < len; i++)
		{
            item = Manager.pool.create(Goods);
            item.x = i * 130;
            item.data = this._vos[i].item;
            this._itemBox.addChild(item);
            this._goodItems.push(item);
        }
        this._itemBox.x = (444 - len * 130) / 2;

		this._btnPic.touchEnabled = false;
		this._redIcon.visible = this._enabled;
        if(this._enabled) this._btnOk.filters = null;
        else FilterUtil.setGrayFilter(this._btnOk);
	}

	protected addEvent():void
	{
		super.addEvent();
		this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
		this._btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkHandler, this);
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
	}

	protected removeEvent():void
	{
		this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
		this._btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkHandler, this);
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		super.removeEvent();
	}

	private onResizeHandler(e:GlobalEvent):void
	{
		this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	private onCloseHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.ArenaMaxAwardView);
	}

	private onOkHandler(e:egret.TouchEvent):void
	{
		if(this._callBack != null)
		{
			this._callBack.actCallBack();
			Manager.pool.push(this._callBack);
			this._callBack = null;
		}
		Manager.view.hide(ViewID.ArenaMaxAwardView);
	}

    private disposeItems():void
    {
        if(this._goodItems == null) return;
        for(let i:number = 0; i < this._goodItems.length; i++)
        {
            Manager.pool.push(this._goodItems[i]); 
        }
		this._goodItems = null;
    }

	public show(vos:Array<GainLossVO>, enabled:boolean, callBack:CallBackInfo = null):void
	{
        this._vos = vos;
		this._enabled = enabled;
		this._callBack = callBack;
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
			this._btnOk.dispose();
			this._btnOk = null;
			this._txtTitle.dispose();
			this._txtTitle = null;
			this._btnPic = null;
			this._btnClose = null;
            this._itemBox = null;
            this._group = null;
			this._redIcon = null;
		}
        this.disposeItems();
        this._vos = null;
		if(this._callBack != null)
		{
			Manager.pool.push(this._callBack);
			this._callBack = null;
		}
	}
}