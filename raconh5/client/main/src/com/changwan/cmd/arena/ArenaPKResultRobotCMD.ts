/**
 *author Anydo
 *create 2018-1-2
 *description 
*/
class ArenaPKResultRobotCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.ARENA_PK_RESULT_ROBOT;
    }

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getArena().playType = pi.readByte();
        Manager.model.getArena().updatePKData(pi, false);
    }
}