/**
 * pzx 
 * 17.11.15
 * 任务type
 */
class TaskType
{
    /**主线 */
    public static MAIN:number = 1;
    /**转生 */
    public static ANEW:number = 2;
    /** 自动任务 开启条件   开启需求：X级或者VIPX */
    public static AUTO_TASK:string= "{cond,task,10001}|{cond,vip_lev,1}";

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
    public static TASK_TYPE_MONSTER:number=1;
    /** 活动 */
    public static TASK_TYPE_ACTIVE:number = 2;
    /**3.副本 */
    public static TASK_TYPE_COPY:number = 3;
    /** 等级达到XXX */
    public static TASK_TYPE_ROLELEVE:number = 4;
    /** 战力达到XXXXX */
    public static TASK_TYPE_FIGHT:number = 5;
    /** 进行一次技能升级操作 */
    public static TASK_TYPE_SKILL_UPGRADE:number = 6;
    /** 进行一次装备熔炼操作 */
    public static TASK_TYPE_RONGLIAN:number = 7;
    /** 进行一次装备强化操作 */
    public static TASK_TYPE_EQUIP:number = 8;
     /** 备强化达到X级 */
    public static TASK_TYPE_EQUIP_INTENSIFY:number = 8;
    /** 镶嵌一颗宝石 */
    public static TASK_TYPE_GEM:number = 10;
    /** 进行一次墨宠进阶 */
    public static TASK_TYPE_PTE_STEPS:number = 11;
    /** 墨宠进阶达到2阶 */
    public static TASK_TYPE_PTE_TOW_STEPS:number = 12;
    /** 加入一个盟会 */
    public static TASK_TYPE_CLUB:number = 13;
    /** 进行一次盟会捐献 */
    public static TASK_TYPE_CLUB_DONATE:number = 14;
/**15.进行一次凌烟阁寻宝*/
    public static TASK_TYPE_ARTIFACT:number = 15;
/**激活一本绝学 */
    public static TASK_TYPE_JUEXUE:number = 16;

}