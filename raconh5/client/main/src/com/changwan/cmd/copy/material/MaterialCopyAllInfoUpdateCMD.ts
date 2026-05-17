/**
 * 缥缈录信息更新
 * Simon
 * create 2018.3.16
 */
class MaterialCopyAllInfoUpdateCMD extends BaseCMD
{
    public id:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.MATERIAL_COPY_ALL_INFO_UPDATE;
	}

    public receive(pi:TCPPacketIn):void
    {
        let copyId:number = pi.readInt();
        let len:number = pi.readShort();
        for(let i:number=0; i<len; i++)
        {
            let passCell:number = pi.readShort();
            let type:number = Math.ceil(passCell / MaterialCopyModel.CELL_MAX_COUNT);
            let list:Array<number> = Manager.model.getMaterialCopy().passList[type];
            if(list.indexOf(passCell) == -1)
                list.push(passCell);
            list.sort(Manager.model.getMaterialCopy().sortOnCell);
        }
        let enterTime:number = pi.readByte();
        Manager.model.getMaterialCopy().dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_PASS_LIST_UPDATE));
    }
}