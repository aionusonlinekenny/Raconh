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
 *create 2017-11-2
 *update devlil 2017-11-08
 *description
*/
var MonsterGameObjectInfo = /** @class */ (function (_super) {
    __extends(MonsterGameObjectInfo, _super);
    function MonsterGameObjectInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MonsterGameObjectInfo.prototype, "cvo", {
        get: function () {
            return this._cvo;
        },
        enumerable: true,
        configurable: true
    });
    MonsterGameObjectInfo.prototype.getType = function () {
        return this._elementType;
    };
    Object.defineProperty(MonsterGameObjectInfo.prototype, "borderWidth", {
        get: function () {
            return this._cvo.showHalfWidth;
        },
        enumerable: true,
        configurable: true
    });
    MonsterGameObjectInfo.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._cvo = null;
    };
    MonsterGameObjectInfo.prototype.reuse = function (id, cvoID) {
        this.setCVO(cvoID);
        _super.prototype.reuse.call(this, id);
    };
    MonsterGameObjectInfo.prototype.getName = function () {
        return HtmlUtil.addFontTag(this._cvo.name, this._cvo.nameColor);
    };
    Object.defineProperty(MonsterGameObjectInfo.prototype, "fullName", {
        get: function () {
            var str = this._cvo.gradeName + this._cvo.name;
            return HtmlUtil.addFontTag(str, this._cvo.nameColor);
        },
        enumerable: true,
        configurable: true
    });
    MonsterGameObjectInfo.prototype.canHited = function (showMsg) {
        if (showMsg === void 0) { showMsg = true; }
        if (this._cvo == null)
            return false;
        if (this._cvo && !((this._cvo.canAttackedFlag & 2) == 2))
            return false;
        return true;
    };
    MonsterGameObjectInfo.prototype.getAnimationType = function () {
        return AnimationType.MONSTER;
    };
    MonsterGameObjectInfo.prototype.setDirection = function (value) {
        if (this.cvo && this.cvo.singleDic && value != Direction.RIGHT_TOP)
            value = Direction.RIGHT_TOP;
        _super.prototype.setDirection.call(this, value);
    };
    MonsterGameObjectInfo.prototype.setActionStr = function (value) {
        if (this.cvo && this.cvo.singleAction && value != FigureAction.STAND)
            value = FigureAction.STAND;
        _super.prototype.setActionStr.call(this, value);
    };
    MonsterGameObjectInfo.prototype.setAliveFlag = function (value) {
        if (this._view != null)
            this._view.markDead();
        _super.prototype.setAliveFlag.call(this, value);
        if (!value) {
            this.resetHitedWhiteFilter();
            var delayTime = this.cvo.deadNoHide ? 1000000 : 2000;
            var needImmediately = (this._view == null); //_view存在的话，设为flase不立即移除，因为要做死亡击飞或者死亡渐隐动画
            Manager.model.getGameobject().removeGameObject(this, needImmediately, delayTime);
        }
    };
    MonsterGameObjectInfo.prototype.setBattleFlag = function (value) {
        _super.prototype.setBattleFlag.call(this, value);
        var self = Manager.model.self;
        if (this._view && self.target == this)
            this._view.eventStrip(value);
    };
    MonsterGameObjectInfo.prototype.playDeadAnimation = function () {
        if (this._view != null)
            this._view.playMonsterDeadAnimation();
    };
    MonsterGameObjectInfo.prototype.setCVO = function (cvoID) {
        this._cvo = MonsterCVO.getCVO(cvoID);
        if (this._cvo.grade == MonsterGrade.ELITE || this._cvo.grade == MonsterGrade.BOSS)
            this._elementType = GameObjectType.MONSTER_BOSS;
        else
            this._elementType = GameObjectType.MONSTER_NORMAL;
    };
    MonsterGameObjectInfo.prototype.getBombShootPos = function () {
        return new egret.Point(this.x, this.y - this._cvo.height / 2);
    };
    /**
     * @param flag 1脚底 2名称高度 3名称高度一半
     */
    MonsterGameObjectInfo.prototype.getBuffAniPos = function (flag) {
        if (this._cvo != null) {
            if (flag == 1)
                return new egret.Point();
            else if (flag == 2)
                return new egret.Point(0, -this._cvo.height - 30);
            else if (flag == 3)
                return new egret.Point(0, -this._cvo.height / 2);
        }
        return new egret.Point();
    };
    MonsterGameObjectInfo.prototype.getSctPos = function () {
        return new egret.Point(this.x, this.y - this._cvo.height / 2);
    };
    MonsterGameObjectInfo.prototype.beatBack = function (targetX, targetY) {
        if (this._view != null)
            this._view.eventBeatBack(targetX, targetY);
    };
    MonsterGameObjectInfo.prototype.parse = function (data, isNew) {
        this.attrInfo.setValue(AttrDescType.HP_MAX, data.readInt64());
        this.attrInfo.setValue(AttrDescType.HP, data.readInt64());
        this.attrInfo.setValue(AttrDescType.SPEED, data.readShort());
        var posX = data.readShort();
        var posY = data.readShort();
        if (isNew)
            this.updatePostion(posX, posY);
        this._union = data.readInt();
        this.parseBuff(data);
        this.attrInfo.setValue(AttrDescType.FIGHT, data.readInt());
        this.attrInfo.setValue(AttrDescType.LEVEL, data.readShort());
    };
    Object.defineProperty(MonsterGameObjectInfo.prototype, "level", {
        get: function () {
            if (this.attrInfo.level > 0)
                return this.attrInfo.level;
            return this._cvo.level;
        },
        enumerable: true,
        configurable: true
    });
    MonsterGameObjectInfo.prototype.parseBuff = function (data) {
        var buff;
        var buffGroupID;
        var buffLevel;
        var buffLen = data.readShort();
        for (var i = 0; i < buffLen; i++) {
            buffGroupID = data.readInt();
            buffLevel = data.readByte();
            buff = this.getBuffById(buffGroupID);
            if (buff == null) {
                buff = BuffCVO.getCVO(buffGroupID, buffLevel);
                this.addBuff(buff);
            }
        }
    };
    MonsterGameObjectInfo.prototype.createGameObject = function () {
        if (this._view == null)
            this._view = Manager.pool.create(MonsterGameObject, this);
        return this._view;
    };
    MonsterGameObjectInfo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._cvo = null;
    };
    return MonsterGameObjectInfo;
}(AliveGameObjectInfo));
//# sourceMappingURL=MonsterGameObjectInfo.js.map