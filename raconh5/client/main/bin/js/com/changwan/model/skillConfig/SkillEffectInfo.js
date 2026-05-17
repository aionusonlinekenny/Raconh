/**
 *author Anydo
 *create 2017-11-17
 *description
*/
var SkillEffectInfo = /** @class */ (function () {
    function SkillEffectInfo() {
    }
    SkillEffectInfo.prototype.reuse = function (cvo, effID, rotation, isConfig) {
        this.cvo = cvo;
        this.effID = effID;
        this.rotation = rotation;
        this.isConfig = isConfig;
    };
    SkillEffectInfo.prototype.unuse = function () {
        this.cvo = null;
    };
    SkillEffectInfo.prototype.dispose = function () {
        if (this._diposeFlag)
            return;
        this._diposeFlag = true;
        this.disposeSelf();
    };
    SkillEffectInfo.prototype.disposeSelf = function () {
        this.cvo = null;
    };
    return SkillEffectInfo;
}());
//# sourceMappingURL=SkillEffectInfo.js.map