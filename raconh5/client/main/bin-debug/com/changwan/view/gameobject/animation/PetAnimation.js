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
var PetAnimation = (function (_super) {
    __extends(PetAnimation, _super);
    function PetAnimation() {
        return _super.call(this) || this;
    }
    PetAnimation.prototype.reuse = function (info) {
        if (info.getActionStr() != null)
            this._currentAction = info.getActionStr();
        _super.prototype.reuse.call(this, info);
    };
    Object.defineProperty(PetAnimation.prototype, "currentClothes", {
        set: function (aniID) {
            var change = false;
            if (this._currentClothes != aniID) {
                this._currentClothes = aniID;
                var clothesGroupName = this.getClothesGroupName();
                var path = Manager.path.getPetPath(clothesGroupName);
                change = (this._currentLoadingClothes != path);
            }
            this._isChangeClothes = change || this._updateDirection || this._updateAction;
        },
        enumerable: true,
        configurable: true
    });
    PetAnimation.prototype.getClothesGroupName = function () {
        return "pet" + this._currentClothes + "_" + Direction.getResGroupShortName(this._currentDirection) + "_" + FigureAction.getResGroupShortName(this._currentAction);
    };
    PetAnimation.prototype.setFrames = function (action) {
        switch (action) {
            case FigureAction.WALK:
                this._frames = [1, 5, 9, 13, 17, 21];
                this._totalFrame = 24;
                break;
            case FigureAction.STAND:
                this._frames = [1, 7, 13, 19];
                this._totalFrame = 24;
                break;
            case FigureAction.ATTACK1:
                this._frames = [1, 5, 9, 13];
                this._totalFrame = 16;
                break;
        }
    };
    PetAnimation.prototype.updateStyle = function () {
        this.clothes();
    };
    PetAnimation.prototype.clothes = function () {
        var info = this._info;
        if (!info)
            return;
        if (!info.owner)
            return;
        if (!info.owner.attrInfo)
            return;
        this.currentClothes = this._info.owner.attrInfo.petAniID;
    };
    PetAnimation.prototype.updateClothes = function () {
        _super.prototype.updateClothes.call(this);
        var clothesGroupName = this.getClothesGroupName();
        var path = Manager.path.getPetPath(clothesGroupName);
        Manager.loader.load(path, this.clothesComplete, this, ResourceGCType.AVATAR, ResPriorityType.LOAD_LEVEL4);
        this._currentLoadingClothes = path;
    };
    PetAnimation.prototype.getName = function (action, direction) {
        if (FigureAction.isAttackAction(action))
            action = "attack";
        return action + "_" + direction.replace("left", "right");
    };
    PetAnimation.prototype.render = function (interval) {
        if (this._isChangeStyle) {
            this.updateStyle();
            this._isChangeStyle = false;
        }
        _super.prototype.render.call(this, interval);
    };
    return PetAnimation;
}(ShowAnimation));
__reflect(PetAnimation.prototype, "PetAnimation");
//# sourceMappingURL=PetAnimation.js.map