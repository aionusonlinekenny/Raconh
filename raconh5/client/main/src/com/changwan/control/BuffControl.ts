/**
 *author Anydo
 *create 2017-11-30
 *description 
*/
class BuffControl extends BaseControl
{
     public constructor()
    {
        super();
    }

    protected addCMD():void
    {
        Manager.socket.addCMD(Protocol.BUFF_SELF_LIST, BuffSelfListCMD);
        Manager.socket.addCMD(Protocol.BUFF_SELF_ADD, BuffSelfAddCMD);
        Manager.socket.addCMD(Protocol.BUFF_SELF_REMOVE, BuffSelfRemoveCMD);
        Manager.socket.addCMD(Protocol.BUFF_MAP_ADD, BuffMapAddCMD);
        Manager.socket.addCMD(Protocol.BUFF_MAP_REMOVE, BuffMapRemoveCMD);
    }
}