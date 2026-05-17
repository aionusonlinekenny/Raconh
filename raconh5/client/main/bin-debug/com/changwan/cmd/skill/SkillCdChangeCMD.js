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
 *create 2017-12-5
 *description
*/
var SkillCdChangeCMD = (function (_super) {
    __extends(SkillCdChangeCMD, _super);
    function SkillCdChangeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.SKILL_CD_CHANGE;
        return _this;
    }
    SkillCdChangeCMD.prototype.receive = function (pi) {
        var id = pi.readShort();
        var cd = pi.readInt();
        var cvo = SkillCVO.getCVO(id);
        cvo.setRunning((cd > 0), cd);
    };
    return SkillCdChangeCMD;
}(BaseCMD));
__reflect(SkillCdChangeCMD.prototype, "SkillCdChangeCMD");
//# sourceMappingURL=SkillCdChangeCMD.js.map