/**
 * 传功
 */
class TrainingModel extends egret.EventDispatcher
{
    public static CENTER_POINT:egret.Point = new egret.Point(2490, 1710);
    public static TRAINING_TIME:number = 360;
    private _activityInfo:DailyActivityCVO;
    public trainingType:number = 0;
    public trainingEndTime:number = 0;
    public trainingPos:number = 0;

    private _roleInfo:PlayerGameObjectInfo;
    private _posInfo:TrainingPosCVO;

    private _self:SelfGameObjectInfo;
    private _trainingPoint:egret.Point;
    private _trainingRadius:number;

    public needInitUpdateView:boolean = false;
    public isfindPoint:boolean = false;
    private _isJump:boolean = false;
    private _isJumped:boolean = false;

    private _checkTime:number;
    private _isInitEvent:boolean = false;

    public isToTraining:boolean = false;

    public constructor()
    {
        super();

        this._self = Manager.model.self;

        this._trainingPoint = TrainingCVO.regionInfo.trainingPoint;
        this._trainingRadius = TrainingCVO.regionInfo.trainingRadius;

        // //初始化执行一次，防止数据接收先后顺序引起问题
        // Manager.model.getTask().addEventListener(TaskEvent.TASK_UPDATE_EVENT, this.onTaskInitedHandler, this);
        Manager.model.getActIcon().addEventListener(ActIconEvent.LIST_UPDATE, this.onUpdateActivityStatusHandler, this);
    }

    // private onTaskInitedHandler(e:TaskEvent):void
    // {
    //     Manager.model.getTask().removeEventListener(TaskEvent.TASK_UPDATE_EVENT, this.onTaskInitedHandler, this);
    //     Manager.model.getGameobject().setTrainingEffect(this.info.status == DailyActivityCVO.STATE_IN);
    // }

    private onUpdateActivityStatusHandler(e:ActIconEvent):void
    {
        Manager.model.getGameobject().setTrainingEffect(this.info.status == DailyActivityCVO.STATE_IN);
    }

    public addRender():void
    {
        if(!this._isInitEvent)
        {
            this._isInitEvent = true;
            Manager.model.self.addEventListener(GameObjectEvent.GO_POSITION, this.onSelfPositionUpdate, this);
            this._checkTime = egret.getTimer();
            // this.trainingHandler();
            Manager.render.add(this.initUpdateSelfPos, this, 100);
        }
    }

    public removeRender():void
    {
        if(this._isInitEvent)
        {
            this._isInitEvent = false;
            Manager.model.self.removeEventListener(GameObjectEvent.GO_POSITION, this.onSelfPositionUpdate, this);
        }
    }

    private initUpdateSelfPos():void
    {
        if(this._self.x != 0 || this._self.y != 0)
        {
            Manager.render.remove(this.initUpdateSelfPos, this);
            this.trainingHandler();
        }
    }

    private onSelfPositionUpdate(e:GameObjectEvent):void
    {
        if(egret.getTimer() - this._checkTime < 300) return;
        this._checkTime = egret.getTimer();
        this.trainingHandler();
    }

