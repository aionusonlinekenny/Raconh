class MailReceiveCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAIL_RECEIVE;
    }

    public receive(pi:TCPPacketIn)
    {
        Manager.model.getMail().parseReceive(pi);
    }
}