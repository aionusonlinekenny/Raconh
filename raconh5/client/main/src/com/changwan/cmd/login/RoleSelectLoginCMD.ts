// 选择角色登录
class RoleSelectLoginCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ROLE_SELECT_LOGIN;
    }

    /**角色id */
    public roleID:number;
    /**额外参数串 */
    public extra:string;
    /**
     * 是否断线重连 0/1
     */
    public curIsReConnect:number;

    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt64(this.roleID);
        pkg.writeByte(this.curIsReConnect);
        pkg.writeUTF(this.extra);
    }

}