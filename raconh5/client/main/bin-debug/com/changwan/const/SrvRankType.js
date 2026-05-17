var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * pzx
 * create 18.2.5
 */
var SrvRankType = (function () {
    function SrvRankType() {
    }
    /** 墨宠榜：1*/
    SrvRankType.PET_TYPE = 1;
    /** 等级榜：2*/
    SrvRankType.LEVE_TYPE = 2;
    /** 绝学榜：3 */
    SrvRankType.JUEXUE_TYPE = 3;
    /** 命格榜：4 */
    SrvRankType.LIFEGRID_TYPE = 4;
    /** 铸魂榜：5 */
    SrvRankType.SOUL_TYPE = 5;
    /** 宝石榜：6 */
    SrvRankType.GEM_TYPE = 6;
    /** 战力榜：7 */
    SrvRankType.FIGHT_TYPE = 7;
    return SrvRankType;
}());
__reflect(SrvRankType.prototype, "SrvRankType");
//# sourceMappingURL=SrvRankType.js.map