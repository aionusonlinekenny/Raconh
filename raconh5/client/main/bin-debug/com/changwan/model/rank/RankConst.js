var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 排行榜单个数据
 * luzhihong
 * create 2017-11-03
 */
var RankConst = (function () {
    function RankConst() {
    }
    /**战力排行 */
    RankConst.TYPE_POWER = 0;
    /**等级排行 */
    RankConst.TYPE_LEVEL = 1;
    /**宠物排行 */
    RankConst.TYPE_PET = 2;
    /**绝学排行 */
    RankConst.TYPE_JIE_XUE = 3;
    /**命格排行 */
    RankConst.TYPE_MING_GE = 4;
    /**宝石排行 */
    RankConst.TYPE_GEM = 5;
    /**铸魂排行 */
    RankConst.TYPE_SOUL = 6;
    return RankConst;
}());
__reflect(RankConst.prototype, "RankConst");
//# sourceMappingURL=RankConst.js.map