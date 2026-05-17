class RoleInfoUpdateInt32CMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ROLE_INFO_UPDATE_INT32;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getLogin().updateRoleInfoPartAttr(pi, 1);
    }
}