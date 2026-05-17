class GMControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.CMD_ADMIN_ALL, GMCmdListCMD);
        Manager.socket.addCMD(Protocol.CMD_ADMIN_REQUEST, GMCmdRequestCMD);
    }

    //命令列表
    public gmList()
    {
        let cmd:GMCmdListCMD = Manager.socket.getCMD(Protocol.CMD_ADMIN_ALL) as GMCmdListCMD;
        cmd.str = "";
        cmd.send();
    }

    //执行命令请求
    public gmListRequest(content:string)
    {
        let cmd:GMCmdRequestCMD = Manager.socket.getCMD(Protocol.CMD_ADMIN_REQUEST) as GMCmdRequestCMD;
        cmd.str = content;
        cmd.send();
    }
}