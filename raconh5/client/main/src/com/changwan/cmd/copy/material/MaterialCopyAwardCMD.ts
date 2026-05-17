/**
 * 缥缈录奖励
 * Simon
 * create 2018.3.16
 */
class MaterialCopyAwardCMD extends BaseCMD
{
    public awardId:number;
    public curStar:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.MATERIAL_COPY_AWARD;
	}

    protected processOut(pkg:TCPPacketOut):void
	{
        pkg.writeShort(this.awardId);
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let awardId:number = pi.readShort();
        Manager.model.getMaterialCopy().getAwardId = awardId;
        let list:Array<ItemsModelInfo> = [];
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let info:ItemsModelInfo = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1 ? true : false;
            info.quantity = pi.readInt();
            list.push(info);
        }
        Manager.control.getDrop().showAlert(list);
        Manager.model.getMaterialCopy().dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_GET_AWARD_CELL));
    }
}