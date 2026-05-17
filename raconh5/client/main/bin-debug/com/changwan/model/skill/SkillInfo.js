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
 *create 2017-11-14
 *description
*/
var SkillInfo = (function (_super) {
    __extends(SkillInfo, _super);
    function SkillInfo(cvo, lev) {
        var _this = _super.call(this) || this;
        _this._level = -1;
        _this._cvo = cvo;
        _this.level = lev;
        return _this;
    }
    Object.defineProperty(SkillInfo.prototype, "level", {
        get: function () { return this._level; },
        set: function (value) {
            if (this._level == value)
                return;
            this._level = value;
            this.id = this._cvo.groupID * 1000 + this._level;
            // this.dispatchEvent(new SkillEvent(SkillEvent.UPDATE_SKILL_LEVEL));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillInfo.prototype, "cvo", {
        get: function () { return this._cvo; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillInfo.prototype, "isUnLearn", {
        get: function () { return (this._level == 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillInfo.prototype, "maxRange", {
        get: function () { return this._cvo.maxRange; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillInfo.prototype, "coldDownTime", {
        get: function () { return this._cvo.coldDownTime; },
        enumerable: true,
        configurable: true
    });
    SkillInfo.prototype.startRunning = function () {
        if (this._cvo == null || this._level == 0)
            return;
        this._cvo.setRunning(true, this.coldDownTime);
    };
    SkillInfo.prototype.startCommonRunning = function (commonCD) {
        if (this._cvo == null || this._level == 0)
            return;
        this._cvo.setCommonRunning(true, commonCD);
    };
    SkillInfo.prototype.isMaxLevel = function () {
        if (this._cvo.type == 1) {
            return this._level >= this._cvo.maxLevel;
        }
        else
            return (this._level >= 1);
    };
    Object.defineProperty(SkillInfo.prototype, "hasLearn", {
        get: function () {
            if (this._cvo == null)
                return false;
            if (this._level <= 0)
                return false;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    SkillInfo.prototype.getSkillFormulaCvo = function (type) {
        var formula = SkillFormulaCVO.getCVO(this.cvo.groupID, type);
        return formula;
    };
    SkillInfo.prototype.dispose = function () {
        this._cvo = null;
    };
    return SkillInfo;
}(egret.EventDispatcher));
__reflect(SkillInfo.prototype, "SkillInfo");
//# sourceMappingURL=SkillInfo.js.map