/**
 * 主界面右上角小地图视图
 * luzh
 * create 2018.2.27
 * @update 2018-04-17
*/
class MiniMap
{
    private _homeImageLayer:egret.DisplayObjectContainer;
    private _homeLayer:egret.DisplayObjectContainer;

    private _back1:BitmapRes;
    private _homeIcon:BitmapRes;
    private _back2:BitmapRes;
    private _back3:BitmapRes;
    private _mapName:TextField;
    private _mapValue:TextField;
    private _mapInfoSp:eui.Group;
    // private _mapAniSp:eui.Group;
    private _drawTask:boolean;

    private _visible:boolean;
    private _cvo:MapCVO;

    private _fight:Animation;

    private static isFirstInit:boolean;


    public constructor(homeImageLayer:egret.DisplayObjectContainer,homeLayer:egret.DisplayObjectContainer)
    {
        this._homeImageLayer = ObjectUtil.createConainer();
        homeImageLayer.addChild(this._homeImageLayer);
        this._homeLayer = ObjectUtil.createConainer();
        homeLayer.addChild(this._homeLayer);
        this._visible = false;
    }

    private addEvent():void
    {
		this._mapInfoSp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getTask().addEventListener(TaskEvent.TASK_UPDATE_EVENT,this.onTaskUpdateHandler,this);
        Manager.model.getTask().addEventListener(TaskEvent.TASK_INIT_EVENT,this.onTaskUpdateHandler,this);
    }

    private removeEvent():void
    {
		this._mapInfoSp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
		Manager.model.getTask().removeEventListener(TaskEvent.TASK_UPDATE_EVENT,this.onTaskUpdateHandler,this);
        Manager.model.getTask().removeEventListener(TaskEvent.TASK_INIT_EVENT,this.onTaskUpdateHandler,this);
    }


    public layout(gameWidth:number,gameHeight:number):void
    {
        this._homeImageLayer.x = gameWidth - 302;
        this._homeImageLayer.y = 0;
        this._homeLayer.x = this._homeImageLayer.x;
        this._homeLayer.y = this._homeImageLayer.y;
    }

    public switch(visible:boolean):void
    {
        if(this._visible == visible)return;
        this._visible = visible;
        if(this._visible)
        {
            this._drawTask = true;
            this._back1 = BitmapRes.create("main_mapBack_png",0,0,302,120);
            this._homeImageLayer.addChild(this._back1);
            // this._homeIcon = BitmapRes.create("main_mapHome_png",209,9);
            // this._homeImageLayer.addChild(this._homeIcon);
            this._back2 = BitmapRes.create("main_mapIcon2_png",41,36,38,38);
            this._homeImageLayer.addChild(this._back2);
            this._back3 = BitmapRes.create("main_mapIcon1_png",39,67,45,45);
            this._homeImageLayer.addChild(this._back3);
            this._mapName = TextField.create(150,26,0xffffff,24,"center");
            this._mapName.move(40,10);
            this._homeLayer.addChild(this._mapName);
            this._mapValue = TextField.create(119,55,0xffffff,20);
            this._mapValue.lineSpacing = 14;
            this._mapValue.move(77,44);
            this._homeLayer.addChild(this._mapValue);
            this._mapInfoSp = new eui.Group();
            this._mapInfoSp.touchEnabled = true;
            this._mapInfoSp.width = 156;
            this._mapInfoSp.height = 100;
            this._mapInfoSp.x = 40;
            this._mapInfoSp.y = 3;
            this._homeLayer.addChild(this._mapInfoSp);
            this.addEvent();
            // this._mapAniSp = new eui.Group();
            // this._mapAniSp.width = 93;
            // this._mapAniSp.height = 102;
            // this._mapAniSp.x = 209;
            // this._mapAniSp.y = 9;
            // this._homeLayer.addChild(this._mapAniSp);
            Manager.render.add(this.draw,this,0,1);
        }
        else
        {
            this.removeEvent();
            Manager.pool.push(this._back1);
            this._back1 = null;
            if(this._homeIcon)
            {
                Manager.pool.push(this._homeIcon);
                this._homeIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                this._homeIcon = null;
            }
            Manager.pool.push(this._back2);
            this._back2 = null;
            Manager.pool.push(this._back3);
            this._back3 = null;
            Manager.pool.push(this._mapName);
            this._mapName = null;
            Manager.pool.push(this._mapValue);
            this._mapValue = null;
            this._mapInfoSp.parent.removeChild(this._mapInfoSp);
            this._mapInfoSp = null;
        //    this._mapAniSp.parent.removeChild(this._mapAniSp);
        //     this._mapAniSp = null;
            if(this._fight)
            {
                Manager.pool.push(this._fight);
                this._fight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                this._fight = null;
            }
            Manager.render.remove(this.draw,this);
            this._cvo = null;
        }
    }

