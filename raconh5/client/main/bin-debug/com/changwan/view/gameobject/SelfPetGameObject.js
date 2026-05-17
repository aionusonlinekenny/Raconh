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
 *create 2017-11-30
 *description
*/
var SelfPetGameObject = (function (_super) {
    __extends(SelfPetGameObject, _super);
    function SelfPetGameObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelfPetGameObject.prototype.createAction = function () {
        this._action = Manager.pool.create(SelfPetAciton, this._aliveGameObjectInfo);
    };
    Object.defineProperty(SelfPetGameObject.prototype, "selfPet", {
        get: function () { return this._info; },
        enumerable: true,
        configurable: true
    });
    SelfPetGameObject.prototype.eventTarget = function () {
        if (this.selfPet.target != null) {
            var path = [new egret.Point(this.selfPet.x, this.selfPet.y), new egret.Point(this.selfPet.target.x, this.selfPet.target.y)];
            path = PathUtils.processPath(path, Manager.model.getSkill().currentPetSkill.maxRange - 10);
            if (path != null && path.length > 0) {
                this._action.walk(path, WalkType.WALK);
                // FollowerController.getInstance().followerWalk(this.selfPet.id, this.selfPet.followerType, path, WalkType.WALK);//..
            }
        }
    };
    return SelfPetGameObject;
}(PetGameObject));
__reflect(SelfPetGameObject.prototype, "SelfPetGameObject");
//# sourceMappingURL=SelfPetGameObject.js.map