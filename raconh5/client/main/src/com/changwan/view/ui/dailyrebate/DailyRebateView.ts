/**
 * 天天返利
 * pzx 
 * create 18.3.14
 */
class DailyRebateView extends UIComponent{
	private _item0:DailyRebateItem;
	private _item1:DailyRebateItem;
	private _item2:DailyRebateItem;
	private _rmbTxt:Label;
	private _itemTxt:Label;
	private _rewardBtn:Button;
	private _chongzhiImg:eui.Image;
	private _closSp:egret.Sprite;
	private _model:DailyRebateModel;
	private _itemList:DailyRebateItem[];
	/**是否有可领取的 */
	private _checkRewsrd:boolean;
	private _redIcon:eui.Image;
	private _endTime:number;

	private _bitmap:BitmapRemote;

	public constructor()
    {
        super();
		this.touchChildren = true;
        this.skinName = Manager.path.getSkinName("dailyrebate", "DailyRebateViewSkin");
		this.visible = false;
    }
    protected configUI():void
    {
        super.configUI();
		if(!this._closSp)
		{
			this._closSp = Manager.pool.create(egret.Sprite);
			this._closSp.graphics.beginFill(1,0.01);
			this._closSp.graphics.drawCircle(-35,-35,35);
			this._closSp.graphics.endFill();
			this.addChild(this._closSp);
			this._closSp.x = 692;
			this._closSp.y = 215;
			this._closSp.touchEnabled = true;
		}
		this._model= Manager.model.getdailyRebate();
		this._itemList = [this._item0,this._item1,this._item2];
		this._chongzhiImg.touchEnabled = false;
		Manager.control.getdailyRebate().query();
		this.drawTime();
		this.countdown();
		this._bitmap.load(Manager.path.getPanelUiImgPath("dailyrebate/dailyrebate_di",Extension.PNG))
    }

    protected addEvent():void
    {
		this._closSp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseHandler,this);
		this._model.addEventListener(DailyRebateEvent.DAILYREBATE_UPDATE,this.updateQueryHandler,this);
		this._rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onsendRewardHandler,this);
        super.addEvent();
    }

    protected removeEvent():void
    {
		this._closSp.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseHandler,this);
		this._model.removeEventListener(DailyRebateEvent.DAILYREBATE_UPDATE,this.updateQueryHandler,this);
		this._rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onsendRewardHandler,this);
        super.removeEvent();
    }
	private onCloseHandler():void
	{
		Manager.view.hide(ViewID.DailyRebateView);
	}
	/**
	 * 查询，领奖返回
	 */
	private updateQueryHandler():void
	{
		this.drawData();
		let second:number = this._endTime - Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		if(second<=0)
		{
			this.drawTime();
		}
	}
	//请求领奖
	private onsendRewardHandler():void
	{
		if(this._checkRewsrd)
		{
			//有一个可领取
			Manager.control.getdailyRebate().reward();
		}
		else
		{
			Manager.view.show(ViewID.SysChargePanel)
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
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
		let any = this._model.getList();
		let index:number = 0;
		this._checkRewsrd = false;
		for(let key in any)
		{
			let cvo:DailyRebateCVO = any[key];
			if(this._itemList[index])
			{
				this._itemList[index].setData(cvo);
			}
			index++;
			if(!this._checkRewsrd)
			{
				if(cvo.checkReward())
				{
					this._checkRewsrd = true;
				}
			}
		}
		if(this._checkRewsrd)
		{
			//有一个可领取
			this._chongzhiImg.source = "common_label_fetch_png";
			this._redIcon.visible = true;
		}
		else
		{
			this._chongzhiImg.source = "common_qianwangchongzhi_png";
			this._redIcon.visible = false;
		}
		let str:string = LangCVO.getContent("dailyrebate1");
		str = StringUtils.setParam(str,this._model.money);
		HtmlUtil.setTextFlow(this._rmbTxt,str);
		this.visible = true;
    }

	private drawTime():void
    {
        
		this._endTime = DateUtil.getToDayTime();
        Manager.render.add(this.countdown, this, 1000);
    }
    private countdown():void
    {
        let second:number = this._endTime - Math.round(Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
		if(second<=0)
		{
			Manager.control.getdailyRebate().query();
			Manager.render.remove(this.countdown, this);
			return;
		}
        this._itemTxt.text = cw.DateUtil.formatStr(second, cw.DateUtil.LEFT_HH_MM_SS, true);
    }
   

	public show(...args:any[]):void
    {
        Manager.layer.uiLayer.addChild(this);
    }

    public hide():void
    {
        this.dispose();
    }

    public dispose():void
    {
        super.dispose();
		Manager.render.remove(this.countdown, this);

		this._itemList.forEach((item,i)=>
		{
			Manager.pool.push(item);
		})
		ObjectUtil.disposes(this._rmbTxt,this._itemTxt,this._rewardBtn);
		ObjectUtil.removes(this._chongzhiImg,this._redIcon);
		this._itemList=null;
		this._item0=null;
		this._item1=null;
		this._item2=null;
		
		this._rmbTxt=null;
		this._itemTxt=null;
		this._rewardBtn=null;
		
		this._chongzhiImg=null;
		Manager.pool.push(this._closSp);
		this._closSp=null;
		this._model=null;
		this._redIcon=null;
		Manager.pool.push(this._bitmap)
		this._bitmap = null;
    }
}