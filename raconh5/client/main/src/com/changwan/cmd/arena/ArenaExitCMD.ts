/**
 *author Anydo
 *create 2018-1-6
 *description 
*/
class ArenaExitCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ARENA_EXIT;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getArena().exitArenaHandler();
    }
}