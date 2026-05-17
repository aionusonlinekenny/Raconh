/**
 * pzx
 * 17.11.14
 * 任务信息
 */
class TaskInfo
{
	/**任务状态(0:未完成, 1:已完成) */
	public status:number;
	/**接受任务次数 */
	public accept_num:number;
	//ID
	public id:number;
/**子任务 */
	public infoList:Array<TaskChildInfo>=[];
}
