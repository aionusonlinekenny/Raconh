var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AttrDescType = (function () {
    function AttrDescType() {
    }
    /**
     * 移动
     */
    AttrDescType.SPEED = 10;
    /**
     * 气血
     */
    AttrDescType.HP_MAX = 11;
    /**
     * 生命
     */
    AttrDescType.HP = 12;
    /**
     * 攻击
     */
    AttrDescType.DMG = 13;
    /**
     * 防御
     */
    AttrDescType.DEFENCE = 14;
    /**
     * 破甲
     */
    AttrDescType.ARMOR = 15;
    /**
     * 命中
     */
    AttrDescType.HITRATE = 16;
    /**
     * 闪避
     */
    AttrDescType.EVASION = 17;
    /**
     * 暴击
     */
    AttrDescType.CRITRATE = 18;
    /**
     * 坚韧
     */
    AttrDescType.TENACITY = 19;
    /**
     * 生命恢复
     */
    AttrDescType.RECOVER = 20;
    /**
     * 经验加成
     */
    AttrDescType.EXP_PER = 21;
    /**
     * 伤害加深
     */
    AttrDescType.DMG_ENHANCE = 22;
    /**
     * 伤害减免
     */
    AttrDescType.DMG_REDUCE = 23;
    /**
     * 暴击几率
     */
    AttrDescType.CRITRATE_PER = 24;
    /**
     * 暴击抵抗
     */
    AttrDescType.ANTI_CRITRATE_PER = 25;
    /**
     * 暴伤加成
     */
    AttrDescType.CRITDMG_PER = 26;
    /**
     * 暴伤减免
     */
    AttrDescType.ANTI_CRITDMG_PER = 27;
    /**
     * 命中几率
     */
    AttrDescType.HITRATE_PER = 28;
    /**
     * 闪避几率
     */
    AttrDescType.EVASION_PER = 29;
    /**
     * 气血增加
     */
    AttrDescType.HP_MAX_PER = 30;
    /**
     * 攻击增加
     */
    AttrDescType.DMG_PER = 31;
    /**
     * 防御增加
     */
    AttrDescType.DEFENCE_PER = 32;
    /**
     * 破甲增加
     */
    AttrDescType.ARMOR_PER = 33;
    /**
     * 命中增加
     */
    AttrDescType.HITRATE_RATIO = 34;
    /**
     * 闪避增加
     */
    AttrDescType.EVASION_RATIO = 35;
    /**
     * 暴击增加
     */
    AttrDescType.CRITRATE_RATIO = 36;
    /**
     * 坚韧增加
     */
    AttrDescType.TENACITY_RATIO = 37;
    /**
     * 每5级气血
     */
    AttrDescType.HP_MAX_LEV = 38;
    /**
     * 每5级攻击
     */
    AttrDescType.DMG_LEV = 39;
    /**
     * 每5级防御
     */
    AttrDescType.DEFENCE_LEV = 40;
    /**
     * 每5级破甲
     */
    AttrDescType.ARMOR_LEV = 41;
    /**
     * 每5级命中
     */
    AttrDescType.HITRATE_LEV = 42;
    /**
     * 每5级闪避
     */
    AttrDescType.EVASION_LEV = 43;
    /**
     * 每5级暴击
     */
    AttrDescType.CRITRATE_LEV = 44;
    /**
     * 每5级坚韧
     */
    AttrDescType.TENACITY_LEV = 45;
    /**
     * 转生等级
     */
    AttrDescType.TURN_LIVE = -1;
    /**
     * 等级
     */
    AttrDescType.LEVEL = -2;
    /**
     * 荣誉
     */
    AttrDescType.HONOR = -3;
    /**
     * 元宝
     */
    AttrDescType.GOLD = -4;
    /**
     * 铜钱
     */
    AttrDescType.COIN = -5;
    /**
     * 经验
     */
    AttrDescType.EXP = -6;
    /**
     * 当前经验上限
     */
    AttrDescType.EXP_MAX = -7;
    /**
     * 战力
     */
    AttrDescType.FIGHT = -8;
    /**
     * 阵营标识
     */
    AttrDescType.UNION = -9;
    /**
     * 活动类型
     */
    AttrDescType.BF_TYPE = -10;
    /**
     * pk模式
     */
    AttrDescType.PK_MODE = -11;
    /**
     * 当前称号
     */
    AttrDescType.TITLE_ID = -12;
    /**
     * 帮派id
     */
    AttrDescType.GUILD_ID = -13;
    /**
     * 帮派名称
     */
    AttrDescType.GUILD_NAME = -14;
    /**
     * 帮派职务
     */
    AttrDescType.GUILD_JOB = -15;
    /**
     * 帮派贡献
     */
    AttrDescType.GUILD_CONTRI = -16;
    /**
     * vip等级
     */
    AttrDescType.VIP_LEVEL = -17;
    /**
     * 衣服
     */
    AttrDescType.CLOTHES = -18;
    /**
     * 武器
     */
    AttrDescType.WEAPON = -19;
    /**
     * 披风
     */
    AttrDescType.WING = -20;
    /**
     * 头像
     */
    AttrDescType.HEAD_ICON = -21;
    /**
     * 角色名字
     */
    AttrDescType.NICKNAME = -22;
    /**
     * 经脉等级
     */
    AttrDescType.JM_LEVEL = -23;
    /**
     * 职业
     */
    AttrDescType.CAREER = -24;
    /**
     * 帮派官品名
     */
    AttrDescType.GUILD_JOB_NAME = -25;
    /**
     * 宠物外形ID
     */
    AttrDescType.PET_ANI = -26;
    /**
     * 命魂
     */
    AttrDescType.DESTINY_SOUL = -27;
    /**
     * 命格碎片
     */
    AttrDescType.DESTINY_FRAG = -28;
    /**
     * 资产充值
     */
    AttrDescType.CHARGE = -29;
    /**
     * 传功活动类型
     */
    AttrDescType.TRAINING_TYPE = -30;
    /**
     * 传功活动类型位置
     */
    AttrDescType.TRAINING_POS = -31;
    /**
     * 是否正在传功
     */
    AttrDescType.TRAINING_STATUS = -32;
    /**
     * 帮派类型
     */
    AttrDescType.GUILD_TYPE = -33;
    /**
     * 绝学境界值
     */
    AttrDescType.JUEXUE_AMBIT = -34;
    return AttrDescType;
}());
__reflect(AttrDescType.prototype, "AttrDescType");
//# sourceMappingURL=AttrDescType.js.map