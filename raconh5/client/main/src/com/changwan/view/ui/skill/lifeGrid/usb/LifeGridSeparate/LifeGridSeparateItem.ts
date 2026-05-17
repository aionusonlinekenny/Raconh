class LifeGridSeparateItem extends UIComponent{
	private _effImg:eui.Image;
	private _goods:BaseGoods;
	private _nameTxt:Label;
	private _attrTxt1:Label;
	private _attrTxt2:Label;
	private _data:ItemsModelInfo;
	private _checkBoo:boolean;
	/** 是否为命格晶石 */
	private _type:number;

	private _cvo:LifeGridCVO;
	private _statu:boolean; 
	private _itemcvo:ItemsCVO;

	private _levAni:Animation;

	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridSeparate", "LifeGridSeparateItemSkin");
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
    }

    protected removeEvent():void
    {
		if(this._levAni) this._levAni.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
        super.removeEvent();
    }

    protected initData():void
    {
        super.initData();
    }

    protected drawAll():void
	{
		super.drawAll();
		this.darwData();
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.darwData();
	}

    public setData(data:ItemsModelInfo):void
    {
		this._data = data
		this._cvo = LifeGridCVO.getDataInfo(this._data);
		this._itemcvo = data.cvo;
		this._type = this._itemcvo.type;
		if(this._type==ItemsType.TYPE_LIFEGRID_SPAR)
		{
			//命格晶石每次必定分解
			this._statu  = true;
		}
        this.invalidate(InvalidationType.DATA);
    }

    private darwData():void{
		this._goods.setCvo(this._itemcvo);
		let name:string = this._itemcvo.name+"Lv." + this._cvo.lev;
		name = HtmlUtil.addColorTag(name,this._itemcvo.colorStr);
		HtmlUtil.setTextFlow(this._nameTxt,name);

		let attvos:AttrVoInfo[] = this._cvo.attrVos();
		let str:string;
		if(attvos[0])
		{
			str = attvos[0].desc(false, Color.GREEN_STR);
			HtmlUtil.setTextFlow(this._attrTxt1,str)
		}
		else
		this._attrTxt1.text="";
		if(attvos[1])
		{
			str = attvos[1].desc(false, Color.GREEN_STR);
			HtmlUtil.setTextFlow(this._attrTxt2,str)
		}
		else
		{
			this._attrTxt2.text="";
		}
		if(this._type==ItemsType.TYPE_LIFEGRID_SPAR)
		{
			//命格晶石每次必定分解
			this._effImg.visible = true;
		}
		
    }
	public get itemId():number
	{
		return this._data.id;
	}
	public get cvo():LifeGridCVO
	{
		return this._cvo;
	}
	public setEffectImg():void
	{
		if(this._type==ItemsType.TYPE_LIFEGRID_SPAR)
		{
			return;
		}
		if(this._checkBoo) return;
		this._statu =this._effImg.visible = !this._effImg.visible;
	}
	public setCheck(value:boolean):void
	{
		if(this._type==ItemsType.TYPE_LIFEGRID_SPAR)
		{
			return;
		}
		this._checkBoo = value;
		this._statu =this._effImg.visible = value;
	}
	/**
	 * 选中状态
	 */
	public get statu():boolean
	{
		return this._statu;
	}
	public get data():ItemsModelInfo
	{
		return this._data
	}
	public clear():void
	{
		this._goods.clear();
		this._checkBoo = false;
		this._nameTxt.text = "";
		this._data = null;
		this._effImg.visible = false;
	}

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
       
    }
    /** 翻放特效 */
	public playAniEff():void
	{
		if(this._levAni== null)
		{
			this._levAni = Manager.animation.createPanelLifeGridAnimation("lifeGridmgfj","lifeGridPanel");
			this.addChild(this._levAni);
			this._levAni.x = this._goods.x-79;
			this._levAni.y = this._goods.y-77;
			this._levAni.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
		}
		else
		{
			this._levAni.visible = true;
			this._levAni.play();
		}
	}
	private onShowBlastCompleteHandler():void
	{
		this._levAni.visible = false;
		this.dispatchEvent(new GlobalEvent(GlobalEvent.ANIMATION_PLAY_COMPLETE));
	}

    public dispose():void
    {
        super.dispose();
        ObjectUtil.removes(this._effImg,this._goods);
		ObjectUtil.disposes(this._nameTxt,this._attrTxt1,this._attrTxt2);
        this._effImg=null;
		Manager.pool.push(this._goods);
		this._goods=null;
		this._nameTxt=null;
		this._attrTxt1=null;
		this._attrTxt2=null;
		this._data=null;
		this._cvo=null;
		this._itemcvo = null;
		if(this._levAni)
		{
			Manager.pool.push(this._levAni);
			this._levAni = null;
		}
    }
}