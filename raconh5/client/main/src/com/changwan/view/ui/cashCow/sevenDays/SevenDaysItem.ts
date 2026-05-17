/**
 * pzx 
 *  七天登陆item
 * create 2018.1.30
 */
class SevenDaysItem extends UIComponent{
    private _ilingquImg:eui.Image;
    private _bgImg:eui.Image;
    private _dayImg:eui.Image;
    private _cvo:SevenDaysCVO;
    private _redIcon:eui.Image;
    private _itemAni:Animation;

    private _bitimg:BitmapRemote;
   
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("cashCow\sevenDays", "SevenDaysItemSkin");
        this.touchEnabled= true;
        this.touchChildren = false;
    }
    protected configUI():void
    {
        super.configUI();
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

    public setData(value:SevenDaysCVO):void
    {
        this._cvo = value;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
       if(this._cvo)
       {
           this._dayImg.source = "cashCow_sevendDay_"+this._cvo.login_day_id+"_png";
           this.drawState();
       }
    }
    private drawState():void
    {
        if(this._cvo.state == 1)
        {
            FilterUtil.setGrayFilter(this._bgImg);
            FilterUtil.setGrayFilter(this._dayImg);
            this._ilingquImg.visible = true;
            this._redIcon.visible = false;
            return;
        }
        else
        {
            this._bgImg.filters = null;
            this._dayImg.filters = null;
            this._ilingquImg.visible = false;
        }
        this._redIcon.visible = this._cvo.isReward()

        this._bitimg.load(Manager.path.getPanelCashCowPath("mini/mini_sevenDay_item_"+this._cvo.login_day_id,".png"));

    }
    public get cvo():SevenDaysCVO
    {
        return this._cvo;
    }

    public showEffect(boo:boolean):void
    {
        if(boo)
        {
            if(this._itemAni== null)
            {
                this._itemAni = Manager.animation.createEffectAnimation("Qiri");
                this.addChild(this._itemAni);
                this._itemAni.x = -60;
                this._itemAni.y =-74;
                return;
            }	
            this._itemAni.visible = true;
            this._itemAni.play();
        }
        else
        {
            this._itemAni.stop();
            this._itemAni.visible = false;
        }
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
		if(isRemove)
		{
			ObjectUtil.removes(this._ilingquImg,this._bgImg,this._dayImg,this._redIcon, this._itemAni);
		}
        this._bgImg.filters = null;
        this._dayImg.filters = null;
        this._ilingquImg=null;
        this._bgImg=null;
        this._dayImg=null;
        this._cvo=null;
        this._redIcon=null;
        if(this._itemAni)
            Manager.pool.push(this._itemAni);
        this._itemAni = null;
        Manager.pool.push(this._bitimg);
        this._bitimg = null;
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}