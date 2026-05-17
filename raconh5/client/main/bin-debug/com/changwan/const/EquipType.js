var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EquipType = (function () {
    function EquipType() {
    }
    /**武器 */
    EquipType.EQUIP_WEAPON = 1;
    /**项链 */
    EquipType.EQUIP_NECKLACE = 2;
    /**护符 */
    EquipType.EQUIP_AMULET = 3;
    /**玉佩 */
    EquipType.EQUIP_JADE = 4;
    /**头盔 */
    EquipType.EQUIP_HELMET = 5;
    /**衣服 */
    EquipType.EQUIP_CLOTHES = 6;
    /**手套 */
    EquipType.EQUIP_GLOVE = 7;
    /**鞋子 */
    EquipType.EQUIP_SHOES = 8;
    return EquipType;
}());
__reflect(EquipType.prototype, "EquipType");
//# sourceMappingURL=EquipType.js.map