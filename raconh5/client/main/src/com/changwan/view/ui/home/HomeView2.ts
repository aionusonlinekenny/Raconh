// /**
//  * 主界面
//  * Simon 2017.11.28
//  * @update devil 2018-04-14
//  */
class HomeView2 extends BaseRender
{
    private _exit:ExitBtn;
    private _bar:SkillBar;
    private _ronglian:OnekeyRongLian2;
    private _chat:MailAndChatAndFriend;
    private _right:ActivityIcon;
    private _top:ActivityIcon;
    private _firstCharge:FirstCharge;
    private _dailyRebate:DailyRebate;
    private _sysNoticeItem:MainSysnoticeItem2;
	private _head:Head;
	private _map:MiniMap;
    private _task:Task;
    private _mainRelicStuffNotic:MainRelicStuffNotice2;

	public static REIN_POS:number = 1;
	public static ROLE_POS:number = 2;
	public static SKILL_POS:number = 3;
	public static EQUIP_POS:number = 4;
	public static BAG_POS:number = 5;
	public static ZHONGMEN_POS:number = 6;
	public static SHOP_POS:number = 7;
	public static BOSS_POS:number = 8;
	public static DAILY_POS:number = 9;
	public static DABAOJIAN_POS:number = 10;


    public static SYSNOTICE_ITEM:number = 1;
    public static RIGHT_ICON:number = 2;
    public static TOP_ICON:number = 3;
    public static TASK:number = 4;
    public static MAIN_RELICE_STUFF:number = 5;
    public static BAR:number = 6;
    public static FIRST_CHARGE:number = 7;
    public static DAILY:number = 8;
    

    private _curMapCVO:MapCVO;
    private _checkRed:CheckRed;

    private _initTask:boolean = false;
    private _needSetRight:boolean;


    public constructor()
    {
        super();
        // this.touchChildren = true;
        this.start();
        this.addEvent();
        this.initData();
    }

    protected start():void
    {
        super.start();

        this._curMapCVO = Manager.model.getMap().mapCVO;
        this._needSetRight = parseInt(MapCVO.getConfigData(MapCVO.CONFIG_DAILY_ICON)) == 1;

        let layer:LayerManager = Manager.layer;
        this._head = new Head(layer.homeImageLayer,layer.homeLayer);
        this._map = new MiniMap(layer.homeImageLayer,layer.homeLayer);
        this._exit = new ExitBtn(layer.homeImageLayer);
        this._bar = new SkillBar(layer.homeImageLayer,layer.homeLayer);
        this._chat = new MailAndChatAndFriend(layer.homeImageLayer,layer.homeLayer);
        this._ronglian = new OnekeyRongLian2(layer.homeImageLayer);
        this._right = new ActivityIcon(ActivityIcon.RIGHT);
        this._top = new ActivityIcon(ActivityIcon.TOP);
        this._firstCharge = new FirstCharge(this);
        this._dailyRebate = new DailyRebate();
        // this._sysNoticeItem = new MainSysnoticeItem2(layer.homeImageLayer,layer.homeLayer);
        this._task = new Task(layer.homeImageLayer,layer.homeLayer);
        this._checkRed = new CheckRed(this);
    }

    private initData():void
	{
		Manager.control.getItems().itemsQuery(ItemsType.EQUIE);
		Manager.control.getItems().itemsQuery(ItemsType.BAG);
		Manager.control.getItems().itemsQuery(ItemsType.DEPOT);
		Manager.control.getItems().itemsQuery(ItemsType.LIFEGRID);
		Manager.control.getItems().itemsQuery(ItemsType.LIFEGRIDBAG);
		Manager.control.getSoldier().query();
		Manager.control.getClubLeaderWar().query();
		Manager.control.getEquip().suitInfoQuery();
		if(Manager.model.self.attrInfo.guildID != 0) Manager.control.getClub().query();
		GameDispatcher.getInstance().starCrossTime();
	}

