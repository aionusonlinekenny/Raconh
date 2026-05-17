class RoleControl extends BaseControl
{
    public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.ROLE_INFO_UPDATE_INT32, RoleInfoUpdateInt32CMD);
        Manager.socket.addCMD(Protocol.ROLE_INFO_UPDATE_STR, RoleInfoUpdateStrCMD);
        Manager.socket.addCMD(Protocol.ROLE_INFO_UPDATE_INT64, RoleInfoUpdateInt64CMD);
        Manager.socket.addCMD(Protocol.ROLE_BASE_INFO, RoleBaseInfoCMD);
        Manager.socket.addCMD(Protocol.CMD_WORLD_LEVE,WorldLevelExpCMD);
    }

    public worldLeve():void
    {
        let cmd:WorldLevelExpCMD = Manager.socket.getCMD(Protocol.CMD_WORLD_LEVE) as WorldLevelExpCMD;
        cmd.send();
    }
}