class Task
{
    private _homeImageLayer:egret.DisplayObjectContainer;
    private _homeLayer:egret.DisplayObjectContainer;

    private _back:BitmapRes;
    private _back1:BitmapRes;
    private _back2:BitmapRes;
    private _back3:BitmapRes;
    private _autoBtn:BitmapRes;
    private _gouImg:BitmapRes;
    private _progress:TaskProgress2;
    private _res1:PlayerResItems2;
    private _res2:PlayerResItems2;
    private _passTxt:TextField;
    private _descTxt:TextField;
    private _nameTxt:TextField;
    private _group:eui.Group;
    private _tankAni:Animation;
	private _tankAniContainer:egret.DisplayObjectContainer;

    private _visible:boolean;
    private _info:TaskInfo;
    private _cvo:TaskCvoInfo;
    	/** 是否自动任务 */
	private _isAutoTask:boolean;
    private _model:TaskModel;
	
	private _curValue1:GainLossVO;
	private _curValue2:GainLossVO;

    private _drawTask:boolean;

    public constructor(homeImageLayer:egret.DisplayObjectContainer,homeLayer:egret.DisplayObjectContainer)
    {
        this._homeImageLayer = ObjectUtil.createConainer();
        homeImageLayer.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        homeLayer.addChild(this._homeLayer);

        this._visible = false;
        this._model = Manager.model.getTask();
        this._isAutoTask = false;
    }

