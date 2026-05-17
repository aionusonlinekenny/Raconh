class LifeGridHunResultItem extends UIComponent{
	private _goods:Goods;
	private _nameTxt:Label;
	//private _attrTxt:Label;
	private _data:ItemsModelInfo;
	private _levAni:Animation;
	public constructor()
    {
        super();
		this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridHunt", "LifeGridHunResultItemSkin");
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

    public setData(data:ItemsModelInfo):void
    {
		this._data = data;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
		if(this._data==null) return;
		this._goods.count = this._data.quantity;
		let cvo:ItemsCVO = this._data.cvo;
		this._goods.data = this._data;
		let str:string = HtmlUtil.addColorTag(cvo.name,cvo.colorStr);
		HtmlUtil.setTextFlow(this._nameTxt,str);
		//let lifeCvo:LifeGridCVO = LifeGridCVO.getInfo(this._data.base_id,1);
		//let attrVOs:AttrVoInfo[];
		// if(lifeCvo) 
		// {
		// 	attrVOs = lifeCvo.attrVos();
		// 	if(attrVOs[0])
		// 	{
		// 		this._attrTxt.text = attrVOs[0].name;
		// 	}
		// 	else
		// 	{
		// 		this._attrTxt.text ="";
		// 	}
		// }
		// else
		// {
		// 	this._attrTxt.text ="";
		// }
    }

    public reuse():void
    {
        super.reuse();
       
    }

    public unuse():void
    {
        super.unuse();
       
    }

	protected removeEvent():void
    {
		if(this._levAni) this._levAni.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
        super.removeEvent();
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
	}

    public dispose():void
    {
        super.dispose();
		this.removeChild(this._goods);
		Manager.pool.push(this._goods);
        this._goods=null;
		this._nameTxt.dispose();
		this._nameTxt=null;
		// this._attrTxt.dispose();
		// this._attrTxt=null;
		this._data=null;
		if(this._levAni)
		{
			Manager.pool.push(this._levAni);
			this._levAni = null;
		}
    }

}