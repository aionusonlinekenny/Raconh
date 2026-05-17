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
 * 技能信息协议
 * liangyan
 * create 2017-11-21
*/
var SkillInfoCMD = (function (_super) {
    __extends(SkillInfoCMD, _super);
    function SkillInfoCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SKILL_INFO;
        return _this;
    }
    SkillInfoCMD.prototype.receive = function (pi) {
        Manager.model.getSkill().resetCareerSkills();
        var len = pi.readShort();
        var info;
        var cvo;
        var id;
        var level;
        var cd;
        for (var i = 0; i < len; i++) {
            id = pi.readShort();
            level = pi.readShort();
            cd = pi.readInt();
            cvo = SkillCVO.getCVO(id);
            cvo.setRunning((cd > 0), cd);
            info = new SkillInfo(cvo, level);
            if (Manager.model.getSkill().defaultSkill.cvo.groupID == info.cvo.groupID)
                Manager.model.getSkill().defaultSkill = info;
            else
                Manager.model.getSkill().careerSkills.push(info);
        }
        Manager.model.getSkill().parseHookSkills();
        Manager.model.getSkill().dispatchEvent(new SkillEvent(SkillEvent.SKILL_UPDATE));
    };
    return SkillInfoCMD;
}(BaseCMD));
__reflect(SkillInfoCMD.prototype, "SkillInfoCMD");
//# sourceMappingURL=SkillInfoCMD.js.map