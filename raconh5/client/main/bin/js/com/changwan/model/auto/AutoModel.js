/**
 *author Anydo
 *create 2017-11-9
 *description
*/
var AutoModel = /** @class */ (function () {
    function AutoModel() {
        this._tempTime = 0;
        this._randomHookPosArr = ArrayUtil.parseStringToArray(MapCVO.getConfigData(MapCVO.CONFIG_RANDOM_HOOK_POS), ",");
    }
    Object.defineProperty(AutoModel.prototype, "self", {
        get: function () {
            return Manager.model.self;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoModel.prototype, "skill", {
        get: function () {
            return Manager.model.getSkill();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoModel.prototype, "autoHook", {
        get: function () {
            return this._autoHook;
        },
        set: function (value) {
            if (this._autoHook == value)
                return;
            if (value && !this.canAuto())
                return;
            this._autoHook = value;
            if (this._autoHook) {
                Manager.render.add(this.render, this);
                Manager.model.self.stopWalk();
            }
            else {
                Manager.render.remove(this.render, this);
                if (Manager.model.self.getActionStr() == FigureAction.WALK) {
                    Manager.model.self.stopWalk();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoModel.prototype, "hookPos", {
        set: function (pos) {
            this._hookPos = pos;
            if (this._autoHook && this._hookPos)
                Manager.walk.moveTo(pos);
        },
        enumerable: true,
        configurable: true
    });
    AutoModel.prototype.render = function (interval) {
        this.skill.renderAutoHook();
        this._tempTime += interval;
        if (this._tempTime > 100) {
            this._tempTime = 0;
            this.updateHookTarget();
        }
    };
    AutoModel.prototype.updateHookTarget = function () {
        if (!Manager.model.getMap().mapDataLoadComplete)
            return;
        var self = Manager.model.self;
        if (!self.getAliveFlag())
            return;
        if (self.isingState(BodyStateManger.ISING_JUMP))
            return;
        if (self.isingState(BodyStateManger.ISING_SPRINT))
            return;
        if (self.isingState(BodyStateManger.ISING_SLIDE))
            return;
        if (self.isingState(BodyStateManger.ISING_KITE))
            return;
        if (self.isingState(BodyStateManger.ISING_WATER))
            return;
        var actionStr = self.getActionStr();
        if (actionStr == FigureAction.WALK)
            return;
        if (actionStr == FigureAction.SLIDE)
            return;
        if (actionStr == FigureAction.KITE)
            return;
        if (actionStr == FigureAction.WATER)
            return;
        if (FigureAction.isAttackAction(actionStr)) {
            if (self.target == null)
                return;
            if (self.target != null && self.isInAttackRect())
                return;
        }
        var bol = Manager.model.getGameobject().updateHookTarget();
        if (!bol) {
            if (this._hookPos != null) {
                // Manager.walk.moveTo(this._hookPos);
                if (this._randomHookPosArr.indexOf(Manager.model.getMap().mapCVO.type) == -1)
                    Manager.walk.moveTo(this._hookPos);
                else {
                    var randomPos = GameUtil.getNearCanWalkRandomPos(this._hookPos.x, this._hookPos.y, 50, 0, 5);
                    Manager.walk.moveTo(randomPos);
                }
            }
            else {
                self.cancelAction();
            }
        }
    };
    AutoModel.prototype.canAuto = function () {
        if (!this.self.getAliveFlag())
            return false; //死亡不能挂机
        return true;
    };
    return AutoModel;
}());
//# sourceMappingURL=AutoModel.js.map