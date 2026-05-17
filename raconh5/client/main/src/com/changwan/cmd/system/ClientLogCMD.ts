class ClientLogCMD extends BaseCMD
{
	public constructor()
    {
		super();
		this._protocol = Protocol.CLIENT_LOG;
	}
    
    public str:string;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeUTF(this.str);
    }
}