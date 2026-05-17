/**
 * 神器item
 * pzx 
 * create 18.3.8
 */
class RelicStuffDebrisItem extends UIComponent{
	private _itemBit:BitmapRemote;
	private _nameTxt:Label;
	private _cvo:RelicStuffDebrisCVO;
	private _desId:number;
	private _redIcon:eui.Image;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("relicStuff", "RelicStuffDebrisItemSkin");
		this.touchChildren = false;
		this.touchEnabled = true;
    }
    protected configUI():void
    {
        super.configUI();
    }

    protected addEvent():void
    {
        super.addEvent();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
    }

	private touchHandler():void
	{
		Manager.view.show(ViewID.RelicStuffAttrView,this._cvo);
	}

    protected drawAll():void
	{
		super.drawAll();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.drawData();
	}

    public setData(data):void
    {
		this._cvo = data;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
		this._itemBit.load(Manager.path.getRelicStuffPath("fargment/fargment"+this._cvo.des_id),60,60);
		
		let name:string = this._cvo.name;
		if(this._cvo.isActivity())
		{
			name = HtmlUtil.addColorTag(name,"#00ff00");
		}
		else
		{
			name = HtmlUtil.addColorTag(name,Color.WHITE_STR);
		}
		name = HtmlUtil.addUTag(name);
		HtmlUtil.setTextFlow(this._nameTxt,name);
		this._desId = this._cvo.des_id;
		this._redIcon.visible = this._cvo.checkisActivity();
    }

	public get cvo():RelicStuffDebrisCVO
	{
		return this._cvo;
	}

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
		this.clear();
    }
	
	private clear(isRemove:boolean=false):void
	{
		
		this._itemBit.dispose();
		this._itemBit=null;
		this._nameTxt.dispose();
		this._nameTxt=null;
		this._cvo=null;
		this.removeChild(this._redIcon);
		this._redIcon=null;
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}