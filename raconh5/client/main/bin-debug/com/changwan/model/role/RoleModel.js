var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleModel = (function () {
    function RoleModel() {
    }
    /**检测一键装备 */
    RoleModel.prototype.checkOneKeyWear = function () {
        var bol = false;
        if (OpenCVO.isOpen(OpenConst.ID_ONE_KEY_EQUIP)) {
            bol = Manager.model.getItems().oneKeyUpgradeEquipList.length >= 2;
        }
        return bol;
    };
    /**检测可操作（一键装备、神兵、背饰） */
    RoleModel.prototype.checkCanOperate = function () {
        var bol = this.checkOneKeyWear();
        if (bol)
            return true;
        else
            bol = Manager.model.getSoldier().checkCanUpgrade();
        if (bol)
            return true;
        else
            bol = Manager.model.getCloak().checkActiveCloak();
        if (bol)
            return true;
        else
            return false;
    };
    return RoleModel;
}());
__reflect(RoleModel.prototype, "RoleModel");
//# sourceMappingURL=RoleModel.js.map