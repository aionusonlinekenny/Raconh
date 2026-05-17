/**
 * pzx 
 * 2017.11.6
 * 滑动组件
 */
class AddItemsScroller extends UIComponent {
	private _jianBtn:Button;
	private _jiaBtn:Button;
	private _kunGro:eui.Group;
	private _countTxt:Label;
	public _barBtn:Button;
	private _progreImg:eui.Image;

	private offsetX:number;
	private readonly MIN_SCORX:number = 80;
	private readonly MAX_SCORW:number = 200;
	private readonly MAX_BG_W:number = 220;
	/**总数 */
	private _totalTount:number=10;
	/**当前数量 */
	private _current:number;
	public constructor() {
		super();
		this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("uiCommon", "AddItemsScrollerSKin");
	}
	protected configUI():void
	{
		super.configUI();
	}
	protected addEvent():void
	{
		this._barBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.addMoveEvent,this)
		this._barBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.endFun,this);
		this._jiaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.countFun,this)
		this._jianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.countFun,this);
	}
	private addMoveEvent(e:egret.TouchEvent):void
	{
		this.offsetX = e.stageX - this._barBtn.x;
		this.addChild(this._barBtn);
		this._barBtn.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveFun,this);
	}
	private countFun(e:egret.TouchEvent):void
	{
		var btn:eui.Button = e.currentTarget;
		switch(btn)
		{
			case this._jiaBtn:
			this._current++;
			if(this._current>this._totalTount)
			{
				this._current = this._totalTount;
			}
			break
			case this._jianBtn:
			this._current--;
			if(this._current<1)
			{
				this._current = 1;
			}
			break
		}
		this.updateBarX2(this._current);

	}
	private updateBarX2(value:number):void
	{
		let c:number = value/this._totalTount;
		this._barBtn.x = c * this.MAX_SCORW + this.MIN_SCORX;
		this._progreImg.width = c * this.MAX_BG_W;
		this._kunGro.x = this._barBtn.x - 5;
		this._countTxt.text = this._current +"";
	}
	private moveFun(e:egret.TouchEvent):void
	{
		this._barBtn.x = e.stageX-this.offsetX;
		if(this._barBtn.x<=this.MIN_SCORX)
		{
			this._barBtn.x = 80;
		}
		else if(this._barBtn.x >280)
		{
			this._barBtn.x = 280;
		}
		this._kunGro.x = this._barBtn.x - 5;
		this.updateBarX(Math.round(this._barBtn.x));
	}
	private endFun(e:egret.TouchEvent):void
	{
		this._barBtn.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveFun,this);
	}
	private updateBarX(value:number)
	{
		value = value - this.MIN_SCORX;
		let c:number = value/this.MAX_SCORW;
		this._progreImg.width = c * this.MAX_BG_W;
		this. _current = Math.round(c *this._totalTount);
		if(this._current==0)
		{
			this._current = 1;
			this.updateBarX2(1);
		}
		else
		{
			this._countTxt.text = "" + this._current;
		}
	}
	/**设置总数 */
	public setData(value:number,total:boolean=false):void
	{
		this._totalTount = value;
		if(total)
		{
			this._current = value;
		}
		else 
		{
			this._current = 1;
		}
		this.invalidate(InvalidationType.DATA);
	}
	/**进度数量 */
	public get current():number
	{
		return this._current;
	}
	protected drawAll():void
	{
		super.drawAll();
		this.drawData()
	}
	protected draw():void
	{
		 if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

	private drawData():void
	{
		this.updateBarX2(this._current);
	}
	public reuse():void
	{
		super.reuse();
		
	}
	public unuse():void
	{
		super.unuse();
		this._current = 1;
		this._countTxt.text = "";
	}

	public dispose():void
	{
		super.dispose();
		this._jianBtn.dispose();
		this._jianBtn=null;
		this._jiaBtn.dispose();
		this._jiaBtn=null;
		this._countTxt.dispose();
		this._countTxt=null;
		this._barBtn.dispose();
		this._barBtn=null;
		ObjectUtil.removes(this._kunGro,this._progreImg);
		this._kunGro=null;
		this._progreImg=null;
	}

}