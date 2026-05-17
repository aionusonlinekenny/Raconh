/**
 * 绝学圈轴item
 * pzx 
 * create 18.3.1
 */
class JuexueJuanzouChileItem extends UIComponent{
	private _bgImg:eui.Image;
	private _nameImg:eui.Image;
	private _levTxt:Label;
    private _redIcon:eui.Image;

    /** 最左边 */
    public static maxLife:number = 7;
    /** 最右边 */
    public static maxRight:number = 515;
    public static list:number[] = [70,197,324,451,578];
    public static apg:number = 127;
    public static JuanzouTweenComtleteEvent:string = "JuanzouTweenComtleteEvent";

    private _starX:number;
    private _scele:number=0.7;

    private _cvo:JueXueCVO;

    public isScaleBoo:boolean= true;
    private _model:JuexueModel;
    private _lvGroup:eui.Group;
    private _jeTxt:Label;
    private _actImg:eui.Image;

	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("juexue", "JuexueJuanzouChileItemSkin");
        this.touchEnabled = true;
        this.touchChildren = false;
    }
    protected configUI():void
    {
        super.configUI();
        if(this.isScaleBoo)
        {
            this.setScale(this.x);
            this.scaleX = this.scaleY = this._scele;
            this.y = 5 + 260 * (1-this._scele);
        }
        this._model = Manager.model.getjuexue();
        this._starX = this.x;
    }

    protected initData():void
    {
        super.initData();
    }
    protected addEvent():void
    {
        super.addEvent();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openAttrItem,this);
        this._model.addEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT,this.onUpgradeLvHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.openAttrItem,this);
        this._model.removeEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT,this.onUpgradeLvHandler,this);
    }

    private onUpgradeLvHandler(e:BaseEvent):void
    {
        let cvo:JueXueCVO = e.params;
        if(cvo.id == this._cvo.id)
        {
            this._cvo = cvo;
            this._levTxt.text = "" + this._cvo.lev;
        }
        this.showRedIcon();
    }
    private openAttrItem(e:egret.TouchEvent):void
    {
        if(this.x == JuexueJuanzouChileItem.list[2])
        {
            JuexueView.instance.playAttrItem(this._cvo);
        }
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
        this._nameImg.source = "juexue_name_"+this._cvo.id+"_png";
        let loss:GainLossVO = new GainLossVO(this._cvo.active_loss);
        let itemCvo:ItemsCVO = ItemsCVO.getCvo(loss.baseId);
        this._bgImg.source = "juexue_juanzou"+itemCvo.quality+"_png";

        this.showRedIcon();

        if(this._cvo.lev==0)
        {
            this._levTxt.visible = false;
            this._jeTxt.visible = false;
            this._actImg.visible = true;
            FilterUtil.setGrayFilter(this._lvGroup);
        }
        else
        {
            this._levTxt.text = "" + this._cvo.lev;
            this._levTxt.visible = true;
            this._jeTxt.visible = true;
            this._actImg.visible = false;
            this._lvGroup.filters = null;
        }
    }
    
    private showRedIcon():void
	{
		this._redIcon.visible = this._cvo.checkUpgrade();
	}
    //=================================================================
   
/**
 * dic 方向*陪数
 * autoPlay 是否自动打开卷轴
 */
    public onTouchMove(dic:number,autoPlay:boolean=false):void
    {
        let s:number = dic * JuexueJuanzouChileItem.apg + this.x;
        this.setScale(s);
        egret.Tween.get(this, {loop: false}).to({x:s,y:5 + 260 * (1-this._scele),scaleX:this._scele,scaleY:this._scele, alpha:1}, 500).call(this.touchCallback, this, [autoPlay]);
    }
    private touchCallback(autoPlay:boolean):void
    {
        this.dispatchEvent(new egret.Event(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent));
        if(autoPlay && this.x == JuexueJuanzouChileItem.list[2])
        {
            JuexueView.instance.playAttrItem(this._cvo);
        }
    }
    //还原初始位置
    public initPointX():void
    {
        if(this._starX == this.x)
        {
            return;
        }
        this.x = this._starX;
        this.setScale(this._starX);
        this.scaleX = this.scaleY = this._scele;
        this.y = 5 + 260 * (1-this._scele);
    }

    private setScale(value:number)
    {
        switch(value)
        {
            case JuexueJuanzouChileItem.list[2]:
            this._scele = 1;
            break;
            case JuexueJuanzouChileItem.list[1]:
            case JuexueJuanzouChileItem.list[3]:
            this._scele = 0.84;
            break;
            case JuexueJuanzouChileItem.list[0]:
            case JuexueJuanzouChileItem.list[4]:
            this._scele = 0.7;
            break;
        }
    }
   

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
    }
	

    public dispose():void
    {
        super.dispose();
        egret.Tween.removeTweens(this);
        ObjectUtil.removes(this._bgImg,this._nameImg,this._redIcon,this._lvGroup,this._actImg);
        this._bgImg=null;
        this._nameImg=null;
        this._levTxt.dispose();
        this._levTxt=null;
        this._redIcon=null;
        this._cvo=null;
        this._model=null;
        this._lvGroup=null;
        this._jeTxt.dispose();
        this._jeTxt=null;
        this._actImg=null;
    }
}