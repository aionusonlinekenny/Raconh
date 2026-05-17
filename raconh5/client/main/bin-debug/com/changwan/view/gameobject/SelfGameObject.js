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
 *角色自己视图
 * Anydo
 * create
 * update devil 2017-11-08
*/
var SelfGameObject = (function (_super) {
    __extends(SelfGameObject, _super);
    function SelfGameObject() {
        var _this = _super.call(this) || this;
        _this.SPRINT_DIS = 700;
        return _this;
    }
    Object.defineProperty(SelfGameObject.prototype, "selfInfo", {
        get: function () { return this._info; },
        enumerable: true,
        configurable: true
    });
    SelfGameObject.prototype.createAction = function () {
        this._action = Manager.pool.create(SelfAction, this._aliveGameObjectInfo);
    };
    SelfGameObject.prototype.getWalkTarget = function () {
        return this._action ? this._action.getWalkTarget() : null;
    };
    SelfGameObject.prototype.eventAliveFlag = function () {
        _super.prototype.eventAliveFlag.call(this);
        Manager.jump.finishJump();
    };
    SelfGameObject.prototype.eventLevel = function (oldLevel) {
        if ((this._aliveGameObjectInfo.attrInfo.level > oldLevel) && !Manager.global.lifecyclePause) {
            var ani = Manager.animation.createEffectAnimation("roleLevelUp");
            this.addChild(ani);
        }
        _super.prototype.eventLevel.call(this, oldLevel);
    };
    SelfGameObject.prototype.eventPosition = function () {
        _super.prototype.eventPosition.call(this);
        Manager.control.getMap().view.setCenter(this._info.x, this._info.y);
    };
    SelfGameObject.prototype.eventWalk = function (path, walkType, complete, completeTarget) {
        _super.prototype.eventWalk.call(this, path, walkType, complete, completeTarget);
        Manager.control.getMap().cmdPlayerWalk(path, walkType);
    };
    SelfGameObject.prototype.eventCancelAction = function () {
        this._action.cancel();
    };
    SelfGameObject.prototype.eventTarget = function () {
        if (this.selfInfo.target != null) {
            this.gotoTarget();
        }
        else {
            this._action.stopWalk();
        }
    };
    SelfGameObject.prototype.gotoTarget = function () {
        var that = this;
        if (that.selfInfo.isingState(BodyStateManger.ISING_JUMP))
            return;
        if (that.selfInfo.isingState(BodyStateManger.ISING_SPRINT))
            return;
        if (that.selfInfo.isBuffState(BodyStateManger.BUFF_XUAN_YUN))
            return;
        var startPos = new egret.Point(that._info.x, that._info.y);
        var targetPos = new egret.Point(that.selfInfo.target.x, that.selfInfo.target.y);
        var path = Manager.model.getMap().findPath.findpath(startPos, targetPos);
        var maxRange = Manager.model.getSkill().currentSkill.maxRange;
        var pathSkill = PathUtils.processPath(path, maxRange);
        if (path == null && !Manager.model.getMap().isWalkPoint(that._info.x, that._info.y)) {
            Manager.model.self.walk([startPos, targetPos], WalkType.SPRINT); //如果卡死点，则直接冲刺到目标点
            return;
        }
        if (pathSkill != null && pathSkill.length > 0) {
            if (that.selfInfo.target instanceof MonsterGameObjectInfo || that.selfInfo.target instanceof PlayerGameObjectInfo) {
                var distance = egret.Point.distance(startPos, targetPos);
                if (distance < (maxRange + 60)) {
                    that.eventWalk(pathSkill, WalkType.WALK);
                }
                else if (distance > (that.SPRINT_DIS + 1)) {
                    //上面一行要＋1，因为少于1像素PathUtils.processPath会返回只有一个点的路径，会导致寻路失败。
                    var pathSprint = PathUtils.processPath([startPos, targetPos], that.SPRINT_DIS);
                    // if(pathSprint != null && pathSprint.length > 0) that.eventWalk(pathSprint, WalkType.WALK);
                    if (pathSprint != null && pathSprint.length > 1) {
                        if (!Manager.model.getMap().isWalkPoint(pathSprint[pathSprint.length - 1].x, pathSprint[pathSprint.length - 1].y)) {
                            var pathSprint2 = PathUtils.processPath(path, that.SPRINT_DIS);
                            that.eventWalk(pathSprint2, WalkType.WALK);
                        }
                        else
                            that.eventWalk(pathSprint, WalkType.WALK);
                    }
                    else
                        that.eventWalk(pathSkill, WalkType.WALK);
                }
                else {
                    var pos = targetPos.subtract(startPos);
                    var vd = new Vector2D(pos.x, pos.y);
                    vd.length = egret.Point.distance(startPos, targetPos) - maxRange;
                    var target2Pos = startPos.add(new egret.Point(vd.x, vd.y));
                    if (!Manager.model.getMap().isWalkPoint(target2Pos.x, target2Pos.y)) {
                        target2Pos = targetPos;
                    }
                    that.eventWalk([startPos, target2Pos], WalkType.SPRINT);
                }
            }
            else
                that.eventWalk(pathSkill, WalkType.WALK);
        }
    };
    SelfGameObject.prototype.eventJump = function (targets, completeF) {
        var startPos = new egret.Point(this._aliveGameObjectInfo.x, this._aliveGameObjectInfo.y);
        this._action.jump(startPos, targets);
        var path = targets.concat();
        path.unshift(startPos.clone());
        Manager.control.getMap().cmdPlayerWalk(path, WalkType.JUMP);
    };
    return SelfGameObject;
}(PlayerGameObject));
__reflect(SelfGameObject.prototype, "SelfGameObject");
//# sourceMappingURL=SelfGameObject.js.map