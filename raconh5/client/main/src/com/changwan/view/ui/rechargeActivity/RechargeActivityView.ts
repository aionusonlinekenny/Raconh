/**
 * pzx 
 * 充值活动
 * 2018.1.19
 */
class RechargeActivityView extends UIComponent{
    private _timeTxt:Label;
    private _descTxt:Label;
	private _scroll:BaseVScrollerList;
	private _type:number=RechargeActivityType.RECHARGEACTIVITY_SINGLE_TYPE;
    private _model:RechargeActivityModel;

    public static  instance:RechargeActivityView;

	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("rechargeActivity", "RechargeActivityViewSkin");
        RechargeActivityView.instance = this;
    }
    protected configUI():void
    {
        super.configUI();
		this._scroll.initBtnListData(RechargeActivityItem, [], true);
        this._model = Manager.model.getrechargeActivity()
        this._descTxt.lineSpacing = 15;
        this.touchChildren = true;
        this._scroll.touchEnabled = this._scroll.touchChildren = true;
    }

    protected addEvent():void
    {
        super.addEvent();
        this._model.addEventListener(RechargeActivityEvent.RECHARGEACTIVITY_QUERY_EVENT,this.updateView,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._model.removeEventListener(RechargeActivityEvent.RECHARGEACTIVITY_QUERY_EVENT,this.updateView,this);
    }
    public updateViewHandler():void
    {
         this.updateView();
    }
    protected initData():void
    {
        super.initData();
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

    public setData(type:number):void
    {
		this._type = type;
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
        this._descTxt.text = LangCVO.getContent("rechargeActivity"+this._type);
        this._model.quperTypeList(this._type);
        //this.updateView();
    }
    private updateView():void
    {
        let arr:RechargeActivityCVO[] = this._model.getCvoList(this._type);
        arr = ArrayUtil.sortOn(arr,["isReward","sort"],[1,0]);
        this._scroll.dataProvider(arr);
        this.drawTime();
    }
    private drawTime():void
    {
        let num:number = this._model.getTime(this._type);
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
        let num:number = this._model.getTime(this._type);
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
			ObjectUtil.disposes(this._timeTxt,this._descTxt,this._scroll)
		}
        if(Manager.render.contains(this.countdown,this)) Manager.render.remove(this.countdown, this);
		 this._timeTxt=null;
        this._descTxt=null;
        this._scroll=null;
        this._model=null;
        RechargeActivityView.instance =null;
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}