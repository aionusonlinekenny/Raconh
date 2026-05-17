class GMCmdRequestCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_ADMIN_REQUEST;
    }

    public str:string;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeUTF(this.str);
    }

    public receive(pi:TCPPacketIn):void
    {
        let result:string = pi.readUTF();

        GM.instance.updateRequest(result);
    }
}