var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuideID = (function () {
    function GuideID() {
    }
    /**点击任务追踪(无黑屏) */
    GuideID.TASK_NORMAL = 100;
    /**点击任务追踪(黑屏) */
    GuideID.TASK = 101;
    /**系统预告奖励 */
    GuideID.SYS_NOTICE = 102;
    /**墨宠进阶引导 */
    GuideID.PET_UPGRADE = 103;
    /**熔炼装备引导 */
    GuideID.RONG_LIAN = 104;
    /**强化装备引导 */
    GuideID.STRENTHEN = 105;
    /**镶嵌宝石引导 */
    GuideID.GEM_INLAY = 106;
    /**加入盟会引导 */
    GuideID.CLUB_JOIN = 107;
    /**盟会捐献引导 */
    GuideID.CLUB_DONATE = 108;
    /**技能升级引导 */
    GuideID.SKILL_UPGRADE = 109;
    /**凌烟阁寻宝引导 */
    GuideID.ARTIFACT = 110;
    /**激活绝学引导 */
    GuideID.JUEXUE_ACTIVE = 111;
    /**通关副本引导 */
    GuideID.PASS_COPY = 112;
    /**一键装备引导 */
    GuideID.WEAR_EQUIP = 113;
    /**神器碎片1引导 */
    GuideID.RELIC_PIECE = 114;
    /**神器碎片2 + 神器激活引导 */
    GuideID.RELIC_ACTIVE = 115;
    /**自动挂机引导 */
    GuideID.AUTO_HOOK = 116;
    /**缥缈录引导 */
    GuideID.MATERIAL = 117;
    /**日常演武场引导 */
    GuideID.YAN_WU = 118;
    /**经验副本引导 */
    GuideID.EXP_COPY = 1020;
    /**银币副本引导 */
    GuideID.COIN_COPY = 1030;
    return GuideID;
}());
__reflect(GuideID.prototype, "GuideID");
//# sourceMappingURL=GuideID.js.map