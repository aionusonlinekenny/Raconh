/**
 * Simon
 * 18.1.12
 * 传功进行确认
 *  */
class TrainingCommitCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_TRAINING_COMMIT;
    }

    public receive(pi:TCPPacketIn):void
    {
        let list:Array<ItemsModelInfo> = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let itemInfo:ItemsModelInfo = new ItemsModelInfo();
            itemInfo.base_id = pi.readInt();
            itemInfo.bind = pi.readByte() == 1 ? true : false;
            itemInfo.quantity = pi.readInt();
            list.push(itemInfo);
        }
        Manager.control.getDrop().showAlert(list);
    }
}