/**
 * 请求盟会战数据协议
 * luzhihong
 * create 2018.2.1
 */
class ClubBFInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.CLUB_BF_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
                // array('name' => 'gtype', 'type' => 'int8', 'desc' => '下次盟会战，盟会类型(类型为0则是第一场)'),
                // array('name' => 'win_cnt', 'type' => 'int32', 'desc' => '连胜数'),
                // array('name' => 'enter_ts', 'type' => 'int32', 'desc' => '可进入战场时间戳(秒)'),
        let clubID:number = pi.readByte();
        let winCount:number = pi.readInt();
        let enterCD:number = pi.readInt();
        Manager.model.getClubBF().dispatchEvent(new ClubBFEvent(ClubBFEvent.INFO_UPDATE, {clubID:clubID, winCount:winCount, enterCD:enterCD}));
    }
}