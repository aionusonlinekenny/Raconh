class LairdPickExpCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LAIRD_PICK_EXP;
    }

    public type:number;
    public targetId:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.type);
        pkg.writeInt64(this.targetId);
    }

    public receive(pi:TCPPacketIn):void
    {
        let targetId:number = pi.readInt64();
        let workSec:number = pi.readInt();
        
        Manager.model.getLaird().updateCoolyInfo(targetId, workSec);

        let list:Array<ItemsModelInfo> = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let info:ItemsModelInfo = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1 ? true : false;
            info.quantity = pi.readInt();
            list.push(info);
        }
        let isPickAll:number = pi.readByte();
        Manager.control.getDrop().showAlert(list);

        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_PICK_EXP_UPDATE));
    }
}