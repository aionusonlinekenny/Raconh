/**
 * pzx 
 * 17.11.13
 * 任务表信息
 */
class TaskCvoInfo
{
    public id:number;
      /**任务大类1.主线2.转生*/
    public type:number;
    /**章节*/
    public chapter:number;
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
14.进行一次盟会捐献*/
    public taskType:number;
     /**类型参数1.怪物id2.面板id3.副本id4.等级5.道具id */
    public taskTypeValue:string;
     /**进度参数*/
    public taskParam:number;
     //内容
    public desc:string;
    /**接任务条件
1.人物等级：{cond,lev,等级}
2.人物转生等级：{cond,rein,转数}*/
    public cond:string;
    //奖励
    public rewards:string;
    /**后继主线任务,仅主线任务需填，其他为空*/
    public next_main:number;
    /**引导字段  1 控制任务追踪拦在接取任务时出现特效,1显示物效 */
    public effect:number;
    /**新手引导id字段(完成任务触发) */
    public guideAfter:number;
    /**新手引导id字段(接受任务触发) */
    public guideBefore:number;
    /**点击任务追踪拦打开对应的界面 */
    public panelID:string;
    /** 获得当前任务关数*/
    public verse:number;

    public constructor()
    {
      
    }
}
