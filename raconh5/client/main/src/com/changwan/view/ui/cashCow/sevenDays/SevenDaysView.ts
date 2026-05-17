/**
 * pzx 
 *  七天登陆
 * create 2018.1.29
 */
class SevenDaysView extends UIComponent{
    private _model:SevenDaysModel;
    private _sevenDayItem1:SevenDaysItem;
    private _sevenDayItem2:SevenDaysItem;
    private _sevenDayItem3:SevenDaysItem;
    private _sevenDayItem4:SevenDaysItem;
    private _sevenDayItem5:SevenDaysItem;
    private _sevenDayItem6:SevenDaysItem;
    private _sevenDayItem7:SevenDaysItem;

    private _rewardBtn:Button;
    private _yijhihuoImg:eui.Image;
    private _item1:BaseGoods;
    private _item2:BaseGoods;
    private _item3:BaseGoods;
    private _item4:BaseGoods;

    private _fightNumber:NumImgView2;
    private _dayNumber:NumImgView2;

    private _list:SevenDaysItem[];
    private _itemList:BaseGoods[];
    private _redIcon:eui.Image;

    private _curItem:SevenDaysItem;

    private _bitimg:BitmapRemote;
    private _nameImg:eui.Image;
    private _descImg:eui.Image;

	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("cashCow\sevenDays", "SevenDaysViewSkin");
        this.touchChildren = true;
    }
    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getcashCow().sevenDaysModel;

        if(!this._fightNumber)
        {
            this._fightNumber = Manager.pool.create(NumImgView2);
            this.addChild(this._fightNumber);
            this._fightNumber.x = 384;
            this._fightNumber.y = 742;
            
        }
        if(!this._dayNumber)
        {
            this._dayNumber = Manager.pool.create(NumImgView2);
            this.addChild(this._dayNumber);
            this._dayNumber.x = 538;
            this._dayNumber.y = 894;
        }
        if(!this._list)
        {
            this._list = [];
            for(let i:number=1;i<8;i++)
            {
                let item:SevenDaysItem = this["_sevenDayItem"+i];
                item.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickItemHandler,this);
                this._list.push(item);
            }
        }
        if(!this._itemList)
        {
            this._itemList = [];
            for(let i:number = 1;i<5;i++)
            {
                let item:BaseGoods = this["_item"+i]
                this._itemList.push(item);
            }
        }
    }

    protected addEvent():void
    {
        super.addEvent();
        this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rewardsHandler,this);
        this._model.addEventListener(CashCowEvent.SEVENDAYS_QUERY_EVENT,this.drawData,this);
        this._model.addEventListener(CashCowEvent.SEVENDAYS_REWARD_EVENT,this.updateReward,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.rewardsHandler,this);
        this._model.removeEventListener(CashCowEvent.SEVENDAYS_QUERY_EVENT,this.drawData,this);
        this._model.removeEventListener(CashCowEvent.SEVENDAYS_REWARD_EVENT,this.updateReward,this);
        for(let i:number=1;i<8;i++)
        {
            let item:SevenDaysItem = this["_sevenDayItem"+i];
            item.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickItemHandler,this);
        }
    }
    private clickItemHandler(e:egret.TouchEvent):void
    {
        if(this._curItem == e.target)
        {
            return;
        }
        this._curItem.showEffect(false);
        this._curItem = e.target;
        this._curItem.showEffect(true);
        this.updateCurItemData();
    }
    private rewardsHandler():void
    {
        let cvo:SevenDaysCVO;
        if(this._curItem)
        {
            cvo = this._curItem.cvo;
        }
        if(!cvo.isReward())
        {
            FloatTips.addTips(LangCVO.getContent("cashCow6"),Color.RED);
            return;
        }
        Manager.control.getcashCow().sevenDaysReward(cvo.login_day_id);
    }
    private updateReward(e:BaseEvent):void
    {
        let cvo:SevenDaysCVO = SevenDaysCVO.getcvo(e.params);
        this._curItem.setData(cvo);
        this.updateRewardItemState();
    }
   
    protected drawAll():void
	{
		super.drawAll();
		this.drawData();
	}

    private drawData():void
    {
        let boo:boolean = true;
       for(let i:number = 0;i<7;i++)
       {
           let item:SevenDaysItem = this._list[i];
           let cvo:SevenDaysCVO = SevenDaysCVO.getcvo(i+1);
           item.setData(cvo);
           if(cvo.isReward() && cvo.state != 1)
           {
               if(boo)
               {
                    this._curItem = item;
                    if(cvo.login_day_id== this._model.login_day)
                    {
                        boo = false;
                    }
               }
           }
           else
           {
               if(!this._curItem)
               {
                   if(cvo.login_day_id== this._model.login_day)
                    {
                        this._curItem = item;
                    }
               }
           }
       }
       this._curItem.showEffect(true);
       this.updateCurItemData();
    }
    private updateCurItemData():void
    {
        let cvo:SevenDaysCVO;
        if(this._curItem)
        {
            cvo = this._curItem.cvo;
        }

        let lossArr:GainLossVO[] = GainLossVO.parse(cvo.rewards);
        for(let i:number=this._itemList.length-1;i>-1;i--)
        {
            if(lossArr[i])
            {
                this._itemList[i].setGainLossVO(lossArr[i]);
            }
            else
            {
                this._itemList[i].clear();
            }
        }
        this._fightNumber.setValue(cvo.fightNum,"nums_fighting_", 25);
        this._dayNumber.setValue(cvo.login_day_id,"nums_sevenDay_", 25)
        this._bitimg.load(Manager.path.getPanelCashCowPath("sevenDay_item_"+cvo.login_day_id,".png"));

        this._nameImg.source = "cashCowsevendDayname_"+cvo.login_day_id+"_png";
        //this._descImg.source = "cashCowsevendDaydesc_"+cvo.login_day_id+"_png";
        this.updateRewardItemState();
    }

    private updateRewardItemState():void
    {
        let cvo:SevenDaysCVO = this._curItem.cvo;
        if(cvo.state == 1)
        {
            this._rewardBtn.visible = false;
            this._yijhihuoImg.visible = true;
            this._redIcon.visible = false;

        }
        else 
        {
            this._rewardBtn.visible = true;
            this._redIcon.visible = cvo.isReward();
            this._yijhihuoImg.visible = false;
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
			ObjectUtil.disposes(this._rewardBtn)
            ObjectUtil.removes(this._yijhihuoImg,this._redIcon,this._dayNumber,this._fightNumber,this._descImg,this._nameImg);
		}
        this._model=null;
        this._rewardBtn=null;
        this._yijhihuoImg=null;

        for(let item of this._list)
        {
            item.dispose();
        }
        for(let item of this._itemList)
        {
            item.dispose();
        }
        this._list=null;
        this._itemList=null;
        this._sevenDayItem1=null;
        this._sevenDayItem2=null;
        this._sevenDayItem3=null;
        this._sevenDayItem4=null;
        this._sevenDayItem5=null;
        this._sevenDayItem6=null;
        this._sevenDayItem7=null;

        this._item1=null;
        this._item2=null;
        this._item3=null;
        this._item4=null;
        Manager.pool.push(this._fightNumber);
        Manager.pool.push(this._dayNumber);
        this._fightNumber=null;
        this._dayNumber=null;
        this._redIcon=null;
        this._curItem=null;
        Manager.pool.push(this._bitimg);
        this._bitimg = null;
        this._nameImg=null;
        this._descImg=null;
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}