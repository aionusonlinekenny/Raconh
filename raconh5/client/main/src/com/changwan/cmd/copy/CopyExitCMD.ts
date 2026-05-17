/**
 * 副本退出协议
 * luzhihong
 * create 2017.12.4
 */
class CopyExitCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.COPY_EXTI;
	}

    protected processOut(pkg:TCPPacketOut):void
	{
        // pkg.writeInt(this.id);
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let id:number = pi.readInt();
        let isSucc:boolean = pi.readByte() == 0; 
        
        Manager.model.getCopy().clean();
        if(id == CopyConst.ID_EXP) Manager.view.hide(ViewID.CopyExpInfoView);
        else if(id == CopyConst.ID_SILVER) 
        {
            Manager.view.hide(ViewID.CopySilverInfoView);
            Manager.view.hide(ViewID.CopyBuffUnlockView);
        }
        else Manager.view.hide(ViewID.CopyInfoView);
        if(id == CopyConst.ID_MAIN)
        {
            if(isSucc)
            Manager.model.getTask().setCopyResoult(id)
        }
        if(id == CopyConst.ID_MATERIAL)
        {
            let type:number = Manager.model.getMaterialCopy().getCommendItem();
            if(type != 0)
                Manager.view.show(ViewID.MaterialSecondView, type);
        }

        //引导
        if(Manager.model.getGuide().curID == GuideID.PASS_COPY)
        {
            Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.TASK), 150, 125, this.guideCB, this, false);
        }
    }

    private guideCB():void
    {
        Manager.model.getLogin().home.guide(HomeView2.TASK);
        Manager.control.getTask().hideGuide();
    }
}