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
var PlayerAnimation = /** @class */ (function (_super) {
    __extends(PlayerAnimation, _super);
    function PlayerAnimation() {
        return _super.call(this) || this;
    }
    PlayerAnimation.prototype.reuse = function (info) {
        this._playerGameObjectInfo = info;
        this._jumpCanYingFlag = 0;
        this._currentWeapon = -1;
        this._currentLoadingWeapon = null;
        this._isChangeWeapon = false;
        this._currentWeaponEffect = 0;
        this._currentLoadingWeaponEffect = null;
        this._isChangeWeaponEffect = false;
        this._currentWing = -1;
        this._currentLoadingWing = null;
        this._isChangeWing = false;
        this._weapon = Manager.pool.create(AnimationLayer, true);
        this._weaponEffect = Manager.pool.create(AnimationLayer, false);
        this._wing = Manager.pool.create(AnimationLayer, true);
        _super.prototype.reuse.call(this, info);
    };
    PlayerAnimation.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.removeLoad(this._currentLoadingWing, this.wingComplete);
        this.removeLoad(this._currentLoadingWeapon, this.weaponComplete);
        this.removeLoad(this._currentLoadingWeaponEffect, this.weaponEffectComplete);
        Manager.pool.push(this._weapon);
        this._weapon = null;
        Manager.pool.push(this._weaponEffect);
        this._weaponEffect = null;
        Manager.pool.push(this._wing);
        this._wing = null;
        this._weaponEffectFrames = null;
        this._playerGameObjectInfo = null;
    };
    Object.defineProperty(PlayerAnimation.prototype, "currentClothes", {
        set: function (aniID) {
            var change = false;
            if (this._currentClothes != aniID) {
                this._currentClothes = aniID;
                var clothesGroupName = this.getClothesGroupName();
                var path = Manager.path.getClothesPath(clothesGroupName);
                change = (this._currentLoadingClothes != path);
            }
            this._isChangeClothes = change || this._updateDirection || this._updateAction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerAnimation.prototype, "currentWeapon", {
        set: function (aniID) {
            var change = false;
            if (this._currentWeapon != aniID) {
                this._currentWeapon = aniID;
                var weaponGroupName = this.getWeaponGroupName();
                var path = void 0;
                if (weaponGroupName != "")
                    path = Manager.path.getWeaponPath(weaponGroupName);
                change = (this._currentLoadingWeapon != path);
                this.weaponEffect();
            }
            this._isChangeWeapon = change || this._updateDirection || this._updateAction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerAnimation.prototype, "currentWeaponEffect", {
        set: function (type) {
            var change = false;
            if (this._currentWeaponEffect != type) {
                this._currentWeaponEffect = type;
                var weaponEffectGroupName = this.getWeaponEffectGroupName();
                var path = Manager.path.getWeaponEffectPath(weaponEffectGroupName);
                change = (this._currentLoadingWeaponEffect != path);
            }
            this._isChangeWeaponEffect = change || this._updateDirection || this._updateAction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerAnimation.prototype, "currentWing", {
        set: function (aniID) {
            var change = false;
            if (this._currentWing != aniID) {
                this._currentWing = aniID;
                var wingGroupName = this.getWingGroupName();
                var path = void 0;
                if (wingGroupName != "")
                    path = Manager.path.getWingPath(wingGroupName);
                change = (this._currentLoadingWing != path);
            }
            this._isChangeWing = change || this._updateDirection || this._updateAction;
        },
        enumerable: true,
        configurable: true
    });
    PlayerAnimation.prototype.cancelWeapon = function () {
        if (this._currentLoadingWeapon != null) {
            this.cancelLoadCompleteCall(this._weapon, this._currentLoadingWeapon, this.weaponComplete);
            this._currentLoadingWeapon = null;
        }
    };
    PlayerAnimation.prototype.cancelWeaponEffect = function () {
        if (this._currentLoadingWeaponEffect != null) {
            this._weaponEffect.clear();
            this.cancelLoadCompleteCall(this._weaponEffect, this._currentLoadingWeaponEffect, this.weaponEffectComplete);
            this._currentLoadingWeaponEffect = null;
        }
    };
    PlayerAnimation.prototype.cancelWing = function () {
        if (this._currentLoadingWing != null) {
            this.cancelLoadCompleteCall(this._wing, this._currentLoadingWing, this.wingComplete);
            this._currentLoadingWing = null;
        }
    };
    PlayerAnimation.prototype.updateClothes = function () {
        _super.prototype.updateClothes.call(this);
        var clothesGroupName = this.getClothesGroupName();
        var path = Manager.path.getClothesPath(clothesGroupName);
        if (this._info instanceof SelfGameObjectInfo)
            Manager.loader.load(path, this.clothesComplete, this, ResourceGCType.NEVER, ResPriorityType.LOAD_LEVEL5);
        else
            Manager.loader.load(path, this.clothesComplete, this, ResourceGCType.AVATAR, ResPriorityType.LOAD_LEVEL4);
        this._currentLoadingClothes = path;
    };
    PlayerAnimation.prototype.updateWeapon = function () {
        this.cancelWeapon();
        if (this._currentWeapon == 0) {
            if (this._weapon.parent != null)
                this._container.removeChild(this._weapon);
        }
        else {
            if (this._weapon.parent == null)
                this._container.addChild(this._weapon);
            var weaponGroupName = this.getWeaponGroupName();
            var path = Manager.path.getWeaponPath(weaponGroupName);
            if (weaponGroupName != "") {
                if (this._info instanceof SelfGameObjectInfo)
                    Manager.loader.load(path, this.weaponComplete, this, ResourceGCType.NEVER, ResPriorityType.LOAD_LEVEL5);
                else
                    Manager.loader.load(path, this.weaponComplete, this, ResourceGCType.AVATAR, ResPriorityType.LOAD_LEVEL4);
            }
            this._currentLoadingWeapon = path;
        }
    };
    PlayerAnimation.prototype.updateWeaponEffect = function () {
        this.cancelWeaponEffect();
        if (this._currentWeaponEffect == 0) {
            if (this._weaponEffect.parent != null)
                this._container.removeChild(this._weaponEffect);
        }
        else {
            if (this._weaponEffect.parent == null)
                this._container.addChild(this._weaponEffect);
            var weaponEffectGroupName = this.getWeaponEffectGroupName();
            var path = Manager.path.getWeaponEffectPath(weaponEffectGroupName);
            if (this._info instanceof SelfGameObjectInfo)
                Manager.loader.load(path, this.weaponEffectComplete, this, ResourceGCType.NEVER, ResPriorityType.LOAD_LEVEL5);
            else
                Manager.loader.load(path, this.weaponEffectComplete, this, ResourceGCType.AVATAR, ResPriorityType.LOAD_LEVEL4);
            this._currentLoadingWeaponEffect = path;
        }
    };
    PlayerAnimation.prototype.updateWing = function () {
        this.cancelWing();
        if (this._currentWing == 0) {
            if (this._wing.parent != null)
                this._container.removeChild(this._wing);
        }
        else {
            if (this._wing.parent == null) {
                this._container.addChild(this._wing);
                if (this._weapon && this._weapon.parent != null)
                    this._container.addChild(this._weapon); //确保武器在最上层
            }
            var wingGroupName = this.getWingGroupName();
            var path = Manager.path.getWingPath(wingGroupName);
            if (wingGroupName != "") {
                if (this._info instanceof SelfGameObjectInfo)
                    Manager.loader.load(path, this.wingComplete, this, ResourceGCType.NEVER, ResPriorityType.LOAD_LEVEL5);
                else
                    Manager.loader.load(path, this.wingComplete, this, ResourceGCType.AVATAR, ResPriorityType.LOAD_LEVEL4);
            }
            this._currentLoadingWing = path;
        }
    };
    PlayerAnimation.prototype.weaponComplete = function (loader) {
        this.loadAnimationComplete(this._weapon, loader);
    };
    PlayerAnimation.prototype.weaponEffectComplete = function (loader) {
        this.loadAnimationComplete(this._weaponEffect, loader);
    };
    PlayerAnimation.prototype.wingComplete = function (loader) {
        this.loadAnimationComplete(this._wing, loader);
    };
    PlayerAnimation.prototype.cancel = function () {
        this.cancelWeapon();
        this.cancelWeaponEffect();
        this.cancelWing();
        _super.prototype.cancel.call(this);
    };
    PlayerAnimation.prototype.updateStyle = function () {
        this.clothes();
        this.weapon();
        this.weaponEffect();
        this.wing();
    };
    PlayerAnimation.prototype.updateKeyFrame = function () {
        var that = this;
        _super.prototype.updateKeyFrame.call(this);
        if (FigureAction.isAttackAction(that._currentAction)) {
            var index = that._weaponEffectFrames.indexOf(that._currentFrame);
            if (index != -1) {
                that.updateAnimationLayer(index, that._weaponEffect);
            }
        }
    };
    PlayerAnimation.prototype.clothes = function () {
        this.currentClothes = this._playerGameObjectInfo.hasBianID ? this._playerGameObjectInfo.bianID : this._playerGameObjectInfo.clothes;
    };
    PlayerAnimation.prototype.weapon = function () {
        if (this._currentAction == FigureAction.SLIDE)
            this.currentWeapon = 0;
        else
            this.currentWeapon = this._playerGameObjectInfo.hasBianID ? 0 : this._playerGameObjectInfo.weapon;
    };
    PlayerAnimation.prototype.weaponEffect = function () {
        if (FigureAction.isAttackAction(this._currentAction) && !this._playerGameObjectInfo.hasBianID) {
            this.currentWeaponEffect = this._playerGameObjectInfo.attrInfo.career;
        }
        else
            this.currentWeaponEffect = 0;
    };
    PlayerAnimation.prototype.wing = function () {
        this.currentWing = this._playerGameObjectInfo.hasBianID ? 0 : this._playerGameObjectInfo.wing;
    };
    PlayerAnimation.prototype.dead = function () {
    };
    PlayerAnimation.prototype.setFrames = function (action) {
        switch (action) {
            case FigureAction.WALK:
                this._frames = [1, 5, 9, 13, 17, 21];
                this._totalFrame = 24;
                break;
            case FigureAction.STAND:
            case FigureAction.KITE:
                this._frames = [1, 7, 13, 19];
                this._totalFrame = 24;
                break;
            case FigureAction.ATTACK1:
                this._frames = [1, 4, 8, 11, 15];
                this._totalFrame = 18;
                this._weaponEffectFrames = [8, 11, 15];
                break;
            case FigureAction.ATTACK2:
                this._frames = [1, 4, 7, 9, 11, 13, 16, 19];
                this._totalFrame = 21;
                this._weaponEffectFrames = [4, 7, 9, 11, 13, 16, 19];
                break;
            case FigureAction.ATTACK3:
                this._frames = [1, 4, 7, 10, 13, 17];
                this._totalFrame = 20;
                this._weaponEffectFrames = [4, 7, 10, 13, 17];
                break;
            case FigureAction.JUMP:
            case FigureAction.WATER:
                this._frames = [1];
                this._totalFrame = 1;
                break;
            case FigureAction.DEAD:
                this._frames = [1];
                this._totalFrame = 1;
                break;
            case FigureAction.SIT:
            case FigureAction.SLIDE:
                this._frames = [1, 7, 13, 19];
                this._totalFrame = 24;
                break;
        }
    };
    PlayerAnimation.prototype.getClothesGroupName = function () {
        if (this._currentAction == FigureAction.DEAD)
            return "body" + this._currentClothes + "_3_d";
        else if (this._currentAction == FigureAction.SIT) {
            var clothesID = void 0;
            if (this._playerGameObjectInfo.attrInfo.career == 1)
                clothesID = 1001;
            else
                clothesID = 2001;
            return "body" + clothesID + "_" + Direction.getResGroupShortName(this._currentDirection) + "_" + FigureAction.getResGroupShortName(this._currentAction);
        }
        else
            return "body" + this._currentClothes + "_" + Direction.getResGroupShortName(this._currentDirection) + "_" + FigureAction.getResGroupShortName(this._currentAction);
    };
    PlayerAnimation.prototype.getWeaponGroupName = function () {
        if (this._currentAction == FigureAction.DEAD)
            return "weapon" + this._currentWeapon + "_3_d";
        else if (this._currentAction == FigureAction.SIT)
            return "";
        else
            return "weapon" + this._currentWeapon + "_" + Direction.getResGroupShortName(this._currentDirection) + "_" + FigureAction.getResGroupShortName(this._currentAction);
    };
    PlayerAnimation.prototype.getWeaponEffectGroupName = function () {
        return "skillweapon_" + Direction.getResGroupShortName(this._currentDirection) + "_" + FigureAction.getResGroupShortName(this._currentAction);
    };
    PlayerAnimation.prototype.getWingGroupName = function () {
        if (this._currentAction == FigureAction.DEAD)
            return "wing" + this._currentWing + "_3_d";
        else if (this._currentAction == FigureAction.SIT)
            return "";
        else
            return "wing" + this._currentWing + "_" + Direction.getResGroupShortName(this._currentDirection) + "_" + FigureAction.getResGroupShortName(this._currentAction);
    };
    PlayerAnimation.prototype.render = function (interval) {
        var that = this;
        if (that._frames != null && that.hasGhost() || that._playerGameObjectInfo.needCanYing)
            that.updateGhost();
        if (that._isChangeStyle) {
            that.updateStyle();
            that._isChangeStyle = false;
        }
        if (that._isChangeWeapon) {
            that._isChangeWeapon = false;
            that.updateWeapon();
        }
        if (that._isChangeWeaponEffect) {
            that._isChangeWeaponEffect = false;
            that.updateWeaponEffect();
        }
        if (that._isChangeWing) {
            that._isChangeWing = false;
            that.updateWing();
        }
        _super.prototype.render.call(this, interval);
    };
    PlayerAnimation.prototype.renderCurrentFrame = function () {
        var that = this;
        if (that._currentFrame > that._totalFrame) {
            var wrapmode = FigureAction.getWrapMode(that._currentAction);
            switch (wrapmode) {
                case WrapMode.ONCE:
                    that._pause = true;
                    break;
                case WrapMode.ONCE_DEFAULT:
                    that._currentTimer = 0;
                    that._currentFrame = 1;
                    that.onceDefault();
                    break;
                case WrapMode.ATTACK:
                    that._currentTimer = 0;
                    that._currentFrame = 1;
                    if (that._info instanceof SelfGameObjectInfo) {
                        if (that._info.target == null)
                            that.onceDefault();
                        else
                            that._info.playRandomAttack();
                    }
                    else if ((that._info instanceof PlayerGameObjectInfo) && that._info.isSceneRobot) {
                        //机器人循环播放攻击动作
                        that._info.playRandomAttack();
                        that.figureAction = that._info.getActionStr(); //机器人没有对应的PlayerGameObject，所以此处直接更改PlayerAnimation的figureAction属性
                    }
                    break;
                default:
                    that._currentTimer = 0;
                    that._currentFrame = 1;
                    break;
            }
        }
    };
    PlayerAnimation.prototype.updateGhost = function () {
        var that = this;
        that._jumpCanYingFlag++;
        if (that._jumpCanYingFlag >= 3) {
            that._jumpCanYingFlag = 0;
            if (that._playerGameObjectInfo != null && that._playerGameObjectInfo.needCanYing) {
                that.addGhost(that._clothes, that._playerGameObjectInfo.x, that._playerGameObjectInfo.y);
            }
        }
        _super.prototype.updateGhost.call(this);
    };
    PlayerAnimation.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        Manager.pool.push(this._weapon);
        this._weapon = null;
        Manager.pool.push(this._weaponEffect);
        this._weaponEffect = null;
        Manager.pool.push(this._wing);
        this._wing = null;
        this._weaponEffectFrames = null;
        this._playerGameObjectInfo = null;
    };
    return PlayerAnimation;
}(ShowAnimation));
//# sourceMappingURL=PlayerAnimation.js.map