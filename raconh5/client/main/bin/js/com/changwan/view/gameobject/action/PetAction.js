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
 *create 2017-12-4
 *description
*/
var PetAction = /** @class */ (function (_super) {
    __extends(PetAction, _super);
    function PetAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 超过距离传送到主人身边
         */
        _this.DIS_FLY = 400;
        return _this;
    }
    Object.defineProperty(PetAction.prototype, "petInfo", {
        get: function () { return this._info; },
        enumerable: true,
        configurable: true
    });
    PetAction.prototype.render = function (interval) {
        // let interval:number = runTime - this._lastTickTime;
        this.renderWalk(interval);
        this.renderBackToOwner(interval);
        // this._lastTickTime = runTime;
        return false;
    };
    PetAction.prototype.renderBackToOwner = function (interval) {
        if (this.petInfo.isInvented)
            return;
        this._tempTime += interval;
        if (this._tempTime < 330)
            return;
        this._tempTime %= 330;
        if (!this.inMove && !this.petInfo.owner.isingState(BodyStateManger.ISING_JUMP)) {
            if (this.flyBackToOwner()) {
                this.cancel();
                return;
            }
            this.walkBackToOwner();
        }
    };
    PetAction.prototype.flyBackToOwner = function () {
        if (new egret.Point(this._info.x, this._info.y).subtract(new egret.Point(this.petInfo.owner.x, this.petInfo.owner.y)).length >= this.DIS_FLY) {
            this.stopWalk();
            var targetPos = GameUtil.getNearCanWalkRandomPos(this.petInfo.owner.x, this.petInfo.owner.y, 150, 20, 5);
            this._info.updatePostion(targetPos.x, targetPos.y);
            return true;
        }
        return false;
    };
    PetAction.prototype.walkBackToOwner = function () {
        if (this.inMove)
            return;
        var dis = 300;
        var target = new egret.Point(this.petInfo.owner.x, this.petInfo.owner.y);
        if (new egret.Point(this._info.x, this._info.y).subtract(new egret.Point(target.x, target.y)).length >= dis) {
            var path = [new egret.Point(this._info.x, this._info.y), target];
            path = PathUtils.processPath(path, dis - 150);
            if (path != null && path.length > 1) {
                this._info.walk(path, WalkType.WALK);
                if (this._info instanceof SelfPetGameObjectInfo) {
                    if (this._info.canHit())
                        this._info.updateTarget(null);
                    // FollowerController.getInstance().followerWalk(this.selfPet.id, this.selfPet.followerType, path, WalkType.WALK);//..
                }
            }
        }
    };
    return PetAction;
}(Action));
//# sourceMappingURL=PetAction.js.map