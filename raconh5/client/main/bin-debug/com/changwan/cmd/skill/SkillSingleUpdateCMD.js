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
 * 单个技能更新
 * liangyan
 * create 2017-12-07
*/
var SkillSingleUpdateCMD = (function (_super) {
    __extends(SkillSingleUpdateCMD, _super);
    function SkillSingleUpdateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SKILL_SINGLE_UPDATE;
        return _this;
    }
    SkillSingleUpdateCMD.prototype.receive = function (pi) {
        var id = pi.readShort();
        var level = pi.readShort();
        var cd = pi.readInt();
        var cvo = SkillCVO.getCVO(id);
        cvo.setRunning((cd > 0), cd);
        var info = new SkillInfo(cvo, level);
        if (Manager.model.getSkill().defaultSkill.cvo.groupID == info.cvo.groupID)
            Manager.model.getSkill().defaultSkill = info;
        else
            Manager.model.getSkill().updateCareerSkills(info);
        Manager.model.getSkill().dispatchEvent(new SkillEvent(SkillEvent.SKILL_SINGLE_UPDATE, info.cvo.groupID));
    };
    return SkillSingleUpdateCMD;
}(BaseCMD));
__reflect(SkillSingleUpdateCMD.prototype, "SkillSingleUpdateCMD");
//# sourceMappingURL=SkillSingleUpdateCMD.js.map