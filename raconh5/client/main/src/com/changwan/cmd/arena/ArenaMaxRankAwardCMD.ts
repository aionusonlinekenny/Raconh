/**
 *author Anydo
 *create 2018-1-2
 *description 
*/
class ArenaMaxRankAwardCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ARENA_MAX_RANK_AWARD;
    }

    public id:number;//0获取数据 >0领取具体ID奖励
    protected processOut(pkg:TCPPacketOut):void
    {
        pkg.writeByte(this.id);
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getArena().updateMaxRankAward(pi);
    }
}