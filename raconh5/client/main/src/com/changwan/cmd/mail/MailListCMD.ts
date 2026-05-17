// 邮件列表更新
class MailListCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAIL_LIST;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getMail().parseList(pi);
    }
}