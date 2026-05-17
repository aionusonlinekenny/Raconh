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
 *create 2018-1-31
 *description
*/
var PetSkillUpgradeCMD = (function (_super) {
    __extends(PetSkillUpgradeCMD, _super);
    function PetSkillUpgradeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.PET_SKILL_UPGRADE;
        return _this;
    }
    PetSkillUpgradeCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.groupId);
    };
    PetSkillUpgradeCMD.prototype.receive = function (pi) {
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var groupId = pi.readShort();
            var level = pi.readShort();
            Manager.model.getPet().setPetSkillLevel(groupId, level);
        }
    };
    return PetSkillUpgradeCMD;
}(BaseCMD));
__reflect(PetSkillUpgradeCMD.prototype, "PetSkillUpgradeCMD");
//# sourceMappingURL=PetSkillUpgradeCMD.js.map