	protected addEvent():void
	{
		super.addEvent();
		GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.__resize, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.ENTER_SCENE, this.__enterMap, this);
		Manager.model.getActIcon().addEventListener(ActIconEvent.SINGLE_UPDATE, this.__sigleUpdate, this);
		Manager.model.getTask().addEventListener(TaskEvent.TASK_COMPLETE_EVENT,this.__updateTask,this);
        Manager.model.getTask().addEventListener(TaskEvent.TASK_INIT_EVENT,this.__updateTask,this);
		Manager.model.getrelicstuff().addEventListener(RelicStuffEvent.RELICSTUFF_QUERY_EVENT, this.__onRelicUpdate, this);
	}

    public getGlobalPos(id:number,subID?:number):egret.Point
    {
        if(id == HomeView2.SYSNOTICE_ITEM)
        {
            if(this._sysNoticeItem == null)return null;
            return this._sysNoticeItem.getGuidePos();
        }
        else if(id == HomeView2.TASK)
        {
            if(subID == 10)return this._task.getGuidePos("autoBtn");
            return this._task.getGuidePos();
        }
        else if(id == HomeView2.TOP_ICON)return this._top.getGuidePos(subID);
        else if(id == HomeView2.RIGHT_ICON)return this._right.getGuidePos(subID);
        else if(id == HomeView2.MAIN_RELICE_STUFF)
        {
            if(this._mainRelicStuffNotic == null)return null;
            else return this._mainRelicStuffNotic.getGuidPos();
        }
        else if(id == HomeView2.BAR)
        {
            return this._bar.getGuidPos(subID);
        }
        else if(id == HomeView2.FIRST_CHARGE)
        {
            return this._firstCharge.getGuidPos();
        }
    }

	private __resize(e:GlobalEvent):void
	{
        this.invalidate("drawSize");
	}

	private __enterMap(e:GlobalEvent):void
	{
        if(this._curMapCVO == Manager.model.getMap().mapCVO) return;
        this._curMapCVO = Manager.model.getMap().mapCVO;
        this.invalidate("drawMap");
	}

    private __onRelicUpdate(e:RelicStuffEvent):void
    {
        this.invalidate("drawMainReliceStuff");
    }

    private __updateTask(e:BaseEvent):void
    {
        this.invalidate("drawTask");
        if(this._mainRelicStuffNotic==null)
        {
            this.switch(HomeView2.MAIN_RELICE_STUFF,true);
        }
        if(!this._initTask)
        {
            if(this._curMapCVO)this.switch(HomeView2.TASK,true);
            this._initTask = false;
        }
    }

	private __sigleUpdate(e:ActIconEvent):void
	{
		let id:number = Number(e.params);
		let info:DailyActivityCVO = DailyActivityCVO.getCVO(id);
		if(!info) return;
		switch(id)
		{
			case ActIconID.TRAINING:
				Manager.model.getGameobject().setTrainingEffect(info.status == DailyActivityCVO.STATE_IN);
				if(info.status != DailyActivityCVO.STATE_IN)
					Manager.model.getTraining().updateActivityEnd();
				break;
		}
	}

    protected drawAll():void
    {
        super.drawAll();
        this.drawSize();
        if(this._curMapCVO)this.drawMap();
        this.drawTask();
        // if(OpenCVO.isOpen(OpenConst.ID_RELICSTUFF))this.drawMainReliceStuff();
    }

    protected draw():void
    {
        super.draw();
        if(this.isInvalid("drawSize"))this.drawSize();
        if(this.isInvalid("drawMap"))this.drawMap();
        if(this.isInvalid("drawTask"))this.drawTask();
        if(this.isInvalid("drawMainReliceStuff"))this.drawMainReliceStuff();
    }

    private drawTask():void
    {
        this._bar.switchLock(!OpenCVO.isOpen(OpenConst.ID_RELICSTUFF));
        if(Manager.view.isOpening(ViewID.RollTips)) return;
        let info:TaskInfo = Manager.model.getTask().getcurTask();
        if(!info) return;
		let cvo:TaskCvoInfo=TaskCVO.getinfo(info.id);
		let vers:number = cvo.verse;
		if(vers == RollTips2.verseList[0])
		{
			if(RollTips2.openPanel5) return;
            this._firstCharge.showTip();
		}
		else if(vers == RollTips2.verseList[1])
		{
			if(RollTips2.openPanel10) return;
            let pos:egret.Point = this.getGlobalPos(HomeView2.TOP_ICON,ActIconID.ARTIFACT);
			Manager.view.show(ViewID.RollTips,RollTips2.verseList[1],pos);
		}
    }

    private drawSize():void
    {
        let gameWidth:number = Manager.config.gameWidth;
        let gameHeight:number = Manager.config.gameHeight;
        this._bar.layout(gameWidth,gameHeight);
        this._ronglian.layout(gameWidth,gameHeight);
        this._chat.layout(gameWidth,gameHeight);
        this._right.layout(gameWidth,gameHeight);
        this._top.layout(gameWidth,gameHeight);
        this._map.layout(gameWidth,gameHeight);
        if(this._sysNoticeItem)this._sysNoticeItem.layout(gameWidth,gameHeight);
        this._task.layout(gameWidth,gameHeight);
    }

    private drawMainReliceStuff():void
    {
        let recvo:RelicStuffCVO = Manager.model.getrelicstuff().getRelicStuff();
        if(recvo)
        {
            if(this._mainRelicStuffNotic)this._mainRelicStuffNotic.setData(recvo);
        }
        else  this.disposeView(HomeView2.MAIN_RELICE_STUFF);
    }

	private drawMap():void
	{
        let configStr:string = this._curMapCVO.hideViews;
        let visible:boolean = false;
        this.switch(HomeView2.TASK,true);
        // let visible = configStr.indexOf(MapConst.HIDE_TASK) == -1;
        // let info:TaskInfo = Manager.model.getTask().getcurTask();
        // if(info)this._initTask = true;
        // this._task.switch(visible && info != null);
        
        // if(this._mainRelicStuffNotic)this._mainRelicStuffNotic.switch(visible);
        // this._dailyRebate.switch(visible);
        this.switch(HomeView2.DAILY,true);
        this.switch(HomeView2.FIRST_CHARGE, true);
        // this._firstCharge.switch(!Manager.model.getSysCharge().isReward && visible);
        // visible = configStr.indexOf(MapConst.HIDE_PRE) == -1;
        // this._sysNoticeItem.switch(visible);
        this.switch(HomeView2.SYSNOTICE_ITEM,true);
        visible = configStr.indexOf(MapConst.HIDE_HEAD) == -1;
        this._head.switch(visible);
        visible = configStr.indexOf(MapConst.HIDE_MAP) == -1;
        this._map.switch(visible);
        if(visible)this._map.onEnterMap(this._curMapCVO);
        this._exit.switch(configStr.indexOf(MapConst.HIDE_EXIT) == -1);
        this._chat.switch(configStr.indexOf(MapConst.HIDE_CHAT) == -1);
        if(!this._needSetRight) this._right.switch(configStr.indexOf(MapConst.HIDE_RIGHT) == -1);
        this._top.switch(configStr.indexOf(MapConst.HIDE_ICONS) == -1);
	}

	public drawRedIcon(id:number, isShow:boolean):void
	{
        this._bar.showRedIcon(id,isShow);
	}

    public switch(id:number,visible:boolean,force:boolean=false):void
    {
        if(!this._curMapCVO)return;
         let configStr:string = this._curMapCVO.hideViews;
        if(id == HomeView2.SYSNOTICE_ITEM)
        {
            visible = visible && configStr.indexOf(MapConst.HIDE_PRE) == -1
            if(visible && this._sysNoticeItem == null)
            {
                this._sysNoticeItem = new MainSysnoticeItem2(Manager.layer.homeImageLayer,Manager.layer.homeLayer);
                this._sysNoticeItem.layout(Manager.config.gameWidth, Manager.config.gameHeight);
            }
            if(this._sysNoticeItem)this._sysNoticeItem.switch(visible);
        }
        else if(id == HomeView2.RIGHT_ICON)
        {
            visible = visible && configStr.indexOf(MapConst.HIDE_RIGHT) == -1;
            this._right.switch(visible);
        }
        else if(id == HomeView2.TOP_ICON)
        {
            visible = visible && (configStr.indexOf(MapConst.HIDE_ICONS) == -1);
            this._top.switch(visible);
        }
        else if(id == HomeView2.TASK)
        {
            let info:TaskInfo = Manager.model.getTask().getcurTask();
            visible = visible && info != null && configStr.indexOf(MapConst.HIDE_TASK) == -1
            if(info)this._initTask = true;
            this._task.switch(visible);
        }
        else if(id == HomeView2.FIRST_CHARGE)
        {
            if(!force) visible = visible && !Manager.model.getSysCharge().isReward && (configStr.indexOf(MapConst.HIDE_TASK) == -1);
            this._firstCharge.switch(visible);
        }
        else if(id == HomeView2.DAILY)
        {
            visible = visible && configStr.indexOf(MapConst.HIDE_TASK) == -1;
            this._dailyRebate.switch(visible);
        }
        else if(id == HomeView2.MAIN_RELICE_STUFF)
        {
            visible = visible && configStr.indexOf(MapConst.HIDE_TASK) == -1;
            if(visible)
            {
                if(this._mainRelicStuffNotic == null)
                {
                    let cvo:RelicStuffCVO = Manager.model.getrelicstuff().getRelicStuff();
                    if(cvo != null)
                    {
                        this._mainRelicStuffNotic = new MainRelicStuffNotice2(Manager.layer.homeImageLayer,Manager.layer.homeLayer,this);
                        this._mainRelicStuffNotic.move(0,300);
                        this._mainRelicStuffNotic.switch(true);
                        this._mainRelicStuffNotic.setData(cvo);
                    }
                }
            }
            if(this._mainRelicStuffNotic)this._mainRelicStuffNotic.switch(visible);
        }
    }

    public disposeView(id:number):void
    {
        if(id == HomeView2.MAIN_RELICE_STUFF && this._mainRelicStuffNotic)
        {
            if(this._mainRelicStuffNotic)
            {
                this._mainRelicStuffNotic.dispose();
                this._mainRelicStuffNotic = null;
            }
        }
    }


    public updateIcon(type:number,cvo:DailyActivityCVO, isRemove:boolean):void
    {
        if(type == ActivityIcon.RIGHT)this._right.updateIcon(cvo,isRemove);
        else this._top.updateIcon(cvo,isRemove);
    }

    public guide(id:number,method:string = "guide"):void
    {
        if(id == HomeView2.TASK)
        {
            if(method == "guide")this._task.guide();
            else if(method == "guideAutoHook")this._task.guideAutoHook();
        }
    }

	public checkNeedOneKeyRonglian():void
	{
        this._ronglian.switch(Manager.model.getBag().isTooLittle());
	}
}