/**
 * pzx 
 * 2017.11.6
 * 使用tips
 */
class UseItemsTips extends BaseItemsTips{
	
	private _useBtn:Button;
	private _closeBtn:Button;

	private _goods:BaseGoods;
	private _nameTxt:Label;
	private _addScorlle:AddItemsScroller;
	private _basePopupSkin:BasePopUpView;
	private _info:ItemsModelInfo;

	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("tips", "UseItemsTipsSkin");
	}
	protected configUI():void
	{
		super.configUI();
		this.touchChildren = true;
		this._goods.touchEnabled = false;
		this.onResizeHandler();
	}
	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._basePopupSkin.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closefun,this);
		this._useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.useFun,this);
		this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closefun,this);
	}
	protected removeEvent():void
	{
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
		this._basePopupSkin.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closefun,this);
		this._useBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.useFun,this);
		this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closefun,this);
		super.removeEvent();
	}
	private onResizeHandler(e?:GlobalEvent):void
	{
		this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
	}
	private closefun(e:egret.TouchEvent):void
	{
		Manager.view.hide(ViewID.UseItemsTips);
		//if(this.parent)this.parent.removeChild(this);
	}
	private useFun(e:egret.TouchEvent):void
	{
		// switch(this._info.cvo.type)
		// {
		// 	case ItemsConst.TYPE_TITLE:
		// 		Manager.control.getDress().actTitle(this._info.cvo.type, this._info.cvo.id);
		// 	break;
		// 	default:
		// 		Manager.control.getItems().useItems(this._info.id,this._addScorlle.current,this._info.base_id);
		// 	break;
		// }
		Manager.model.getItems().useItems(this._info, this._addScorlle.current);
		Manager.view.hide(ViewID.UseItemsTips);
	}
	
	public setData(value:ItemsModelInfo):void
	{
		this._info = value;
		super.setData(value);
	}
	protected drawData():void
	{
		this._addScorlle.setData(this._info.quantity,true);
		this._nameTxt.text = this._info.cvo.name;
		this._goods.baseId = this._info.base_id;
		this._goods.count = this._info.quantity;
		super.drawData();
	}

	public dispose():void
	{
		super.dispose();
		this._useBtn.dispose();
		this._useBtn = null;
		this._closeBtn.dispose();
		this._closeBtn =null;
		Manager.pool.push(this._goods);
		this._goods=null;
		this._nameTxt.dispose();
		this._nameTxt = null;
		this._addScorlle.dispose();
		this._addScorlle =null;
		this._basePopupSkin.dispose();
		this._basePopupSkin = null;
		this._info=null;
	}
	
}