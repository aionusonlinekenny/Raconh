class LairdSeekHelpCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_LAIRD_SEEK_HELP;
    }

    public targetId:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt64(this.targetId);
    }

    public receive(pi:TCPPacketIn):void
    {
        let seekHelpCount:number = pi.readByte();
        Manager.model.getLaird().lairdRoleInfo.seekHelpCount = seekHelpCount;
        Manager.model.getLaird().dispatchEvent(new LairdEvent(LairdEvent.LAIRD_SEEK_HELP_UPDATE));
    }
}