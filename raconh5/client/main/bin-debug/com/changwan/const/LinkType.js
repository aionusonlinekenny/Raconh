var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 链接Const
 * luzhihong
 * create 2017-11-23
 */
var LinkType = (function () {
    function LinkType() {
    }
    /**寻路到某地图某点(1|mapID|x|y)*/
    // public static GOTO:number = 1;
    /**寻路到NPC(2|NPC_ID)*/
    LinkType.GOTO_NPC = 2;
    /**物品使用(3|base_id)*/
    LinkType.USE_ITEMS = 3;
    //面板类型（1000-1999）--------------------------------------------------------
    /**角色面板(1000|页签index)  时装1000|2|0|2006*/
    LinkType.PANEL_ROLE = 1000;
    /**锻造面板(1001|页签index)*/
    LinkType.PANEL_EQUIP = 1001;
    /**背包面板(1002|页签index)*/
    LinkType.PANEL_BAG = 1002;
    /**邮件面板(1003|页签index)*/
    LinkType.PANEL_MAIL = 1003;
    /**地图面板(1004|页签index)*/
    LinkType.PANEL_MAP = 1004;
    /**排行榜面板(1005|页签index)*/
    LinkType.PANEL_RANK = 1005;
    /**商城面板(1017|页签index)单开*/
    LinkType.PANEL_SHOP = 1017;
    /**联盟面板(1007|页签index)*/
    LinkType.PANEL_CLUB = 1007;
    /**技能面板(1008|页签index)*/
    LinkType.PANEL_SKILL = 1008;
    /**活动面板(1009|页签index)*/
    LinkType.PANEL_ACTIVITY = 1009;
    /**BOSS面板(1010|页签index)*/
    LinkType.PANEL_BOSS = 1010;
    /**首充豪礼面板(1011|页签index)*/
    LinkType.PANEL_FIRST_CHARGE = 1011;
    /**充值(1012)*/
    LinkType.PANEL_RECHARGE = 1012;
    /**战场面板(1013|页签index)*/
    LinkType.PANEL_BF = 1013;
    /**vip面板(1014|页签index)*/
    LinkType.PANEL_VIP = 1014;
    /**转生面板(1015|页签index)*/
    LinkType.PANEL_REIN = 1015;
    /**好友面板(1016|页签index)*/
    LinkType.PANEL_FRIEND = 1016;
    /**商城面板(1006|页签index)多开*/
    LinkType.PANEL_SHOP_MULTE = 1006;
    /**凌烟阁面板(1018)*/
    LinkType.PANEL_ARTIFACT = 1018;
    /**福利面板(1019|页签index)*/
    LinkType.PANEL_CASHCOW = 1019;
    /**投资面板(1020|页签index)*/
    LinkType.PANEL_SYSPRIVILEGE = 1020;
    /**累计充值活动面板(1021|页签index)*/
    LinkType.PANEL_RECHARGEACTIVITY = 1021;
    /**盟会战面板(1022|页签index)*/
    LinkType.PANEL_CLUBBF = 1022;
    /**投资（1023） */
    LinkType.PANEL_INVEST = 1023;
    /**爬塔面板(1024|页签index) */
    LinkType.PANEL_COPY_TOWER = 1024;
    /**经验面板(1025|页签index) */
    LinkType.PANEL_COPY_EXP = 1025;
    /**银币面板(1026|页签index) */
    LinkType.PANEL_COPY_SILVER = 1026;
    /**天天返利面板(1027|页签index) */
    LinkType.PANEL_DAILYREBATE = 1027;
    /**分享面板(1028) */
    LinkType.PANEL_SHARE = 1028;
    /**缥缈录 */
    LinkType.PANEL_MATERIAL = 1029;
    /**冲榜竞技面板 */
    LinkType.PANEL_SRV_RANK = 1030;
    /**火眼金睛面板 */
    LinkType.PANEL_FIRE_EYE = 1031;
    /**论剑台 */
    LinkType.PANEL_CLUB_ARENA = 1032;
    /**魔神降临(1033) */
    LinkType.PANEL_DEVIL = 1033;
    /**功法阁(1034) */
    LinkType.PANEL_GFG = 1034;
    /**市场 */
    LinkType.PANEL_MARKET = 1035;
    /**盟会信息界面(1500)*/
    LinkType.VIEW_CLUB = 1500;
    /**宗门职位界面(1501)*/
    LinkType.VIEW_CLUB_CAREER = 1501;
    return LinkType;
}());
__reflect(LinkType.prototype, "LinkType");
//# sourceMappingURL=LinkType.js.map