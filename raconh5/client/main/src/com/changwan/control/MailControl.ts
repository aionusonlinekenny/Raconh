// 邮件控制器
class MailControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.MAIL_LIST, MailListCMD);
        Manager.socket.addCMD(Protocol.MAIL_RECEIVE, MailReceiveCMD);
        Manager.socket.addCMD(Protocol.MAIL_DELETE, MailDeleteCMD);
        Manager.socket.addCMD(Protocol.MAIL_READ, MailReadCMD);
        Manager.socket.addCMD(Protocol.MAIL_FETCH, MailFetchCMD);
        Manager.socket.addCMD(Protocol.MAIL_ALL_FETCH, MailAllFetchCMD);
    }

    //请求邮件
    public mailListRequest()
    {
        let cmd:MailListCMD = Manager.socket.getCMD(Protocol.MAIL_LIST) as MailListCMD;
        cmd.send();
    }
    /**设置邮件状态为已读 */
    public mailRead(id:number)
    {
        let cmd:MailReadCMD = Manager.socket.getCMD(Protocol.MAIL_READ) as MailReadCMD;
        cmd.uniqueID = id;
        cmd.send();
    }
    /**领取指定邮件中的附件 */
    public mailFetch(id:number)
    {
        let cmd:MailFetchCMD = Manager.socket.getCMD(Protocol.MAIL_FETCH) as MailFetchCMD;
        cmd.uniqueID = id;
        cmd.send();
    }
    /**领取所有附件 */
    public mailAllFetch()
    {
        let cmd:MailAllFetchCMD = Manager.socket.getCMD(Protocol.MAIL_ALL_FETCH) as MailAllFetchCMD;
        cmd.send();
    }
}