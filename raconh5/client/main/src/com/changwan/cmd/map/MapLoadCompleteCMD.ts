/**
 *author Anydo
 *create 2017-11-3
 *description 
*/
class MapLoadCompleteCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.MAP_LOAD_COMPLETE;
    }

    public receive(pi:TCPPacketIn):void
    {
    }
}