	private addEvent():void
	{
		this._model.addEventListener(TaskEvent.TASK_UPDATE_EVENT,this.updateViewHandler,this);
		this._model.addEventListener(TaskEvent.TASK_INIT_EVENT,this.updateViewHandler,this);
		this._group.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__click,this);
		this._autoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__autoHook,this);
	}

	private removeEvent():void
	{
		this._model.removeEventListener(TaskEvent.TASK_UPDATE_EVENT,this.updateViewHandler,this);
		this._model.removeEventListener(TaskEvent.TASK_INIT_EVENT,this.updateViewHandler,this);
		this._group.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__click,this);
		this._autoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__autoHook,this);
	}

    public layout(gameWidth:number,gameHeight:number):void
    {
        this._homeLayer.y = 825;
        this._homeLayer.x = 0;
        this._homeImageLayer.y = 825;
        this._homeImageLayer.x = 0;
    }

    public switch(visible:boolean):void
    {
        if(this._visible == visible)return;
        this._visible = visible;
        if(this._visible)
        {
            this._back = BitmapRes.create("task_guangBg_png",24,59,264,116);
            this._homeImageLayer.addChild(this._back);
            this._back1 = BitmapRes.create("task_fightIcon_png");
            this._homeImageLayer.addChild(this._back1);
			this._tankAniContainer = ObjectUtil.createConainer();
			this._tankAniContainer.touchChildren = false;
			this._homeImageLayer.addChild(this._tankAniContainer);
            this._back2 = BitmapRes.create("task_guang_png",4,43,42,89);
            this._homeImageLayer.addChild(this._back2);
            this._back3 = BitmapRes.create("task_diguang_png",14,63);
            this._homeImageLayer.addChild(this._back3);
            this._autoBtn = BitmapRes.create("task_autoTask_png",3,0);
            this._autoBtn.touchEnabled = true;
            this._homeImageLayer.addChild(this._autoBtn);
            // this._gouImg = BitmapRes.create("task_gou_png",4,8);
            // this._homeImageLayer.addChild(this._gouImg);
            this._progress = new TaskProgress2(this._homeImageLayer,this._homeLayer);
            this._progress.move(133,73);
            this._res1 = new PlayerResItems2(this._homeImageLayer,this._homeLayer,PlayerResItems2.ICON_SIZE_30);
            this._res1.move(50,136);
            this._res2 = new PlayerResItems2(this._homeImageLayer,this._homeLayer,PlayerResItems2.ICON_SIZE_30);
            this._res2.move(170,136);
            this._passTxt = TextField.create(50,17,0x7C6E62,20,"center","middle");
            this._passTxt.move(0,83);
            this._homeLayer.addChild(this._passTxt);
            this._descTxt = TextField.create(228,31,0xfff7e7,22);
            this._descTxt.move(45,110);
            this._homeLayer.addChild(this._descTxt);
            this._nameTxt = TextField.create(97,26,0xfff7e7,22,"center");
            this._nameTxt.move(40,72);
            this._homeLayer.addChild(this._nameTxt);
            this._group = new eui.Group();
            this._group.x = 22;
            this._group.y = 58;
            this._group.width = 263;
            this._group.height = 114;
            this._homeLayer.addChild(this._group);
            this.addEvent();

            this._drawTask = true;
            this.dispachRender()
			this.checkAutoTask();
        }
        else
        {
            this.removeEvent();
            Manager.pool.push(this._back);
            this._back = null;
            Manager.pool.push(this._back1);
            this._back1 = null;
            Manager.pool.push(this._back2);
            this._back2 = null;
            Manager.pool.push(this._back3);
            this._back3 = null;
            Manager.pool.push(this._autoBtn);
            this._autoBtn = null;
            if(this._gouImg)
            {
                Manager.pool.push(this._gouImg);
                this._gouImg = null;
            }
            this._progress.dispose();
            this._progress = null;
            this._res1.dispose();
            this._res1 = null;
            this._res2.dispose();
            this._res2 = null;
            Manager.pool.push(this._passTxt);
            this._passTxt = null;
            Manager.pool.push(this._descTxt);
            this._descTxt = null;
            Manager.pool.push(this._nameTxt);
            this._nameTxt = null;
            this._homeLayer.removeChild(this._group);
            this._group = null;
			this._tankAniContainer.parent.removeChild(this._tankAniContainer);
			this._tankAniContainer = null;
            if(this._tankAni)
            {
                Manager.pool.push(this._tankAni);
                this._tankAni = null;
            }
            Manager.render.remove(this.draw,this);
        }
    }

	private checkAutoTask():void
	{
		this._isAutoTask = this._model.isAutoTask;

        if(this._isAutoTask)
		{
			if(this._gouImg == null)
			{
				this._gouImg = BitmapRes.create("task_gou_png",4,8);
				this._homeImageLayer.addChild(this._gouImg);
			}
		}
		else
		{
			if(this._gouImg)
			{
				//关闭自动任务
				Manager.pool.push(this._gouImg);
				this._gouImg = null;
			}
		}
	}

    public getGuidePos(name:string = null):egret.Point
    {
        if(name == "autoBtn")return this._autoBtn.parent.localToGlobal(this._autoBtn.x,this._autoBtn.y);
        return this._homeImageLayer.parent.localToGlobal(this._homeImageLayer.x,this._homeImageLayer.y);
    }

	public guide():void
	{
        if(!this._visible)return;
		this.__click(null);
	}

    public guideAutoHook():void
	{
        if(!this._visible)return;
		this.__autoHook(null);
	}

    private dispachRender():void
    {
        Manager.render.add(this.draw,this,0,1);
    }

    private draw():void
    {
        if(this._visible)
        {
            if(this._drawTask)
            {
                this._drawTask = false;
                this.drawTask();
            }
        }
    }

    private __click(e:egret.TouchEvent):void
	{
		if(this._info.status == 0)
		{
			if(this._cvo && this._cvo.panelID != "")
			{
				Manager.link.linkStr(this._cvo.panelID);
				return;
			}
			if(this._cvo.taskType == TaskType.TASK_TYPE_MONSTER)
			{
				if(Manager.model.getGuide().curID == GuideID.TASK || Manager.model.getGuide().curID == GuideID.TASK_NORMAL)Manager.control.getTask().hideGuide();
				if(Manager.model.getMap().getId() == MapConst.ID_HOME)
                {
                    Manager.control.getMap().cmdEnterMap(Manager.model.getTask().curVerseMapID);
                    return;
                }
			}
			if(!this._isAutoTask)
			{
				if(this._cvo.taskType == TaskType.TASK_TYPE_COPY)
				{
					//打开副本界面
					Manager.view.show(ViewID.SysNoticePanel,1);
				}
			}
			else
			{
				if(this._cvo.taskType == TaskType.TASK_TYPE_COPY)
				{
					if(Manager.model.getMap().getId() == MapConst.ID_HOME)
					{
						Manager.control.getCopy().enter(CopyCVO.getCVO(CopyConst.ID_MAIN).id);
					}
				}
				
			}
			return;
		}
		else if(this._info.status == 1)
		{
			Manager.control.getTask().taskCommit(this._info.id);
		}
	}

	private __autoHook(e:egret.TouchEvent):void
	{
		if(!OpenCVO.isOpen(OpenConst.ID_AUTO_TASK, true)) return;
        if(this._isAutoTask)
        {
            if(this._gouImg)
            {
                //关闭自动任务
                Manager.pool.push(this._gouImg);
                this._gouImg = null;
            }
        }
        else
        {
            Manager.tips.showTips(LangCVO.getContent("task2"),null,false);//自动任务开启，获得以下功能：\n1：自动提交任务\n2：自动挑战首领
            if(this._gouImg == null)
            {
                this._gouImg = BitmapRes.create("task_gou_png",4,8);
                this._homeImageLayer.addChild(this._gouImg);
            }
            this.starAuto();
        }
        this._isAutoTask = !this._isAutoTask;
        Manager.model.getTask().isAutoTask = this._isAutoTask;
	}

    //开始自动任务
	private starAuto():void
	{
		if(!Manager.model.self.getAliveFlag())return;//死忙
		if(Manager.model.getMap().getId() == MapConst.ID_HOME)return;////主城
		if(this._cvo && this._info)
		{
			if(this._info.status == 1)
			{
				//自动提交任务
				Manager.control.getTask().taskCommit(this._info.id);
			}
			else if(this._info.status == 0)
			{
				if(this._cvo.type == TaskType.MAIN)
				{
					//主线任务的
					if(this._cvo.taskType == TaskType.TASK_TYPE_COPY)
					{
						if(Manager.model.getItems().bagSurplus <= 5)
						{
							let ok:CallBackInfo = Manager.pool.create(CallBackInfo,this.onClickOkHandler,this);
							Manager.tips.showTips(LangCVO.getContent("task3"),ok,false);
						}
						else this.enterCopy();
					}
				}
			}
		}
	}

	private onClickOkHandler():void
	{
		Manager.model.getBag().quickRonglian();
		this.enterCopy();
	}

	private enterCopy():void
	{
		//进入副本
		let copyId:number = Number(this._cvo.taskTypeValue);
		Manager.control.getCopy().enter(copyId);
	}

    private updateViewHandler(e:TaskEvent):void
	{
        this._drawTask = true;
        this.dispachRender();
	}

    private setTaskDesc(cvo:TaskCvoInfo,info:TaskInfo):void
	{
		let str:string="";
		let arr:Array<TaskChildInfo>=info.infoList;
		let childInfo:TaskChildInfo = arr[0];
		switch(cvo.taskType)
		{
			case TaskType.TASK_TYPE_MONSTER:
				str = childInfo.pro+"/"+childInfo.target_value;
				break;
			case TaskType.TASK_TYPE_ROLELEVE:
				Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL,this.updateTaskDest,this);
                this._model.addEventListener(TaskEvent.TASK_COMPLETE_EVENT,this.removeTaskDestEvent,this);
				str = Manager.model.self.attrInfo.level+"/"+cvo.taskTypeValue;
				break;
			default:
				str = "0/1";
		}
		str = "("+str+")";

		if(info.status==0)
		{
			str = HtmlUtil.addColorTag(str,"0xff0000");
		}
		else if(info.status == 1)
		{
			str = HtmlUtil.addColorTag(LangCVO.getContent("common13"),"0x00ff00");//(完成)
		}
		str = StringUtils.setParam(cvo.desc,str);
		this._descTxt.textFlow = new egret.HtmlTextParser().parse(str);
	}

	private arrSorton(arr:GainLossVO[]):number
	{
		let j:number;
		for(j = 0;j<arr.length;j++)
		{
			//优先显示元宝
			var vo:GainLossVO= arr[j];
			if(vo.type == GainLossVO.GOLD || vo.type == GainLossVO.GOLD_NOTICE)
			{
				return j;
			}
		}
		for(j = 0;j<arr.length;j++)
		{
			//显示金币
			var vo:GainLossVO= arr[j];
			if(vo.type == GainLossVO.COIN || vo.type == GainLossVO.COIN_NOTICE)
			{
				return j;
			}
		}
		for(j = 0;j<arr.length;j++)
		{

			var vo:GainLossVO= arr[j];
			if(vo.type == GainLossVO.EXP || vo.type == GainLossVO.EXP_NOTICE)
			{
				return j;
			}
		}
		return 0;
	}

	private drawTask():void
	{
		let cvo:TaskCvoInfo;
		let info:TaskInfo = this._model.getcurTask();
		if(info)cvo = TaskCVO.getinfo(info.id);
		if(cvo)
		{
			this._cvo = cvo;
			this._info = info;
			let cesc:TaskSectionCvoInfo = TaskCVO.getVerselInfo(cvo.chapter);
			if(this._cvo.verse < 100)this._passTxt.size = 22;
			else this._passTxt.size = 17;
			this._passTxt.text = "" + this._cvo.verse;
			this._nameTxt.text = cesc.name;
			let pro:number = TaskCVO.getVerselComplete(cvo.chapter);
			this._progress.setData(pro,cesc.taskCount);
			this.setTaskDesc(this._cvo,info);
			let rewArr:Array<string> = cvo.rewards.split("|");
			let voArr:Array<GainLossVO>=[]
			for(let obj of rewArr)
			{
				if(obj.indexOf("item")>0)
				{
					continue;
				}
				var vo:GainLossVO = new GainLossVO(obj);
				voArr.push(vo)
			}
			let index:number = this.arrSorton(voArr);

			if(voArr[index])//!ObjectUtil.diff(this._curValue1, voArr[index])
			{
				this._curValue1 = voArr[index];
				this._res1.setData(voArr[index]);
			}
			voArr.splice(index,1);
			index = this.arrSorton(voArr);
			if(voArr[index])//if(!ObjectUtil.diff(this._curValue2, voArr[index]))
			{
				this._curValue2 = voArr[index];
				this._res2.setData(voArr[index]);
			}

					if(this._isAutoTask)this.starAuto();

			if(this._cvo.effect==1 || (this._info.status == 1 && this._isAutoTask== false))
			{
				if(this._tankAni==null)
				{
					this._tankAni = Manager.animation.createEffectAnimation("taskrank");
					this._tankAni.x = this._group.x;
					this._tankAni.y = this._group.y;
                    this._tankAniContainer.addChild(this._tankAni);
				}
			}
			else
			{
				if(this._tankAni)
				{
                    Manager.pool.push(this._tankAni);
                    this._tankAni = null;
				}
			}
			// if(!this.visible) this.visible = true;
		}
		else
		{
			Trace.trace("------找不到主线任务--------")
			this.switch(false);
		}
	}
	private updateTaskDest():void
	{
        if(this._visible && this._info)this.setTaskDesc(this._cvo,this._info);
	}

	private removeTaskDestEvent(e:BaseEvent):void
	{
		let cvo:TaskCvoInfo = TaskCVO.getinfo(e.params);
		if(cvo)
		{
			switch(cvo.taskType)
			{
				case TaskType.TASK_TYPE_ROLELEVE:
					Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL,this.updateTaskDest,this);
					break;
			}
		}
		this._model.removeEventListener(TaskEvent.TASK_COMPLETE_EVENT,this.removeTaskDestEvent,this);
	}

}