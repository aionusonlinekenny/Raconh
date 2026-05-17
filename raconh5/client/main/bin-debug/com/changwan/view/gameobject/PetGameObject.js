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
var PetGameObject = (function (_super) {
    __extends(PetGameObject, _super);
    function PetGameObject() {
        return _super.call(this) || this;
    }
    Object.defineProperty(PetGameObject.prototype, "petInfo", {
        get: function () {
            return this._info;
        },
        enumerable: true,
        configurable: true
    });
    PetGameObject.prototype.start = function () {
        _super.prototype.start.call(this);
        this._elementShow = Manager.pool.create(ElementAliveAnimation, this);
    };
    PetGameObject.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (this._elementShow != null) {
            Manager.pool.push(this._elementShow);
            this._elementShow = null;
        }
    };
    PetGameObject.prototype.createAction = function () {
        this._action = Manager.pool.create(PetAction, this._aliveGameObjectInfo);
    };
    PetGameObject.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this._elementShow.drawPet();
    };
    PetGameObject.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.GO_ANIMATION))
            this._elementShow.drawPet();
        if (this.isInvalid(InvalidationType.GO_ACTION))
            this._elementShow.drawAction();
        if (this.isInvalid(InvalidationType.GO_DIRECTION))
            this._elementShow.drawDirection();
        if (this.isInvalid(InvalidationType.GO_STYLE))
            this._elementShow.drawStyle();
    };
    PetGameObject.prototype.eventDirection = function () {
        this.invalidate(InvalidationType.GO_DIRECTION);
    };
    PetGameObject.prototype.eventAction = function () {
        this.invalidate(InvalidationType.GO_ACTION);
    };
    PetGameObject.prototype.eventWalk = function (path, walkType, complete, completeTarget) {
        if (this._action.inMove || path.length <= 0)
            return;
        var petPath = [new egret.Point(this.petInfo.x, this.petInfo.y), path[path.length - 1]];
        this._action.walk(petPath, WalkType.WALK, complete, completeTarget);
    };
    PetGameObject.prototype.eventAni = function () {
        this.invalidate(InvalidationType.GO_STYLE);
    };
    PetGameObject.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        if (this._elementShow != null) {
            Manager.pool.push(this._elementShow);
            this._elementShow = null;
        }
    };
    return PetGameObject;
}(AliveGameObject));
__reflect(PetGameObject.prototype, "PetGameObject");
//# sourceMappingURL=PetGameObject.js.map