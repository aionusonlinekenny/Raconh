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
var PetGameObjectInfo = /** @class */ (function (_super) {
    __extends(PetGameObjectInfo, _super);
    function PetGameObjectInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetGameObjectInfo.prototype.getIsOut = function () { return this._isOut; };
    PetGameObjectInfo.prototype.setIsOut = function (value) {
        if (this._isOut == value)
            return;
        this._isOut = value;
    };
    PetGameObjectInfo.prototype.reuse = function (id, role) {
        _super.prototype.reuse.call(this, id);
        this.isInvented = false;
    };
    PetGameObjectInfo.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.owner = null;
        this.isInvented = false;
        this._bombPoss = null;
    };
    Object.defineProperty(PetGameObjectInfo.prototype, "ownerID", {
        get: function () {
            return this.owner ? this.owner.id : 0;
        },
        enumerable: true,
        configurable: true
    });
    PetGameObjectInfo.prototype.getType = function () {
        return GameObjectType.PET;
    };
    PetGameObjectInfo.prototype.getAnimationType = function () {
        return AnimationType.PET;
    };
    Object.defineProperty(PetGameObjectInfo.prototype, "moveSpeed", {
        get: function () {
            if (this.owner != null)
                return this.owner.attrInfo.speed;
            else
                return 230;
        },
        enumerable: true,
        configurable: true
    });
    PetGameObjectInfo.prototype.getBombShootPos = function () {
        if (this._bombPoss) {
            var ti = Direction.directions.indexOf(this.getDirection());
            var pos = this._bombPoss[ti];
            return new egret.Point(this.x, this.y).add(pos);
        }
        return new egret.Point(this.x, this.y - 100);
    };
    PetGameObjectInfo.prototype.parseBombShootPos = function () {
        this._bombPoss = null;
        if (this.owner == null)
            return;
        if (this.owner.attrInfo == null)
            return;
        this._bombPoss = PetBombCVO.getBombPoss(this.owner.attrInfo.petAniID);
    };
    Object.defineProperty(PetGameObjectInfo.prototype, "isSelfGO", {
        get: function () {
            return this.ownerID == Manager.model.self.id;
        },
        enumerable: true,
        configurable: true
    });
    PetGameObjectInfo.prototype.canHited = function (showMsg) {
        if (showMsg === void 0) { showMsg = true; }
        return false;
    };
    PetGameObjectInfo.prototype.canHit = function () {
        return false;
    };
    /** 不更新血量 */
    PetGameObjectInfo.prototype.attrUpdateBlood = function (oldValue) { };
    PetGameObjectInfo.prototype.remove = function (onlyView, isImmediately) {
        if (isImmediately === void 0) { isImmediately = true; }
        if (!onlyView)
            this.owner = null;
        _super.prototype.remove.call(this, onlyView, isImmediately);
    };
    PetGameObjectInfo.prototype.createGameObject = function () {
        if (this._view == null)
            this._view = Manager.pool.create(PetGameObject, this);
        return this._view;
    };
    PetGameObjectInfo.prototype.attrUpdateAni = function () {
        this.parseBombShootPos();
        if (this._view != null)
            this._view.eventAni();
    };
    PetGameObjectInfo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.owner = null;
        this._bombPoss = null;
    };
    return PetGameObjectInfo;
}(AliveGameObjectInfo));
//# sourceMappingURL=PetGameObjectInfo.js.map