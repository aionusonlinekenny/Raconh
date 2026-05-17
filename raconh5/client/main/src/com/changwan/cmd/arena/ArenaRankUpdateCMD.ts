/**
 *author Anydo
 *create 2018-1-2
 *description 
*/
class ArenaRankUpdateCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ARENA_RANK_UPDATE;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getArena().updateRank(pi);
    }
}