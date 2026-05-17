/**
 *author Anydo
 *create 2018-1-2
 *description 
*/
class ArenaPKLogCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ARENA_PK_LOG;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getArena().updatePKLog(pi);
    }
}