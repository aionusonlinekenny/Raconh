var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 系统公告参数类型
 * liangyan
 * create 2017-11-24
*/
var SysNoticeParamType = (function () {
    function SysNoticeParamType() {
    }
    /**玩家 */
    SysNoticeParamType.PLAYER = 1;
    /**物品 */
    SysNoticeParamType.GOODS = 2;
    /**物品展示 */
    SysNoticeParamType.GOODS_SHOW = 3;
    /**数字 */
    SysNoticeParamType.NUMBER = 4;
    /**字符串 */
    SysNoticeParamType.STRING = 5;
    /**位置信息 */
    SysNoticeParamType.GPRS = 6;
    /**帮派信息 */
    SysNoticeParamType.GUILD_INFO = 7;
    /**弹出面板 */
    SysNoticeParamType.OPEN_PANEL = 8;
    /**无参数面板链接 */
    SysNoticeParamType.NO_PARAM_PANEL = 9;
    /**带参数面板链接 */
    SysNoticeParamType.PARAM_PANEL = 10;
    /**怪物或者NPC */
    SysNoticeParamType.MONSTER_NPC = 11;
    /**物品列表 */
    SysNoticeParamType.GOODS_LIST = 12;
    /**市场吆喝 */
    SysNoticeParamType.MARKET_SHOUT = 13;
    /**帮会招募 */
    SysNoticeParamType.GUILD_RECRUIT = 14;
    return SysNoticeParamType;
}());
__reflect(SysNoticeParamType.prototype, "SysNoticeParamType");
//# sourceMappingURL=SysNoticeParamType.js.map