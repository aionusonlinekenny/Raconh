/**
 * drq 
 * 兑换活动
 * 2018.4.19
 */
class ExchangeView extends UIComponent
{
	private _timeTxt:Label;
    private _descTxt:Label;
	private _scroll:BaseVScrollerList;
	private _model:ExchangeModel;
	private _cvo:ExchangeCVO[];
    

	public constructor() {
		super();
		this.skinName = Manager.path.getSkinName("rechargeActivity", "RechargeActivityViewSkin");
		this._cvo = ExchangeCVO.getCvo();
	}

    protected configUI():void
    {
        super.configUI();
        this._model = Manager.model.getExchange();
        this.touchChildren = true;

		this._scroll.initBtnListData(ExchangeItem, [], true);
        this._scroll.touchEnabled = this._scroll.touchChildren = true;
		this._descTxt.lineSpacing = 15;
		this._descTxt.text = LangCVO.getContent("rechargeActivity8");
		this.drawTime();
		this.createItems();
    }

	protected addEvent():void
    {
		super.addEvent();
		this._model.addEventListener(ExchangeEvent.EXCHANGE_UPDATE,this.createItems,this);
		Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.createItems,this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.createItems,this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.VIP_LEVEL, this.createItems,this);
	}

	protected removeEvent():void
	{
		this._model.removeEventListener(ExchangeEvent.EXCHANGE_UPDATE,this.createItems,this);
		Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT,this.createItems,this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.createItems,this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.VIP_LEVEL, this.createItems,this);
		super.removeEvent();
	}

	private drawTime():void
    {
        let num:number = this._model._endTime;
        let second:number = Math.round(num - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
       if(second>0)
       {
           this.countdown();
           Manager.render.add(this.countdown, this, 1000);
       }
       else
       {
           this.setIsFree();
           return;
       }
    }
    private countdown():void
    {
        let num:number = this._model._endTime;
        let second:number = Math.round(num - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if(second < 0)
        {
            this.setIsFree();
            Manager.render.remove(this.countdown, this);
            return;
        }
        let str :string = cw.DateUtil.formatStr(second, cw.DateUtil.LEFT_DD_HH_MM, true);
        str = HtmlUtil.addColorTag(str,"#fff7e7");
        HtmlUtil.setTextFlow(this._timeTxt,str);
    }
	private setIsFree():void
    {
        HtmlUtil.setTextFlow(this._timeTxt,LangCVO.getContent("rechargeActivity7"));
    }

	private createItems():void
	{
        //排序
         this.sortList()
		 this._scroll.dataProvider(this._cvo);
         this._scroll
	}

    private sortList():void
    {
        for(let i=0;i<this._cvo.length;i++)
        {
            let data = this._cvo[i];
            let any = this._model.getData(this._cvo[i]);
            if(data.maxCurent && data.curCount >= data.maxCurent)//已领取
            {
                this._cvo[i].sort = this._cvo.length+1;
            }else if((data.maxCurent == 0 || data.curCount < data.maxCurent) && any.cur_num1 >= any.num1 && any.cur_num2 >= any.num2 && any.curVip >= any.condValue)
            {
                this._cvo[i].sort = 0;
            }
        }
        
        for(let i=0;i<this._cvo.length;i++)
		 {
			 for(let j=0;j<this._cvo.length-1;j++)
			 {
				if(this._cvo[j].sort>this._cvo[j+1].sort)
				{
					let a = this._cvo[j+1];
					this._cvo[j+1] = this._cvo[j];
					this._cvo[j] = a;
				}
			 }
		 }
    }

    public dispose():void
    {
        if(Manager.render.contains(this.countdown,this)) Manager.render.remove(this.countdown, this);
        super.dispose();

        ObjectUtil.disposes(this._timeTxt, this._descTxt,this._model);
        this._timeTxt = null;
        this._descTxt = null;
	    this._scroll.dispose();
        this._scroll = null;
	    this._model = null;
	    this._cvo = null;
    }
}