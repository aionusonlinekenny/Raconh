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
 * 装备控制器
 */
var EquipControl = (function (_super) {
    __extends(EquipControl, _super);
    function EquipControl() {
        return _super.call(this) || this;
    }
    EquipControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.EQUIP_STRENGTHEN_INFO, EquipStrengthenInfoCMD);
        Manager.socket.addCMD(Protocol.EQUIP_STRENGTHEN, EquipStrengthenCMD);
        Manager.socket.addCMD(Protocol.EQUIP_ZHUHUN, EquipZhuhunCMD);
        Manager.socket.addCMD(Protocol.EQUIP_GEM, EquipGemCMD);
        Manager.socket.addCMD(Protocol.EQUIP_GEM_PICKOFF, EquipGemPickOffCMD);
        Manager.socket.addCMD(Protocol.EQUIP_GEM_UPGRADE, EquipGemUpgradeCMD);
        Manager.socket.addCMD(Protocol.EQUIP_RONGLIAN, EquipRonglianCMD);
        Manager.socket.addCMD(Protocol.EQUIP_ONEKEY, EquipOneKeyCMD);
        Manager.socket.addCMD(Protocol.SUIT_INFO, EquipSuitInfoCMD);
        Manager.socket.addCMD(Protocol.SUIT_UPGRADE, EquipSuitUpgradeCMD);
        Manager.socket.addCMD(Protocol.SUIT_SPLIT, EquipSuitSplitCMD);
    };
    /**
     * 请求装备槽信息
     */
    EquipControl.prototype.equipStrengthenQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.EQUIP_STRENGTHEN_INFO);
        cmd.send();
    };
    /**
     * 强化
     */
    EquipControl.prototype.equipStrengthen = function () {
        var cmd = Manager.socket.getCMD(Protocol.EQUIP_STRENGTHEN);
        cmd.send();
    };
    /**
     * 铸魂
     */
    EquipControl.prototype.equipZhuhun = function (pos) {
        var cmd = Manager.socket.getCMD(Protocol.EQUIP_ZHUHUN);
        cmd.pos = pos;
        cmd.send();
    };
    /**
     * 宝石镶嵌
     */
    EquipControl.prototype.equipGem = function (pos, itemList) {
        var cmd = Manager.socket.getCMD(Protocol.EQUIP_GEM);
        cmd.pos = pos;
        cmd.itemList = itemList;
        cmd.send();
    };
    /**
     * 宝石卸下
     */
    EquipControl.prototype.equipGemPickOff = function (pos, gemPos) {
        var cmd = Manager.socket.getCMD(Protocol.EQUIP_GEM_PICKOFF);
        cmd.pos = pos;
        cmd.gemPos = gemPos;
        cmd.send();
    };
    /**
     * 宝石升级
     */
    EquipControl.prototype.equipGemUpgrade = function (pos, gemPos) {
        var cmd = Manager.socket.getCMD(Protocol.EQUIP_GEM_UPGRADE);
        cmd.pos = pos;
        cmd.gemPos = gemPos;
        cmd.send();
    };
    /**
     * 装备熔炼
     */
    EquipControl.prototype.equipRonglian = function (list) {
        var cmd = Manager.socket.getCMD(Protocol.EQUIP_RONGLIAN);
        cmd.list = list;
        cmd.send();
    };
    /**
     * 一键装备
     */
    EquipControl.prototype.equipOneKey = function (list) {
        var cmd = Manager.socket.getCMD(Protocol.EQUIP_ONEKEY);
        cmd.list = list;
        cmd.send();
    };
    /**
     * 套装信息
     */
    EquipControl.prototype.suitInfoQuery = function () {
        var cmd = Manager.socket.getCMD(Protocol.SUIT_INFO);
        cmd.send();
    };
    /**
     * 套装升阶
     */
    EquipControl.prototype.suitUpgrade = function (pos) {
        var cmd = Manager.socket.getCMD(Protocol.SUIT_UPGRADE);
        cmd.pos = pos;
        cmd.send();
    };
    /**
     * 套装拆解
     */
    EquipControl.prototype.suitSplit = function (pos) {
        var cmd = Manager.socket.getCMD(Protocol.SUIT_SPLIT);
        cmd.pos = pos;
        cmd.send();
    };
    return EquipControl;
}(BaseControl));
__reflect(EquipControl.prototype, "EquipControl");
//# sourceMappingURL=EquipControl.js.map