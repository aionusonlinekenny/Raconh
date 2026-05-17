/**
 *author Anydo
 *create 2017-11-30
 *description 
*/
class BuffSelfListCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.BUFF_SELF_LIST;
    }

    public receive(pi:TCPPacketIn):void
    {
        let self:SelfGameObjectInfo = Manager.model.self;
        let groupID:number;
        let buffLevel:number;
        let buff:BuffCVO;
        let fromID:number;
        let count:number = pi.readShort();
        while(count-- > 0)
        {
            groupID = pi.readInt();
            buffLevel = pi.readByte();
            buff = self.getBuffById(groupID) as BuffCVO;
            if(buff == null)
            {
                buff = BuffCVO.getCVO(groupID, buffLevel);
                self.addBuff(buff);
            }
        }
    }
}