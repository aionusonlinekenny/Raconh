/**
 * 进入战场协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFEnterCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_BF_ENTER;
    }

    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'def_gtype', 'type' => 'int8', 'desc' => '防守方盟会类型'),
                // array('name' => 'atk_buff_id', 'type' => 'int32', 'desc' => '攻击方战意buff_id'),
                // array('name' => 'atk_buff_lev', 'type' => 'int8', 'desc' => '攻击方战意buff等级'),
        let defClubType:number = pi.readByte();
        let buffID:number = pi.readInt();
        let buffLv:number = pi.readByte();
        let winCount:number = pi.readInt();
        
        let model:ClubBFModel = Manager.model.getClubBF();
        model.defClubType = defClubType;
        model.winCount = winCount;
        if(buffID > 0) model.atkBuffCVO = BuffCVO.getCVO(buffID, buffLv);
        else model.atkBuffCVO = null;

        Manager.view.show(ViewID.ClubBFMiniView);
    }
}