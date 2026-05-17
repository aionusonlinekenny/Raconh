/**
 * Simon
 * 18.1.12
 * 传功状态数据
 *  */
class TrainingStatusCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_TRAINING_PUSH_STATUS;
    }

    public receive(pi:TCPPacketIn):void
    {
        let trainingType:number = pi.readByte();
        let trainingEndTime:number = pi.readInt();
        let posId:number = pi.readShort();

        Manager.model.getTraining().updateStatus(trainingType, trainingEndTime, posId);
    }
}