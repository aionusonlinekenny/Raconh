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
 *生命对象视图
 * Anydo
 * create
 * update devil 2017-11-08
*/
var AliveGameObject = /** @class */ (function (_super) {
    __extends(AliveGameObject, _super);
    function AliveGameObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AliveGameObject.prototype, "hasChangeBuff", {
        set: function (value) {
            if (this._hasChangeBuff == value)
                return;
            this._hasChangeBuff = value;
            this.invalidate(InvalidationType.GO_BUFF);
        },
        enumerable: true,
        configurable: true
    });
    AliveGameObject.prototype.reuse = function (info) {
        this._aliveGameObjectInfo = info;
        _super.prototype.reuse.call(this, info);
    };
    AliveGameObject.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (this._action != null) {
            Manager.pool.push(this._action);
            this._action = null;
        }
        if (this._bloodStrip3 != null) {
            // Manager.pool.push(this._bloodStrip);
            this._bloodStrip3.dispose();
            this._bloodStrip3 = null;
        }
        if (this._bloodContainer && this._bloodContainer.parent) {
            this._bloodContainer.parent.removeChild(this._bloodContainer);
            this._bloodContainer = null;
        }
        if (this._elementSkillEffect != null) {
            Manager.pool.push(this._elementSkillEffect);
            this._elementSkillEffect = null;
        }
        if (this._elementBuff != null) {
            Manager.pool.push(this._elementBuff);
            this._elementBuff = null;
        }
        this._aliveGameObjectInfo = null;
    };
    AliveGameObject.prototype.start = function () {
        _super.prototype.start.call(this);
        this.createAction();
        this._elementSkillEffect = Manager.pool.create(ElementSkillEffect, this);
        var type = this._aliveGameObjectInfo.getType();
        if (type != GameObjectType.PET || type != GameObjectType.SELF_PET)
            this._elementBuff = Manager.pool.create(ElementBuffAnimation, this);
    };
    AliveGameObject.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawPosition"))
            this.drawPosition();
        if (this.isInvalid("drawColorFilter"))
            this.drawColorFilter();
        if (this.isInvalid("drawSkill"))
            this._elementSkillEffect.drawSkill();
        if (this.isInvalid(InvalidationType.GO_BUFF))
            this.drawBuff();
    };
    /**
     * 填加进场景中执行
     */
    AliveGameObject.prototype.reset = function () {
        this.eventBlood();
        this.eventAliveFlag();
        this.eventAction();
        this.eventDirection();
        this.initBuff();
        _super.prototype.reset.call(this);
    };
    AliveGameObject.prototype.drawPosition = function () {
        if (Manager.model.getMap().isAlphaPoint(this._info.x, this._info.y))
            this.alpha = 0.5;
        else
            this.alpha = 1;
        Manager.control.getMap().startSort(this);
    };
    AliveGameObject.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawBuff();
    };
    AliveGameObject.prototype.drawBuff = function () {
        if (this._elementBuff == null)
            return;
        this._elementBuff.drawBuff();
        this._hasChangeBuff = false;
    };
    AliveGameObject.prototype.updateBuff = function (buff, isAdd) {
        if (this._elementBuff == null)
            return;
        this.hasChangeBuff = this._elementBuff.hasChange(buff, isAdd);
    };
    AliveGameObject.prototype.initBuff = function () {
        if (this._elementBuff == null)
            return;
        if (this._aliveGameObjectInfo.buffLst.length != 0) {
            var len = this._aliveGameObjectInfo.buffLst.length;
            var one = void 0;
            for (var i = 0; i < len; i++) {
                one = this._aliveGameObjectInfo.buffLst[i];
                if (!this._hasChangeBuff)
                    this.hasChangeBuff = this._elementBuff.hasChange(one, true);
                else
                    this._elementBuff.hasChange(one, true);
            }
        }
    };
    AliveGameObject.prototype.eventAliveFlag = function () {
        this._action.stopWalk();
        if (this._elementBuff) {
            this.hasChangeBuff = true;
            this._elementBuff.readyPlayCVO = null;
        }
    };
    AliveGameObject.prototype.eventPosition = function () {
        _super.prototype.eventPosition.call(this);
        if (this._elementBuff)
            this._elementBuff.movePosition();
        this.invalidate("drawPosition");
    };
    AliveGameObject.prototype.createAction = function () {
        this._action = Manager.pool.create(Action, this._aliveGameObjectInfo);
    };
    AliveGameObject.prototype.stopWalk = function () {
        this._action.stopWalk();
    };
    AliveGameObject.prototype.eventNickname = function () {
    };
    AliveGameObject.prototype.eventAction = function () {
    };
    AliveGameObject.prototype.eventBlood = function () {
    };
    AliveGameObject.prototype.eventBattleFlag = function (oldFlag) {
    };
    AliveGameObject.prototype.eventWalk = function (path, walkType, complete, completeTarget) {
        this._action.walk(path, walkType, complete, completeTarget);
    };
    AliveGameObject.prototype.eventStopWalk = function () {
        this._action.stopWalk();
    };
    AliveGameObject.prototype.eventDirection = function () {
    };
    AliveGameObject.prototype.eventColorFilter = function () {
        this.invalidate("drawColorFilter");
    };
    AliveGameObject.prototype.drawColorFilter = function () {
    };
    AliveGameObject.prototype.eventSct = function (sctType, value, pos, direction) {
        if (direction === void 0) { direction = 0; }
        Manager.pool.create(SCTView, sctType, value, pos, direction);
    };
    AliveGameObject.prototype.eventPlayBomb = function (target, bombIndex, delayTime) {
        if (delayTime === void 0) { delayTime = 0; }
        var tpos = target.getBombShootPos();
        var pos = this._aliveGameObjectInfo.getBombShootPos();
        var angle = PointUtil.getAngle(pos.x, pos.y, tpos.x, tpos.y);
        var speed = 0.8;
        var time = egret.Point.distance(pos, tpos) / speed;
        if (delayTime == 0)
            this.playBomb(bombIndex, pos, tpos, angle, time);
        else
            this.delayPlayBomb(delayTime, bombIndex, pos, tpos, angle, time);
    };
    AliveGameObject.prototype.delayPlayBomb = function (delay, curBomb, pos, tpos, angle, time) {
        egret.clearTimeout(this._bombDelayTime);
        this._bombDelayTime = egret.setTimeout(this.playBomb, this, delay, curBomb, pos, tpos, angle, time);
    };
    AliveGameObject.prototype.confirmPlayBomb = function (curBomb, pos, tpos, angle, time) {
        this.playBomb(curBomb, pos, tpos, angle, time);
    };
    AliveGameObject.prototype.playBomb = function (curBomb, pos, tpos, angle, time) {
        var animation = Manager.animation.createBombAnimation(curBomb);
        // Manager.layer.effectTopLayer.addChild(animation);
        Manager.layer.addChildToNodeByType(animation, animation.url, 1);
        ObjectUtil.rotateAroundExternalPoint(animation, pos.x, pos.y, 0, 0, angle);
        egret.Tween.get(animation).to({ x: tpos.x, y: tpos.y }, time).call(this.bombComplete, this, [animation]);
    };
    AliveGameObject.prototype.bombComplete = function (bomb) {
        Manager.pool.push(bomb);
    };
    AliveGameObject.prototype.hideStrip = function () {
        if (this._bloodContainer && this._bloodContainer.parent) {
            this._bloodContainer.parent.removeChild(this._bloodContainer);
        }
        // if(this._bloodStrip3)this._bloodStrip3.setVisible(false);
    };
    AliveGameObject.prototype.showStrip = function () {
        if (this._bloodContainer == null) {
            this._bloodContainer = ObjectUtil.createConainer(false, false);
            this.addChild(this._bloodContainer);
        }
        if (this._bloodStrip3 == null) {
            this._bloodStrip3 = new BloodStripView2(this._bloodContainer, this._bloodContainer, this._info);
            // this._bloodStrip = Manager.pool.create(BloodStripView, this._info);
        }
        // if(this._bloodStrip.parent == null) this.addChild(this._bloodStrip);
    };
    AliveGameObject.prototype.eventSkillEffect = function (info) {
        this._elementSkillEffect.effectInfo = info;
        this.invalidate("drawSkill");
    };
    AliveGameObject.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        clearTimeout(this._bombDelayTime);
        if (this._action != null) {
            Manager.pool.push(this._action);
            this._action = null;
        }
        // if(this._bloodStrip != null)
        // {
        // 	Manager.pool.push(this._bloodStrip);
        // 	this._bloodStrip = null;
        // }
        if (this._bloodStrip3) {
            this._bloodStrip3.dispose();
            this._bloodStrip3 = null;
        }
        if (this._bloodContainer && this._bloodContainer.parent) {
            this._bloodContainer.parent.removeChild(this._bloodContainer);
        }
        this._bloodContainer = null;
        if (this._elementSkillEffect != null) {
            Manager.pool.push(this._elementSkillEffect);
            this._elementSkillEffect = null;
        }
        if (this._elementBuff != null) {
            Manager.pool.push(this._elementBuff);
            this._elementBuff = null;
        }
        this._aliveGameObjectInfo = null;
    };
    return AliveGameObject;
}(GameObject));
//# sourceMappingURL=AliveGameObject.js.map