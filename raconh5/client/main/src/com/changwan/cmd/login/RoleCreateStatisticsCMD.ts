// 加载创角页面完成
class RoleCreateStatisticsCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ROLE_CREATE_STATISTICS;
    }

    public serverID:number;
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeInt(this.serverID);
    }
}