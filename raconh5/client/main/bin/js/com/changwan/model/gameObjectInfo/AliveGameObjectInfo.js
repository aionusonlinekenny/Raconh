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
 *生命对象视图信息类
 * Anydo
 * create
 * update devil 2017-11-07
*/
var AliveGameObjectInfo = /** @class */ (function (_super) {
    __extends(AliveGameObjectInfo, _super);
    function AliveGameObjectInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AliveGameObjectInfo.prototype.getDirection = function () {
        return this._direction;
    };
    AliveGameObjectInfo.prototype.setDirection = function (value) {
        if (this._direction == value)
            return;
        this._direction = value;
        if (this._view != null)
            this._view.eventDirection();
    };
    AliveGameObjectInfo.prototype.getActionStr = function () {
        return this._actionStr;
    };
    AliveGameObjectInfo.prototype.setActionStr = function (value) {
        if (this._actionStr == value)
            return;
        this._actionStr = value;
        if (this._view != null)
            this._view.eventAction();
    };
    AliveGameObjectInfo.prototype.getAliveFlag = function () {
        return this._aliveFlag;
    };
    AliveGameObjectInfo.prototype.setAliveFlag = function (value) {
        if (this._aliveFlag == value)
            return;
        this._aliveFlag = value;
        if (this._view != null)
            this._view.eventAliveFlag();
    };
    AliveGameObjectInfo.prototype.getBattleFlag = function () {
        return this._battleFlag;
    };
    AliveGameObjectInfo.prototype.setBattleFlag = function (value) {
        this._battleFlag = value;
        if (this._battleFlag) {
            //脱战10秒后变成非战斗状态（by伦榛）
            Manager.render.add(this.cancelBattleFlag, this, 10000, 1, null, true);
        }
        else
            Manager.render.remove(this.cancelBattleFlag, this);
        if (this._view != null)
            this._view.eventBattleFlag();
    };
    AliveGameObjectInfo.prototype.cancelBattleFlag = function () {
        this.setBattleFlag(false);
    };
    Object.defineProperty(AliveGameObjectInfo.prototype, "hasBianID", {
        get: function () { return (this.bianID > 0); },
        enumerable: true,
        configurable: true
    });
    AliveGameObjectInfo.prototype.getBlood = function () {
        return this.attrInfo.hp;
    };
    AliveGameObjectInfo.prototype.canHited = function (showMsg) {
        if (showMsg === void 0) { showMsg = true; }
        return false;
    };
    Object.defineProperty(AliveGameObjectInfo.prototype, "buffLst", {
        get: function () { return this._buffLst; },
        enumerable: true,
        configurable: true
    });
    AliveGameObjectInfo.prototype.getColorFilterType = function () { return this._colorFilterType; };
    /**
     * 设置滤镜变色 type=0取消变色
     */
    AliveGameObjectInfo.prototype.setColorFilter = function (type, priority) {
        if (priority === void 0) { priority = 0; }
        var isClear = (type == 0 && priority == 0);
        if (!isClear && (priority < this._colorFilterPriority))
            return false;
        egret.clearTimeout(this._tempTimeHitedWhite);
        this._colorFilterType = type;
        this._colorFilterPriority = priority;
        if (this._view != null)
            this._view.eventColorFilter();
        return true;
    };
    AliveGameObjectInfo.prototype.setHitedWhiteFilter = function () {
        var success = this.setColorFilter(ColorFilterType.WHITE, 0);
        if (success) {
            egret.clearTimeout(this._tempTimeHitedWhite);
            this._tempTimeHitedWhite = egret.setTimeout(this.resetHitedWhiteFilter, this, 200);
        }
    };
    AliveGameObjectInfo.prototype.resetHitedWhiteFilter = function () {
        this.setColorFilter(ColorFilterType.EMPTY, 0);
    };
    Object.defineProperty(AliveGameObjectInfo.prototype, "isPlayer", {
        get: function () {
            return GameObjectType.isPlayer(this.getType());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AliveGameObjectInfo.prototype, "isSelfGO", {
        /** 自己或者自己的宠物 */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AliveGameObjectInfo.prototype.getAnimationType = function () {
        return AnimationType.EMPTY;
    };
    AliveGameObjectInfo.prototype.start = function () {
        _super.prototype.start.call(this);
        this._direction = Direction.RIGHT_DOWN;
        this._actionStr = FigureAction.STAND;
        this._aliveFlag = true;
        this._battleFlag = false;
        this._buffLst = [];
        this.bianID = 0;
        this.attackID = 0;
        this._colorFilterType = 0;
        this._colorFilterPriority = 0;
        this.isSceneRobot = false;
        this.attrInfo = Manager.pool.create(GameObjectAttrInfo, this);
    };
    AliveGameObjectInfo.prototype.unuse = function () {
        egret.clearTimeout(this._tempTimeHitedWhite);
        Manager.pool.push(this.attrInfo);
        this.attrInfo = null;
        this._buffLst = null;
        this.bianID = 0;
        this.attackID = 0;
        this._colorFilterType = 0;
        this._colorFilterPriority = 0;
        this.isSceneRobot = false;
        Manager.render.remove(this.cancelBattleFlag, this);
        _super.prototype.unuse.call(this);
    };
    AliveGameObjectInfo.prototype.walk = function (path, walkType, complete, completeTarget) {
        if (!this._aliveFlag)
            return;
        if (this._view != null) {
            this._view.eventWalk(path, walkType, complete, completeTarget);
        }
        else {
            if (path.length > 0) {
                var len = path.length - 1;
                this.x = path[len].x;
                this.y = path[len].y;
                if (this.isType(GameObjectType.SELF)) {
                    Manager.control.getMap().cmdPlayerWalk([new egret.Point(this.x, this.y)], walkType);
                }
            }
        }
    };
    AliveGameObjectInfo.prototype.stopWalk = function () {
        if (this._view != null)
            this._view.eventStopWalk();
    };
    /**
     * 截取走路的路径,服务器发来的路径，从角色当前位置开始直接走路
     * location,localX:number,localY:number 角色当前位置
     */
    AliveGameObjectInfo.prototype.handleCurentPath = function (path, localX, localY) {
        if (path.length > 0) {
            var index = 0;
            var start = void 0;
            var end = void 0;
            for (var i = 0; i < path.length - 1; i++) {
                start = path[i];
                end = path[i + 1];
                if (PointUtil.inRect2(start, end, localX, localY)) {
                    path = path.slice(i + 1);
                    break;
                }
            }
            if (!(path[0].x == localX && path[0].y == localY))
                path.unshift(new egret.Point(localX, localY));
        }
        return path;
    };
    AliveGameObjectInfo.prototype.attrUpdateBlood = function (oldValue) {
        if (this.attrInfo.hp < 0)
            this.attrInfo.hp = 0;
        else if (this.attrInfo.hp > this.attrInfo.hpMax)
            this.attrInfo.hp = this.attrInfo.hpMax;
        if (this._view instanceof MonsterGameObject)
            this._view.eventBlood();
        else if (this._view instanceof PlayerGameObject)
            this._view.eventBlood();
        this.dispatchEvent(new GameObjectAttrEvent(GameObjectAttrEvent.HP));
        if (this.attrInfo.hp == 0)
            this.setAliveFlag(false);
    };
    AliveGameObjectInfo.prototype.attrUpdateNickname = function () {
        if (this._view != null)
            this._view.eventNickname();
    };
    AliveGameObjectInfo.prototype.playSCT = function (sctType, sctValue, direction) {
        if (this._view != null)
            this._view.eventSct(sctType, sctValue, this.getSctPos(), direction);
    };
    /**
     * 更新地图参与者属性
     * dataType:1--int32, 2--string, 3--int64
     */
    AliveGameObjectInfo.prototype.updatePartAttr = function (pi, dataType) {
        var type;
        var value;
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            type = pi.readByte();
            if (dataType == 1)
                value = pi.readInt();
            else if (dataType == 2)
                value = pi.readUTF();
            else if (dataType == 3)
                value = pi.readInt64();
            if (this.attrInfo == null)
                continue; //怪物死亡后直接移除，所以会出现attrinfo为null的情况
            if (this.attrInfo.getValue(type) != -1) {
                this.attrInfo.setValue(type, value);
            }
        }
    };
    AliveGameObjectInfo.prototype.playSkillEffectInfo = function (cvo, effID, rotation, isConfig) {
        if (rotation === void 0) { rotation = 0; }
        if (isConfig === void 0) { isConfig = false; }
        // return;
        if (this._view != null) {
            var effect = Manager.pool.create(SkillEffectInfo, cvo, effID, rotation, isConfig);
            this._view.eventSkillEffect(effect);
        }
    };
    AliveGameObjectInfo.prototype.playBomb = function (target, bombIndex, delayTime) {
        if (delayTime === void 0) { delayTime = 0; }
        if (this._view == null)
            return;
        this._view.eventPlayBomb(target, bombIndex, delayTime);
    };
    AliveGameObjectInfo.prototype.canPlayBomb2 = function (x, y, skill) {
        return egret.Point.distance(new egret.Point(this.x, this.y), new egret.Point(x, y)) > 80 && skill.bombIndex > 0;
    };
    AliveGameObjectInfo.prototype.getBombShootPos = function () {
        return new egret.Point(this.x, this.y);
    };
    /**
     * @param flag 1脚底 2名称高度 3名称高度一半
     */
    AliveGameObjectInfo.prototype.getBuffAniPos = function (flag) {
        return new egret.Point();
    };
    AliveGameObjectInfo.prototype.getSctPos = function () {
        return new egret.Point(this.x, this.y);
    };
    AliveGameObjectInfo.prototype.getBuffById = function (groupID) {
        for (var i = 0; i < this._buffLst.length; i++) {
            if (this._buffLst[i].groupID == groupID)
                return this._buffLst[i];
        }
        return null;
    };
    AliveGameObjectInfo.prototype.addBuff = function (buff) {
        this._buffLst.push(buff);
        this.processBuffStatus(buff, true);
        if (this._view instanceof MonsterGameObject)
            this._view.updateBuff(buff, true);
        else if (this._view instanceof PlayerGameObject)
            this._view.updateBuff(buff, true);
    };
    AliveGameObjectInfo.prototype.removeBuff = function (buff) {
        this.processBuffStatus(buff, false);
        this._buffLst.splice(this._buffLst.indexOf(buff), 1);
        if (this._view instanceof MonsterGameObject)
            this._view.updateBuff(buff, false);
        else if (this._view instanceof PlayerGameObject)
            this._view.updateBuff(buff, false);
    };
    AliveGameObjectInfo.prototype.updateBuffState = function (value, isAdd) {
        if (isAdd) {
            if (this._buffState == (value | this._buffState))
                return false;
            this._buffState = value | this._buffState;
        }
        else {
            if (this._buffState == ((~value) & this._buffState))
                return false;
            this._buffState = ((~value) & this._buffState);
        }
        return true;
    };
    AliveGameObjectInfo.prototype.updateIsingState = function (value, isAdd) {
        if (isAdd) {
            if (this._isingState == (value | this._isingState))
                return;
            this._isingState = value | this._isingState;
        }
        else {
            if (this._isingState == ((~value) & this._isingState))
                return;
            this._isingState = ((~value) & this._isingState);
        }
    };
    AliveGameObjectInfo.prototype.processBuffStatus = function (buff, isAdd) {
        if (buff == null)
            return;
        if (buff.statusType != 0) {
            switch (buff.statusType) {
                case BuffStatusType.JIN_TIAO:
                    this.updateBuffState(BodyStateManger.BUFF_JIN_TIAO, isAdd);
                    break;
                case BuffStatusType.JIAN_HUI_XUE:
                    this.updateBuffState(BodyStateManger.BUFF_JIAN_HUI_XUE, isAdd);
                    break;
                case BuffStatusType.XUAN_YUN:
                    this.setActionStr(FigureAction.STAND);
                    this.updateBuffState(BodyStateManger.BUFF_XUAN_YUN, isAdd);
                    break;
                case BuffStatusType.ZHONG_DU:
                    this.updateBuffState(BodyStateManger.BUFF_ZHONG_DU, isAdd);
                    break;
                case BuffStatusType.CHAO_FENG:
                    this.updateBuffState(BodyStateManger.BUFF_CHAO_FENG, isAdd);
                    break;
                case BuffStatusType.CHEN_MO:
                    this.updateBuffState(BodyStateManger.BUFF_CHEN_MO, isAdd);
                    break;
                case BuffStatusType.BIAN_YANG:
                    this.updateBuffState(BodyStateManger.BUFF_BIAN_YANG, isAdd);
                    break;
            }
        }
        if (buff.color > 0) {
            if (isAdd)
                this.setColorFilter(buff.color, buff.colorPriority);
            else
                this.setColorFilter(0, 0);
        }
        var changeId = buff.changeStyleId;
        if (changeId != -1) {
            this.setBianState(isAdd ? changeId : 0);
        }
    };
    AliveGameObjectInfo.prototype.setBianState = function (value) {
        if (this.bianID == value)
            return;
        this.bianID = value;
        if (this._view != null && this._view instanceof PlayerGameObject)
            this._view.eventStyle();
    };
    AliveGameObjectInfo.prototype.isBuffState = function (value) {
        return value == (this._buffState & value);
    };
    AliveGameObjectInfo.prototype.isingState = function (value) {
        return value == (this._isingState & value);
    };
    AliveGameObjectInfo.prototype.dispose = function () {
        egret.clearTimeout(this._tempTimeHitedWhite);
        Manager.pool.push(this.attrInfo);
        this.attrInfo = null;
        Manager.render.remove(this.cancelBattleFlag, this);
        _super.prototype.dispose.call(this);
    };
    return AliveGameObjectInfo;
}(GameObjectInfo));
//# sourceMappingURL=AliveGameObjectInfo.js.map