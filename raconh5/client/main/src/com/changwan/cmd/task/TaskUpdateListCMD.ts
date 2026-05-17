/**
 * pzx 
 * 17.11.14
 * 更新任务列表
 *  */
class TaskUpdateListCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_TASK_UPDATE;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getTask().updateTaskList(pi);
    }
}