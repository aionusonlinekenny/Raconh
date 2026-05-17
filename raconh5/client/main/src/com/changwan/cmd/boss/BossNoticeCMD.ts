/**
 * BOSS刷新提示协议
 * luzhihong
 * create 2018.1.2
 */
class BossNoticeCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.BOSS_NOTICE;
	}
	
    public receive(pi:TCPPacketIn):void
    {
        let type:number = pi.readByte();//1 刷新前 2 刷新
        let id:number = pi.readByte();
        
        if(type == 2) 
        {
            if(Manager.model.getBoss().challengeNum <= 0) return;
            if(!OpenCVO.isOpen(OpenConst.ID_PUBLIC_BOSS)) return;
            if(!Manager.model.getBoss().isAttention(id)) return;
            if(!Manager.model.self.canJoinActive()) return;
            // let cvo:DailyActivityCVO = DailyActivityCVO.getCVO(ActIconID.BOSS);
            // if(!cvo.isAllCondSatisfy()) return;
            if(!BossCVO.getCVO(id).condVo.isSatisfy()) return;
            Manager.view.show(ViewID.BossReviveView, id);
        }
    }
}