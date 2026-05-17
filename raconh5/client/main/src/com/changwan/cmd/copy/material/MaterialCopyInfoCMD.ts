/**
 * 缥缈录信息
 * Simon
 * create 2018.3.16
 */
class MaterialCopyInfoCMD extends BaseCMD
{
    public id:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.MATERIAL_COPY_INFO;
	}

    public receive(pi:TCPPacketIn):void
    {
        Manager.model.getMaterialCopy().getAwardId = pi.readShort();
        Manager.model.getMaterialCopy().curStar = pi.readInt();
        Manager.model.getMaterialCopy().dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_GET_AWARD_CELL));
    }
}