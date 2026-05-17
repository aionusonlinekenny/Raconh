/**
 *author Anydo
 *create 2017-11-30
 *description 
*/
class BuffSelfRemoveCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.BUFF_SELF_REMOVE;
    }

    public receive(pi:TCPPacketIn):void
    {
        let groupID:number = pi.readInt();
        let buff:BuffCVO = Manager.model.self.getBuffById(groupID) as BuffCVO;
        if(buff != null)
        {
            Manager.model.self.removeBuff(buff);
        }
    }
}