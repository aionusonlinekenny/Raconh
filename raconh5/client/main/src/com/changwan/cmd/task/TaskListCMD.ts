/**
 * pzx 
 * 17.11.14
 * 返回获取已接任务列表
 *  */
class TaskListCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_TASK_LIST;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getTask().queryTaskList(pi);
    }
}