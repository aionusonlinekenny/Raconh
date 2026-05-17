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
 * 升级主动技能
 * liangyan
 * create 2017-11-21
*/
var SkillActiveUpgradeCMD = (function (_super) {
    __extends(SkillActiveUpgradeCMD, _super);
    function SkillActiveUpgradeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SKILL_ACTIVE_UPGRADE;
        return _this;
    }
    SkillActiveUpgradeCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.id);
    };
    return SkillActiveUpgradeCMD;
}(BaseCMD));
__reflect(SkillActiveUpgradeCMD.prototype, "SkillActiveUpgradeCMD");
//# sourceMappingURL=SkillActiveUpgradeCMD.js.map