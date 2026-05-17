var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * create 18.2.5
 */
var ShopType = (function () {
    function ShopType() {
    }
    // 	商城类型
    // 1、元宝；
    // 2、神秘商城；
    // 3、荣誉商城；
    // 4、VIP商城
    // 5、命格兑换
    // 6、珍宝阁
    ShopType.GOLD_TYPE = 1;
    ShopType.SHENMI_TYPE = 2;
    ShopType.RONGYU_TYPE = 3;
    ShopType.VIP_TYPE = 4;
    ShopType.LIFEGRID_TYPE = 5;
    ShopType.TREASUREGARRET_TYPE = 6;
    return ShopType;
}());
__reflect(ShopType.prototype, "ShopType");
//# sourceMappingURL=ShopType.js.map