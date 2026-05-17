var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BFType = (function () {
    function BFType() {
    }
    /**副本*/
    BFType.COPY = 1;
    /**个人boss*/
    BFType.BOSS_PRIVATE = 2;
    /**全民boss*/
    BFType.BOSS_PUBLIC = 3;
    /**个人竞技*/
    BFType.club = 4;
    /**伏魔塔*/
    BFType.TOWER = 5;
    /**个人竞技*/
    BFType.ARENA = 6;
    /**传功*/
    BFType.CHUAN_GONG = 7;
    /**斗地主*/
    BFType.LANDLORD = 8;
    /**盟会战*/
    BFType.CLUB_BF = 9;
    /**盟会战: 打boss*/
    BFType.CLUB_BF_BOSS = 10;
    /**盟会战: 1v1*/
    BFType.CLUB_BF_1V1 = 11;
    /**火眼金睛 */
    BFType.FIRE_EYE = 13;
    /**魔神降临 */
    BFType.DEVIL = 14;
    return BFType;
}());
__reflect(BFType.prototype, "BFType");
//# sourceMappingURL=BFType.js.map