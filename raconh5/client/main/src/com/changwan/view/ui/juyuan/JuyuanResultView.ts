/**
 * drq 
 * 聚元 结算界面
 * 2018.4.8
 */
class JuyuanResultView  extends UIComponent implements IViewManager
{
	private _back:eui.Image;
	private _enterBtn:eui.Button;
	private _time:Label;
	private _btnClose:eui.Button;
	private _txt:Label;
	private _ballback:eui.Image;
	private _bimfont:NumImgView2;

	private _countDownTime:number;
	private _callback:Function;
	private _data:JuyuanCVO;

	public constructor() 
	{
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("juyuan","JuyuanResultSkin");
	}

	protected configUI():void
    {
        super.configUI();
		if(!this._bimfont)
		{
			this._bimfont = Manager.pool.create(NumImgView2);
            this._bimfont.x = 238 + 115 + 10;
			this._bimfont.y = 560;
			this.addChild(this._bimfont);
		}
    }


	protected addEvent():void
    {
        super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        this._btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
    }

    protected removeEvent():void
    {
		GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        this._btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        super.removeEvent();
    }

    protected initData():void
    {
        super.initData();
        this.onResizeHandler(null);
    }

	private onResizeHandler(e:GlobalEvent):void
	{
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
	}

	protected draw():void
	{
		super.draw();
		if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
    }

	private drawData():void
    {
		let name:string = LangCVO.getContent("juyuan3" + (this._data.id));
		let text:string = LangCVO.getContent("juyuan7",name);

		let list:JuyuanCVO = Manager.model.getJuyuan().getNextStepList(this._data.sort_id);
		let attr:string = list.attr;
		let attvo:AttrVO = Manager.pool.create(AttrVO,attr);
		let fight:number = attvo.getFighting();

		this._ballback.source = "juyuan_icon_"+(this._data.id)+"_png";

		this._txt.text = text;
		this._bimfont.setValue(fight,"nums_fighting_",28);
		Manager.render.add(this.countDown, this, 1000);
    }

    private countDown():void
	{
		if(this._countDownTime == 0)
		{
			Manager.view.hide(ViewID.JuyuanResultView);
			return;
		}
		this._time.text = LangCVO.getContent("juyuan8", this._countDownTime);
		this._countDownTime--;
	}

	private onTouchHandler(e:egret.TouchEvent):void
	{
		 Manager.view.hide(ViewID.JuyuanResultView);
	}

	/** 
	 * @param textContent 倒计时时间（秒）
	 * @param okCallback 回调函数
    */
    public show(curId:number,countDownTime:number = 3, callback:Function = null):void
    {
		this._data = Manager.model.getJuyuan().getCurList(curId-1);
		
		this._ballback;
        this._countDownTime = countDownTime;
        this._callback = callback;
        
        if(this.parent == null) Manager.layer.tipsLayer.addChild(this);
        this.invalidate(InvalidationType.DATA);
    }

    public hide():void
    {
        if(this.parent) this.dispose();
    }

	public dispose():void
	{
        if(this._callback) this._callback();
		Manager.render.remove(this.countDown, this);
		super.dispose();
		ObjectUtil.removes(this._back, this._enterBtn, this._btnClose,this._ballback);
		ObjectUtil.disposes(this._txt, this._time);
		if(this._bimfont)	this._bimfont.dispose();
		this._back.bitmapData = null;
		this._bimfont = null;
		this._back = null;
		this._txt = null;
		this._time = null;
		this._enterBtn = null;
		this._btnClose = null;
		this._callback = null;
	}
}