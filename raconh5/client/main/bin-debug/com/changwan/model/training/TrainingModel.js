var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 传功
 */
var TrainingModel = (function (_super) {
    __extends(TrainingModel, _super);
    function TrainingModel() {
        var _this = _super.call(this) || this;
        _this.trainingType = 0;
        _this.trainingEndTime = 0;
        _this.trainingPos = 0;
        _this.needInitUpdateView = false;
        _this.isfindPoint = false;
        _this._isJump = false;
        _this._isJumped = false;
        _this._isInitEvent = false;
        _this.isToTraining = false;
        _this._tempTime = 0;
        _this._self = Manager.model.self;
        _this._trainingPoint = TrainingCVO.regionInfo.trainingPoint;
        _this._trainingRadius = TrainingCVO.regionInfo.trainingRadius;
        // //初始化执行一次，防止数据接收先后顺序引起问题
        // Manager.model.getTask().addEventListener(TaskEvent.TASK_UPDATE_EVENT, this.onTaskInitedHandler, this);
        Manager.model.getActIcon().addEventListener(ActIconEvent.LIST_UPDATE, _this.onUpdateActivityStatusHandler, _this);
        return _this;
    }
    // private onTaskInitedHandler(e:TaskEvent):void
    // {
    //     Manager.model.getTask().removeEventListener(TaskEvent.TASK_UPDATE_EVENT, this.onTaskInitedHandler, this);
    //     Manager.model.getGameobject().setTrainingEffect(this.info.status == DailyActivityCVO.STATE_IN);
    // }
    TrainingModel.prototype.onUpdateActivityStatusHandler = function (e) {
        Manager.model.getGameobject().setTrainingEffect(this.info.status == DailyActivityCVO.STATE_IN);
    };
    TrainingModel.prototype.addRender = function () {
        if (!this._isInitEvent) {
            this._isInitEvent = true;
            Manager.model.self.addEventListener(GameObjectEvent.GO_POSITION, this.onSelfPositionUpdate, this);
            this._checkTime = egret.getTimer();
            // this.trainingHandler();
            Manager.render.add(this.initUpdateSelfPos, this, 100);
        }
    };
    TrainingModel.prototype.removeRender = function () {
        if (this._isInitEvent) {
            this._isInitEvent = false;
            Manager.model.self.removeEventListener(GameObjectEvent.GO_POSITION, this.onSelfPositionUpdate, this);
        }
    };
    TrainingModel.prototype.initUpdateSelfPos = function () {
        if (this._self.x != 0 || this._self.y != 0) {
            Manager.render.remove(this.initUpdateSelfPos, this);
            this.trainingHandler();
        }
    };
    TrainingModel.prototype.onSelfPositionUpdate = function (e) {
        if (egret.getTimer() - this._checkTime < 300)
            return;
        this._checkTime = egret.getTimer();
        this.trainingHandler();
    };
    TrainingModel.prototype.trainingHandler = function () {
        if (this.info.status != DailyActivityCVO.STATE_IN || !this.info.isAllCondSatisfy())
            return;
        var status;
        if (Manager.model.getMap().getId() == MapConst.ID_HOME && Math.sqrt(Math.pow((this._self.x - this._trainingPoint.x), 2) + Math.pow((this._self.y - this._trainingPoint.y), 2)) <= this._trainingRadius) {
            if (!this.info.isPlayed || this.info.isPlayed && this.trainingType != 0) {
                status = false;
                Manager.view.show(81 /* ChuangongView */);
            }
            else {
                status = true;
                Manager.view.hide(81 /* ChuangongView */);
            }
            if (this.needInitUpdateView) {
                this.dispatchEvent(new TrainingEvent(TrainingEvent.DATA_UPDATE));
                if (this.trainingType != 0) {
                    Manager.model.getLogin().home.switch(HomeView2.FIRST_CHARGE, status);
                    Manager.model.getLogin().home.switch(HomeView2.SYSNOTICE_ITEM, status);
                    Manager.model.getLogin().home.switch(HomeView2.TASK, status);
                    this.dispatchEvent(new TrainingEvent(TrainingEvent.TYPE_UPDATE));
                }
            }
            Manager.model.getLogin().home.switch(HomeView2.TOP_ICON, status);
        }
        else {
            status = true;
            Manager.view.hide(81 /* ChuangongView */);
        }
        if (Manager.model.getMap().mapCVO.isFieldMap || Manager.model.getMap().mapCVO.isMainMap) {
            // ObjectUtil.addOrRemove(Manager.model.getLogin().homeView.firstCharge, Manager.model.getLogin().homeView, status);
            Manager.model.getLogin().home.switch(HomeView2.FIRST_CHARGE, status);
            Manager.model.getLogin().home.switch(HomeView2.SYSNOTICE_ITEM, status);
            Manager.model.getLogin().home.switch(HomeView2.TASK, status);
            Manager.model.getLogin().home.switch(HomeView2.RIGHT_ICON, status);
        }
        if (this.isfindPoint && Manager.model.getMap().getId() == MapConst.ID_HOME) {
            if (!this._isJump)
                this._isJump = this._self.isingState(BodyStateManger.ISING_JUMP);
            if (this._isJump)
                Manager.render.add(this.checkJumpComplete, this, 100);
        }
    };
    TrainingModel.prototype.checkJumpComplete = function () {
        this._isJumped = !this._self.isingState(BodyStateManger.ISING_JUMP);
        if (this._isJumped) {
            Manager.render.remove(this.checkJumpComplete, this);
            this.isfindPoint = false;
            this._isJump = false;
            this._isJumped = false;
            Manager.walk.moveTo(this.getTrainingPos());
        }
    };
    TrainingModel.prototype.getTrainingPos = function () {
        var basePoint = TrainingCVO.regionInfo.trainingPoint;
        var xx = basePoint.x - TrainingCVO.regionInfo.trainingRadius + 200;
        var yy = basePoint.y - TrainingCVO.regionInfo.trainingRadius + 200;
        var tmpX = Math.round(xx + (TrainingCVO.regionInfo.trainingRadius * 2 - 400) * Math.random());
        var tmpY = Math.round(yy + (TrainingCVO.regionInfo.trainingRadius * 2 - 400) * Math.random());
        return new egret.Point(tmpX, tmpY);
    };
    Object.defineProperty(TrainingModel.prototype, "info", {
        get: function () {
            if (!this._activityInfo)
                this._activityInfo = DailyActivityCVO.getCVO(ActIconID.TRAINING);
            return this._activityInfo;
        },
        enumerable: true,
        configurable: true
    });
    TrainingModel.prototype.updateInfo = function (isPlayed) {
        this.info.isPlayed = isPlayed;
        this.dispatchEvent(new TrainingEvent(TrainingEvent.INFO_UPDATE));
    };
    TrainingModel.prototype.updateStatus = function (trainingType, trainingEndTime, trainingPos) {
        this.trainingType = trainingType;
        if (trainingEndTime != 0)
            trainingEndTime = Math.round(trainingEndTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000);
        if (trainingEndTime < 0)
            trainingEndTime = 0;
        this.trainingEndTime = trainingEndTime;
        this.trainingPos = trainingPos;
        Manager.model.self.attrInfo.trainingType = trainingType;
        Manager.model.self.attrInfo.trainingPos = trainingPos;
        if (this.trainingType != 0)
            this.updateTrainingType(this.trainingType, this.trainingPos, trainingEndTime);
        else
            this.isToTraining = false;
        this.needInitUpdateView = true;
        this.dispatchEvent(new TrainingEvent(TrainingEvent.DATA_UPDATE));
        this.trainingHandler();
    };
    TrainingModel.prototype.updateTrainingType = function (type, id, time) {
        if (time === void 0) { time = 360; }
        // if(!this.info || this.info.status != DailyActivityCVO.STATE_IN) return;
        if (type == 0)
            return;
        Manager.model.self.stopWalk();
        this.isToTraining = true;
        // ObjectUtil.addOrRemove(Manager.model.getLogin().homeView.firstCharge, Manager.model.getLogin().homeView, false);
        Manager.model.getLogin().home.switch(HomeView2.FIRST_CHARGE, false);
        Manager.model.getLogin().home.switch(HomeView2.SYSNOTICE_ITEM, false);
        Manager.model.getLogin().home.switch(HomeView2.TASK, false);
        // ObjectUtil.addOrRemove(Manager.model.getLogin().homeView.rightIconGroup, Manager.model.getLogin().homeView, false);
        // Manager.model.getLogin().homeView.setShow(false);
        Manager.model.self.isTraining(false);
        if (type == 1) {
            this.setPlayerSitHandler(Manager.model.self);
            this.dispatchEvent(new TrainingEvent(TrainingEvent.TYPE_UPDATE, time));
        }
        else {
            this._tempTime = time;
            this._posInfo = TrainingCVO.getPosInfo(id);
            if (this.trainingType == type)
                this.moveToTargetComplete();
            else if (this._posInfo)
                Manager.walk.moveTo(this._posInfo.pos, this.moveToTargetComplete, this, MapConst.ID_HOME);
        }
    };
    TrainingModel.prototype.moveToTargetComplete = function () {
        this.setPlayerSitHandler(Manager.model.self);
        this.dispatchEvent(new TrainingEvent(TrainingEvent.TYPE_UPDATE, this._tempTime));
        Manager.model.getTraining().isToTraining = false;
        Manager.control.getTraining().trainingCommit();
    };
    TrainingModel.prototype.setPlayerSitHandler = function (roleInfo) {
        if (!roleInfo)
            return;
        this._roleInfo = roleInfo;
        this._roleInfo.isSetTraining = false;
        Manager.render.add(this.updateRoleInfo, this, 100);
    };
    TrainingModel.prototype.updateRoleInfo = function () {
        if (!this._roleInfo.isSetTraining)
            this.updateRoleStatus();
        else
            Manager.render.remove(this.updateRoleInfo, this);
    };
    TrainingModel.prototype.updateRoleStatus = function () {
        this._roleInfo.isTraining(true);
        if (this.trainingType != 1) {
            if (this._posInfo)
                this._roleInfo.setDirection(this._posInfo.direction);
            else {
                if (this._roleInfo.attrInfo) {
                    var posInfo = TrainingCVO.getPosInfo(this._roleInfo.attrInfo.trainingPos);
                    if (posInfo)
                        this._roleInfo.setDirection(posInfo.direction);
                }
            }
        }
    };
    TrainingModel.prototype.updateActivityEnd = function () {
        this.trainingType = 0;
        this.trainingEndTime = 0;
        this.trainingPos = 0;
        this._isInitEvent = false;
        Manager.model.self.isTraining(false);
        Manager.view.hide(81 /* ChuangongView */);
        // ObjectUtil.addOrRemove(Manager.model.getLogin().homeView.firstCharge, Manager.model.getLogin().homeView, true);
        Manager.model.getLogin().home.switch(HomeView2.FIRST_CHARGE, true);
        Manager.model.getLogin().home.switch(HomeView2.SYSNOTICE_ITEM, true);
        Manager.model.getLogin().home.switch(HomeView2.TASK, true);
        Manager.model.getLogin().home.switch(HomeView2.RIGHT_ICON, true);
        Manager.model.getLogin().home.switch(HomeView2.TOP_ICON, true);
        this.dispatchEvent(new TrainingEvent(TrainingEvent.DATA_UPDATE));
    };
    TrainingModel.CENTER_POINT = new egret.Point(2490, 1710);
    TrainingModel.TRAINING_TIME = 360;
    return TrainingModel;
}(egret.EventDispatcher));
__reflect(TrainingModel.prototype, "TrainingModel");
//# sourceMappingURL=TrainingModel.js.map