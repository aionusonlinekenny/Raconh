/**
 * Simon
 * 18.1.12
 * 传功信息
 *  */
class TrainingInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_TRAINING_PUSH_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let isPlayed:boolean = pi.readByte() == 1;
        Manager.model.getTraining().updateInfo(isPlayed);
    }
}