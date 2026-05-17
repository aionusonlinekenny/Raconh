/**
 * 传功控制器
 * Simon
 * create 2018-1-12
*/
class TrainingControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD()
    {
        Manager.socket.addCMD(Protocol.CMD_TRAINING_PUSH_INFO, TrainingInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_TRAINING_PUSH_END, TrainingEndCMD);
        Manager.socket.addCMD(Protocol.CMD_TRAINING_PUSH_STATUS, TrainingStatusCMD);
        Manager.socket.addCMD(Protocol.CMD_TRAINING_PREPARE, TrainingPrepareCMD);
        Manager.socket.addCMD(Protocol.CMD_TRAINING_COMMIT, TrainingCommitCMD);
    }

    /**传功信息 */
    public traingPrepare(type:number):void
    {
        let cmd:TrainingPrepareCMD = Manager.socket.getCMD(Protocol.CMD_TRAINING_PREPARE) as TrainingPrepareCMD;
        cmd.trainingType = type;
        cmd.send();
    }

    /**传功进行确认 */
    public trainingCommit():void
    {
        let cmd:TrainingCommitCMD = Manager.socket.getCMD(Protocol.CMD_TRAINING_COMMIT) as TrainingCommitCMD;
        cmd.send();
    }
}