/**
 * 江湖风云地区Item
 * luzh
 * 2018-4.20
 */
class StormFieldItem extends RenderSprite
{
    private _fieldID:number;
    private _img:BitmapRemote;
    private _back0:BitmapRes;
    private _back1:BitmapRes;
    private _clubName:BitmapRes;
    private _fieldName:BitmapRes;

	public constructor()
    {
        super();
    }

	protected start():void
	{
		super.start();

        this._img = Manager.pool.create(BitmapRemote, Manager.path.getStormPath("field"+this._fieldID+".png"));
        this.addChild(this._img);

        this._back0 = BitmapRes.create("common_name_back_png", 39, -24, 63, 305);
        this.addChild(this._back0);
        
        this._back1 = BitmapRes.create("storm_di2_png", 316, 45);
        this.addChild(this._back1);

        this._clubName = BitmapRes.create("", 50, 23);
        this.addChild(this._clubName);

        this._fieldName = BitmapRes.create("storm_field_name_"+this._fieldID+"_png", 332, 74);
        this.addChild(this._fieldName);
	}

    protected addEvent():void
    {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    protected removeEvent():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    }

    private onClickHandler(e:egret.TouchEvent):void
    {
        Manager.view.show(ViewID.StrongHoldPanel);
    }

    public reuse(fieldID:number, pos:egret.Point):void
    {
        this._fieldID = fieldID;
        super.reuse();

        this.x = pos.x;
        this.y = pos.y;
		this.touchEnabled = true;
		this.touchChildren = false;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.pushes(this._img, this._back0, this._back1, this._clubName, this._fieldName);
        this._img = null;
        this._back0 = null;
        this._back1 = null;
        this._clubName = null;
        this._fieldName = null;
    }
}