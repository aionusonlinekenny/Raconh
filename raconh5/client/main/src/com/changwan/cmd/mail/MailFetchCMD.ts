class MailFetchCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAIL_FETCH;
    }

    /**邮件唯一ID */
    public uniqueID:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt64(this.uniqueID);
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getMail().parseFetch(pi);
    }

}