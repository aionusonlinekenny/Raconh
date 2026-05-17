/**
 * 清除挑战cd协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFClearCDCMD extends BaseCMD
{
	public constructor() 
	{
        super();
        this._protocol = Protocol.CLUB_BF_CLEAR_CD;
	}
	
    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'fight_ts', 'type' => 'int32', 'desc' => '可挑战时间戳(秒)'),
        let model:ClubBFModel = Manager.model.getClubBF();
        model.cdEndTime = pi.readInt();

        if(model.cd > 0) Manager.view.show(ViewID.ClubBFClearCDBtn);
        else 
        {
            Manager.view.hide(ViewID.ClubBFClearCDBtn);
        }
    }
}