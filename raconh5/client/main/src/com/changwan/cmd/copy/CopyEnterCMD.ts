/**
 * 副本进入协议
 * luzhihong
 * create 2017.12.4
 */
class CopyEnterCMD extends BaseCMD
{
    /**副本ID */
    public id:number;
    /**进入层数 */
    public cell:number;

	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_ENTER;
	}

    protected processOut(pkg:TCPPacketOut):void
	{
        pkg.writeInt(this.id);
        pkg.writeShort(this.cell);
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let id:number = pi.readInt();
        let cell:number = pi.readShort();

        Manager.model.getCopy().curID = id;
        let cvo:CopyCVO;
        if(id == CopyConst.ID_EXP)
        {
            Manager.view.show(ViewID.CopyExpInfoView);
            cvo = CopyCVO.getCVO(CopyConst.ID_EXP);
            if(cvo && cvo.cell <= 0) Manager.view.show(ViewID.DialogView2, CopyConst.ID_DIALOG_EXP);
        }
        else if(id == CopyConst.ID_SILVER)
        {
            Manager.view.show(ViewID.CopySilverInfoView);
            cvo = CopyCVO.getCVO(CopyConst.ID_SILVER);
            if(cvo && cvo.cell <= 0) Manager.view.show(ViewID.DialogView2, CopyConst.ID_DIALOG_COIN);
        }
        //else if(id == CopyConst.ID_JUYUAN) Manager.model.getJuyuan().setCopyAni(id);
        else Manager.control.getCopy().showInfoView(id);
    }
}