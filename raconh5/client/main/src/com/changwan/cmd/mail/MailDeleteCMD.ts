class MailDeleteCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAIL_DELETE;
    }

    public receive(pi:TCPPacketIn)
    {
        Manager.model.getMail().parseDelete(pi);
    }
}