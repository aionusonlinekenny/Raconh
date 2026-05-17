/**
 * pzx 
 * 18.3.26
 * 出产途径item
 */
class PutOutItem extends UIComponent{

	private _pathBg1:BitmapRemote;
	private _pathtxt1:Label;
	/**推荐*/
	private _tuijianImg1:eui.Image;

	private _openViewId:number;

	private _tap:string;

	private _str:string;

	public viewId:number;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("tips", "PutOutItemSkin");
    }
    protected configUI():void
    {
        super.configUI();
		this.touchChildren = true;
		this._pathBg1.touchEnabled = true;
    }

    protected addEvent():void
    {
        super.addEvent();
		this._pathBg1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenViewHandler, this);
    }

    protected removeEvent():void
    {
		this._pathBg1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenViewHandler,this);
        super.removeEvent();
    }
	private onOpenViewHandler(e:egret.TouchEvent):void
	{
		Manager.view.hide(this.viewId);
		Manager.link.link(this._openViewId,this._tap);
	}


    protected drawAll():void
	{
		super.drawAll();
		this.drawData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    public setData(data):void
    {
		this._str = data;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
		let any:any = this.spin(this._str);
		this._pathBg1.load(Manager.path.getPanelUiImgPath("tips/"+any.resImg,"png"));
		this._pathtxt1.text = any.name;
		this._tuijianImg1.visible = any.hots==1;
		this._openViewId = any.viewId;
		this._tap = any.tab;
    }

	private spin(str:string):any
	{
		var reg:RegExp = /{|}| /g;
		str = str.replace(reg,"");
		let arr:Array<string> = str.split(",");
		let obj:any={};
		obj.hots = Number(arr[1]);
		obj.resImg = arr[2];
		obj.name = arr[3];
		obj.viewId = Number(arr[4]);
		let tab:string = "0";//页签默认0
		if(arr[5])
		{
			tab = arr[5];
		}
		obj.tab = tab;
		return obj;

	}

    public reuse():void
    {
        super.reuse();
		this._pathBg1 = Manager.pool.create(BitmapRemote);
		this.addChildAt(this._pathBg1,0);
    }

    public unuse():void
    {
        super.unuse();
		this.clear();
    }
	
	private clear(isRemove:boolean=false):void
	{
		Manager.pool.push(this._pathBg1);
		this._pathBg1=null;
		this.x = 0;
		this.y = 0;
		if(isRemove)
		{
			this._pathtxt1.dispose();
			this._pathtxt1=null;
			this.removeChild(this._tuijianImg1);
			this._tuijianImg1=null;
		}
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}