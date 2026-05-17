/**
 * 缥缈录生成宝箱
 * Simon
 * create 2018.3.16
 */
class MaterialCopyMakeBoxCMD extends BaseCMD
{
    public cell:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.MATERIAL_COPY_MAKE_BOX;
	}

    public receive(pi:TCPPacketIn):void
    {
        let x = pi.readInt();
        let y = pi.readInt();
        let id = pi.readShort();
        
        if(id == CopyConst.ID_JUYUAN){
            Manager.model.getJuyuan().setCopyAni(x,y);//聚元
        }else{
            Manager.model.getMaterialCopy().createCollection(x, y);
        }
        
    }
}