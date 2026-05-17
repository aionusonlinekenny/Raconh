var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 功能开放常量
 * liangyan
 * create 2017-12-25
*/
var OpenConst = (function () {
    function OpenConst() {
    }
    //````````````````````````模板表id start```````````````````````````````
    /**经脉 */
    OpenConst.ID_JINGMAI = 1;
    /**世界聊天 */
    OpenConst.ID_WORLD_CHAT = 2;
    /**好友系统 */
    OpenConst.ID_FRIENDS = 3;
    /**私聊 */
    OpenConst.ID_PRIVATE_CHAT = 4;
    /**转生 */
    OpenConst.ID_REIN = 5;
    /**墨宠 */
    OpenConst.ID_PET = 6;
    /** 命格 */
    OpenConst.ID_LIEFGRID = 7;
    /** 珍宝阁 */
    OpenConst.ID_TREASURE_GARRET = 8;
    /**首充 */
    OpenConst.ID_FIRST_CHARGE = 9;
    /**神器 */
    OpenConst.ID_RELICSTUFF = 10;
    /**商城 */
    OpenConst.ID_STORE = 11;
    /**功能预告 */
    OpenConst.ID_SYSNOTICE = 12;
    /**剧情副本 */
    OpenConst.ID_PLOT_COPY = 13;
    /**凌烟阁 */
    OpenConst.ID_LING_YAN_GE = 14;
    /**绝学 */
    OpenConst.ID_JUEXUE = 15;
    /**熔炼 */
    OpenConst.ID_RONGLIAN = 16;
    /**强化 */
    OpenConst.ID_STRENGTHEN = 17;
    /**聚宝蟾 */
    OpenConst.ID_CASHCOW = 18;
    /**等级礼 */
    OpenConst.ID_LEVEL_AWARD = 19;
    /**七日礼 */
    OpenConst.ID_SEVEN_AWARD = 20;
    /**特权卡 */
    OpenConst.ID_PRIVILEGE_CARD = 21;
    /**投资 */
    OpenConst.ID_INVEST = 22;
    /**个人boss */
    OpenConst.ID_PRIVATE_BOSS = 23;
    /**盟会正殿 */
    OpenConst.ID_CLUB_CENTER = 24;
    /**盟会职位 */
    OpenConst.ID_CLUB_CAREER = 25;
    /**盟会试炼 */
    OpenConst.ID_CLUB_COPY = 26;
    /**日常任务 */
    OpenConst.ID_DAILY_TASK = 27;
    /**宝石 */
    OpenConst.ID_GEM = 28;
    /**自动任务 */
    OpenConst.ID_AUTO_TASK = 29;
    /**全民BOSS */
    OpenConst.ID_PUBLIC_BOSS = 30;
    /**冲榜竞技 */
    OpenConst.ID_CHONGBANG = 31;
    /**充值活动 */
    OpenConst.ID_RECHARGE_ACTIVITY = 32;
    /**装扮 */
    OpenConst.ID_DRESS = 33;
    /**称号 */
    OpenConst.ID_TITLE = 34;
    /**论剑台 */
    OpenConst.ID_ARENA_PK = 35;
    /**排行榜 */
    OpenConst.ID_RANK = 36;
    /**九霄塔 */
    OpenConst.ID_JIUXIAOTA = 37;
    /**神兵 */
    OpenConst.ID_SHENBING = 38;
    /**斗地主 */
    OpenConst.ID_LAIRD = 39;
    /**演武场 */
    OpenConst.ID_YANWU = 40;
    /**金玉堂 */
    OpenConst.ID_JINYUTANG = 41;
    /**大盟主 */
    OpenConst.ID_CLUB_LEADER = 42;
    /**盟会战 */
    OpenConst.ID_CLUB_WAR = 43;
    /**铸魂 */
    OpenConst.ID_ZHUHUN = 44;
    /**背饰 */
    OpenConst.ID_CLOAK = 45;
    /**套装 */
    OpenConst.ID_SUIT = 46;
    /**缥缈录 */
    OpenConst.ID_MATERIAL = 47;
    /**一键装备 */
    OpenConst.ID_ONE_KEY_EQUIP = 48;
    /**聚元 */
    OpenConst.ID_JUYUAN = 49;
    /**升星 */
    OpenConst.ID_STARUP = 50;
    /**市场 */
    OpenConst.ID_MARKET = 52;
    /**江湖风云 */
    OpenConst.ID_STORM = -1;
    //````````````````````````模板表id end```````````````````````````````
    //````````````````````````触发类型 start```````````````````````````````
    /**等级 */
    OpenConst.TRIGGER_LVL = 1;
    /**任务 */
    OpenConst.TRIGGER_TASK = 2;
    /**客户端控制 */
    OpenConst.TRIGGER_CLIENT = 3;
    /**转生 */
    OpenConst.TRIGGER_REIN = 4;
    /** 神器 */
    OpenConst.TRIGGRE_RELICSTUFF = 5;
    //````````````````````````触发类型 end```````````````````````````````
    //````````````````````````开启位置 start```````````````````````````````
    /**默认值 */
    OpenConst.POS_DEFAULT = 0;
    /**底部区 */
    OpenConst.POS_BOTTOM = 1;
    /**活动区 */
    OpenConst.POS_ACTIVITY = 2;
    /**地图区 */
    OpenConst.POS_MAP = 3;
    /**任务区 */
    OpenConst.POS_TASK = 4;
    /**其他 */
    OpenConst.POS_OTHERS = 5;
    return OpenConst;
}());
__reflect(OpenConst.prototype, "OpenConst");
//# sourceMappingURL=OpenConst.js.map