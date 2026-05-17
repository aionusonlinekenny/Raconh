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
 *author Anydo
 *create 2017-12-2
 *description
*/
var SelfPetAciton = (function (_super) {
    __extends(SelfPetAciton, _super);
    function SelfPetAciton() {
        var _this = _super.call(this) || this;
        /**
         * 打怪时与主人之间的最大距离
         */
        _this.DIS_BATTLE = 400;
        return _this;
    }
    Object.defineProperty(SelfPetAciton.prototype, "selfPet", {
        get: function () { return this._info; },
        enumerable: true,
        configurable: true
    });
    SelfPetAciton.prototype.render = function (interval) {
        // let interval:number = runTime - this._lastTickTime;
        this.renderBattle(interval);
        this.renderWalk(interval);
        this.renderBackToOwner(interval);
        // this._lastTickTime = runTime;
        return false;
    };
    SelfPetAciton.prototype.renderBattle = function (interval) {
        this._battleTime += interval;
        if (this._battleTime < 1000)
            return;
        this._battleTime %= 1000;
        var target;
        if (this.selfPet.canHit()) {
            var self_1 = Manager.model.self;
            if (self_1.target != null) {
                target = self_1.target;
            }
            else if (self_1.attackID != 0) {
                var ttarget = Manager.model.getGameobject().getGameObject(self_1.attackID);
                if (ttarget)
                    target = ttarget;
            }
            if (target)
                this.selfPet.updateTarget(target);
        }
    };
    SelfPetAciton.prototype.walkComplete = function () {
        _super.prototype.walkComplete.call(this);
        this.checkAttack();
    };
    SelfPetAciton.prototype.checkAttack = function () {
        if (!Manager.model.self.getAliveFlag())
            return;
        if (this.selfPet.target == null)
            return;
        // if(!Manager.model.getAuto().autoHook) return;
        if (!Manager.model.getMap().mapDataLoadComplete)
            return;
        if (!this.selfPet.canHit())
            return;
        if (this.inMove)
            return;
        if (!this.selfPet.isInAttackRect())
            return;
        this.initAttack();
    };
    SelfPetAciton.prototype.initAttack = function () {
        if (!FigureAction.isAttackAction(this.selfPet.getActionStr())) {
            this.selfPet.setActionStr("attack1");
        }
    };
    return SelfPetAciton;
}(PetAction));
__reflect(SelfPetAciton.prototype, "SelfPetAciton");
//# sourceMappingURL=SelfPetAction.js.map