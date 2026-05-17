/**
 *author Anydo
 *create 2017-11-14
 *description 
*/
class SkillEvent extends BaseEvent
{
    // public static UPDATE_SKILL_LEVEL:string = "updateSkillLevel";



    public static SKILL_UPDATE:string = "skillUpdate";
    public static UPDATE_RUNE_LEVEL:string = "updateRuneLevel";
    public static UPDARE_SELECT_SKILL:string = "updateSelectSkill";
    public static NORMAL_SKILL_STATE_UPDATE:string = "normalSkillStateUpdate";//普通技能栏锁定状态更新
    public static CHECK_NEED_SHOW:string = "chenckNeedSHow";
    public static UPDATE_SPECIAL_SKILL:string = "updateSpecialSkill";
    public static UPDATE_BIANSHEN_SKILL:string = "updateBianShenSkill";
    public static USE_SKILL:string = "useSkill";
    public static UPDATE_MAGICAL_SWITCH_SKILL:string = "updateMagicalSwitchSkill";
    /**单个技能更新 */
    public static SKILL_SINGLE_UPDATE:string = "SKILL_SINGLE_UPDATE";
}