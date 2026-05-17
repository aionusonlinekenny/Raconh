/**
 * pzx 
 * 18.3.18
 * 游戏公告
 *  */
class UpdNoticCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CMD_UPD_NOTICE;
    }

    public receive(ip:TCPPacketIn):void
    {
        let state = ip.readByte();
        let cvo:UpdNoticCVO = UpdNoticCVO.cvo();
        cvo.setReward(state);
        Manager.model.getSysnotice().returnUpdNotice();
        //暂时屏蔽，不须自动弹出界面
        // if(state == 0)
        // {
        //     let cvo:DailyActivityCVO = DailyActivityCVO.getCVO(ActIconID.CASHCOW)
        //     if(cvo.isAllCondSatisfy())
        //     {
        //         let tap:number = 3;
        //         if(Manager.model.getcashCow().sevenDaysModel.checkSevenDaysHide())
		//         {
        //             tap = 2;
		//         }
        //         Manager.view.show(ViewID.CashCowPanel,tap);
        //     }
        // }
    }
}