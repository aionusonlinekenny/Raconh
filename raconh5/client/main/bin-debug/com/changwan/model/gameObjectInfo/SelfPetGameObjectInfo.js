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
 *create 2017-11-29
 *description
*/
var SelfPetGameObjectInfo = (function (_super) {
    __extends(SelfPetGameObjectInfo, _super);
    function SelfPetGameObjectInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SelfPetGameObjectInfo.prototype, "target", {
        get: function () {
            return this._target;
        },
        enumerable: true,
        configurable: true
    });
    SelfPetGameObjectInfo.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._target = null;
    };
    Object.defineProperty(SelfPetGameObjectInfo.prototype, "isSelfGO", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    /** 更新目标 */
    SelfPetGameObjectInfo.prototype.updateTarget = function (value) {
        this._target = value;
        if (this._view != null)
            this._view.eventTarget();
    };
    /**
     * 是否在攻击范围内
     */
    SelfPetGameObjectInfo.prototype.isInAttackRect = function () {
        var dis = egret.Point.distance(new egret.Point(this.x, this.y), new egret.Point(this._target.x, this._target.y));
        if (Manager.model.getSkill().currentPetSkill != null && dis <= Manager.model.getSkill().currentPetSkill.maxRange)
            return true;
        return false;
    };
    SelfPetGameObjectInfo.prototype.canHit = function () {
        if (!Manager.model.self.getAliveFlag())
            return false;
        if (!this.owner.getBattleFlag())
            return false;
        if (!Manager.model.getSkill().canPetHitByCommonCD())
            return false;
        return true;
    };
    SelfPetGameObjectInfo.prototype.getType = function () {
        return GameObjectType.SELF_PET;
    };
    SelfPetGameObjectInfo.prototype.setIsOut = function (value) {
        if (this._isOut == value)
            return;
        this._isOut = value;
        if (this.isSelfGO) {
            if (this._isOut) {
                Manager.model.self.setPet(this);
            }
            else {
                Manager.model.self.setPet(null);
            }
        }
    };
    SelfPetGameObjectInfo.prototype.createGameObject = function () {
        if (this._view == null)
            this._view = Manager.pool.create(SelfPetGameObject, this);
        return this._view;
    };
    SelfPetGameObjectInfo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._target = null;
    };
    return SelfPetGameObjectInfo;
}(PetGameObjectInfo));
__reflect(SelfPetGameObjectInfo.prototype, "SelfPetGameObjectInfo");
//# sourceMappingURL=SelfPetGameObjectInfo.js.map