/**
 * pzx 
 * 特权view
 * 2018.1.11
 */
class SysPrivilegeView extends UIComponent{
	private _kaImg:eui.Image;
	private _rewardBtn:Button;
    /** 激活 */
	private _activeImg:eui.Image;
    private _data:SysPrivilegeInfo;
    /** 1为黄金，2钻石 */
    private _type:number;

    private _item1:SysPrivilegeItem;
    private _item2:SysPrivilegeItem;
    private _item3:SysPrivilegeItem;
    private _item4:SysPrivilegeItem;
    private _list:SysPrivilegeItem[];
    /** 立即领取图片 */
    private _liquPath:string = "common_label_fetch_png"
    //已领取
    private _ilingquImg:eui.Image;
    private _redIcon:eui.Image;

    private _petAni:Animation;

    private _fightBit:BitmapRemote;

    private _model:SysPrivilegeModel;

    private _timeTxt:Label;
    private _timeDescTxt:Label;


	public constructor()
    {
        super();
        this.touchChildren = true;
		this.skinName = Manager.path.getSkinName("sysprivilege", "SysPrivilegeViewSkin");
    }
    protected configUI():void
    {
        super.configUI();
        this._list = [];
        for(let i:number = 1;i<5;i++)
        {
            this["_item"+i].setId(i);
            this._list.push(this["_item"+i]);
        }
        this._activeImg.touchEnabled = false;

        if(!this._fightBit)
        {
            this._fightBit = Manager.pool.create(BitmapRemote);
            this._fightBit.x = 236;
            this._fightBit.y = 381;
            this.addChild(this._fightBit);
        }
        this._model = Manager.model.getSysPrivilege();
        this.playTime();
    }

    private playTime():void
    {
        if(this._model.getExpTime()>0)
        {
            if(!this._model.hasEventListener(SysPrivilegeEvent.SYSPRIVILEGE_EXP_TIME_EVENT))
            {
                this._model.addEventListener(SysPrivilegeEvent.SYSPRIVILEGE_EXP_TIME_EVENT,this.playTime,this);
            }
            this._timeTxt.text = cw.DateUtil.formatStr(this._model.getExpTime(), cw.DateUtil.LEFT_MM_SS);
            this._timeDescTxt.visible = true;
        }
        else
        {
            this._timeDescTxt.visible = false;
            this._timeTxt.text="";
        }
    }

    protected addEvent():void
    {
        super.addEvent();
        this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRewardHandler,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRewardHandler,this);
        if(this._model.hasEventListener(SysPrivilegeEvent.SYSPRIVILEGE_EXP_TIME_EVENT))
        {
            this._model.removeEventListener(SysPrivilegeEvent.SYSPRIVILEGE_EXP_TIME_EVENT,this.playTime,this);
        }
    }
    private onRewardHandler(e:egret.TouchEvent):void
    {
        if(this._data.isActive)
        {
            if(this._data.isreward)
            {
                //已领取
                FloatTips.addTips(LangCVO.getContent("common39"),Color.RED);
            }
            else
            {
                Manager.control.getSysPrivilege().reward(this._data.id);
            }
        }
        else
        {
            let str:string = LangCVO.getContent("SysPrivilege1");
            let cvo:SysPrivilegeCVO = SysPrivilegeCVO.getCvo(this._data.id);
            str = StringUtils.setParam(str,cvo.price,cvo.name);
            let ok:CallBackInfo = Manager.pool.create(CallBackInfo,this.activeCallBack,this);
            Manager.tips.showTips(str,ok,true);
        }
    }
    //平台接口调用
    private activeCallBack():void
    {
        Manager.platform.pay(this._data.rmb,2);
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

    public setData(data:SysPrivilegeInfo):void
    {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
        if(this._data == null) return;
        this._fightBit.load(Manager.path.getPanelSysPrivilegePath(this._data.fightImg,".png"));
        this._kaImg.source = this._data.kaImg;
       
        this._type = this._data.id;
        for(let i:number = 0;i<4;i++)
        {
            this._list[i].setData(this._data);
        }
        this._rewardBtn.visible = true;
        this._redIcon.visible = false;
        if(this._data.isActive)
        {
            this._ilingquImg.visible = this._data.isreward;
            if(this._data.isreward)
            {
                this._activeImg.source = "";
                this._rewardBtn.visible = false;
            }
            else
            {
                this._activeImg.source = this._liquPath;
                this._redIcon.visible = true;
            }
        }
        else
        {
             this._activeImg.source = this._data.activeImg;
             this._ilingquImg.visible = false;
        }
        this.showAni();
    }

     private showAni():void
	 {
         if(this._data.aniPath)
         {
            this.clearAni();
            if(this._type == SysprivilegeType.DIAMOND_CARD) 
            {
                this._petAni = Manager.animation.createPetAnimation(this._data.aniPath);
            }
            this.addChildAt(this._petAni, 0);
            if(this._data.id == SysprivilegeType.DIAMOND_CARD)
            {
                this._petAni.x = 20;
                this._petAni.y = -90;
                this._petAni.scaleX = this._petAni.scaleY = 0.6;
            }
         }
         else
         {
             this.clearAni();
         }
	 }

    private clearAni():void
    {
        if(this._petAni)
		{
			Manager.pool.push(this._petAni);
			this._petAni = null;
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
			ObjectUtil.removes(this._kaImg,this._activeImg,this._ilingquImg);
		}
        ObjectUtil.disposes(this._item1,this._item2,this._item3,this._item4,this._rewardBtn,this._timeDescTxt,this._timeTxt);
        Manager.pool.push(this._fightBit);
        this._fightBit = null;
        this._kaImg=null;
        this._rewardBtn=null;
        this._activeImg=null;
        this._data=null;
        this._item1=null;
        this._item2=null;
        this._item3=null;
        this._item4=null;
        this._list=null;
        this._ilingquImg=null;
        this.clearAni();
        this._timeTxt = null;
        this._timeDescTxt = null;
        this._model = null;
        if(Manager.render.contains(this.playTime,this))
        {
            Manager.render.remove(this.playTime,this);
        }
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }

}