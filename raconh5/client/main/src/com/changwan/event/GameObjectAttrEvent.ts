class GameObjectAttrEvent extends BaseEvent
{
    /**
     * 生命
     */
    public static HP:string = "UPDATE_ATTR_HP";
    /**
     * 战力
     */
    public static FIGHT:string = "UPDATE_ATTR_FIGHT";
    /**
     * 昵称
     */
    public static NICKNAME:string = "UPDATE_ATTR_NICKNAME";
    /**
     * 等级
     */
    public static LEVEL:string = "UPDATE_ATTR_LEVEL";
    /**
     * 转生
     */
    public static TURN_LIVE:string = "UPDATE_ATTR_TURN_LIVE";
    /**
     * 元宝
     */
    public static GOLD:string = "UPDATE_ATTR_GOLD";
    /**
     * 铜钱
     */
    public static COIN:string = "UPDATE_ATTR_COIN";
    /**
     * 经验
     */
    public static EXP:string = "UPDATE_ATTR_EXP";
    /** 宗门贡献 */
    public static GUILDCONTRI:string = "GUILDCONTRI";
    /**vip等级 */
    public static VIP_LEVEL:string = "UPDATE_ATTR_VIP_LEVEL";
    /** 命魂 */
    public static SOUL:string = "UPDATE_ATTR_SOUL";
    /** 命格碎片*/
    public static DESTINY_FRAG:string = "UPDATE_ATTR_SOUL";
    /** 绝学境界值 */
    public static JUEXUE_AMBIT:string = "JUEXUE_AMBIT";
    /** 荣誉 */
    public static HONOR:string = "HONOR";



    // /**
    //  * 移动
    //  */
    // public static SPEED:string = "UPDATE_ATTR_SPEED";
    // /**
    //  * 生命上限
    //  */
    // public static HP_MAX:string = "UPDATE_ATTR_HP_MAX";
    // /**
    //  * 攻击
    //  */
    // public static DMG:string = "UPDATE_ATTR_DMG";
    // /**
    //  * 防御
    //  */
    // public static DEFENCE:string = "UPDATE_ATTR_DEFENCE";
    // /**
    //  * 破甲
    //  */
    // public static ARMOR:string = "UPDATE_ATTR_ARMOR";
    // /**
    //  * 命中
    //  */
    // public static HITRATE:string = "UPDATE_ATTR_HITRATE";
    // /**
    //  * 闪避
    //  */
    // public static EVASION:string = "UPDATE_ATTR_EVASION";
    // /**
    //  * 暴击
    //  */
    // public static CRITRATE:string = "UPDATE_ATTR_CRITRATE";
    // /**
    //  * 坚韧
    //  */
    // public static TENACITY:string = "UPDATE_ATTR_TENACITY";
    // /**
    //  * 生命恢复
    //  */
    // public static RECOVER:string = "UPDATE_ATTR_RECOVER";
    // /**
    //  * 经验加成
    //  */
    // public static EXP_PER:string = "UPDATE_ATTR_EXP_PER";
    // /**
    //  * 伤害加深
    //  */
    // public static DMG_ENHANCE:string = "UPDATE_ATTR_DMG_ENHANCE";
    // /**
    //  * 伤害减免
    //  */
    // public static DMG_REDUCE:string = "UPDATE_ATTR_DMG_REDUCE";
    // /**
    //  * 暴击加成
    //  */
    // public static CRITRATE_PER:string = "UPDATE_ATTR_CRITRATE_PER";
    // /**
    //  * 暴击减少
    //  */
    // public static ANTI_CRITRATE_PER:string = "UPDATE_ATTR_ANTI_CRITRATE_PER";
    // /**
    //  * 暴伤加成
    //  */
    // public static CRITDMG_PER:string = "UPDATE_ATTR_CRITDMG_PER";
    // /**
    //  * 暴伤减免
    //  */
    // public static ANTI_CRITDMG_PER:string = "UPDATE_ATTR_ANTI_CRITDMG_PER";
    // /**
    //  * 命中几率
    //  */
    // public static HITRATE_PER:string = "UPDATE_ATTR_HITRATE_PER";
    // /**
    //  * 闪避几率
    //  */
    // public static EVASION_PER:string = "UPDATE_ATTR_EVASION_PER";
    // /**
    //  * 攻击加成
    //  */
    // public static DMG_PER:string = "UPDATE_ATTR_DMG_PER";
    // /**
    //  * 防御加成
    //  */
    // public static DEFENCE_PER:string = "UPDATE_ATTR_DEFENCE_PER";
    // /**
    //  * 破甲加成
    //  */
    // public static ARMOR_PER:string = "UPDATE_ATTR_ARMOR_PER";
    // /**
    //  * 生命加成
    //  */
    // public static HP_MAX_PER:string = "UPDATE_ATTR_HP_MAX_PER";
    // /**
    //  * 转生
    //  */
    // public static TURN_LIVE:string = "UPDATE_ATTR_TURN_LIVE";
    // /**
    //  * 荣誉
    //  */
    // public static HONOR:string = "UPDATE_ATTR_HONOR";
    // /**
    //  * 当前经验上限
    //  */
    // public static EXP_MAX:string = "UPDATE_ATTR_EXP_MAX";
    // /**
    //  * 阵营标识
    //  */
    // public static UNION:string = "UPDATE_ATTR_UNION";
    // /**
    //  * 战场类型
    //  */
    // public static BF_TYPE:string = "UPDATE_ATTR_BF_TYPE";
    // /**
    //  * pk模式
    //  */
    // public static PK_MODE:string = "UPDATE_ATTR_PK_MODE";
    // /**
    //  * 当前称号ID
    //  */
    // public static TITLE_ID:string = "UPDATE_ATTR_TITLE_ID";
    // /**
    //  * 帮派ID
    //  */
    // public static GUILD_ID:string = "UPDATE_ATTR_GUILD_ID";
    // /**
    //  * 帮派名称
    //  */
    // public static GUILD_NAME:string = "UPDATE_ATTR_GUILD_NAME";
    // /**
    //  * 帮派职务
    //  */
    // public static GUILD_JOB:string = "UPDATE_ATTR_GUILD_JOB";
    // /**
    //  * 帮派贡献
    //  */
    // public static GUILD_CONTRI:string = "UPDATE_ATTR_GUILD_CONTRI";
    // /**
    //  * 衣服
    //  */
    // public static CLOTHES:string = "UPDATE_ATTR_CLOTHES";
    // /**
    //  * 武器
    //  */
    // public static WEAPON:string = "UPDATE_ATTR_WEAPON";
    // /**
    //  * 披风
    //  */
    // public static WING:string = "UPDATE_ATTR_WING";
    // /**
    //  * 头像id
    //  */
    // public static HEAD_ICON:string = "UPDATE_ATTR_HEAD_ICON";
    // /**
    //  * 经脉等级
    //  */
    // public static JM_LEVEL:string = "UPDATE_ATTR_JM_LEVEL";
    // /**
    //  * 职业
    //  */
    // public static CAREER:string = "UPDATE_ATTR_CAREER";
}