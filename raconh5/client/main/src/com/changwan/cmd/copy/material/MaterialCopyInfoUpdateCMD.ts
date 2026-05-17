/**
 * 缥缈录信息更新
 * Simon
 * create 2018.3.16
 */
class MaterialCopyInfoUpdateCMD extends BaseCMD
{
    public id:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.MATERIAL_COPY_INFO_UPDATE;
	}

    public receive(pi:TCPPacketIn):void
    {
        let copyId:number = pi.readInt();
        let passCell:number = pi.readShort();
        let enterTime:number = pi.readByte();

        // let type:number = Math.ceil(passCell / MaterialCopyModel.CELL_MAX_COUNT);
        // let list:Array<number> = Manager.model.getMaterialCopy().passList[type];
        // if(list.indexOf(passCell) == -1)
        //     list.push(passCell);
        // list.sort(Manager.model.getMaterialCopy().sortOnCell);
        // Manager.model.getMaterialCopy().dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_PASS_LIST_UPDATE));
        Manager.model.getMaterialCopy().updatePassCell(passCell);
    }
}