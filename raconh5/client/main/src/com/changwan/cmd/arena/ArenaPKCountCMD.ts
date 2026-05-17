/**
 *author Anydo
 *create 2018-1-2
 *description 
*/
class ArenaPKCountCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ARENA_PK_COUNT;
    }

    public flag:number;//0获取数据 1购买次数
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.flag);
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getArena().updatePKCount(pi);
    }
}