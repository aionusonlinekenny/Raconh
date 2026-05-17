var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 命格类型
 * pzx
 * create 2017-12-22
*/
var LifeGridType = (function () {
    function LifeGridType() {
    }
    /**命格 */
    LifeGridType.LIFEGRID = 0;
    /**分解 */
    LifeGridType.RESOLVE = 1;
    /**兑换 */
    LifeGridType.BUY = 2;
    /**猎命 */
    LifeGridType.HUNT = 3;
    /** 命格个数 */
    LifeGridType.LIFENUM = 8;
    //=========LifeGridHuntCvoInfo表id   ====
    //消耗物品
    LifeGridType.HUNT_ITEM = 2;
    //消耗元宝
    LifeGridType.HUNT_CVO = 3;
    //十次消耗元宝
    LifeGridType.HUNT_TEN_CVO = 4;
    //十次消耗物品
    LifeGridType.HUNT_TEN_ITEM = 5;
    return LifeGridType;
}());
__reflect(LifeGridType.prototype, "LifeGridType");
//# sourceMappingURL=LifeGridType.js.map