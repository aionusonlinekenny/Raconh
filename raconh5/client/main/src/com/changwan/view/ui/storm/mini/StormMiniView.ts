/**
 * 江湖风云信息小界面信息
 * luzh
 * 2018-4.20
 */
class StormMiniView extends RenderSprite
{
    private _back0:BitmapRes;
    private _back1:BitmapRes;
    private _box:BitmapRes;
    private _txtCount:TextField;
    private _txtOwner:TextField;
    private _txtCD:TextField;
    private _txtGoto:TextField;
    private _txtSW:TextField;
    private _txtStage:TextField;

	public constructor()
    {
        super();
        this.x = 27;
        this.y = 1028
    }

	protected start():void
	{
		super.start();

        this._back0 = BitmapRes.create("copy_exp_back_1_png", 0, 0);
        this.addChild(this._back0);
        
        this._back1 = BitmapRes.create("copy_exp_back_0_png", 441, 3);
        this.addChild(this._back1);
        
        this._box = BitmapRes.create("storm_baoxiang_png", 5, 5);
        this.addChild(this._box);
        
        this._txtCount = TextField.create(80, 30, Color.GREEN);
        this._txtCount.move(20, 50);
        this.addChild(this._txtCount);
        
        this._txtOwner = TextField.create(180, 30, Color.DEF2);
        this._txtOwner.move(117, 17);
        this.addChild(this._txtOwner);
        
        this._txtCD = TextField.create(180, 30, Color.GREEN);
        this._txtCD.move(117, 47);
        this.addChild(this._txtCD);
        
        this._txtGoto = TextField.create(60, 30, Color.GREEN);
        this._txtGoto.move(300, 47);
        this.addChild(this._txtGoto);
        
        this._txtSW = TextField.create(240, 30, Color.DEF2);
        this._txtSW.move(460, 17);
        this.addChild(this._txtSW);
        
        this._txtStage = TextField.create(240, 30, Color.DEF2);
        this._txtStage.move(460, 47);
        this.addChild(this._txtStage);
	}

    public reuse():void
    {
        super.reuse();
		this.touchChildren = true;
    }

    public dispose():void
    {
        super.dispose();
        ObjectUtil.pushes(this._back0, this._back1, this._box, this._txtCount, this._txtOwner, this._txtCD, this._txtGoto, this._txtSW, this._txtStage)
        this._back0 = null;
        this._back1 = null;
        this._box = null;
        this._txtCount = null;
        this._txtOwner = null;
        this._txtCD = null;
        this._txtGoto = null;
        this._txtSW = null;
        this._txtStage = null;
    }
}