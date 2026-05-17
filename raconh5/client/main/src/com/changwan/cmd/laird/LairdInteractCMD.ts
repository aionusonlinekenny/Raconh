class LairdInteractCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LAIRD_INTERACT;
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
        let interactCount:number = pi.readByte();
        let interactTimes:number = pi.readInt();
        Manager.model.getLaird().lairdRoleInfo.interactCount = interactCount;
        Manager.model.getLaird().lairdRoleInfo.interactTimes = interactTimes;

        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_INFO_UPDATE));

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
        Manager.control.getDrop().showAlert(list);
    }
}