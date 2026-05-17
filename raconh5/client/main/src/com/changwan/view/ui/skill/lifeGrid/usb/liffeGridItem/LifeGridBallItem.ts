/**
 * 命格球
 * pzx
 * create 17.12.25
 */
class LifeGridBallItem extends UIComponent{
    private _lockImg:eui.Image;
    private _addImg:eui.Image;
    private _ballImg:BitmapRemote;
    private _data:ItemsModelInfo;
    /**是否解锁 */
    private _isclock:boolean;
    private _mask:egret.Shape;
    public id:number;
    /** 光效 */
    private _guangImg:eui.Image;
    /** 等级 */
    private _lvGroup:eui.Group;
    private _lvTxt:Label;
    private _redIcon:eui.Image;
    /** 可替换 */
    private _ketihuanImg:eui.Image;

    private _thEffectAni:Animation;
    /**初始化特效id */
    private _initEffId:number=-1;

	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridBallItemSkin");
        this.touchChildren = false;
        this.touchEnabled = true;
    }
    protected configUI():void
    {
        super.configUI();
        this._isclock = false;
        this._mask = Manager.pool.create(egret.Shape);
        this.addChild(this._mask);
        this._mask.graphics.beginFill(0,1);
        this._mask.graphics.drawCircle(0,0,42)
        this._mask.x = 57;
        this._mask.y = 56;
        this._ballImg.mask = this._mask;
    }

    protected addEvent():void
    {
        super.addEvent();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        Manager.model.getLifeGrid().addEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT,this.onReturnLvUpHandler,this);
    }

    protected removeEvent():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickHandler,this);
        Manager.model.getLifeGrid().removeEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT,this.onReturnLvUpHandler,this);
        if(this._thEffectAni) this._thEffectAni.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
        super.removeEvent();
    }
    private onClickHandler(e:egret.TouchEvent):void
    {
        if(this._data)
        {
            let view:LifeGridLeveUpView = Manager.view.show(ViewID.LifeGridLeveUpView);
            view.setData(this._data,this.id,this._ketihuanImg.visible);
            return
        }
        if(this._isclock)
        {
            let view:LifeGridBagView = Manager.view.show(ViewID.LifeGridBagView,this.id);
        }
        else
        {
             let cvo:LifeGridHoleCvoInfo = LifeGridCVO.getholeCvo(this.id);
             let conticion:ConditionVO = new ConditionVO(cvo.cond);
             let str:string =StringUtils.setParam(LangCVO.getContent("lifeGrid10"),conticion.value2);
             FloatTips.addTips(str,Color.RED);
        }
    }
    /** 升级返回 */
    private onReturnLvUpHandler(e:LifeGridEvent):void
    {
        if(this._data && e.params == this.id)
        {
            let cvo:LifeGridCVO = LifeGridCVO.getDataInfo(this._data);
            if(cvo.lev_loss!="")
            {
                let loss:GainLossVO = new GainLossVO(cvo.lev_loss);
                this._redIcon.visible = this._ketihuanImg.visible||loss.isEnough();
            }
        }
    }

    protected initData():void
    {
        super.initData();
    }

    protected drawAll():void
	{
		super.drawAll();
        
	}

	protected draw():void
	{
		super.draw();
        if(this.isInvalid(InvalidationType.DATA)) this.darwData();
	}

    public setData(data:ItemsModelInfo):void
    {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    }

    private darwData():void{
        this._redIcon.visible = false;
        if(this._data)
        {
            this._ballImg.visible = true;
            this._lockImg.visible = this._addImg.visible = false;
            this._ballImg.load(Manager.path.getIconPath(this._data.cvo.imgId));
            this._guangImg.visible = false;
            this._lvGroup.visible = true;
            let vl:number = this._data.infoList[0].value;
            this._lvTxt.text = "" + vl;
            let cvo:LifeGridCVO = LifeGridCVO.getDataInfo(this._data);
            this._ketihuanImg.visible = Manager.model.getLifeGrid().getIsSenior([this._data]);
            this._redIcon.visible = this._ketihuanImg.visible;
        }
        else
        {
            this._lvGroup.visible = false;
            let cvo:LifeGridHoleCvoInfo = LifeGridCVO.getholeCvo(this.id);
            let conticion:ConditionVO = new ConditionVO(cvo.cond);
            if(conticion.isSatisfy())
            {
                this._addImg.visible = true;
                this._lockImg.visible = false;
                this._ballImg.visible = false;
                this._isclock = true;
                this._guangImg.visible = true;
                if(Manager.model.getItems().lifeGridBagList.length>0)
                {
                    this._redIcon.visible = true;
                }
            }
            else
            {
                this._addImg.visible = false;
                this._lockImg.visible = true;
                this._ballImg.visible = false;
                this._isclock = false;
                this._guangImg.visible = false;
                
            }
        }
        this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LV_UPGRADE_EVENT,this.id));
    }

    public playEffect(data:ItemsModelInfo):void
    {
        this._data = data;
        if(this._thEffectAni==null)
        {
            this._thEffectAni = Manager.animation.createPanelLifeGridAnimation("lifeGridmgjm","lifeGridPanel");
            this._thEffectAni.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
            this.addChild(this._thEffectAni);
            this._thEffectAni.x = -93;
            this._thEffectAni.y = -89;
        }
        else
        {
            this._thEffectAni.visible = true;
            this._thEffectAni.play();
        }
    }
    private onShowBlastCompleteHandler():void
    {
        this._thEffectAni.visible = false;
        this.invalidate(InvalidationType.DATA);
    }
    /** 等级 若可以升级返回当前等级，不可升级，返回０ */
    public get losslv():number
    {
        if(!this._data) return 0;
        let cvo:LifeGridCVO = LifeGridCVO.getDataInfo(this._data);
        if(cvo.lev_loss!="")
        {
            let loss:GainLossVO = new GainLossVO(cvo.lev_loss);
            if(loss.isEnough())
            {
                return cvo.lev;
            }
        }
        return 0;
    }
    /** 显示升级消耗小红点 */
    public setLossRedIcon(value:boolean)
    {
        if(!this._data) return;
        this._redIcon.visible = this._ketihuanImg.visible||value;
    }
    public getItemCvo():ItemsCVO
    {
        if(this._data)
        {
             return this._data.cvo;
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
        ObjectUtil.removes(this._ketihuanImg,this._lockImg,this._addImg,this._mask,this._guangImg,this._lvGroup,this._redIcon);
        this._lvTxt.dispose();
        this._lvTxt = null;
        this._lvGroup = null;
        this._guangImg = null;
        Manager.pool.push(this._ballImg);
        this._ballImg=null;
        this._lockImg=null;
        this._addImg=null;
        this._data=null;
        Manager.pool.push(this._mask);
        this._mask=null;
        this.id=0;
        this._redIcon = null;
        this._ketihuanImg = null;
        if(this._thEffectAni)
        {
            this.removeChild(this._thEffectAni);
            Manager.pool.push(this._thEffectAni);
            this._thEffectAni = null;
        }
    }
}