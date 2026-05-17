/**
 * 链接Const
 * luzhihong
 * create 2017-11-23
 */
class LinkType
{
    /**寻路到某地图某点(1|mapID|x|y)*/
    // public static GOTO:number = 1;
    /**寻路到NPC(2|NPC_ID)*/
    public static GOTO_NPC:number = 2;
    /**物品使用(3|base_id)*/
    public static USE_ITEMS:number = 3;

    //面板类型（1000-1999）--------------------------------------------------------
    /**角色面板(1000|页签index)  时装1000|2|0|2006*/
    public static PANEL_ROLE:number = 1000;
    /**锻造面板(1001|页签index)*/
    public static PANEL_EQUIP:number = 1001;
    /**背包面板(1002|页签index)*/
    public static PANEL_BAG:number = 1002;
    /**邮件面板(1003|页签index)*/
    public static PANEL_MAIL:number = 1003;
    /**地图面板(1004|页签index)*/
    public static PANEL_MAP:number = 1004;
    /**排行榜面板(1005|页签index)*/
    public static PANEL_RANK:number = 1005;
    /**商城面板(1017|页签index)单开*/
    public static PANEL_SHOP:number = 1017;
    /**联盟面板(1007|页签index)*/
    public static PANEL_CLUB:number = 1007;
    /**技能面板(1008|页签index)*/
    public static PANEL_SKILL:number = 1008;
    /**活动面板(1009|页签index)*/
    public static PANEL_ACTIVITY:number = 1009;
    /**BOSS面板(1010|页签index)*/
    public static PANEL_BOSS:number = 1010;
    /**首充豪礼面板(1011|页签index)*/
    public static PANEL_FIRST_CHARGE:number = 1011;
    /**充值(1012)*/
    public static PANEL_RECHARGE:number = 1012;
    /**战场面板(1013|页签index)*/
    public static PANEL_BF:number = 1013;
    /**vip面板(1014|页签index)*/
    public static PANEL_VIP:number = 1014;
    /**转生面板(1015|页签index)*/
    public static PANEL_REIN:number = 1015;
    /**好友面板(1016|页签index)*/
    public static PANEL_FRIEND:number = 1016;
    /**商城面板(1006|页签index)多开*/
    public static PANEL_SHOP_MULTE:number = 1006;
    /**凌烟阁面板(1018)*/
    public static PANEL_ARTIFACT:number = 1018;
    /**福利面板(1019|页签index)*/
    public static PANEL_CASHCOW:number = 1019;
    /**投资面板(1020|页签index)*/
    public static PANEL_SYSPRIVILEGE:number = 1020;
    /**累计充值活动面板(1021|页签index)*/
    public static PANEL_RECHARGEACTIVITY:number = 1021;
    /**盟会战面板(1022|页签index)*/
    public static PANEL_CLUBBF:number = 1022;
    /**投资（1023） */
    public static PANEL_INVEST:number = 1023;
    /**爬塔面板(1024|页签index) */
    public static PANEL_COPY_TOWER:number = 1024;
    /**经验面板(1025|页签index) */
    public static PANEL_COPY_EXP:number = 1025;
    /**银币面板(1026|页签index) */
    public static PANEL_COPY_SILVER:number = 1026;
    /**天天返利面板(1027|页签index) */
    public static PANEL_DAILYREBATE:number = 1027;
    /**分享面板(1028) */
    public static PANEL_SHARE:number = 1028;
    /**缥缈录 */
    public static PANEL_MATERIAL:number = 1029;
    /**冲榜竞技面板 */
    public static PANEL_SRV_RANK:number = 1030;
    /**火眼金睛面板 */
    public static PANEL_FIRE_EYE:number = 1031;
    /**论剑台 */
    public static PANEL_CLUB_ARENA:number = 1032;
    /**魔神降临(1033) */
    public static PANEL_DEVIL:number = 1033;
    /**功法阁(1034) */
    public static PANEL_GFG:number = 1034;
    /**市场 */
    public static PANEL_MARKET:number = 1035;

    /**盟会信息界面(1500)*/
    public static VIEW_CLUB:number = 1500;
    /**宗门职位界面(1501)*/
    public static VIEW_CLUB_CAREER:number = 1501;
}