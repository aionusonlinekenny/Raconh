/**
 * 日常视图
 * luzhihong
 * create 2017-11-23
 */
class DailyViewII extends UIComponent
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
        this._cvos = ActivityCVO.getCVOsType(1);

        this._back0.load(Manager.path.getActivityPath("activity_bg_0.png"));
        this._back1.load(Manager.path.getActivityPath("activity_bg_1.png"));

		this._list.initBtnListData(DailyItemII, null, true);
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
        this._cvos.sort((cvo1:ActivityCVO, cvo2:ActivityCVO) => {
                // if(cvo1.hasGet && !cvo2.hasGet) return 1;
                // if(!cvo1.hasGet && cvo2.hasGet) return -1;
                // if(cvo1.canGet && !cvo2.canGet) return -1;
                // if(!cvo1.canGet && cvo2.canGet) return 1;
                if(cvo1.isOpen && !cvo2.isOpen) return -1;
                if(!cvo1.isOpen && cvo2.isOpen) return 1;

                let iconCvo1:DailyActivityCVO = DailyActivityCVO.getCVO(cvo1.id);
                let endTime1:number = iconCvo1 ? iconCvo1.endTime : 0;
                let iconCvo2:DailyActivityCVO = DailyActivityCVO.getCVO(cvo2.id);
                let endTime2:number = iconCvo2 ? iconCvo2.endTime : 0;
                let todaySeconds:number = Manager.model.getLogin().serverTimeInfo.todaySeconds;
                if(endTime1 <= todaySeconds && endTime2 > todaySeconds) return -1;//活动1已结束，活动2未结束
                if(endTime1 > todaySeconds && endTime2 <= todaySeconds) return 1;//活动1未结束，活动2已结束
                return (cvo1.rank > cvo2.rank ? 1 : -1); 
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
    }

    public dispose():void
    {
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