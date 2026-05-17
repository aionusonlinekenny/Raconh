class LairdInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LAIRD_INFO;
    }

    protected processOut(pkg:TCPPacketOut):void
    {
        // pkg.writeByte(this.trainingType);
    }

    public receive(pi:TCPPacketIn):void
    {
        let info:LairdInfo = Manager.model.getLaird().lairdRoleInfo;
        info.catchCount = pi.readByte();
        info.rescueCount = pi.readByte();
        info.interactCount = pi.readByte();
        info.seekHelpCount = pi.readByte();
        info.interactTimes = pi.readInt();

        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_INFO_UPDATE));
    }
}