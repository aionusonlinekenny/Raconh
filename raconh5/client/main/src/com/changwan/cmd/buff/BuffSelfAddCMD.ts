/**
 *author Anydo
 *create 2017-11-30
 *description 
*/
class BuffSelfAddCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.BUFF_SELF_ADD;
    }

    public receive(pi:TCPPacketIn):void
    {
        let groupID:number = pi.readInt();
        let buffLevel:number = pi.readByte();
        let buff:BuffCVO = Manager.model.self.getBuffById(groupID) as BuffCVO;
        if(buff == null)
        {
            buff = BuffCVO.getCVO(groupID, buffLevel);
            Manager.model.self.addBuff(buff);
        }
    }
}