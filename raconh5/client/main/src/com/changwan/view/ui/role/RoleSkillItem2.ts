class RoleSkillItem2 extends RenderSprite
{ 
    private _back:BitmapRes;
    private _btnImg:BitmapRes
	private _redIcon:BitmapRes;
	private _lockImg:BitmapRes;
    private _redFlag:boolean;
    private _lockFlag:boolean;
    private _btnName:string;

    public constructor()
    {
        super();
        this.start();
        this.addEvent();
    }

    protected start():void
    {
        super.start();
        this._redFlag = false;
        this._lockFlag = false;
        this._back = Manager.pool.create(BitmapRes,"role_skillBg_png");
        this.addChild(this._back);
        this.touchEnabled = true;
    }

    public set btnName(value:string)
    {
        if(this._btnName == value)return;
        this._btnName = value;
        this.invalidate(InvalidationType.DATA);
    }

	public get btnImg():BitmapRes
	{
		return this._btnImg;
	}
	public set showIcon(value:boolean)
	{
        if(this._redFlag == value)return;
        this._redFlag = value;
        this.invalidate("drawRed");
	}
	public set showLock(value:boolean)
	{
        if(this._lockFlag == value)return;
        this._lockFlag = value;
        this.invalidate("drawLock");
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawData();
        this.drawRed();
        this.drawLock();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid(InvalidationType.DATA))this.drawData();
        if(this.isInvalid("drawRed"))this.drawRed();
        if(this.isInvalid("drawLock"))this.drawLock();
    }

    private drawData():void
    {
        if(this._btnName != null && this._btnName != "")
        {
            if(this._btnImg == null)
            {
                this._btnImg = Manager.pool.create(BitmapRes, this._btnName);
                this._btnImg.x = 7;
                this.addChild(this._btnImg);
            }
        }
        else
        {
            if(this._btnImg != null)this.removeChild(this._btnImg);
        }
    }

    private drawRed():void
    {
        if(this._redFlag)
        {
            if(this._redIcon == null)
            {
                this._redIcon = Manager.pool.create(BitmapRes,"common_red_icon_png");
                this._redIcon.y = 7;
                this._redIcon.x = 85;
            }
            this.addChild(this._redIcon);
        }
        else
        {
            if(this._redIcon != null)this.removeChild(this._redIcon);
        }
    }

    private drawLock():void
    {

        if(this._lockFlag)
        {
            if(this._lockImg == null)
            {
                this._lockImg = Manager.pool.create(BitmapRes,"main_suo_png");
                this._lockImg.y = 19;
                this._lockImg.x = 16;
            }
            this.addChild(this._lockImg);
        }
        else
        {
            if(this._lockImg != null)this.removeChild(this._lockImg);
        }
    }

    public unuse():void
    {
        super.unuse();
        if(this._back != null)
        {
            Manager.pool.push(this._back);
            this._back = null;
        }
        if(this._btnImg != null)
        {
            Manager.pool.push(this._btnImg);
            this._btnImg = null;
        }
        if(this._redIcon != null)
        {
            Manager.pool.push(this._redIcon);
            this._redIcon = null;
        }
        if(this._lockImg != null)
        {
            Manager.pool.push(this._lockImg);
            this._lockImg = null;
        }
    }

    protected disposeSelf():void
    {
        super.disposeSelf();
        if(this._back != null)
        {
            Manager.pool.push(this._back);
            this._back = null;
        }
        if(this._btnImg != null)
        {
            Manager.pool.push(this._btnImg);
            this._btnImg = null;
        }
        if(this._redIcon != null)
        {
            Manager.pool.push(this._redIcon);
            this._redIcon = null;
        }
        if(this._lockImg != null)
        {
            Manager.pool.push(this._lockImg);
            this._lockImg = null;
        }
    }
}