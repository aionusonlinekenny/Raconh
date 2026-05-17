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
var MonsterAnimation = (function (_super) {
    __extends(MonsterAnimation, _super);
    function MonsterAnimation() {
        return _super.call(this) || this;
    }
    Object.defineProperty(MonsterAnimation.prototype, "monsterInfo", {
        get: function () { return this._info; },
        enumerable: true,
        configurable: true
    });
    MonsterAnimation.prototype.reuse = function (info) {
        this.isDeadFlag = !info.getAliveFlag();
        if (info.getActionStr() != null)
            this._currentAction = info.getActionStr();
        _super.prototype.reuse.call(this, info);
    };
    Object.defineProperty(MonsterAnimation.prototype, "currentClothes", {
        set: function (aniID) {
            var changeId = false;
            if (this._currentClothes != aniID) {
                this._currentClothes = aniID;
                var clothesGroupName = this.getClothesGroupName();
                var path = Manager.path.getMonsterPath(clothesGroupName);
                changeId = (this._currentLoadingClothes != path);
            }
            this._isChangeClothes = changeId || (this._updateDirection && !this.monsterInfo.cvo.singleDic) || (this._updateAction && !this.monsterInfo.cvo.singleAction);
        },
        enumerable: true,
        configurable: true
    });
    MonsterAnimation.prototype.getClothesGroupName = function () {
        var actionStr;
        if (this.monsterInfo.cvo.singleAction)
            actionStr = FigureAction.STAND;
        else if (this._currentAction == FigureAction.DEAD || this.isDeadFlag)
            return "monster" + this._currentClothes + "_3_d";
        else
            actionStr = this._currentAction;
        var dirStr = this.monsterInfo.cvo.singleDic ? Direction.RIGHT_TOP : this._currentDirection;
        return "monster" + this._currentClothes + "_" + Direction.getResGroupShortName(dirStr) + "_" + FigureAction.getResGroupShortName(actionStr);
    };
    MonsterAnimation.prototype.setFrames = function (action) {
        switch (action) {
            case FigureAction.WALK:
                this._frames = [1, 5, 9, 13];
                this._totalFrame = 16;
                break;
            case FigureAction.STAND:
                this._frames = [1, 7, 13, 19];
                this._totalFrame = 24;
                break;
            case FigureAction.ATTACK1:
                this._frames = [1, 5, 9, 13, 17];
                this._totalFrame = 20;
                break;
            case FigureAction.HITED:
            case FigureAction.DEAD:
                this._frames = [1];
                this._totalFrame = 1;
                break;
        }
    };
    MonsterAnimation.prototype.updateStyle = function () {
        this.clothes();
    };
    MonsterAnimation.prototype.clothes = function () {
        //死亡时info已经unuse，cvo为空，所以直接使用就的样式id取动作
        var newClothes = (this.monsterInfo.cvo != null) ? parseInt(this.monsterInfo.cvo.url) : this._currentClothes;
        this.currentClothes = newClothes;
    };
    MonsterAnimation.prototype.updateClothes = function () {
        _super.prototype.updateClothes.call(this);
        var clothesGroupName = this.getClothesGroupName();
        var path = Manager.path.getMonsterPath(clothesGroupName);
        Manager.loader.load(path, this.clothesComplete, this, ResourceGCType.AVATAR, ResPriorityType.LOAD_LEVEL4);
        this._currentLoadingClothes = path;
    };
    MonsterAnimation.prototype.getName = function (action, direction) {
        if (FigureAction.isAttackAction(action))
            action = "attack";
        return action + "_" + direction.replace("left", "right");
    };
    MonsterAnimation.prototype.dead = function () {
    };
    MonsterAnimation.prototype.render = function (interval) {
        if (this._isChangeStyle) {
            this.updateStyle();
            this._isChangeStyle = false;
        }
        _super.prototype.render.call(this, interval);
    };
    return MonsterAnimation;
}(ShowAnimation));
__reflect(MonsterAnimation.prototype, "MonsterAnimation");
//# sourceMappingURL=MonsterAnimation.js.map