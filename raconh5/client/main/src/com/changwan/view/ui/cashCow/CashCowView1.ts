/**
 * 金蟾聚宝
 * pzx
 * create 18.1.18
 */
class CashCowView1 extends Sprite{

    private _homeImageLayer:egret.DisplayObjectContainer;
    private _homeLayer:egret.DisplayObjectContainer;

	private _rewardBtn:Button;
	/** 金币显示 */
	private _conentTxt:Label;
	/** vip 次数 */
	private _vipNumTxt:Label;
	private _timeTxt:Label;
	/** 免费 */
	private _freeImg:eui.Image;

	private _resGroup:eui.Group;
	private _res:PlayerResItems2;
    private _vipTxt:Label;
    private _redIcon:eui.Image;
    private _model:CashCowModel;
    private _visible:boolean;


    private _bakc:BitmapRes;
    private _bakc1:BitmapRes;
    private _bakc2:BitmapRes;
    private _bakc3:BitmapRes;

	public constructor()
    {
        super();
        this._homeImageLayer = ObjectUtil.createConainer();
        this.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        this.addChild(this._homeLayer);
    }
    public switch(visible:boolean):void
    {
        if(this._visible == visible)return;
        this._visible = visible;
        if(this._visible)
        {
            this._bakc = BitmapRes.create("ashCow_zi_png",115,727,590,179);
            this._homeImageLayer.addChild(this._bakc);
            this._bakc1 = BitmapRes.create("common_back5_png",148,882,424,45);
            this._homeImageLayer.addChild(this._bakc1);
            this._rewardBtn = new Button;
            this._rewardBtn.skinName = "Button2SKin";
            this._rewardBtn.x = 241;
            this._rewardBtn.y = 1026;
            this._homeImageLayer.addChild(this._rewardBtn);

        }
        else
        {

        }
    }
    protected configUI():void
    {
        this._model = Manager.model.getcashCow();
        let loss:GainLossVO = new GainLossVO(this._model.cvo.gold_need);
        this._res.setData(loss);
        this._freeImg.touchEnabled = false;
        this._resGroup.touchEnabled = false;
        this._resGroup.touchChildren = false;
        Manager.control.getcashCow().query();
        HtmlUtil.setTextFlow(this._vipTxt,LangCVO.getContent("cashCow4"));
    }

    protected addEvent():void
    {
        this._vipTxt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenVipViewHandler,this);
        this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onrewardHandler,this);
        this._model.addEventListener(CashCowEvent.CASHCOW_UPDATE_EVENT,this.drawData,this);
        super.addEvent();
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._vipTxt.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenVipViewHandler,this);
        this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onrewardHandler,this);
        this._model.removeEventListener(CashCowEvent.CASHCOW_UPDATE_EVENT,this.drawData,this);
    }
    private onOpenVipViewHandler(e:egret.TouchEvent):void
    {
        let _curCvo:VipLevelCVO = VipLevelCVO.getCVO(Manager.model.self.attrInfo.vipLevel);
        let lev:number = _curCvo.level + 1;
		let vip:VipPanel = Manager.view.show(ViewID.VipPanel);
		vip.setVipPage(lev);
    }
    private onrewardHandler(e:egret.TouchEvent):void
    {
        Manager.control.getcashCow().reward();
    }

    protected initData():void
    {
        this.drawData();
    }
    private drawTime():void
    {
        //let second:number = Math.round(this._model.lasTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        let second:number = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000-this._model.lasTime);
       if(second<this._model.TIME_CD)
       {
           this.countdown();
           Manager.render.add(this.countdown, this, 1000);
           this._resGroup.visible  = true;
           this._freeImg.visible = false;
           this._redIcon.visible = false;
       }
       else
       {
           this.setIsFree();
           return;
       }
    }
    private countdown():void
    {
        //let second:number = Math.round(this._model.lasTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        let second:number = Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000-this._model.lasTime);
        if(second >= this._model.TIME_CD)
        {
            this.setIsFree();
            Manager.render.remove(this.countdown, this);
            return;
        }
        let str:string=LangCVO.getContent("cashCow1");
        this._timeTxt.text = StringUtils.setParam(str,cw.DateUtil.formatStr(this._model.TIME_CD-second, cw.DateUtil.LEFT_HH_MM_SS, true));
    }
    private setIsFree():void
    {
        this._timeTxt.text = "";//本次免费
        this._resGroup.visible  = false;
        this._freeImg.visible = true;
        this._redIcon.visible = true;
    }


    private drawData():void{
        this.drawTime();
        let cvo:CashCowCVO = this._model.cvo;
        let str:string = LangCVO.getContent("cashCow2");//今日可聚宝次数<font color='#00ff00'>（{0}）</font>
        str = StringUtils.setParam(str,cvo.crunt+"/"+cvo.truesureNum);
        HtmlUtil.setTextFlow(this._vipNumTxt,str);
        let i:number = this._model.rewardnum + cvo.truesureNum - cvo.crunt;
        let addition:number=0;
        if(this._model.isActive)
        {
            addition = 0.1
        }
        //最终所得=（首次银币额+额外增加银币额）*（100%+特权卡加成10%) 
        let coin:number = (cvo.coin + i * cvo.coin_up) * (1+addition);
        let coinstr:string = StringUtils.getBigNum(coin,1);
        str = LangCVO.getContent("cashCow3");//本次可获得<font color='#00ff00'>{0}万（{1}%）</font>银币
        str = StringUtils.setParam(str,coinstr,"+"+(addition * 100));
        HtmlUtil.setTextFlow(this._conentTxt,str);


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
        if(Manager.render.contains(this.countdown,this)) Manager.render.remove(this.countdown, this);
		if(isRemove)
		{
			ObjectUtil.disposes(this._rewardBtn,this._conentTxt,this._vipTxt,this._vipNumTxt,this._res,this._timeTxt);
            ObjectUtil.removes(this._freeImg,this._resGroup,this._redIcon);
		}
        this._rewardBtn=null;
        this._conentTxt=null;
        this._vipNumTxt=null;
        this._timeTxt=null;
        this._freeImg=null;

        this._resGroup=null;
        this._res=null;
        this._model=null;
        this._vipTxt=null;
        this._redIcon=null;
		
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}