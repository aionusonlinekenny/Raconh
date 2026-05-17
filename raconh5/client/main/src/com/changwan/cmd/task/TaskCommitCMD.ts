/**
 * pzx 
 * 17.11.14
 * 提交任务
 *  */
class TaskCommitCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_TASK_COMMIT;
    }
/**任务id */
    public task_id:number

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt(this.task_id);
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getTask().taskCommit(pi);
    }
}