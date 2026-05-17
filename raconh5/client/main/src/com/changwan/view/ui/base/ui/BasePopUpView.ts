/**
 * 弹窗通用面板
 * liangyan
 * create 2017-11-02
*/
class BasePopUpView extends UIComponent
{
    public closeBtn:Button;
    private _bgImg:eui.Image;
    public titleBg:eui.Image;
    public titleImg:eui.Image;
    // public diImg:eui.Image;
    private diImg:BitmapRemote;
    private _bommImg:eui.Image;
    private _group:eui.Group;
    private _kuangImg:eui.Image;

    private _inited:boolean = false;
    private _diImgY:number = -1;
    private _isShowDiImg:boolean = true;
    
    public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("common", "BasePopUpSkin");
        this.touchChildren = true;
    }

    protected configUI():void
    {
        super.configUI();

        if(!this.diImg)
		{
			this.diImg = Manager.pool.create(BitmapRemote);
			this.diImg.x = 0;
			this.diImg.y = 670;
			this.diImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 720, 130);
			this.addChildAt(this.diImg, 1);
		}
        this._inited = true;

        if(this._diImgY != -1) this.diImg.y = this._diImgY;
        this.diImg.visible = this._isShowDiImg;
    }
   
    public set bgHeight(h:number)
    {
        this._bgImg.height = h;
        // this.diImg.y = this._bgImg.y + this._bgImg.height - 110;
        this._bommImg.y = this._bgImg.y + this._bgImg.height - 8;
        this._kuangImg.height = h;

        this._diImgY = this._bgImg.y + this._bgImg.height - 110;
        if(this._inited)
            this.diImg.y = this._diImgY;
    }

    public set viewY(value:number)
    {
        this._bgImg.y = value;
        this._bommImg.y = this._bgImg.y + this._bgImg.height - 8;
        this._group.y = this._bgImg.y - 40;
        this._kuangImg.y = this._bgImg.y;

        this._diImgY = this._bgImg.y + this._bgImg.height - 110;
        if(this._inited)
            this.diImg.y = this._diImgY;
    }

    public set diImgVisible(value:boolean)
    {
        this._isShowDiImg = value;
        if(this._inited)
            this.diImg.visible = value;
    }
    
    public dispose():void
    {
        if(this.closeBtn)
        {
            this.closeBtn.dispose();
            this.closeBtn = null;
        }
         if(this._bgImg)
        {
            this.removeChild(this._bgImg);
            this._bgImg = null;
        }
         if(this.diImg)
        {
            Manager.pool.push(this.diImg);
            this.diImg = null;
        }
         if(this._bommImg)
        {
            this.removeChild(this._bommImg);
            this._bommImg = null;
        }
        if(this.titleBg)
        {
            this.titleBg.parent.removeChild(this.titleBg);
            this.titleBg= null;
        }
        if(this.titleImg)
        {
            this.titleImg.parent.removeChild(this.titleImg);
            this.titleImg= null;
        }
        this.removeChild(this._kuangImg);
        this._kuangImg = null;
        
        super.dispose();
    }
}