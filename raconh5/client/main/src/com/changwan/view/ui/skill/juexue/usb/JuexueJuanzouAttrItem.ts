class JuexueJuanzouAttrItem extends UIComponent{
	private _group:eui.Group;
	private _lossTxt:Label;
	private _attr0:Label;
	private _attr1:Label;
	private _attr2:Label;
	private _attr3:Label;
	private _attr5:Label;
	private _attr6:Label;
	private _attr7:Label;
	private _attr4:Label;
	public close:eui.Image
	private _item:JuexueJuanzouChileItem;

    private readonly _itemEndPox:number = -3;
    private readonly _groupPox:number = 92;
    private _mask:egret.Shape;

    private _cvo:JueXueCVO;
    private _fighting:NumImgView2;
    public isPlay:boolean;
    private _mainjiImg:eui.Image;

    private _actGroup:eui.Group;
    /** 固定宽 */
    public static WIDTH:number = 640;
	
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("juexue", "JuexueJuanzouAttrItemSkin");
        this.visible = false;
    }
    protected configUI():void
    {
        super.configUI();
        this.touchChildren = true;
        this._mask = Manager.pool.create(egret.Shape);
        this._mask.graphics.beginFill(1,1);
        this._mask.graphics.drawRect(0,0,542,454)
        this._mask.graphics.endFill();
        this.addChild(this._mask);
        this._mask.y = 53;
        this._group.mask = this._mask;

        this._item = Manager.pool.create(JuexueJuanzouChileItem);
        this._item.isScaleBoo = false;
        this._item.x = 5;
        this._item.y = 5;
        this.addChild(this._item);

        if(!this._fighting)
		{
			this._fighting = Manager.pool.create(NumImgView2);
            this._fighting.y = 400;
            this._fighting.x = 160;
			this._group.addChild(this._fighting);
		}
        this.close.touchEnabled = true;
    }

    private play():void
    {
        this.initPoint();
        egret.Tween.get(this._item,{loop:false}).to({x:this._itemEndPox},500);
        egret.Tween.get(this._group,{loop:false}).to({x:this._groupPox},500);
        egret.Tween.get(this._mask,{loop:false}).to({x:this._groupPox},500);
        this.visible = true;
        this.isPlay = false;
    }

    public initPoint():void
    {
        this._item.x = 260;
        this._group.x = -168;
        this._mask.x = 332;
    }

    protected addEvent():void
    {
        super.addEvent();
        Manager.model.getjuexue().addEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT,this.onUpgradeLvHandler,this);
        this._lossTxt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openItemTips,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        Manager.model.getjuexue().removeEventListener(JuexueEvent.JUEXUE_UPGRADE_EVENT,this.onUpgradeLvHandler,this);
        this._lossTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.openItemTips,this);
    }
    private onUpgradeLvHandler(e:BaseEvent):void
    {
        this._cvo = e.params;
        this.isPlay = false;
        this.drawData();
    }
    private openItemTips():void
    {
        let loss:GainLossVO;
        if(this._cvo.lev>0)
        {
            let levCvo:JueXueLeveCVO = this._cvo.levCvo;
            if(levCvo.loss.length>0)
            {
                loss = new GainLossVO(levCvo.loss);
            }
        }
        else
        {
            loss = new GainLossVO(this._cvo.active_loss);
        }

        if(loss)
        {
            //激活升级消耗
            let itemInfo:ItemsCVO = ItemsCVO.getCvo(loss.baseId);
            Manager.view.show(ViewID.ItemsTips,itemInfo);
        }
    }

    protected initData():void
    {
        super.initData();
    }

    protected drawAll():void
	{
		super.drawAll();
        if(this._cvo) this.drawData();
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
        let attr:AttrVO;
        this._item.setData(this._cvo);
        let loss:GainLossVO;
        let str:string;
        let itemInfo:ItemsCVO;
        if(this._cvo.lev>0)
        {
            let levCvo:JueXueLeveCVO = this._cvo.levCvo;
            attr = Manager.pool.create(AttrVO,levCvo.attr);
            if(levCvo.loss.length>0)
            {
                loss = new GainLossVO(levCvo.loss);
            }

        }
        else
        {
            attr = Manager.pool.create(AttrVO,this._cvo.attr);
            loss = new GainLossVO(this._cvo.active_loss);
        }

        if(loss)
        {
            //激活升级消耗
            itemInfo = ItemsCVO.getCvo(loss.baseId);
            let color:string = "" + loss.selfCount;
            if(!loss.isEnough())
            {
                color = HtmlUtil.addColorTag(color,Color.RED_STR);
            }
            str = HtmlUtil.addColorTag(itemInfo.name,itemInfo.colorStr)+"："+color+"/"+loss.num;
            HtmlUtil.setTextFlow(this._lossTxt,str);
            this._mainjiImg.visible = false;
            this._actGroup.visible = true;
        }
        else
        {
            //已满级
            this._lossTxt.text = "";
            this._mainjiImg.visible = true;
            this._actGroup.visible = false;
        }

        let attrList:AttrVoInfo[] = attr.attrInfos;
        this._attr5.text = attrList[0].desc();
        this._attr6.text = attrList[1].desc();
        this._attr7.text = LangCVO.getContent("juexue1")+" +" + this._cvo.getJingjie();
        Manager.pool.push(attr);

        let exlist:JueXueExtraAttrCVO[] = JueXueExtraAttrCVO.getCvos(this._cvo.id);
        for(let i:number = exlist.length-1;i>-1;i--)
        {
            let exCvo:JueXueExtraAttrCVO = exlist[i];
            let txt:Label = this["_attr"+i];
            let sce:string="";
            if(exCvo.leve<10)
            {
                sce = "0";
            }
            let des:string =sce+exCvo.leve + LangCVO.getContent("common15") +"："+ exCvo.getAttrVOinfo().desc();
            if(exCvo.leve>this._cvo.lev)
            {
                des = HtmlUtil.addColorTag(des,Color.DEF_STR);
            }
            else
            {
                des = HtmlUtil.addColorTag(des,Color.GREEN_STR);
            }
            HtmlUtil.setTextFlow(txt,des);
        }


        this._fighting.setValue(this._cvo.getFight(), "nums_fighting_", 25);
        if(this.isPlay)
        {
            this.play();
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
        this._group.mask = null;
        egret.Tween.removeTweens(this._item);
        egret.Tween.removeTweens(this._group);
        egret.Tween.removeTweens(this._mask);
		if(isRemove)
		{
			ObjectUtil.removes(this._group,this.close,this._mainjiImg,this._actGroup);
            ObjectUtil.disposes(this._lossTxt,this._attr0,this._attr1,this._attr2,this._attr3,this._attr4,this._attr5
            ,this._attr6,this._attr7,this._item)
		}
        this._group=null;
        this._lossTxt=null;
        this._attr0=null;
        this._attr1=null;
        this._attr2=null;
        this._attr3=null;
        this._attr5=null;
        this._attr6=null;
        this._attr7=null;
        this._attr4=null;
        this.close=null;
        this._item=null;
        Manager.pool.push(this._mask);
        this._mask=null;
        this._cvo=null;
        Manager.pool.push(this._fighting);
        this._fighting=null;
        this._mainjiImg=null;
        this._actGroup=null;
		
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }

/**
 * dic 方向*陪数
 */
    public onTouchMove(dic:number):void
    {
        this._item.x = this._itemEndPox;
        this._group.x = this._groupPox;
        this._mask.x = this._groupPox;
        let s:number = dic * JuexueJuanzouAttrItem.WIDTH + this.x;
        egret.Tween.get(this, {loop: false}).to({x:s, alpha:1}, 500).call(this.tweenCallBack,this);
    }

    private tweenCallBack():void
    {
        this.dispatchEvent(new egret.Event(JuexueJuanzouChileItem.JuanzouTweenComtleteEvent));
        if(this.x == 0)
        {
            JuexueView.instance.updateopenCvo(this._cvo);
        }
        if(this.x == -1280)
        {
            this.x = JuexueJuanzouAttrItem.WIDTH;
        }
        if(this.x == 1280)
        {
            this.x = -JuexueJuanzouAttrItem.WIDTH;
        }
    }
}