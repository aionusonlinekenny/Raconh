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
 * 技能controller
 * liangyan
 * create 2017-11-21
*/
var SkillControl = /** @class */ (function (_super) {
    __extends(SkillControl, _super);
    function SkillControl() {
        return _super.call(this) || this;
    }
    SkillControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.SKILL_INFO, SkillInfoCMD);
        Manager.socket.addCMD(Protocol.SKILL_ACTIVE_UPGRADE, SkillActiveUpgradeCMD);
        Manager.socket.addCMD(Protocol.SKILL_PASSIVE_ACT, SkillPassiveActCMD);
        Manager.socket.addCMD(Protocol.SKILL_ALL_UP, SkillAllUpCMD);
        Manager.socket.addCMD(Protocol.SKILL_CD_CHANGE, SkillCdChangeCMD);
        Manager.socket.addCMD(Protocol.SKILL_SINGLE_UPDATE, SkillSingleUpdateCMD);
    };
    /**升级主动技能 */
    SkillControl.prototype.upgradeActive = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.SKILL_ACTIVE_UPGRADE);
        cmd.id = id;
        cmd.send();
    };
    /**激活被动技能 */
    SkillControl.prototype.actPassive = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.SKILL_PASSIVE_ACT);
        cmd.id = id;
        cmd.send();
    };
    /**一键升级技能 */
    SkillControl.prototype.allUp = function (arr) {
        var cmd = Manager.socket.getCMD(Protocol.SKILL_ALL_UP);
        cmd.arr = arr;
        cmd.send();
    };
    return SkillControl;
}(BaseControl));
//# sourceMappingURL=SkillControl.js.map