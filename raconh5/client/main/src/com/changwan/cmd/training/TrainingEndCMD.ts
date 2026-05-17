/**
 * Simon
 * 18.1.12
 * 传功结束
 *  */
class TrainingEndCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_TRAINING_PUSH_END;
    }

    public receive(pi:TCPPacketIn):void
    {
        let trainingType:number = pi.readByte();
        let data = {trainingType:trainingType, list:[]};
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let itemId:number = pi.readInt();
            let bind:number = pi.readByte();
            let quantity:number = pi.readInt();
            data.list.push({itemId:itemId, bind:bind, quantity:quantity});
        }

        Manager.model.getTraining().updateActivityEnd();

        Manager.view.show(ViewID.ChuangongScussView, data);
    }
}