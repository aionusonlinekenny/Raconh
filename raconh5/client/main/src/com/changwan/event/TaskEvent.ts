/**
 * pzx 
 * 17.11.15
 */
class TaskEvent extends BaseEvent
{
    //更新
    public static TASK_UPDATE_EVENT:string = "TASK_UPDATE_EVENT";
    /**更新章节 */
    public static TASK_UPDATE_SECTION_EVENT:string = "Task_UPDATE_SECTION_EVENT";
/** 提交任务 */
   // public static TASK_COMMIT_EVENT:string = "TASK_COMMIT_EVENT";
   /** 完成任务 */
    public static TASK_COMPLETE_EVENT:string = "TASK_COMPLETE_EVENT";
/**任务初始化 */
    public static TASK_INIT_EVENT:string = "TASK_INIT_EVENT";
}