var Action = /** @class */ (function () {
    /** 宠物render一直存在，其他用到的时候添加不用的时候移除 */
    function Action() {
        this.SPRINT_SPEED = 950;
        this.SLIDE_SPEED = 800;
        this.OVER_WATER_SPEED = 800;
    }
    Action.prototype.reuse = function (info) {
        this._path = [];
        this._info = info;
        if (this._info.getAliveFlag())
            this._info.setActionStr(FigureAction.STAND);
        else
            this._info.setActionStr(FigureAction.DEAD);
        if (this.isPetInfo)
            this.addRenderTick();
    };
    Action.prototype.unuse = function () {
        this._info = null;
        // egret.stopTick(this.render,this);
        Manager.render.remove(this.render, this);
        this._path.length = 0;
        this._path = null;
        this._target = null;
        this._complete = null;
        this._completeTarget = null;
        this._finishPos = null;
        this._totalTime = 0;
        this._stepX = 0;
        this._stepY = 0;
        this._tempX = 0;
        this._tempY = 0;
        this._walkType = 0;
    };
    Object.defineProperty(Action.prototype, "isPetInfo", {
        get: function () {
            return (this._info instanceof PetGameObjectInfo);
        },
        enumerable: true,
        configurable: true
    });
    Action.prototype.getWalkTarget = function () {
        return this._target;
    };
    Action.prototype.addRenderTick = function () {
        // this._lastTickTime = egret.getTimer();
        // egret.startTick(this.render,this);
        Manager.render.add(this.render, this);
    };
    /**
     * 走路
     */
    Action.prototype.walk = function (path, walkType, complete, completeTarget) {
        this._path = path.concat();
        this._target = path[path.length - 1];
        this._walkType = walkType;
        this._complete = complete;
        this._completeTarget = completeTarget;
        this._stepX = 0;
        this._stepY = 0;
        this._tempX = 0;
        this._tempY = 0;
        this._totalTime = 0;
        if (!this.isPetInfo)
            this.addRenderTick();
        this.newWalkInitialize();
    };
    /**
     * 停止走路
     */
    Action.prototype.stopWalk = function () {
        this._walkType = 0;
        // if(!this.isPetInfo) egret.stopTick(this.render,this);
        if (!this.isPetInfo)
            Manager.render.remove(this.render, this);
        if (this._info instanceof PlayerGameObjectInfo && this._info.needCanYing)
            this._info.needCanYing = false;
        if (this._info.isingState(BodyStateManger.ISING_JUMP))
            this._info.finishJump();
        if (this._info.isingState(BodyStateManger.ISING_SPRINT))
            this._info.updateIsingState(BodyStateManger.ISING_SPRINT, false);
        if (this._info.isingState(BodyStateManger.ISING_SLIDE))
            this._info.updateIsingState(BodyStateManger.ISING_SLIDE, false);
        if (this._info.isingState(BodyStateManger.ISING_KITE))
            this._info.updateIsingState(BodyStateManger.ISING_KITE, false);
        if (this._info.isingState(BodyStateManger.ISING_WATER))
            this._info.updateIsingState(BodyStateManger.ISING_WATER, false);
        if (this._info.getAliveFlag()) {
            if (!FigureAction.isAttackAction(this._info.getActionStr())) {
                this._info.setActionStr(FigureAction.STAND);
            }
        }
        else
            this._info.setActionStr(FigureAction.DEAD);
    };
    Action.prototype.newWalkInitialize = function () {
        if (this._path.length <= 1) {
            this._info.updatePostion(this._target.x, this._target.y);
            this.walkComplete();
        }
        else {
            if (this._walkType == WalkType.SPRINT) {
                this._info.needCanYing = true;
                if (this._info.isType(GameObjectType.SELF))
                    this._info.updateIsingState(BodyStateManger.ISING_SPRINT, true);
                this._info.setActionStr(FigureAction.JUMP);
            }
            else if (this._walkType == WalkType.WALK)
                this._info.setActionStr(FigureAction.WALK);
            else if (this._walkType == WalkType.SLIDE)
                this._info.setActionStr(FigureAction.SLIDE);
            else if (this._walkType == WalkType.KITE)
                this._info.setActionStr(FigureAction.KITE);
            else
                this._info.setActionStr(FigureAction.WATER);
            // this._info.setActionStr((this._walkType == WalkType.SPRINT) ? FigureAction.JUMP : FigureAction.WALK);
            if (this._info.x == this._path[0].x && this._info.y == this._path[0].y)
                this._path.shift();
            this.initSpeed(this._path.shift());
        }
    };
    Action.prototype.initSpeed = function (finishPos) {
        this._finishPos = finishPos;
        var dis = egret.Point.distance(new egret.Point(this._info.x, this._info.y), this._finishPos);
        var tSpeed;
        switch (this._walkType) {
            case WalkType.SPRINT:
                tSpeed = this.SPRINT_SPEED;
                break;
            case WalkType.SLIDE:
                tSpeed = this.SLIDE_SPEED;
                break;
            case WalkType.WATER:
                tSpeed = this.OVER_WATER_SPEED;
                break;
            default:
                tSpeed = this._info.attrInfo.speed;
                break;
        }
        this._totalTime = Math.round(dis / (tSpeed / 1000));
        var speed = dis / this._totalTime;
        var angle = Math.atan2(this._finishPos.y - this._info.y, this._finishPos.x - this._info.x);
        this._stepX = speed * Math.cos(angle);
        this._stepY = speed * Math.sin(angle);
        this._tempX = this._info.x;
        this._tempY = this._info.y;
        var dir = Direction.getDir(this._info.x, this._info.y, this._finishPos.x, this._finishPos.y);
        this._info.setDirection(dir);
    };
    /** 所有继承类的render都要重写，并且不能使用super.render()，因为runtime是程序运行总时间，不是帧间隔时间 */
    Action.prototype.render = function (interval) {
        // let interval:number = runTime - this._lastTickTime;
        this.renderWalk(interval);
        // this._lastTickTime = runTime;
        return false;
    };
    Action.prototype.renderWalk = function (interval) {
        if (this._walkType == WalkType.WALK || this._walkType == WalkType.SPRINT || this._walkType == WalkType.SLIDE
            || this._walkType == WalkType.KITE || this._walkType == WalkType.WATER) {
            // this._totalTime -= Manager.global.FRAME_TIME_60;
            //40=1000/25，即帧频>=25时，走路固定时间间隔为Manager.global.FRAME_TIME_60，以便保持地图平滑移动，而如果帧频<25时，就以实际时间间隔走路，不考虑地图平滑移动了
            var spaceTime = (interval <= 40) ? Manager.global.FRAME_TIME : interval;
            this._totalTime -= spaceTime;
            if (this._totalTime <= 0) {
                this._info.updatePostion(this._finishPos.x, this._finishPos.y);
                if (this.isEnd) {
                    this.walkComplete();
                }
                else {
                    this.initSpeed(this._path.shift());
                }
            }
            else {
                // this.walkStep(Manager.global.FRAME_TIME_60);
                this.walkStep(spaceTime);
            }
        }
    };
    Object.defineProperty(Action.prototype, "isEnd", {
        /**
         * 是否终点
         */
        get: function () {
            if (this._finishPos != null && this._finishPos.equals(this._target))
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action.prototype, "inMove", {
        get: function () {
            return (this._walkType > 0);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 走路完成调用
     */
    Action.prototype.walkComplete = function () {
        if (this._walkType == WalkType.SPRINT) {
            this._info.needCanYing = false;
            if (this._info.isType(GameObjectType.SELF))
                this._info.updateIsingState(BodyStateManger.ISING_SPRINT, false);
        }
        else if (this._walkType == WalkType.SLIDE) {
            if (this._info.isType(GameObjectType.SELF))
                this._info.updateIsingState(BodyStateManger.ISING_SLIDE, false);
        }
        else if (this._walkType == WalkType.KITE) {
            if (this._info.isType(GameObjectType.SELF))
                this._info.updateIsingState(BodyStateManger.ISING_KITE, false);
        }
        else if (this._walkType == WalkType.WATER) {
            if (this._info.isType(GameObjectType.SELF))
                this._info.updateIsingState(BodyStateManger.ISING_WATER, false);
        }
        else if (this._walkType == WalkType.JUMP)
            return; //防止滑行到跳跃点，打断跳跃
        this._walkType = 0;
        this._target = null;
        this.complete();
    };
    Action.prototype.complete = function () {
        if (this._complete != null)
            this._complete.call(this._completeTarget);
        // if(!this.isPetInfo) egret.stopTick(this.render,this);
        if (!this.isPetInfo)
            Manager.render.remove(this.render, this);
        var figure = this._info.getAliveFlag() ? FigureAction.STAND : FigureAction.DEAD;
        this._info.setActionStr(figure);
    };
    Action.prototype.walkStep = function (interval) {
        var p = this.oneStep(interval);
        this._info.updatePostion(p.x, p.y);
    };
    Action.prototype.oneStep = function (disTimer) {
        this._tempX += (this._stepX * disTimer);
        this._tempY += (this._stepY * disTimer);
        var p = new egret.Point(this._tempX, this._tempY);
        p.x = (p.x + 0.5) >> 0;
        p.y = (p.y + 0.5) >> 0;
        return p;
    };
    Action.prototype.cancel = function () {
        this._walkType = 0;
        // if(!this.isPetInfo) egret.stopTick(this.render,this);
        if (!this.isPetInfo)
            Manager.render.remove(this.render, this);
        if (this._info.getAliveFlag())
            this._info.setActionStr(FigureAction.STAND);
        else
            this._info.setActionStr(FigureAction.DEAD);
    };
    Action.prototype.dispose = function () {
        this._info = null;
        // egret.stopTick(this.render,this);
        Manager.render.remove(this.render, this);
        this._path.length = 0;
        this._path = null;
        this._target = null;
        this._complete = null;
        this._completeTarget = null;
        this._finishPos = null;
    };
    return Action;
}());
//# sourceMappingURL=Action.js.map