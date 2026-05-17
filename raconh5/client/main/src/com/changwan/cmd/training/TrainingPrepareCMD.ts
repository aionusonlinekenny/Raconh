/**
 * Simon
 * 18.1.12
 * 准备进行传功
 *  */
class TrainingPrepareCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_TRAINING_PREPARE;
    }

    public trainingType:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.trainingType);
    }

    public receive(pi:TCPPacketIn):void
    {
        let trainingType:number = pi.readByte();
        let posId:number = pi.readShort();
        
        Manager.model.getTraining().updateTrainingType(trainingType, posId);
    }
}