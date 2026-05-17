/**
 * 复活面板信息协议
 * liangyan
 * create 2017-12-06
*/
class ReviveInfoCMD extends BaseCMD
{
    public constructor()
    {
        super();
        this._protocol = Protocol.REVIVE_INFO;
    }

    public receive(pi:TCPPacketIn):void
    {
        let serverID = pi.readInt();
        let id = pi.readInt64();
        let name = pi.readUTF();
        let fight = pi.readInt();

        let mapID = Manager.model.getMap().getId();
        let map = MapCVO.getCVO(mapID);
        if(!map) return;
        if(map.reliveType == ReviveType.FREE_CD) Manager.view.show(ViewID.ReviveCDView, map.reliveTime);
        else Manager.view.show(ViewID.ReviveChooseView, serverID, name, fight);
    }
}