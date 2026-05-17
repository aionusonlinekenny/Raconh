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
 * devil
 * create 2017-11-01
 */
var SelfAction = (function (_super) {
    __extends(SelfAction, _super);
    function SelfAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SelfAction.prototype, "self", {
        get: function () { return this._info; },
        enumerable: true,
        configurable: true
    });
    SelfAction.prototype.walkComplete = function () {
        _super.prototype.walkComplete.call(this);
        this.checkAttack();
        // if(this.checkAttack2())
        // {
        //     this.initAttack();
        //     this.startBattle();
        // }
    };
    SelfAction.prototype.startBattle = function () {
        Manager.render.add(this.battleUpdate, this);
    };
    SelfAction.prototype.stopBattle = function () {
        Manager.render.remove(this.battleUpdate, this);
    };
    SelfAction.prototype.checkAttack2 = function () {
        var that = this;
        if (that.self.target == null)
            return false;
        if (!Manager.model.getAuto().autoHook)
            return false;
        if (!that.self.canHit(false, true))
            return false;
        if (!(that.self.target instanceof AliveGameObjectInfo))
            return false;
        if (!that.self.target.canHited(false))
            return false;
        if (!that.self.isInAttackRect())
            return false;
        return true;
        //   if(!this.self.getAliveFlag()) return;
        // if(this.self.target == null) return;
        // if(!Manager.model.getAuto().autoHook) return;
        // if(!Manager.model.getMap().mapDataLoadComplete) return;
        // if(!this.self.canHit(false,true)) return;
        // if(this.inMove) return;
        // if(!(this.self.target instanceof AliveGameObjectInfo)) return;
        // if(!(this.self.target as AliveGameObjectInfo).canHited(false)) return;
        // if(!this.self.isInAttackRect()) return;
        // this.initAttack();
    };
    SelfAction.prototype.battleUpdate = function (interval) {
        this.renderPlayerAutoHook2();
        this.renderPetAutoHook2();
    };
    SelfAction.prototype.renderPlayerAutoHook2 = function () {
        var that = this;
        if (!Manager.model.getSkill().canHitByCommonCD())
            return; //公共CD时间
        if (!FigureAction.isAttackAction(that.self.getActionStr()))
            return;
        if (that.self.target == null)
            return;
        if (!(that.self.target instanceof AliveGameObjectInfo))
            return;
        if (!that.self.target.canHited(false))
            return;
        var skill = Manager.model.getSkill();
        if (!skill.canHitBySkill(skill.currentSkill, false)) {
            skill.setAutoSkill();
        }
        if (skill.currentSkill.cvo.running)
            return;
        if (!skill.currentSkill.cvo.checkCanHitByGameObjectType(that.self.target.getType()))
            return;
        if (!that.self.isInAttackRect())
            return;
        Manager.control.getBattle().cmdPlayerAttack(that.self.target, skill.currentSkill);
        that.self.setDirection(Direction.getDir(that.self.x, that.self.y, that.self.target.x, that.self.target.y));
    };
    SelfAction.prototype.renderPetAutoHook2 = function () {
        var that = this;
        if (that.self.selfPet == null)
            return;
        if (!that.self.selfPet.canHit())
            return;
        if (!FigureAction.isAttackAction(that.self.getActionStr()))
            return;
        if (that.self.selfPet.target == null)
            return;
        if (!that.self.selfPet.isInAttackRect())
            return;
        Manager.model.getSkill().lastPetAttackTime = egret.getTimer();
        that.self.selfPet.setDirection(Direction.getDir(that.self.selfPet.x, that.self.selfPet.y, that.self.selfPet.target.x, that.self.selfPet.target.y));
    };
    SelfAction.prototype.checkAttack = function () {
        var that = this;
        if (!that.self.getAliveFlag())
            return;
        if (that.self.target == null)
            return;
        if (!Manager.model.getAuto().autoHook)
            return;
        if (!Manager.model.getMap().mapDataLoadComplete)
            return;
        if (!that.self.canHit(false, true))
            return;
        if (that.inMove)
            return;
        if (!(that.self.target instanceof AliveGameObjectInfo))
            return;
        if (!that.self.target.canHited(false))
            return;
        if (!that.self.isInAttackRect())
            return;
        that.initAttack();
    };
    SelfAction.prototype.initAttack = function () {
        if (!FigureAction.isAttackAction(this.self.getActionStr())) {
            this.self.playRandomAttack();
        }
    };
    SelfAction.prototype.stopWalk = function () {
        if (this.inMove)
            Manager.control.getMap().cmdSelfWalkPosSync(this._info.x, this._info.y);
        _super.prototype.stopWalk.call(this);
    };
    SelfAction.prototype.cancel = function () {
        if (this.inMove)
            Manager.control.getMap().cmdSelfWalkPosSync(this._info.x, this._info.y);
        _super.prototype.cancel.call(this);
    };
    return SelfAction;
}(PlayerAction));
__reflect(SelfAction.prototype, "SelfAction");
//# sourceMappingURL=SelfAction.js.map