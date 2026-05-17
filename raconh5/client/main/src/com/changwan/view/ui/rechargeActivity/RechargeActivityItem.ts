/**
 * pzx 
 * 充值活动item
 * 2018.1.20
 */
class RechargeActivityItem extends ItemRenderer{
    protected _descTxt:Label;
    protected _item0:BaseGoods;
    protected _item1:BaseGoods;
    protected _item2:BaseGoods;
    protected _item3:BaseGoods;
	protected _rewardGroup:eui.Group;
	protected _okBtn:Button;
	protected _countTxt:Label;
	protected _fetchImg:eui.Image;
	protected _chongzhiImg:eui.Image;
    protected _ilingquImg:eui.Image;
    protected _list:BaseGoods[];
	private _model:RechargeActivityModel;
    protected _redIcon:eui.Image;
	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("rechargeActivity", "RechargeActivityItemSkin");
        
    }
    protected addEvent():void
    {
        this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchRewardHandler,this);
        this._model.addEventListener(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT,this.updateView,this);
    }
    protected removeEvent():void
    {
        this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchRewardHandler,this);
        this._model.removeEventListener(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT,this.updateView,this);
    }
    protected onTouchRewardHandler(e:egret.TouchEvent):void
    {
        let cvo:RechargeActivityCVO = this.data;
        if(cvo.num == 0)
		{
			Manager.view.show(ViewID.SysChargePanel);
		}
		else if(cvo.num>0)
		{
			Manager.control.getRecheargeActivity().reward(cvo.id);
		}
    }
    protected createChildren():void
    {
        super.createChildren();
        if(this._list ==null)
        {
            this._list=[];
            for(let i:number = 0;i<4;i++)
            {
                this._list[i] = this["_item"+i];
            }
        }
		
		this._fetchImg.touchEnabled = this._chongzhiImg.touchEnabled = false;
        this.initData();
        this.addEvent();
    }

    protected initData():void
    {
        this._model = Manager.model.getrechargeActivity();
    }

    private updateView(e:BaseEvent):void
    {
        let cvo:RechargeActivityCVO = this.data;
        if(cvo.id == e.params)
        {
            this.updatreMoneyCount();
            let num:number = cvo.num;
            if(num==-1 || num == 0)
            {
                RechargeActivityView.instance.updateViewHandler();
            }
        }
    }
	protected dataChanged():void
    {
		let cvo:RechargeActivityCVO = this.data;
        let gossArr:GainLossVO[]= GainLossVO.parse(cvo.rewards);
        for(let i:number= 0;i<this._list.length;i++)
        {
            if(gossArr[i])
            {
                this._list[i].setGainLossVO(gossArr[i]);
            }
            else
            {
                this._list[i].clear();
            }
        }
		this.updatreMoneyCount();
    }

    private updatreMoneyCount():void
    {
        let cvo:RechargeActivityCVO = this.data;
        let str:string = LangCVO.getContent("rechargeActivity"+(cvo.type + 3));
		let arr:number[]=this._model.getMoney(cvo.type);
        
		let chargeMoney:number = 0;
		for(let i:number= arr.length-1;i>-1;i--)
		{
			chargeMoney += arr[i]
		}
		let color:string=Color.RED_STR;
        let num:number = cvo.num;
        this._redIcon.visible = false;
		if(num==-1)
		{
            /**已领完 */
			this._rewardGroup.visible = false;
			this._ilingquImg.visible = true;
            color = Color.GREEN_STR;
		}
		else if(num == 0)
		{
			this._rewardGroup.visible = true;
			this._chongzhiImg.visible = true;
			this._ilingquImg.visible = false;
			this._fetchImg.visible = false;
		}
		else if(num>0)
		{
			this._rewardGroup.visible = true;
			this._chongzhiImg.visible = false;
			this._ilingquImg.visible = false;
			this._fetchImg.visible = true;
			color = Color.GREEN_STR;
            this._redIcon.visible = true;
		}
        if(cvo.type == RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE)
        {
            //单笔特殊处理
            if(num>0 ||num==-1)
            {
                chargeMoney = cvo.RMB;
            }
            else
            {
                chargeMoney = 0;
            }
        }
		let money:string = "（"+chargeMoney+"/"+cvo.RMB+"）";
		money = HtmlUtil.addColorTag(money,color);
		str = StringUtils.setParam(str,cvo.RMB,money);
        HtmlUtil.setTextFlow(this._descTxt,str);

        if(cvo.maxCurent>0)
        {
            this._countTxt.text = "（"+cvo.curent+"/"+cvo.maxCurent+"）";
        }
        else
        {
            this._countTxt.text = "";
        }
    }

    public reuse():void
    {
    }

    public unuse():void
    {
		this.clear();
    }
	
	protected clear(isRemove:boolean=false):void
	{
		if(isRemove)
		{
			ObjectUtil.disposes(this._descTxt,this._okBtn,this._item0,this._item1,this._item2,this._item3,this._countTxt);
            ObjectUtil.removes(this._ilingquImg,this._rewardGroup,this._fetchImg,this._chongzhiImg,this._redIcon);
		}
        this._descTxt=null;
        this._okBtn=null;
        this._item0=null;
        this._item1=null;
        this._item2=null;
        this._item3=null;
        this._ilingquImg=null;
        this._list=null;
		this._rewardGroup=null;
		this._okBtn=null;
		this._countTxt=null;
		this._fetchImg=null;
		this._chongzhiImg=null;
        this._redIcon=null;
        this._model = null;
	}

    public dispose():void
    {
        super.dispose();
        this.removeEvent();
        this.clear(true);
    }
}