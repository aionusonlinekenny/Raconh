/**
 * pzx 
 * 2017.11.6
 * BaseItemsTips
 */
class BaseItemsTips extends UIComponent{
	protected _data:any;
	public constructor() {
		super();
		// this.onResizeHandler(null);
	}
	protected configUI():void
	{
		super.configUI();
		this.touchChildren = true;
	}
	
	public setData(value:ItemsCVO|ItemsModelInfo):void
	{
		this._data = value;
		this.invalidate(InvalidationType.DATA);
		this.visible = false;
	}
	
	public show(value:ItemsCVO | ItemsModelInfo = null):void
	{
		this.setData(value);
		Manager.layer.tipsLayer.addChild(this);
	}
	protected draw():void
	{
		super.draw();
		if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    protected drawAll():void
    {
        super.drawAll();
		if(this._data) this.drawData();
    }
	protected drawData():void
	{
		this.visible = true;
	}

	// protected addEvent():void
	// {
	// 	super.addEvent();
	// 	GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
	// }

	// protected removeEvent():void
	// {
	// 	GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
	// 	super.removeEvent();
	// }

	// private onResizeHandler(e:GlobalEvent):void
	// {
	// 	this.width = Manager.global.gameMain.stage.stageWidth;
	// }

	public reuse(...args:any[]):void
	{
		super.reuse();
		this.touchChildren = true;
	}

	public hide():void
	{
		this._data = null;
		this.dispose();
	}
}