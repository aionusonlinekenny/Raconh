class RoleInfoUpdateStrCMD extends BaseCMD
{
    public constructor()
    {
        super();

        this._protocol = Protocol.ROLE_INFO_UPDATE_STR;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getLogin().updateRoleInfoPartAttr(pi, 2);
    }
}