    public trainingHandler():void
    {
        if(this.info.status != DailyActivityCVO.STATE_IN || !this.info.isAllCondSatisfy()) return;
        let status:boolean;
        if(Manager.model.getMap().getId() == MapConst.ID_HOME && Math.sqrt(Math.pow((this._self.x - this._trainingPoint.x),2) + Math.pow((this._self.y - this._trainingPoint.y),2)) <= this._trainingRadius)
        {
            if(!this.info.isPlayed || this.info.isPlayed && this.trainingType != 0)
            {
                status = false;
                Manager.view.show(ViewID.ChuangongView);
            }
            else
            {
                status = true;
                Manager.view.hide(ViewID.ChuangongView);
            }

            if(this.needInitUpdateView)
            {
                this.dispatchEvent(new TrainingEvent(TrainingEvent.DATA_UPDATE));
                if(this.trainingType != 0)
                {
                    Manager.model.getLogin().home.switch(HomeView2.FIRST_CHARGE,status);
                    Manager.model.getLogin().home.switch(HomeView2.SYSNOTICE_ITEM,status);
                    Manager.model.getLogin().home.switch(HomeView2.TASK,status);
                    this.dispatchEvent(new TrainingEvent(TrainingEvent.TYPE_UPDATE));
                }
            }
            Manager.model.getLogin().home.switch(HomeView2.TOP_ICON,status);
        }
        else
        {
            status = true;
            Manager.view.hide(ViewID.ChuangongView);
        }

        if(Manager.model.getMap().mapCVO.isFieldMap || Manager.model.getMap().mapCVO.isMainMap)
        {
            // ObjectUtil.addOrRemove(Manager.model.getLogin().homeView.firstCharge, Manager.model.getLogin().homeView, status);
            Manager.model.getLogin().home.switch(HomeView2.FIRST_CHARGE,status);
            Manager.model.getLogin().home.switch(HomeView2.SYSNOTICE_ITEM,status);
            Manager.model.getLogin().home.switch(HomeView2.TASK,status);
            Manager.model.getLogin().home.switch(HomeView2.RIGHT_ICON,status);
        }
        
        if(this.isfindPoint && Manager.model.getMap().getId() == MapConst.ID_HOME)
        {
            if(!this._isJump) this._isJump = this._self.isingState(BodyStateManger.ISING_JUMP);
            if(this._isJump) Manager.render.add(this.checkJumpComplete, this, 100);
        }
    }

    private checkJumpComplete():void
    {
        this._isJumped = !this._self.isingState(BodyStateManger.ISING_JUMP);
        if(this._isJumped)
        {
            Manager.render.remove(this.checkJumpComplete, this);
            this.isfindPoint = false;
            this._isJump = false;
            this._isJumped = false;
            Manager.walk.moveTo(this.getTrainingPos());
        }
    }

    private getTrainingPos():egret.Point
    {
        let basePoint:egret.Point = TrainingCVO.regionInfo.trainingPoint;
        let xx:number = basePoint.x - TrainingCVO.regionInfo.trainingRadius + 200;
        let yy:number = basePoint.y - TrainingCVO.regionInfo.trainingRadius + 200;
        let tmpX:number = Math.round(xx + (TrainingCVO.regionInfo.trainingRadius * 2 - 400) * Math.random());
        let tmpY:number = Math.round(yy + (TrainingCVO.regionInfo.trainingRadius * 2 - 400) * Math.random());
        return new egret.Point(tmpX, tmpY);
    }

    public get info():DailyActivityCVO
    {
        if(!this._activityInfo)
            this._activityInfo = DailyActivityCVO.getCVO(ActIconID.TRAINING);
        return this._activityInfo;
    }

    public updateInfo(isPlayed:boolean):void
    {
        this.info.isPlayed = isPlayed;

        this.dispatchEvent(new TrainingEvent(TrainingEvent.INFO_UPDATE));
    }

