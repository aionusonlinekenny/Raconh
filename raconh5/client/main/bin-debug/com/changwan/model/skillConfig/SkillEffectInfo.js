var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *author Anydo
 *create 2017-11-17
 *description
*/
var SkillEffectInfo = (function () {
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
__reflect(SkillEffectInfo.prototype, "SkillEffectInfo", ["cw.IPool", "cw.IDispose"]);
//# sourceMappingURL=SkillEffectInfo.js.map