/**
 * pzx 
 * 冲级好礼
 * 2018.1.24
 */
class LevItemView extends UIComponent{
	private _scroll:BaseVScrollerList;
    private _model:LevItemModel;
    private _yijhihuoImg:eui.Image;

	public constructor()
    {
        super();
        this.skinName = Manager.path.getSkinName("cashCow\levItem", "LevItemViewSkin");
        this.touchChildren = true;
    }
    protected configUI():void
    {
        super.configUI();
		this._scroll.initBtnListData(LevItemChild, [], true);
        this._model = Manager.model.getcashCow().levItemModel;
        Manager.control.getcashCow().levItemQuery();
    }

    protected addEvent():void
    {
        super.addEvent();
        this._model.addEventListener(CashCowEvent.LEVITEM_QUERY_EVENT,this.drawData,this);
        this._model.addEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT,this.updateReward,this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._model.removeEventListener(CashCowEvent.LEVITEM_QUERY_EVENT,this.drawData,this);
        this._model.removeEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT,this.updateReward,this);
    }
    private openViewHandler():void
    {
        Manager.view.show(ViewID.SysPrivilegePane,1);
    }
    private updateReward(e:BaseEvent):void
    {
        let id:number = e.params;
        let cvo:LevItemCVO = LevItemCVO.getcvo(id);
        if(cvo.num>=1)
        {
            //已领完的重新排序
            this.updateData();
        }
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
        this.invalidate(InvalidationType.DATA);
    }

    private drawData():void{
        if(this._model.is_activited == 1)
        {
            this._yijhihuoImg.visible = true;
        }
        else
        {
            this._yijhihuoImg.visible = false;
        }
        this.updateData();
    }
    private updateData():void
    {
        let arr:Array<LevItemCVO> = LevItemCVO.getCvos();
        arr = ArrayUtil.sortOn(arr,["num","id"]);
        this._scroll.dataProvider(arr);
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
			ObjectUtil.disposes(this._scroll)
            this.removeChild(this._yijhihuoImg);
		}
        this._scroll=null;
        this._model=null;
        this._yijhihuoImg=null;
	}

    public dispose():void
    {
        super.dispose();
        this.clear(true);
    }
}