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
 * 宠物control
 * liangyan
 * create 2017-12-16
*/
var PetControl = (function (_super) {
    __extends(PetControl, _super);
    function PetControl() {
        return _super.call(this) || this;
    }
    PetControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.PET_ALL_INFO, PetAllInfoCMD);
        Manager.socket.addCMD(Protocol.PET_UPGRADE, PetUpgradeCMD);
        Manager.socket.addCMD(Protocol.PET_ZZD_USE, PetZZDUseCMD);
        Manager.socket.addCMD(Protocol.PET_WXD_USE, PetWXDUseCMD);
        Manager.socket.addCMD(Protocol.PET_HUANHUA, PetHuanhuaCMD);
        Manager.socket.addCMD(Protocol.PET_SKILL_UPGRADE, PetSkillUpgradeCMD);
        Manager.socket.addCMD(Protocol.PET_ITEM_STYLE_LIST, PetItemStyleListCMD);
    };
    PetControl.prototype.upgradePet = function () {
        var cmd = Manager.socket.getCMD(Protocol.PET_UPGRADE);
        cmd.send();
    };
    PetControl.prototype.upgradePetSkill = function (groupId) {
        var cmd = Manager.socket.getCMD(Protocol.PET_SKILL_UPGRADE);
        cmd.groupId = groupId;
        cmd.send();
    };
    PetControl.prototype.usePetZZD = function () {
        var cmd = Manager.socket.getCMD(Protocol.PET_ZZD_USE);
        cmd.send();
    };
    PetControl.prototype.usePetWXD = function () {
        var cmd = Manager.socket.getCMD(Protocol.PET_WXD_USE);
        cmd.send();
    };
    PetControl.prototype.huanhuaPet = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.PET_HUANHUA);
        cmd.id = id;
        cmd.send();
    };
    return PetControl;
}(BaseControl));
__reflect(PetControl.prototype, "PetControl");
//# sourceMappingURL=PetControl.js.map