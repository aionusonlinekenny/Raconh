/**
 * 日常视图
 * luzhihong
 * create 2017-11-23
 */
class DailyView extends UIComponent
{
    private _model:ActivityModel;
    private _back0:BitmapRemote;
    private _back1:BitmapRemote;
    private _list:BaseVScrollerList;
    private _sItems:Array<DailySceduleItem> =[];
    private _cvos:Array<ActivityCVO>;

	public constructor()
	{
		super();
        this._model = Manager.model.getActivity();
		this.skinName = Manager.path.getSkinName("activity", "DailyViewSkin");
        this.touchChildren = true;
	}

    protected configUI():void
    {
        super.configUI();
		// 填充数据
        this._cvos = ActivityCVO.getCVOsType(0);

        this._back0.load(Manager.path.getActivityPath("activity_bg_0.png"));
        this._back1.load(Manager.path.getActivityPath("activity_bg_1.png"));

		this._list.initBtnListData(DailyItem, null, true);
		(<eui.VerticalLayout>this._list.itemList.layout).gap = -5;
        
        let sItem:DailySceduleItem;
        let scheduleCVOs:Array<ActivityScheduleCVO> = ActivityScheduleCVO.getCVOs();
        for(var i:number=3; i>=0; i--)
        {
            sItem = new DailySceduleItem(scheduleCVOs[i], i==0 ? 0 : scheduleCVOs[i-1].value);
            sItem.x = 44 + i * 156;
            sItem.y = 989;
            this.addChild(sItem);
            this._sItems.push(sItem);
        }
    }

    protected addEvent():void
    {
        super.addEvent();
        this._model.addEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
    }

    protected removeEvent():void
    {
        super.removeEvent();
        this._model.removeEventListener(ActivityEvent.DAILY_UPDATE, this.updateDaily, this);
    }

    private updateDaily(e:ActivityEvent):void
    {
		this.invalidate("drawList");
    }

    private drawList():void
    {
        this._cvos.sort((a:ActivityCVO, b:ActivityCVO) => {
                if(a.hasGet && !b.hasGet) return 1;
                if(!a.hasGet && b.hasGet) return -1;
                if(a.canGet && !b.canGet) return -1;
                if(!a.canGet && b.canGet) return 1;
                if(a.isOpen && !b.isOpen) return -1;
                if(!a.isOpen && b.isOpen) return 1;
                return (a.rank > b.rank ? 1 : -1); 
            });
		this._list.dataProvider(this._cvos);
    }

	protected draw():void
	{
		super.draw();
		if(this.isInvalid("drawList")) this.drawList();
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawList();
        //引导
        if(Manager.model.getGuide().curID == GuideID.YAN_WU && this._list != null)
        {
            // this._list.itemList.addEventListener(eui.UIEvent.ADDED, this.onAddHandler, this);
            for(let i = 0; i < this._cvos.length; i++)
            {
                if(this._cvos[i].id == ActivityCVO.ID_YANWU)
                {
                    this._list.scroller.validateNow();
                    this._list.scroller.viewport.scrollV = i * 140;
                    this._list.scroller.addEventListener(eui.UIEvent.CHANGE_START, this.onChangeHandler, this);
                    break;
                }
            }
        }
    }

    private onChangeHandler(e:eui.UIEvent):void
    {
        Manager.control.getTask().hideGuide();
    }

    public dispose():void
    {
        if(Manager.model.getGuide().curID == GuideID.YAN_WU)
        {
            Manager.control.getTask().hideGuide();
            this._list.scroller.removeEventListener(eui.UIEvent.CHANGE_START, this.onChangeHandler, this);
        }
        super.dispose();
        ObjectUtil.dispose(this._list);
        this._model = null;
        this._list = null;
        for(var i:number=0; i<4; i++)
        {
            this._sItems[i].dispose();
        }
        this._sItems = null;
    }

}