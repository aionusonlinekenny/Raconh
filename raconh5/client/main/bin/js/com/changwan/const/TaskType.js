/**
 * pzx
 * 17.11.15
 * 任务type
 */
var TaskType = /** @class */ (function () {
    function TaskType() {
    }
    /**主线 */
    TaskType.MAIN = 1;
    /**转生 */
    TaskType.ANEW = 2;
    /** 自动任务 开启条件   开启需求：X级或者VIPX */
    TaskType.AUTO_TASK = "{cond,task,10001}|{cond,vip_lev,1}";
    /**任务小类
    1.杀怪
    2.活动
    3.副本
    4.等级达到XXX
    5.战力达到XXXXX
    6.进行一次技能升级操作
    7.进行一次装备熔炼操作
    8.进行一次装备强化操作
    9.装备强化达到X级
    10.镶嵌一颗宝石
    11.进行一次墨宠进阶
    12.墨宠进阶达到2阶
    13.加入一个盟会
    14.进行一次盟会捐献
     */
    TaskType.TASK_TYPE_MONSTER = 1;
    /** 活动 */
    TaskType.TASK_TYPE_ACTIVE = 2;
    /**3.副本 */
    TaskType.TASK_TYPE_COPY = 3;
    /** 等级达到XXX */
    TaskType.TASK_TYPE_ROLELEVE = 4;
    /** 战力达到XXXXX */
    TaskType.TASK_TYPE_FIGHT = 5;
    /** 进行一次技能升级操作 */
    TaskType.TASK_TYPE_SKILL_UPGRADE = 6;
    /** 进行一次装备熔炼操作 */
    TaskType.TASK_TYPE_RONGLIAN = 7;
    /** 进行一次装备强化操作 */
    TaskType.TASK_TYPE_EQUIP = 8;
    /** 备强化达到X级 */
    TaskType.TASK_TYPE_EQUIP_INTENSIFY = 8;
    /** 镶嵌一颗宝石 */
    TaskType.TASK_TYPE_GEM = 10;
    /** 进行一次墨宠进阶 */
    TaskType.TASK_TYPE_PTE_STEPS = 11;
    /** 墨宠进阶达到2阶 */
    TaskType.TASK_TYPE_PTE_TOW_STEPS = 12;
    /** 加入一个盟会 */
    TaskType.TASK_TYPE_CLUB = 13;
    /** 进行一次盟会捐献 */
    TaskType.TASK_TYPE_CLUB_DONATE = 14;
    /**15.进行一次凌烟阁寻宝*/
    TaskType.TASK_TYPE_ARTIFACT = 15;
    /**激活一本绝学 */
    TaskType.TASK_TYPE_JUEXUE = 16;
    return TaskType;
}());
//# sourceMappingURL=TaskType.js.map