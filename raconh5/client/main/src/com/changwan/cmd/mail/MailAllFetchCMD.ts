class MailAllFetchCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAIL_ALL_FETCH;
    }

    public receive(pi:TCPPacketIn):void
    {
        let result = pi.readByte() == 1;
        if(result)
        {
            Manager.model.getMail().dispatchEvent(new MailEvent(MailEvent.MAIL_ALL_FETCH));
        }
    }
}