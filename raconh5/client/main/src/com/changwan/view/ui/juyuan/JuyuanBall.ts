/**
 * drq 
 * 聚元 Ball
 * 2018.4.3
 */
class JuyuanBall extends UIComponent{
	private _img:eui.Image;
	private _source:string;
	private _cvo:JuyuanCVO;
	private _index:number;

	public constructor(index:number,cvo:JuyuanCVO) {
		super();
		this.skinName = Manager.path.getSkinName("juyuan", "JuyuanBallSkin");
		this._source = "juyuan_icon_"+(index+1)+"_png";
		this.touchChildren = true;
		this.touchEnabled = false;
		this._cvo = cvo;
		this._index = index;
	}

	protected configUI():void
    {
		super.configUI();
		this._img.source = this._source;
	}

	protected addEvent():void
	{
		super.addEvent();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ballClick,this);
	}

	protected removeEvent():void
	{
		super.removeEvent();
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.ballClick,this);
	}
	
	private ballClick():void
	{
		Manager.view.show(ViewID.JuyuanItem,this._cvo,this._index);
	}

	public setTouch(isTouch:boolean):void
	{
		this.touchEnabled = isTouch;
	}

	public dispose():void
	{
		super.dispose();
		ObjectUtil.remove(this._img);
		this._img = null;
		this._source = null;
		this._cvo = null;
		this._index = null;
	}
}