    public onEnterMap(cvo:MapCVO):void
    {
        if(this._cvo == cvo)return;
        this._cvo = cvo;
        if(this._cvo)
        {
            this._mapName.text = this._cvo.name;
			if(Manager.model.getMap().getId() != MapConst.ID_HOME)
			{
                if(this._fight)
                {
                    Manager.pool.push(this._fight);
                    this._fight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                    this._fight = null;
                }
                if(this._homeIcon == null)
                {
                    this._homeIcon = BitmapRes.create("main_mapHome_png",209,9);
                    this._homeIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                    this._homeIcon.touchEnabled = true;
                    this._homeImageLayer.addChild(this._homeIcon);
                }
			}
            else
            {
                if(this._homeIcon)
                {
                    this._homeIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                    Manager.pool.push(this._homeIcon);
                    this._homeIcon = null;
                }
                if(this._fight == null)
                {
                    this._fight = Manager.animation.createEffectAnimation("uifighting");
                    this._fight.touchEnabled = true;
                    this._fight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                    this._fight.move(209-75,9-75);
                    this._homeLayer.addChild(this._fight);
                }
            }

            let verMapID:number = Manager.model.getTask().curVerseMapID;
			let verMapCVO:MapCVO = MapCVO.getCVO(verMapID);
			if(verMapCVO)
			{
                if(!MiniMap.isFirstInit)MiniMap.isFirstInit = true;
                else if(this._cvo.isFieldMap) 
                {
                    //当前地图是野外地图，且有上一章节地图时提示打野效率
                    let lastVerseMapID:number = verMapID-1;
                    let lastVerseMapCVO:MapCVO = MapCVO.getCVO(lastVerseMapID);
                    if(lastVerseMapCVO && lastVerseMapCVO.isFieldMap)
                    {
                        Manager.control.getDrop().showEfficiencyAlert(lastVerseMapCVO.silverPerhour, lastVerseMapCVO.expPerHour, verMapCVO.silverPerhour, verMapCVO.expPerHour);
                    }
                    else
                    {
                        Manager.control.getDrop().showEfficiencyAlert(0, 0, verMapCVO.silverPerhour, verMapCVO.expPerHour);
                    }
                }
			}
        }
    }

	private onClickHandler(e:egret.TouchEvent):void
	{
		let cvo:DailyActivityCVO;
		switch(e.currentTarget)
		{
			case this._mapInfoSp:
				Manager.view.show(ViewID.MapPanel);
				break;
            case this._homeIcon:
			case this._fight:
				if(Manager.model.getTraining().trainingType != 0)
				{
					FloatTips.addTips(LangCVO.getContent("training7"), Color.RED);
					return;
				}
				if(Manager.model.getMap().getId() != MapConst.ID_HOME)
				 	Manager.control.getMap().cmdEnterMap(MapConst.ID_HOME);
				else
					Manager.control.getMap().cmdEnterMap(Manager.model.getTask().curVerseMapID);
			break;
		}
	}

	private onTaskUpdateHandler(e:TaskEvent):void
	{
		// this.invalidate("drawTask");
        this._drawTask = true;
        Manager.render.add(this.draw,this,0,1);
	}

    private draw():void
    {
        if(this._visible)
        {
            if(this._drawTask)this.drawTask();
        }
        this._drawTask = false;
    }

	private drawTask():void
	{
		let verMapID:number = Manager.model.getTask().curVerseMapID;
		let verMapCVO:MapCVO = MapCVO.getCVO(verMapID);
		if(verMapCVO)
		{
			let str:string = /*GameUtil.getNumShortStr(verMapCVO.expPerHour)*/verMapCVO.expPerHour+LangCVO.getContent("common35");//分钟
			str += "\n" + /*GameUtil.getNumShortStr(verMapCVO.silverPerhour)*/verMapCVO.silverPerhour+LangCVO.getContent("common35");//分钟
			HtmlUtil.setTextFlow(this._mapValue, str);
		}
	}
}