var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ItemsType = (function () {
    function ItemsType() {
    }
    /**装备 */
    ItemsType.EQUIE = 1;
    /**背包 */
    ItemsType.BAG = 2;
    /**仓库 */
    ItemsType.DEPOT = 3;
    /** 命格背包 */
    ItemsType.LIFEGRIDBAG = 4;
    /** 已穿戴命格 */
    ItemsType.LIFEGRID = 5;
    //====== 首具类型 对应item表 type字段
    /** 命格晶石 */
    ItemsType.TYPE_LIFEGRID_SPAR = 31;
    /** 礼包 */
    ItemsType.TYPE_GIFT = 13;
    //===================对应表 group
    /**命格组 */
    ItemsType.GROUP_LIFEGRID = 4;
    /** 礼包 */
    ItemsType.GROUP_GIFT = 13;
    //====================特殊道具＝＝＝＝＝＝＝＝＝＝＝＝＝
    /** 翡翠墨玉  (baseId:40000306　　当道具消耗）*/
    ItemsType.ITEM_40000306 = 40000306;
    return ItemsType;
}());
__reflect(ItemsType.prototype, "ItemsType");
//# sourceMappingURL=ItemsType.js.map