    public updateStatus(trainingType:number, trainingEndTime:number, trainingPos:number):void
    {
        this.trainingType = trainingType;
        if(trainingEndTime != 0)
            trainingEndTime = Math.round(trainingEndTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if(trainingEndTime < 0) trainingEndTime = 0;
        this.trainingEndTime = trainingEndTime;
        this.trainingPos = trainingPos;

        Manager.model.self.attrInfo.trainingType = trainingType;
        Manager.model.self.attrInfo.trainingPos = trainingPos;

        if(this.trainingType != 0)
            this.updateTrainingType(this.trainingType, this.trainingPos, trainingEndTime);
        else
            this.isToTraining = false;
        
        this.needInitUpdateView = true;
        this.dispatchEvent(new TrainingEvent(TrainingEvent.DATA_UPDATE));

        this.trainingHandler();
    }

    public updateTrainingType(type:number, id:number, time:number = 360):void
    {
        // if(!this.info || this.info.status != DailyActivityCVO.STATE_IN) return;
        if(type == 0) return;

        Manager.model.self.stopWalk();
        this.isToTraining = true;

        // ObjectUtil.addOrRemove(Manager.model.getLogin().homeView.firstCharge, Manager.model.getLogin().homeView, false);
        Manager.model.getLogin().home.switch(HomeView2.FIRST_CHARGE,false);
        Manager.model.getLogin().home.switch(HomeView2.SYSNOTICE_ITEM,false);
        Manager.model.getLogin().home.switch(HomeView2.TASK,false);
        // ObjectUtil.addOrRemove(Manager.model.getLogin().homeView.rightIconGroup, Manager.model.getLogin().homeView, false);
        // Manager.model.getLogin().homeView.setShow(false);

        Manager.model.self.isTraining(false);
        if(type == 1)
        {
            this.setPlayerSitHandler(Manager.model.self);
            this.dispatchEvent(new TrainingEvent(TrainingEvent.TYPE_UPDATE, time));
        }
        else
        {
            this._tempTime = time;
            this._posInfo = TrainingCVO.getPosInfo(id);
            if(this.trainingType == type)
                this.moveToTargetComplete();
            else
                if(this._posInfo)
                    Manager.walk.moveTo(this._posInfo.pos, this.moveToTargetComplete, this, MapConst.ID_HOME);
        }
    }

    private _tempTime:number = 0;
    private moveToTargetComplete():void
    {
        this.setPlayerSitHandler(Manager.model.self);
        this.dispatchEvent(new TrainingEvent(TrainingEvent.TYPE_UPDATE, this._tempTime));
        Manager.model.getTraining().isToTraining = false;
        Manager.control.getTraining().trainingCommit();
    }

    public setPlayerSitHandler(roleInfo:PlayerGameObjectInfo):void
    {
        if(!roleInfo) return;
        this._roleInfo = roleInfo;
        this._roleInfo.isSetTraining = false;
        Manager.render.add(this.updateRoleInfo, this, 100);
    }

    private updateRoleInfo():void
    {
        if(!this._roleInfo.isSetTraining)
            this.updateRoleStatus();
        else
            Manager.render.remove(this.updateRoleInfo, this);
    }

    private updateRoleStatus():void
    {
        this._roleInfo.isTraining(true);
        if(this.trainingType != 1)
        {
            if(this._posInfo)
                this._roleInfo.setDirection(this._posInfo.direction);
            else
            {
                if(this._roleInfo.attrInfo)
                {
                    let posInfo:TrainingPosCVO = TrainingCVO.getPosInfo(this._roleInfo.attrInfo.trainingPos);
                    if(posInfo) this._roleInfo.setDirection(posInfo.direction);
                }
            }
        }
    }

    public updateActivityEnd():void
    {
        this.trainingType = 0;
        this.trainingEndTime = 0;
        this.trainingPos = 0;
        this._isInitEvent = false;
        Manager.model.self.isTraining(false);

        Manager.view.hide(ViewID.ChuangongView);

        // ObjectUtil.addOrRemove(Manager.model.getLogin().homeView.firstCharge, Manager.model.getLogin().homeView, true);
        Manager.model.getLogin().home.switch(HomeView2.FIRST_CHARGE,true);
        Manager.model.getLogin().home.switch(HomeView2.SYSNOTICE_ITEM,true);
        Manager.model.getLogin().home.switch(HomeView2.TASK,true);
        Manager.model.getLogin().home.switch(HomeView2.RIGHT_ICON,true);
        Manager.model.getLogin().home.switch(HomeView2.TOP_ICON,true);

        this.dispatchEvent(new TrainingEvent(TrainingEvent.DATA_UPDATE));
    }
}